import { describe, expect, it } from "vitest";

import { validateProductionServerEnv } from "./validate-server-env";

const validEnv: Record<string, string | undefined> = {
  DATABASE_URL: "postgresql://user:pass@localhost:5432/bitcraftly",
  RESEND_API_KEY: "re_test_key",
  LEAD_NOTIFICATION_TO: "leads@example.com",
  LEAD_FROM_EMAIL: "Bitcraftly <notifications@example.com>",
  NEXT_PUBLIC_SITE_URL: "https://bitcraftly.com",
  OWNER_AUTH_EMAIL: "owner@example.com",
  OWNER_AUTH_PASSWORD: "super-secret-password",
  OWNER_SESSION_SECRET: "test-owner-session-secret-at-least-32-characters",
};

describe("validateProductionServerEnv", () => {
  it("accepts a complete production env contract", () => {
    expect(() => validateProductionServerEnv(validEnv)).not.toThrow();
  });

  it("throws when required variables are missing", () => {
    expect(() =>
      validateProductionServerEnv({
        ...validEnv,
        DATABASE_URL: "",
      }),
    ).toThrow(/Production environment validation failed/);
  });

  it("throws when OWNER_SESSION_SECRET is too short", () => {
    expect(() =>
      validateProductionServerEnv({
        ...validEnv,
        OWNER_SESSION_SECRET: "too-short",
      }),
    ).toThrow(/OWNER_SESSION_SECRET/);
  });
});
