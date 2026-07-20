"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { resolveClientIp } from "@/lib/security/client-ip";

import {
  OWNER_SESSION_COOKIE,
  OWNER_SESSION_MAX_AGE_SECONDS,
} from "../owner-auth.constants";
import {
  readOwnerAuthConfig,
  verifyOwnerCredentials,
} from "../owner-auth.config";
import { checkOwnerLoginRateLimit } from "../owner-login-rate-limit";
import { createOwnerSessionToken } from "../owner-session";
import { resolveOwnerNextPath } from "../owner-auth.utils";

export interface OwnerLoginState {
  readonly ok: false;
  readonly message: string;
}

const LOGIN_RATE_LIMIT_MESSAGE =
  "Too many login attempts. Please wait a few minutes and try again.";

export async function loginOwnerAction(
  _previousState: OwnerLoginState | null,
  formData: FormData,
): Promise<OwnerLoginState | null> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = resolveOwnerNextPath(String(formData.get("next") ?? ""));

  const headerStore = await headers();
  const clientIp = resolveClientIp(headerStore);
  const rateLimit = checkOwnerLoginRateLimit({ clientIp, email });

  if (!rateLimit.allowed) {
    return {
      ok: false,
      message: LOGIN_RATE_LIMIT_MESSAGE,
    };
  }

  let config;

  try {
    config = readOwnerAuthConfig();
  } catch {
    return {
      ok: false,
      message: "Owner authentication is not configured.",
    };
  }

  if (!verifyOwnerCredentials(email, password, config)) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  const token = await createOwnerSessionToken(
    config.sessionSecret,
    Date.now() + OWNER_SESSION_MAX_AGE_SECONDS * 1000,
  );

  const cookieStore = await cookies();
  cookieStore.set(OWNER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/owner",
    maxAge: OWNER_SESSION_MAX_AGE_SECONDS,
  });

  redirect(nextPath);
}

export async function logoutOwnerAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: OWNER_SESSION_COOKIE,
    path: "/owner",
  });

  redirect("/owner/login");
}
