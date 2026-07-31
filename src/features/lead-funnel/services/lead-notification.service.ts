import { LEAD_FUNNEL_CONFIG, LEAD_INTENT_OPTIONS } from '../lead-funnel.config';
import { getSiteUrl } from '@/lib/seo/site';
import type { LeadRecord } from './lead.types';

const RESEND_API_URL = 'https://api.resend.com/emails';

export interface LeadNotificationSuccess {
  readonly ok: true;
  readonly confirmationSent: boolean;
}

export interface LeadNotificationFailure {
  readonly ok: false;
  readonly message: string;
}

export type LeadNotificationResult = LeadNotificationSuccess | LeadNotificationFailure;

type ResendDeliveryResult =
  { readonly ok: true } | { readonly ok: false; readonly message: string };

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

interface ResendEmailPayload {
  readonly from: string;
  readonly to: readonly string[];
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  readonly replyTo?: string;
}

function readResendConfig():
  { readonly ok: true; readonly config: ResendConfig } | LeadNotificationFailure {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_NOTIFICATION_TO?.trim();
  const from = process.env.LEAD_FROM_EMAIL?.trim();

  if (!apiKey) {
    return {
      ok: false,
      message: 'Lead email delivery is not configured.',
    };
  }

  if (!to) {
    return {
      ok: false,
      message: 'Lead notification recipient is not configured.',
    };
  }

  if (!from) {
    return {
      ok: false,
      message: 'Lead notification sender is not configured.',
    };
  }

  return {
    ok: true,
    config: { apiKey, to, from },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function displayValue(value: string | undefined, fallback = '—'): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function formatLeadType(leadType: LeadRecord['leadType']): string {
  return leadType === 'newsletter' ? 'Newsletter' : 'Contact form';
}

function formatIntent(intent: LeadRecord['intent']): string {
  const match = LEAD_INTENT_OPTIONS.find((option) => option.value === intent);
  return match?.label ?? intent;
}

function greetingName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed || trimmed === 'Newsletter visitor') {
    return 'there';
  }

  return trimmed.split(/\s+/)[0] ?? trimmed;
}

function buildConfirmationShell(
  subject: string,
  eyebrow: string,
  heading: string,
  bodyHtml: string,
  bodyText: string,
): LeadEmailContent {
  const siteUrl = getSiteUrl();

  const text = [bodyText, '', siteUrl, '', '— The Bitcraftly team'].join('\n');

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
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.82;">${escapeHtml(eyebrow)}</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:15px;line-height:1.6;color:#0f172a;">
                ${bodyHtml}
                <p style="margin:24px 0 0;font-size:12px;color:#64748b;">— The Bitcraftly team<br /><a href="${escapeHtml(siteUrl)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ''))}</a></p>
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

function buildLeadConfirmationEmailContent(record: LeadRecord): LeadEmailContent {
  const firstName = greetingName(displayValue(record.name, ''));

  if (record.leadType === 'newsletter') {
    const subject = "You're subscribed — Bitcraftly";
    const bodyText = [
      `Hi ${firstName},`,
      '',
      'Thanks for subscribing to Bitcraftly updates.',
      "You'll hear from us with weekly insights on AI, engineering, automation, and digital growth.",
    ].join('\n');
    const bodyHtml = `<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 16px;">Thanks for subscribing to Bitcraftly updates.</p>
<p style="margin:0;">You'll hear from us with weekly insights on AI, engineering, automation, and digital growth.</p>`;

    return buildConfirmationShell(
      subject,
      'Bitcraftly Newsletter',
      "You're subscribed",
      bodyHtml,
      bodyText,
    );
  }

  const intent = formatIntent(record.intent);
  const whatsappHref = LEAD_FUNNEL_CONFIG.whatsappConsultationHref;
  const subject = 'We received your message — Bitcraftly';
  const bodyText = [
    `Hi ${firstName},`,
    '',
    'Thanks for reaching out to Bitcraftly. We received your message and a founder will reply within one business day.',
    '',
    `Your request: ${intent}`,
    '',
    `For a faster chat, message us on WhatsApp: ${whatsappHref}`,
  ].join('\n');
  const bodyHtml = `<p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 16px;">Thanks for reaching out to Bitcraftly. We received your message and a founder will reply within one business day.</p>
<p style="margin:0 0 16px;"><strong>Your request:</strong> ${escapeHtml(intent)}</p>
<p style="margin:0;">For a faster chat, <a href="${escapeHtml(whatsappHref)}" style="color:#1d4ed8;text-decoration:none;">message us on WhatsApp</a>.</p>`;

  return buildConfirmationShell(
    subject,
    'Bitcraftly Contact',
    'Message received',
    bodyHtml,
    bodyText,
  );
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
  const message = displayValue(record.message, 'No message provided.');
  const website = displayValue(record.website);

  const subject = `New Bitcraftly lead — ${leadType} — ${name}`;

  const text = [
    'New Bitcraftly lead',
    '',
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
    '',
    'Message:',
    message,
    '',
    `Lead ID: ${record.id}`,
  ].join('\n');

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
                  ${renderRow('Lead Type', leadType)}
                  ${renderRow('Name', name)}
                  ${renderRow('Email', email)}
                  ${renderRow('Phone', phone)}
                  ${renderRow('Company', company)}
                  ${renderRow('Intent', intent)}
                  ${renderRow('Source', source)}
                  ${renderRow('Page', page)}
                  ${renderRow('Submitted At', submittedAt)}
                  ${renderRow('Website', website)}
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
  apiKey: string,
  payload: ResendEmailPayload,
  failureMessage: string,
): Promise<ResendDeliveryResult> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      let detail = failureMessage;
      try {
        const responsePayload = (await response.json()) as { message?: string };
        if (responsePayload.message?.trim()) {
          detail = responsePayload.message.trim();
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
      message: failureMessage,
    };
  }
}

export async function sendLeadNotification(record: LeadRecord): Promise<LeadNotificationResult> {
  const configResult = readResendConfig();

  if (!configResult.ok) {
    return configResult;
  }

  const { config } = configResult;
  const teamContent = buildLeadEmailContent(record);
  const teamResult = await postResendEmail(
    config.apiKey,
    {
      from: config.from,
      to: [config.to],
      subject: teamContent.subject,
      html: teamContent.html,
      text: teamContent.text,
      replyTo: record.email,
    },
    'Unable to deliver lead notification email.',
  );

  if (!teamResult.ok) {
    return teamResult;
  }

  const confirmationContent = buildLeadConfirmationEmailContent(record);
  const confirmationResult = await postResendEmail(
    config.apiKey,
    {
      from: config.from,
      to: [record.email],
      subject: confirmationContent.subject,
      html: confirmationContent.html,
      text: confirmationContent.text,
    },
    'Unable to deliver lead confirmation email.',
  );

  return {
    ok: true,
    confirmationSent: confirmationResult.ok,
  };
}

/** @internal Test helper for email content assertions. */
export function buildLeadNotificationEmailForTests(record: LeadRecord): LeadEmailContent {
  return buildLeadEmailContent(record);
}

/** @internal Test helper for confirmation email content assertions. */
export function buildLeadConfirmationEmailForTests(record: LeadRecord): LeadEmailContent {
  return buildLeadConfirmationEmailContent(record);
}

/** @internal Test helper for config validation. */
export function readLeadNotificationConfigForTests(): ReturnType<typeof readResendConfig> {
  return readResendConfig();
}
