import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { isGoogleLoginConfigured, resolvedNextAuthSecret } from "@/lib/googleAuthEnv";
import { roleFromAdminAllowlist } from "@/lib/adminAllowlist";

const authApiBaseUrl = process.env.AUTH_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const fallbackTestEmail = process.env.AUTH_TEST_EMAIL || "test.user@bitcraftly.local";
const fallbackTestPassword = process.env.AUTH_TEST_PASSWORD || "Test@12345";
const allowLocalFallback = process.env.NODE_ENV !== "production";

async function loginWithApi(email: string, password: string) {
  try {
    const response = await fetch(`${authApiBaseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (!data?.access_token) return null;

      return {
        id: data.user?.id || email,
        name: data.user?.name || email.split("@")[0],
        email,
        role: data.user?.role || "user",
        accessToken: data.access_token as string,
      };
    }
  } catch (_error) {
    // Fallback test credentials are allowed when API is unavailable in local dev.
  }

  if (allowLocalFallback && email.toLowerCase() === fallbackTestEmail.toLowerCase() && password === fallbackTestPassword) {
    return {
      id: "test-user-local",
      name: "Test User",
      email: fallbackTestEmail,
      role: "admin",
      accessToken: "local-dev-test-token",
    };
  }

  return null;
}

/** Build options at request time so Vercel/runtime env is always current (not snapshotted at module load). */
export function createAuthOptions(): NextAuthOptions {
  const googleEnabled = isGoogleLoginConfigured();
  const clientId = `${process.env.AUTH_GOOGLE_ID ?? ""}`.trim();
  const clientSecret = `${process.env.AUTH_GOOGLE_SECRET ?? ""}`.trim();

  return {
    secret: resolvedNextAuthSecret(),
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const email = String(credentials?.email || "");
          const password = String(credentials?.password || "");
          if (!email || !password) return null;
          return loginWithApi(email, password);
        },
      }),
      ...(googleEnabled && clientId && clientSecret
        ? [
            Google({
              clientId,
              clientSecret,
            }),
          ]
        : []),
    ],
    session: {
      strategy: "jwt",
      /** Cookie/JWT lifetime — client warning uses `session.expires` (last ~60s configurable). */
      maxAge: (() => {
        const raw = process.env.SESSION_MAX_AGE_SECONDS?.trim();
        if (!raw) return 30 * 24 * 60 * 60;
        const n = Number.parseInt(raw, 10);
        return Number.isFinite(n) && n > 0 ? n : 30 * 24 * 60 * 60;
      })(),
    },
    callbacks: {
      async jwt({ token, user, account, profile }) {
        if (user && "accessToken" in user) {
          token.accessToken = user.accessToken as string;
        }
        if (user && "role" in user) {
          token.role = String(user.role);
        }

        if (account?.provider === "google") {
          const oauthProfile = profile as { email?: string; name?: string } | undefined;
          const email =
            user?.email ?? oauthProfile?.email ?? (typeof token.email === "string" ? token.email : undefined);
          const name = user?.name ?? oauthProfile?.name ?? "";
          const syncSecret = process.env.AUTH_GOOGLE_SYNC_SECRET?.trim();
          const apiBaseUrl = `${process.env.AUTH_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || authApiBaseUrl}`.replace(/\/$/, "");

          let syncedToken: string | undefined;
          let syncedRole: string | undefined;

          if (email && syncSecret) {
            try {
              const res = await fetch(`${apiBaseUrl}/api/auth/google-sync`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-google-sync-secret": syncSecret,
                },
                body: JSON.stringify({
                  email,
                  name: name.trim() || email.split("@")[0],
                }),
              });
              if (res.ok) {
                const data = (await res.json()) as { access_token?: string; user?: { role?: string | number } };
                syncedToken = data.access_token;
                if (data.user?.role !== undefined && data.user?.role !== null) {
                  syncedRole = String(data.user.role);
                }
              }
            } catch {
              // Fallback to Google-only token below
            }
          }

          if (syncedToken && syncedRole !== undefined) {
            token.accessToken = syncedToken;
            token.role = syncedRole;
          } else {
            token.role = (token.role as string | undefined) || "user";
            if (account.access_token && !token.accessToken) {
              token.accessToken = account.access_token;
            }
          }
        }

        const sessionEmail =
          typeof token.email === "string"
            ? token.email
            : user?.email ?? (profile as { email?: string } | undefined)?.email;
        const allowlistRole = roleFromAdminAllowlist(sessionEmail);
        if (allowlistRole) {
          token.role = allowlistRole;
        }

        return token;
      },
      async session({ session, token }) {
        session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
        session.role = typeof token.role === "string" ? token.role : undefined;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
}
