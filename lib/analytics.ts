import { IS_STAGING, isStagingHost } from "@/lib/appEnv";

/** GA4 measurement ID — set `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXX` on production */
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() ?? "";

/** Google Search Console HTML tag verification content value */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() ?? "";

export type WhatsAppClickParams = {
  source: string;
  pagePath?: string;
  messageKey?: string;
};

export type ContactFormSubmitParams = {
  pageMode: string;
  intent?: string;
  service?: string;
  leadSource?: string;
  businessType?: string;
};

export type ContactFormStartParams = {
  pageMode: string;
  intent?: string;
  service?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function analyticsDebugEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
}

/** Server / build-time gate — production only unless debug flag is on */
export function isAnalyticsEnabled(): boolean {
  if (!GA4_MEASUREMENT_ID) return false;
  if (IS_STAGING) return false;
  if (process.env.NODE_ENV === "development" && !analyticsDebugEnabled()) return false;
  return true;
}

/** Client runtime gate — also blocks staging hostnames on custom domains */
export function isAnalyticsEnabledClient(): boolean {
  if (!GA4_MEASUREMENT_ID) return false;
  if (typeof window !== "undefined" && isStagingHost(window.location.hostname)) return false;
  if (IS_STAGING) return false;
  if (process.env.NODE_ENV === "development" && !analyticsDebugEnabled()) return false;
  return true;
}

function gtag(...args: unknown[]): void {
  if (!isAnalyticsEnabledClient()) return;
  window.gtag?.(...args);
}

export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabledClient()) return;
  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean | undefined>): void {
  if (!isAnalyticsEnabledClient()) return;
  const cleaned = params
    ? Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ""))
    : undefined;
  gtag("event", eventName, cleaned);
}

/** WhatsApp CTA click — use `data-wa-source` on links or pass source explicitly */
export function trackWhatsAppClick({ source, pagePath, messageKey }: WhatsAppClickParams): void {
  trackEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: source,
    source,
    page_path: pagePath ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
    message_key: messageKey,
  });
}

export function trackContactFormStart({ pageMode, intent, service }: ContactFormStartParams): void {
  trackEvent("contact_form_start", {
    event_category: "lead",
    page_mode: pageMode,
    intent,
    service,
  });
}

/** Successful contact form submission — maps to GA4 `generate_lead` */
export function trackContactFormSubmit({
  pageMode,
  intent,
  service,
  leadSource,
  businessType,
}: ContactFormSubmitParams): void {
  trackEvent("generate_lead", {
    event_category: "lead",
    currency: "INR",
    value: 0,
    page_mode: pageMode,
    intent,
    service,
    lead_source: leadSource,
    business_type: businessType,
  });
  trackEvent("contact_form_submit", {
    event_category: "lead",
    page_mode: pageMode,
    intent,
    service,
    lead_source: leadSource,
    business_type: businessType,
  });
}

export function isGa4Configured(): boolean {
  return Boolean(GA4_MEASUREMENT_ID);
}

export function isGscConfigured(): boolean {
  return Boolean(GSC_VERIFICATION);
}
