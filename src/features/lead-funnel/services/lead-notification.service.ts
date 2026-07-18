import type { LeadRecord } from "./lead.types";

const RESEND_API_URL = "https://api.resend.com/emails";

export interface LeadNotificationSuccess {
  readonly ok: true;
}

export interface LeadNotificationFailure {
  readonly ok: false;
  readonly message: string;
}

export type LeadNotificationResult =
  | LeadNotificationSuccess
  | LeadNotificationFailure;

interface ResendConfig {
  readonly apiKey: string;
  readonly to: string;
  readonly from: string;
}

interface LeadEmailContent {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
}

function readResendConfig():
  | { readonly ok: true; readonly config: ResendConfig }
  | LeadNotificationFailure {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_NOTIFICATION_TO?.trim();
  const from = process.env.LEAD_FROM_EMAIL?.trim();

  if (!apiKey) {
    return {
      ok: false,
      message: "Lead email delivery is not configured.",
    };
  }

  if (!to) {
    return {
      ok: false,
      message: "Lead notification recipient is not configured.",
    };
  }

  if (!from) {
    return {
      ok: false,
      message: "Lead notification sender is not configured.",
    };
  }

  return {
    ok: true,
    config: { apiKey, to, from },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayValue(value: string | undefined, fallback = "—"): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function formatLeadType(leadType: LeadRecord["leadType"]): string {
  return leadType === "newsletter" ? "Newsletter" : "Contact form";
}

function buildLeadEmailContent(record: LeadRecord): LeadEmailContent {
  const leadType = formatLeadType(record.leadType);
  const name = displayValue(record.name);
  const email = displayValue(record.email);
  const phone = displayValue(record.phone);
  const company = displayValue(record.company);
  const intent = displayValue(record.intent);
  const source = displayValue(record.source);
  const page = displayValue(record.pagePath);
  const submittedAt = displayValue(record.submittedAt);
  const message = displayValue(record.message, "No message provided.");
  const website = displayValue(record.website);

  const subject = `New Bitcraftly lead — ${leadType} — ${name}`;

  const text = [
    "New Bitcraftly lead",
    "",
    `Lead Type: ${leadType}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company}`,
    `Intent: ${intent}`,
    `Source: ${source}`,
    `Page: ${page}`,
    `Submitted At: ${submittedAt}`,
    `Website: ${website}`,
    "",
    "Message:",
    message,
    "",
    `Lead ID: ${record.id}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border:1px solid #dbe2f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(135deg,#0b1220,#1d4ed8);color:#ffffff;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.82;">Bitcraftly Lead Notification</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">New ${escapeHtml(leadType)} lead</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${renderRow("Lead Type", leadType)}
                  ${renderRow("Name", name)}
                  ${renderRow("Email", email)}
                  ${renderRow("Phone", phone)}
                  ${renderRow("Company", company)}
                  ${renderRow("Intent", intent)}
                  ${renderRow("Source", source)}
                  ${renderRow("Page", page)}
                  ${renderRow("Submitted At", submittedAt)}
                  ${renderRow("Website", website)}
                </table>
                <div style="margin-top:24px;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background-color:#f8fafc;">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#475569;">Message</p>
                  <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
                </div>
                <p style="margin:24px 0 0;font-size:12px;color:#64748b;">Lead ID: ${escapeHtml(record.id)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

function renderRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;line-height:1.5;color:#0f172a;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

async function postResendEmail(
  config: ResendConfig,
  record: LeadRecord,
  content: LeadEmailContent,
): Promise<LeadNotificationResult> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: content.subject,
        html: content.html,
        text: content.text,
        reply_to: record.email,
      }),
    });

    if (!response.ok) {
      let detail = "Unable to deliver lead notification email.";
      try {
        const payload = (await response.json()) as { message?: string };
        if (payload.message?.trim()) {
          detail = payload.message.trim();
        }
      } catch {
        // Keep generic delivery message when response body is not JSON.
      }

      return { ok: false, message: detail };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Unable to deliver lead notification email.",
    };
  }
}

export async function sendLeadNotification(
  record: LeadRecord,
): Promise<LeadNotificationResult> {
  const configResult = readResendConfig();

  if (!configResult.ok) {
    return configResult;
  }

  const content = buildLeadEmailContent(record);
  return postResendEmail(configResult.config, record, content);
}

/** @internal Test helper for email content assertions. */
export function buildLeadNotificationEmailForTests(
  record: LeadRecord,
): LeadEmailContent {
  return buildLeadEmailContent(record);
}

/** @internal Test helper for config validation. */
export function readLeadNotificationConfigForTests(): ReturnType<
  typeof readResendConfig
> {
  return readResendConfig();
}
