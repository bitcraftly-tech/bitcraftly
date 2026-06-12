import {
  ANALYTICS_LEAD_NOTIFY_EMAIL,
  ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK,
} from "@/lib/analytics-dashboard/config";
import type { AnalyticsLead } from "@/lib/analytics-dashboard/types";

export async function notifyNewLead(lead: AnalyticsLead): Promise<void> {
  const subject = `New Bitcraftly lead — ${lead.type}`;
  const body = [
    `Type: ${lead.type}`,
    lead.name ? `Name: ${lead.name}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.email ? `Email: ${lead.email}` : null,
    lead.businessName ? `Business: ${lead.businessName}` : null,
    lead.source ? `Source: ${lead.source}` : null,
    lead.pagePath ? `Page: ${lead.pagePath}` : null,
    lead.message ? `Message: ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await Promise.allSettled([
    sendEmailNotification(subject, body),
    sendWhatsAppWebhook(body),
  ]);
}

async function sendEmailNotification(subject: string, body: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bitcraftly Analytics <analytics@bitcraftly.com>",
        to: [ANALYTICS_LEAD_NOTIFY_EMAIL],
        subject,
        text: body,
      }),
    });
    return;
  }

  // Fallback: log for ops until Resend/SMTP is configured
  console.info("[analytics-lead-email]", subject, body);
}

async function sendWhatsAppWebhook(body: string): Promise<void> {
  if (!ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK) return;

  await fetch(ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: `New Bitcraftly lead\n\n${body}` }),
  });
}
