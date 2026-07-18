import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SubmitContactLeadActionInput } from "@/features/lead-funnel/services/lead-action.input";
import { processLeadSubmission } from "@/features/lead-funnel/services/lead.service";
import { resetLeadRateLimitStoreForTests } from "@/features/lead-funnel/services/lead-rate-limit";

vi.mock("@/features/lead-funnel/services/lead-notification.service", () => ({
  sendLeadNotification: vi.fn(async () => ({ ok: true as const })),
}));

import { sendLeadNotification } from "@/features/lead-funnel/services/lead-notification.service";

const REQUEST_HEADERS = {
  referer: "https://bitcraftly.com/contact",
  userAgent: "Mozilla/5.0 Test",
  clientIp: "203.0.113.44",
} as const;

const VALID_CONTACT_INPUT: SubmitContactLeadActionInput = {
  leadType: "contact",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "",
  company: "",
  intent: "consultation",
  message: "Need help shipping a SaaS MVP.",
  website: "",
  _honeypot: "",
  source: "contact-form",
  pagePath: "/contact",
};

describe("processLeadSubmission", () => {
  beforeEach(() => {
    resetLeadRateLimitStoreForTests();
    vi.mocked(sendLeadNotification).mockClear();
    vi.mocked(sendLeadNotification).mockResolvedValue({ ok: true });
  });

  it("returns success with a lead id for valid contact input", async () => {
    const result = await processLeadSubmission(
      VALID_CONTACT_INPUT,
      REQUEST_HEADERS,
      "2026-07-18T00:00:00.000Z",
    );

    expect(result).toEqual({
      ok: true,
      leadId: expect.any(String),
    });
    expect(sendLeadNotification).toHaveBeenCalledOnce();
  });

  it("returns validation errors for invalid contact input", async () => {
    const result = await processLeadSubmission(
      {
        ...VALID_CONTACT_INPUT,
        email: "not-an-email",
      },
      REQUEST_HEADERS,
    );

    expect(result).toEqual({
      ok: false,
      code: "VALIDATION",
      message: expect.any(String),
    });
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("returns honeypot failure before validation", async () => {
    const result = await processLeadSubmission(
      {
        ...VALID_CONTACT_INPUT,
        _honeypot: "bot",
      },
      REQUEST_HEADERS,
    );

    expect(result).toEqual({
      ok: false,
      code: "HONEYPOT",
      message: expect.any(String),
    });
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("returns delivery failure when notification delivery fails", async () => {
    vi.mocked(sendLeadNotification).mockResolvedValueOnce({
      ok: false,
      message: "Invalid from address",
    });

    const result = await processLeadSubmission(
      VALID_CONTACT_INPUT,
      REQUEST_HEADERS,
    );

    expect(result).toEqual({
      ok: false,
      code: "DELIVERY",
      message: "Invalid from address",
    });
  });

  it("returns success for valid newsletter input", async () => {
    const result = await processLeadSubmission(
      {
        leadType: "newsletter",
        email: "newsletter@example.com",
        _honeypot: "",
        source: "newsletter",
        pagePath: "/",
      },
      REQUEST_HEADERS,
      "2026-07-18T00:00:00.000Z",
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.leadId).toEqual(expect.any(String));
    }
    expect(sendLeadNotification).toHaveBeenCalledOnce();
  });
});
