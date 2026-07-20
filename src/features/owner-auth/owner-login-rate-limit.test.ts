import { beforeEach, describe, expect, it } from "vitest";

import {
  checkOwnerLoginRateLimit,
  resetOwnerLoginRateLimitStoreForTests,
} from "./owner-login-rate-limit";

describe("owner login rate limit", () => {
  beforeEach(() => {
    resetOwnerLoginRateLimitStoreForTests();
  });

  it("allows attempts under the configured limit", () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(
        checkOwnerLoginRateLimit({
          clientIp: "203.0.113.10",
          email: "owner@example.com",
        }).allowed,
      ).toBe(true);
    }
  });

  it("blocks repeated attempts for the same account", () => {
    const params = {
      clientIp: "203.0.113.10",
      email: "owner@example.com",
    };

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(checkOwnerLoginRateLimit(params).allowed).toBe(true);
    }

    expect(checkOwnerLoginRateLimit(params).allowed).toBe(false);
  });

  it("blocks repeated attempts from the same IP across accounts", () => {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      expect(
        checkOwnerLoginRateLimit({
          clientIp: "198.51.100.4",
          email: `owner-${attempt}@example.com`,
        }).allowed,
      ).toBe(true);
    }

    expect(
      checkOwnerLoginRateLimit({
        clientIp: "198.51.100.4",
        email: "owner-new@example.com",
      }).allowed,
    ).toBe(false);
  });
});
