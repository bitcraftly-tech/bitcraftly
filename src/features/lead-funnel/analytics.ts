export type LeadAnalyticsEvent =
  | "form_view"
  | "form_submit_success"
  | "form_submit_error"
  | "whatsapp_click"
  | "calendly_click"
  | "audit_cta_click"
  | "exit_intent_shown"
  | "exit_intent_cta_click"
  | "exit_intent_dismiss"
  | "sticky_cta_shown"
  | "sticky_cta_click"
  | "sticky_cta_dismiss";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Conversion-tracking bridge for the lead funnel.
 * Pushes to `window.dataLayer` when GTM/GA is present — no vendor lock-in.
 */
export function trackLeadEvent(
  event: LeadAnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") {
    return;
  }

  const entry = {
    event: `lead_funnel_${event}`,
    funnel: "lead_generation",
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(entry);
}
