import { ROUTES } from '@/constants/navigation';
import { WHATSAPP_CONSULTATION_HREF } from '../shared/contact-links';

export const FINAL_CTA_SECTION_ID = 'final-cta';
export const FINAL_CTA_HEADING_ID = 'final-cta-heading';

export const FINAL_CTA_HEADING =
  "Let's build a modern, fast, AI-powered website for your business.";

export const FINAL_CTA_DESCRIPTION =
  'WhatsApp par quick sawal — ya free consultation book karo. Scope, timeline, aur written estimate clear milega.';

export const FINAL_CTA_PRIMARY = {
  label: 'Book Free Consultation',
  href: `${ROUTES.contact}?intent=consultation&source=bottom-cta`,
} as const;

export const FINAL_CTA_SECONDARY = {
  label: 'Message on WhatsApp',
  href: WHATSAPP_CONSULTATION_HREF,
} as const;
