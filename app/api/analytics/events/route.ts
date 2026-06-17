import { NextRequest, NextResponse } from "next/server";

import { createLead, logAnalyticsEvent, recordUniqueVisitor } from "@/lib/analytics-dashboard/firebase";
import { notifyNewLead } from "@/lib/analytics-dashboard/notify";
import type { AnalyticsEventName, LeadType } from "@/lib/analytics-dashboard/types";

const ALLOWED_EVENTS = new Set<string>([
  "page_view",
  "form_submit",
  "whatsapp_click",
  "call_click",
  "email_click",
  "quote_click",
  "pricing_page_visit",
  "services_page_visit",
  "portfolio_view",
  "blog_view",
  "contact_form_start",
  "generate_lead",
  "contact_form_submit",
]);

function eventToLeadType(eventName: string): LeadType {
  switch (eventName) {
    case "form_submit":
    case "contact_form_submit":
    case "generate_lead":
      return "contact_form";
    case "whatsapp_click":
      return "whatsapp";
    case "call_click":
      return "call";
    case "email_click":
      return "email";
    case "quote_click":
      return "quote";
    default:
      return "other";
  }
}

export const runtime = "nodejs";

async function parseBody(req: NextRequest): Promise<Record<string, unknown>> {
  const raw = await req.text();
  if (!raw) return {};
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    const eventName = String(body.eventName ?? "");
    if (!ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ error: "invalid_event" }, { status: 400 });
    }

    const payload = (body.payload as Record<string, string | undefined>) ?? {};
    const pagePath = (body.pagePath as string) ?? payload.page_path;
    const source = (body.source as string) ?? payload.source;

    const sessionId = body.sessionId as string | undefined;

    await logAnalyticsEvent({
      eventName: eventName as AnalyticsEventName,
      source,
      pagePath,
      sessionId,
      payload,
    });

    if (eventName === "page_view") {
      await recordUniqueVisitor(sessionId);
    }

    const isLeadEvent =
      eventName === "form_submit" ||
      eventName === "contact_form_submit" ||
      eventName === "generate_lead";

    if (isLeadEvent) {
      const lead = await createLead({
        type: eventToLeadType(eventName),
        status: "new",
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        businessName: payload.businessName,
        businessType: payload.businessType,
        message: payload.message,
        source: payload.lead_source ?? source,
        pagePath,
        service: payload.service,
        intent: payload.intent,
      });
      await notifyNewLead(lead);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
