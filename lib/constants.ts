import { BRAND, FOUNDER } from "@/lib/siteContent";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

export const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-12";

/** Support / footer — reused by chat fallback & stub assistant */
export const SUPPORT_PHONE_DISPLAY = "+91 96677 10954";
export const SUPPORT_EMAIL = "hello@bitcraftly.com";
export const SUPPORT_WHATSAPP_E164 = "919667710954";

export const PRIMARY_LOCATION = BRAND.location;
export const WHATSAPP_HOURS = BRAND.whatsappHours;
export const WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_MESSAGES.default;

/** Override via `NEXT_PUBLIC_FOUNDER_LINKEDIN_URL` in .env.local */
export const FOUNDER_LINKEDIN_URL =
  process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN_URL ?? FOUNDER.linkedIn;

/** WhatsApp deep link with optional custom message */
export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${SUPPORT_WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}
