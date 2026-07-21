import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LeadRecord } from "@/features/lead-funnel/services/lead.types";
import {
  buildLeadConfirmationEmailForTests,
  buildLeadNotificationEmailForTests,
  readLeadNotificationConfigForTests,
  sendLeadNotification,
} from "@/features/lead-funnel/services/lead-notification.service";

const SAMPLE_RECORD: LeadRecord = {
  id: "lead-test-001",
  leadType: "contact",
  status: "new",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+91 90000 00000",
  company: "Analytical Engines",
  intent: "consultation",
  message: "Need help with a SaaS MVP.",
  website: "https://example.com",
  source: "contact-form",
  pagePath: "/contact",
  submittedAt: "2026-07-18T00:00:00.000Z",
  referer: "https://bitcraftly.com/services",
  userAgent: "Mozilla/5.0 Test",
};

describe("lead notification config", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("requires server-side Resend configuration", () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.LEAD_NOTIFICATION_TO;
    delete process.env.LEAD_FROM_EMAIL;

    const result = readLeadNotificationConfigForTests();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("not configured");
    }
  });
});

describe("lead notification email content", () => {
  it("includes required lead fields in html and text", () => {
    const content = buildLeadNotificationEmailForTests(SAMPLE_RECORD);

    expect(content.subject).toContain("Ada Lovelace");
    expect(content.text).toContain("Lead Type: Contact form");
    expect(content.text).toContain("Email: ada@example.com");
    expect(content.text).toContain("Need help with a SaaS MVP.");
    expect(content.html).toContain("Ada Lovelace");
    expect(content.html).toContain("ada@example.com");
    expect(content.html).toContain("Need help with a SaaS MVP.");
  });

  it("escapes html in user-provided message content", () => {
    const content = buildLeadNotificationEmailForTests({
      ...SAMPLE_RECORD,
      message: '<script>alert("x")</script>',
    });

    expect(content.html).not.toContain("<script>");
    expect(content.html).toContain("&lt;script&gt;");
  });
});

describe("lead confirmation email content", () => {
  it("includes a personalized contact confirmation", () => {
    const content = buildLeadConfirmationEmailForTests(SAMPLE_RECORD);

    expect(content.subject).toBe("We received your message — Bitcraftly");
    expect(content.text).toContain("Hi Ada,");
    expect(content.text).toContain("Your request: Free consultation");
    expect(content.text).toContain("message us on WhatsApp");
    expect(content.html).toContain("Hi Ada,");
    expect(content.html).toContain("Free consultation");
  });

  it("includes a newsletter confirmation", () => {
    const content = buildLeadConfirmationEmailForTests({
      ...SAMPLE_RECORD,
      leadType: "newsletter",
      name: "Newsletter visitor",
    });

    expect(content.subject).toBe("You're subscribed — Bitcraftly");
    expect(content.text).toContain("Hi there,");
    expect(content.text).toContain("Thanks for subscribing to Bitcraftly updates.");
  });
});

describe("sendLeadNotification", () => {
  const originalEnv = { ...process.env };
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "re_test_key",
      LEAD_NOTIFICATION_TO: "hello@bitcraftly.com",
      LEAD_FROM_EMAIL: "Bitcraftly Leads <notifications@bitcraftly.com>",
    };
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("posts team and confirmation emails to the Resend API", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" }),
    });

    const result = await sendLeadNotification(SAMPLE_RECORD);

    expect(result).toEqual({ ok: true, confirmationSent: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [teamUrl, teamInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(teamUrl).toBe("https://api.resend.com/emails");
    expect(teamInit.method).toBe("POST");
    expect(teamInit.headers).toMatchObject({
      Authorization: "Bearer re_test_key",
      "Content-Type": "application/json",
    });

    const teamBody = JSON.parse(String(teamInit.body)) as {
      to: string[];
      html: string;
      text: string;
      reply_to: string;
    };

    expect(teamBody.to).toEqual(["hello@bitcraftly.com"]);
    expect(teamBody.reply_to).toBe("ada@example.com");
    expect(teamBody.html).toContain("Ada Lovelace");
    expect(teamBody.text).toContain("Ada Lovelace");

    const [, confirmationInit] = fetchMock.mock.calls[1] as [string, RequestInit];
    const confirmationBody = JSON.parse(String(confirmationInit.body)) as {
      to: string[];
      subject: string;
      html: string;
      text: string;
    };

    expect(confirmationBody.to).toEqual(["ada@example.com"]);
    expect(confirmationBody.subject).toBe("We received your message — Bitcraftly");
    expect(confirmationBody.html).toContain("Hi Ada,");
    expect(confirmationBody.text).toContain("Hi Ada,");
  });

  it("returns success when only the confirmation email fails", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "email_team" }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "You can only send testing emails to your own email address." }),
      });

    const result = await sendLeadNotification(SAMPLE_RECORD);

    expect(result).toEqual({ ok: true, confirmationSent: false });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns typed failure when Resend rejects the request", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid from address" }),
    });

    const result = await sendLeadNotification(SAMPLE_RECORD);

    expect(result).toEqual({
      ok: false,
      message: "Invalid from address",
    });
  });
});
