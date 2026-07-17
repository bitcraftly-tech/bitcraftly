import {
  WHATSAPP_AUDIT_HREF,
  WHATSAPP_CONSULTATION_HREF,
} from "@/features/homepage/shared/contact-links";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";

/**
 * Lead funnel configuration.
 * Set `NEXT_PUBLIC_CALENDLY_URL` to enable live Calendly booking.
 */
export const LEAD_FUNNEL_CONFIG = {
  calendlyUrl:
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || ""
      : "",
  whatsappConsultationHref: WHATSAPP_CONSULTATION_HREF,
  whatsappAuditHref: WHATSAPP_AUDIT_HREF,
  contactHref: ROUTES.contact,
  auditHref: `${ROUTES.contact}?intent=audit&source=free-audit-cta`,
  bookCallHref: `${ROUTES.contact}?intent=discovery&source=calendly-cta`,
  freeConsultationLabel: NAV_ACTIONS.freeConsultation.label,
  exitIntentStorageKey: "bitcraftly_exit_intent_dismissed",
  stickyCtaStorageKey: "bitcraftly_sticky_cta_dismissed",
} as const;

export const LEAD_INTENT_OPTIONS = [
  { value: "consultation", label: "Free consultation" },
  { value: "audit", label: "Free website audit" },
  { value: "discovery", label: "Discovery / book a call" },
  { value: "quote", label: "Project quote" },
  { value: "general", label: "General enquiry" },
] as const;

export function isCalendlyConfigured(): boolean {
  return LEAD_FUNNEL_CONFIG.calendlyUrl.length > 0;
}
