import { BRAND, FOUNDER } from "@/lib/siteContent";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

export const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12";

/** Page shell — flex column, full viewport min-height, sticky footer layout */
export const PAGE_SHELL =
  "flex min-h-dvh w-full min-w-0 flex-1 flex-col bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary";

/** Main content region */
export const PAGE_MAIN = "flex min-w-0 w-full flex-1 flex-col";

export const SECTION_PY = "py-8 md:py-12";
export const SECTION_PY_COMPACT = "py-6 md:py-8";
export const SECTION_PY_CTA = "py-12 md:py-16";
export const SECTION_SCROLL_MT = "scroll-mt-24";

/** Accessible focus ring — reuse on interactive controls */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary";

/** Minimum 44×44px touch target (WCAG 2.5.5) */
export const TOUCH_TARGET = "inline-flex min-h-11 min-w-11 items-center justify-center";

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
