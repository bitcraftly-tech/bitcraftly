export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID?.trim() ?? "";
export const GSC_SITE_URL = process.env.GSC_SITE_URL?.trim() ?? "https://bitcraftly.com/";
export const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ?? "";

export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID?.trim() ?? "";
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL?.trim() ?? "";
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? "";

export const ANALYTICS_LEAD_NOTIFY_EMAIL =
  process.env.ANALYTICS_LEAD_NOTIFY_EMAIL?.trim() ?? "hello@bitcraftly.com";
export const ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK =
  process.env.ANALYTICS_LEAD_NOTIFY_WHATSAPP_WEBHOOK?.trim() ?? "";

export const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY?.trim() ?? "";

export function isGa4ApiConfigured(): boolean {
  return Boolean(GA4_PROPERTY_ID && GOOGLE_SERVICE_ACCOUNT_JSON);
}

export function isGscApiConfigured(): boolean {
  return Boolean(GSC_SITE_URL && GOOGLE_SERVICE_ACCOUNT_JSON);
}

export function isFirebaseConfigured(): boolean {
  return Boolean(FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY);
}

export function isPageSpeedConfigured(): boolean {
  return Boolean(PAGESPEED_API_KEY);
}

export function parseServiceAccountJson(): Record<string, unknown> | null {
  if (!GOOGLE_SERVICE_ACCOUNT_JSON) return null;
  try {
    return JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function dateRangeToDays(range: string): number {
  switch (range) {
    case "90d":
      return 90;
    case "30d":
      return 30;
    default:
      return 7;
  }
}
