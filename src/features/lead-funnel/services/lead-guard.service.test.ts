import { describe, expect, it, beforeEach } from "vitest";
import { guardLeadSubmission } from "@/features/lead-funnel/services/lead-guard.service";
import { isHoneypotTripped } from "@/features/lead-funnel/services/lead-payload.schema";
import {
  buildLeadRateLimitKey,
  checkLeadRateLimit,
  resetLeadRateLimitStoreForTests,
} from "@/features/lead-funnel/services/lead-rate-limit";

describe("lead honeypot", () => {
  it("trips when the hidden field has content", () => {
    expect(isHoneypotTripped("bot-value")).toBe(true);
    expect(isHoneypotTripped("")).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it("blocks submission through guardLeadSubmission", () => {
    const result = guardLeadSubmission({
      honeypot: "spam",
      email: "lead@example.com",
      clientIp: "203.0.113.10",
    });

    expect(result).toEqual({
      ok: false,
      code: "HONEYPOT",
      message: "Unable to submit your request. Please try again.",
    });
  });
});

describe("lead rate limit", () => {
  beforeEach(() => {
    resetLeadRateLimitStoreForTests();
  });

  it("allows submissions under the configured limit", () => {
    const key = buildLeadRateLimitKey({
      clientIp: "203.0.113.10",
      email: "lead@example.com",
    });

    expect(checkLeadRateLimit(key, { maxAttempts: 2, windowMs: 60_000 }).allowed).toBe(
      true,
    );
    expect(checkLeadRateLimit(key, { maxAttempts: 2, windowMs: 60_000 }).allowed).toBe(
      true,
    );
    expect(checkLeadRateLimit(key, { maxAttempts: 2, windowMs: 60_000 }).allowed).toBe(
      false,
    );
  });

  it("blocks repeated submissions through guardLeadSubmission", () => {
    const input = {
      email: "repeat@example.com",
      clientIp: "198.51.100.4",
    };

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(guardLeadSubmission(input)).toBeNull();
    }

    const blocked = guardLeadSubmission(input);
    expect(blocked?.ok).toBe(false);
    expect(blocked?.code).toBe("RATE_LIMIT");
  });
});

describe("buildLeadRateLimitKey", () => {
  it("normalizes email casing for stable keys", () => {
    const lower = buildLeadRateLimitKey({
      clientIp: "203.0.113.10",
      email: "lead@example.com",
    });
    const upper = buildLeadRateLimitKey({
      clientIp: "203.0.113.10",
      email: "LEAD@example.com",
    });

    expect(lower).toBe(upper);
  });
});
