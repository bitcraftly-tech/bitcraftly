/** Standard cookie consent record stored in `bc_cookie_consent`. */

export const COOKIE_CONSENT_NAME = "bc_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
const COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export type CookieConsentStatus = "accepted" | "rejected" | "custom";

export type CookieConsentRecord = {
  /** Policy version — bump when categories or copy change materially */
  v: number;
  status: CookieConsentStatus;
  /** ISO timestamp when the user made their choice */
  ts: string;
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  locale: string;
};

export type CookieConsentInput = {
  status: CookieConsentStatus;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
};

function isSecureContext(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

function readRawCookie(): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${COOKIE_CONSENT_NAME}=`;
  const match = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  if (!match) return null;
  return decodeURIComponent(match.slice(prefix.length));
}

function writeRawCookie(value: string): void {
  if (typeof document === "undefined") return;
  const secure = isSecureContext() ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function normalizeRecord(parsed: Partial<CookieConsentRecord>): CookieConsentRecord | null {
  if (parsed.v !== COOKIE_CONSENT_VERSION) return null;
  if (parsed.status !== "accepted" && parsed.status !== "rejected" && parsed.status !== "custom") return null;
  if (typeof parsed.ts !== "string" || !parsed.ts) return null;

  return {
    v: COOKIE_CONSENT_VERSION,
    status: parsed.status,
    ts: parsed.ts,
    necessary: true,
    analytics: Boolean(parsed.analytics),
    preferences: Boolean(parsed.preferences),
    marketing: Boolean(parsed.marketing),
    locale: typeof parsed.locale === "string" ? parsed.locale : "en",
  };
}

export function readCookieConsent(): CookieConsentRecord | null {
  try {
    const raw = readRawCookie();
    if (!raw) return null;
    return normalizeRecord(JSON.parse(raw) as Partial<CookieConsentRecord>);
  } catch {
    return null;
  }
}

export function writeCookieConsent(input: CookieConsentInput): CookieConsentRecord {
  const record: CookieConsentRecord = {
    v: COOKIE_CONSENT_VERSION,
    status: input.status,
    ts: new Date().toISOString(),
    necessary: true,
    analytics: input.analytics,
    preferences: input.preferences,
    marketing: input.marketing,
    locale: typeof navigator !== "undefined" ? navigator.language || "en" : "en",
  };

  writeRawCookie(JSON.stringify(record));
  return record;
}

export function acceptAllCookies(): CookieConsentRecord {
  return writeCookieConsent({
    status: "accepted",
    analytics: true,
    preferences: true,
    marketing: false,
  });
}

export function rejectOptionalCookies(): CookieConsentRecord {
  return writeCookieConsent({
    status: "rejected",
    analytics: false,
    preferences: false,
    marketing: false,
  });
}

export function isAnalyticsConsented(consent: CookieConsentRecord | null | undefined): boolean {
  return Boolean(consent?.analytics);
}

export function isPreferencesConsented(consent: CookieConsentRecord | null | undefined): boolean {
  return Boolean(consent?.preferences);
}

export function hasCookieConsentChoice(): boolean {
  return readCookieConsent() !== null;
}

export function clearCookieConsent(): void {
  if (typeof document === "undefined") return;
  const secure = isSecureContext() ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}
