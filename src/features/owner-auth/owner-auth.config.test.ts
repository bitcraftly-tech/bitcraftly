import { afterEach, describe, expect, it } from "vitest";
import {
  readOwnerAuthConfig,
  verifyOwnerCredentials,
} from "@/features/owner-auth/owner-auth.config";

const ENV_KEYS = [
  "OWNER_AUTH_EMAIL",
  "OWNER_AUTH_PASSWORD",
  "OWNER_SESSION_SECRET",
] as const;

describe("verifyOwnerCredentials", () => {
  afterEach(() => {
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  it("accepts matching credentials case-insensitively for email", () => {
    const config = {
      email: "owner@company.com",
      password: "super-secret-password",
      sessionSecret: "secret",
    };

    expect(
      verifyOwnerCredentials("Owner@Company.com", "super-secret-password", config),
    ).toBe(true);
  });

  it("rejects invalid credentials", () => {
    const config = {
      email: "owner@company.com",
      password: "super-secret-password",
      sessionSecret: "secret",
    };

    expect(
      verifyOwnerCredentials("owner@company.com", "wrong-password", config),
    ).toBe(false);
  });

  it("reads required auth configuration from env", () => {
    process.env.OWNER_AUTH_EMAIL = "owner@company.com";
    process.env.OWNER_AUTH_PASSWORD = "super-secret-password";
    process.env.OWNER_SESSION_SECRET = "secret";

    expect(readOwnerAuthConfig()).toEqual({
      email: "owner@company.com",
      password: "super-secret-password",
      sessionSecret: "secret",
    });
  });
});
