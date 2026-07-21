import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SubmitContactLeadActionInput } from "@/features/lead-funnel/services/lead-action.input";
import { processLeadSubmission } from "@/features/lead-funnel/services/lead.service";
import { resetLeadRateLimitStoreForTests } from "@/features/lead-funnel/services/lead-rate-limit";

vi.mock("@/features/lead-funnel/services/lead-notification.service", () => ({
  sendLeadNotification: vi.fn(async () => ({
    ok: true as const,
    confirmationSent: true,
  })),
}));

vi.mock("@/features/lead-funnel/services/lead.repository", () => ({
  saveLead: vi.fn(async () => ({
    ok: true as const,
    data: { leadId: "550e8400-e29b-41d4-a716-446655440000" },
  })),
  markNotificationSent: vi.fn(async () => ({ ok: true as const, data: {} })),
  markNotificationFailed: vi.fn(async () => ({ ok: true as const, data: {} })),
}));

import { sendLeadNotification } from "@/features/lead-funnel/services/lead-notification.service";
import {
  markNotificationFailed,
  markNotificationSent,
  saveLead,
  type PersistedLeadRecord,
} from "@/features/lead-funnel/services/lead.repository";

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

const PERSISTED_LEAD: PersistedLeadRecord = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  leadType: "contact",
  status: "new",
  name: VALID_CONTACT_INPUT.name,
  email: VALID_CONTACT_INPUT.email,
  intent: "consultation",
  message: VALID_CONTACT_INPUT.message,
  source: VALID_CONTACT_INPUT.source,
  pagePath: VALID_CONTACT_INPUT.pagePath,
  submittedAt: "2026-07-18T00:00:00.000Z",
  createdAt: "2026-07-18T00:00:00.000Z",
  updatedAt: "2026-07-18T00:00:00.000Z",
};

describe("processLeadSubmission", () => {
  beforeEach(() => {
    resetLeadRateLimitStoreForTests();
    vi.mocked(sendLeadNotification).mockClear();
    vi.mocked(sendLeadNotification).mockResolvedValue({
      ok: true,
      confirmationSent: true,
    });
    vi.mocked(saveLead).mockClear();
    vi.mocked(saveLead).mockResolvedValue({
      ok: true,
      data: { leadId: "550e8400-e29b-41d4-a716-446655440000" },
    });
    vi.mocked(markNotificationSent).mockClear();
    vi.mocked(markNotificationSent).mockResolvedValue({
      ok: true,
      data: PERSISTED_LEAD,
    });
    vi.mocked(markNotificationFailed).mockClear();
    vi.mocked(markNotificationFailed).mockResolvedValue({
      ok: true,
      data: PERSISTED_LEAD,
    });
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
      confirmationSent: true,
    });
    expect(saveLead).toHaveBeenCalledOnce();
    expect(sendLeadNotification).toHaveBeenCalledOnce();
    expect(markNotificationSent).toHaveBeenCalledOnce();
    expect(markNotificationFailed).not.toHaveBeenCalled();
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
    expect(saveLead).not.toHaveBeenCalled();
    expect(sendLeadNotification).not.toHaveBeenCalled();
    expect(markNotificationSent).not.toHaveBeenCalled();
    expect(markNotificationFailed).not.toHaveBeenCalled();
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
    expect(saveLead).not.toHaveBeenCalled();
    expect(sendLeadNotification).not.toHaveBeenCalled();
    expect(markNotificationSent).not.toHaveBeenCalled();
    expect(markNotificationFailed).not.toHaveBeenCalled();
  });

  it("returns persistence failure when saveLead fails", async () => {
    vi.mocked(saveLead).mockResolvedValueOnce({
      ok: false,
      code: "DATABASE_UNAVAILABLE",
      message: "Database is unavailable.",
    });

    const result = await processLeadSubmission(
      VALID_CONTACT_INPUT,
      REQUEST_HEADERS,
    );

    expect(result).toEqual({
      ok: false,
      code: "PERSISTENCE",
      message:
        "We could not save your request right now. Please try again or contact us on WhatsApp.",
    });
    expect(saveLead).toHaveBeenCalledOnce();
    expect(sendLeadNotification).not.toHaveBeenCalled();
    expect(markNotificationSent).not.toHaveBeenCalled();
    expect(markNotificationFailed).not.toHaveBeenCalled();
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
    expect(saveLead).toHaveBeenCalledOnce();
    expect(sendLeadNotification).toHaveBeenCalledOnce();
    expect(markNotificationFailed).toHaveBeenCalledWith(
      expect.any(String),
      "Invalid from address",
    );
    expect(markNotificationSent).not.toHaveBeenCalled();
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
    expect(saveLead).toHaveBeenCalledOnce();
    expect(sendLeadNotification).toHaveBeenCalledOnce();
    expect(markNotificationSent).toHaveBeenCalledOnce();
    expect(markNotificationFailed).not.toHaveBeenCalled();
  });
});
