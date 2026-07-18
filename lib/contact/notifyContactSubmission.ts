import "server-only";

import { ANALYTICS_LEAD_NOTIFY_EMAIL } from "@/lib/analytics-dashboard/config";
import { createLead } from "@/lib/analytics-dashboard/firebase";
import { notifyNewLead } from "@/lib/analytics-dashboard/notify";
import type { ContactCreateInput } from "@/lib/contact/contactValidation";

/**
 * Last-resort persistence when FastAPI/Supabase are unavailable:
 * write to Firestore analytics leads (if configured) and/or email ops.
 * Returns an id when at least one channel succeeds.
 */
export async function persistContactFallback(
  input: ContactCreateInput,
): Promise<{ id: string; channel: "firestore" | "email" } | null> {
  let firestoreId: string | null = null;

  try {
    const lead = await createLead({
      type: "contact_form",
      status: "new",
      name: input.name,
      email: input.email ?? undefined,
      phone: input.phone,
      businessName: input.business_name,
      businessType: input.business_type,
      message: input.message ?? undefined,
      source: input.source ?? "contact",
      pagePath: "/contact",
    });

    // createLead returns a local stub when Firebase is not configured.
    if (!lead.id.startsWith("local-")) {
      firestoreId = lead.id;
      await notifyNewLead(lead).catch(() => undefined);
    }
  } catch (error) {
    console.error(
      "contact_fallback_firestore_failed",
      error instanceof Error ? error.message : "unknown",
    );
  }

  if (firestoreId) {
    return { id: firestoreId, channel: "firestore" };
  }

  const emailed = await sendContactEmailFallback(input);
  if (emailed) {
    return { id: `email-${Date.now()}`, channel: "email" };
  }

  return null;
}

async function sendContactEmailFallback(input: ContactCreateInput): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const subject = `New contact form — ${input.name}`;
  const body = [
    `Name: ${input.name}`,
    `Business: ${input.business_name}`,
    `Type: ${input.business_type}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : null,
    input.source ? `Source: ${input.source}` : null,
    input.message ? `Message:\n${input.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!resendKey) {
    console.info("[contact-email-fallback]", subject, body);
    // Without Resend we cannot guarantee delivery — treat as failure.
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bitcraftly Contact <noreply@bitcraftly.com>",
        to: [ANALYTICS_LEAD_NOTIFY_EMAIL],
        subject,
        text: body,
      }),
    });
    if (!response.ok) {
      console.error("contact_fallback_email_failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      "contact_fallback_email_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return false;
  }
}
