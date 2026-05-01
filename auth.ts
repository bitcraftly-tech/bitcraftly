import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
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

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
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
    ...(googleEnabled
      ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && "accessToken" in user) {
        token.accessToken = user.accessToken as string;
      }
      if (user && "role" in user) {
        token.role = String(user.role);
      }
      if (account?.provider === "google" && account.access_token) {
        token.accessToken = account.access_token;
        token.role = token.role || "user";
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

export default NextAuth(authOptions);
