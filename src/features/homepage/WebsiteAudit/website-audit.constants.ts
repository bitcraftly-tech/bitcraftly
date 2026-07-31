import { ROUTES } from '@/constants/navigation';
import { WHATSAPP_AUDIT_HREF, WHATSAPP_HREF } from '../shared/contact-links';
import type {
  WebsiteAuditAction,
  WebsiteAuditBadge,
  WebsiteAuditCheckItem,
} from './website-audit.types';

export const WEBSITE_AUDIT_SECTION_ID = 'website-audit';
export const WEBSITE_AUDIT_HEADING_ID = 'website-audit-heading';

export const WEBSITE_AUDIT_LABEL = 'Free lead magnet';

export const WEBSITE_AUDIT_HEADING = 'Free Website Audit — speed, mobile UX & lead checklist';

export const WEBSITE_AUDIT_DESCRIPTION =
  "Share your current site URL (or idea). We send a practical checklist: what's slowing you down, what's hurting mobile conversions, and 3 quick wins — no obligation to buy.";

export const WEBSITE_AUDIT_BADGES: readonly WebsiteAuditBadge[] = [
  { id: 'free', label: 'FREE' },
  { id: 'no-obligation', label: 'No Obligation' },
  { id: 'two-min', label: '2-Min Review' },
] as const;

/** Sourced from https://bitcraftly.com/ free audit section. */
export const WEBSITE_AUDIT_CHECKS: readonly WebsiteAuditCheckItem[] = [
  { id: 'mobile-speed', label: 'Mobile & speed snapshot' },
  { id: 'lead-cta', label: 'Lead/CTA placement notes' },
  { id: 'react-vs-rebuild', label: 'React vs rebuild recommendation' },
  { id: 'seo', label: 'SEO structure basics' },
  { id: 'whatsapp-path', label: 'WhatsApp enquiry path review' },
] as const;

export { WHATSAPP_HREF };

export const WEBSITE_AUDIT_ACTIONS: readonly WebsiteAuditAction[] = [
  {
    id: 'request-audit',
    label: 'Request Free Audit',
    href: `${ROUTES.contact}?intent=audit&source=audit-magnet`,
    variant: 'primary',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Audit Request',
    href: WHATSAPP_AUDIT_HREF,
    variant: 'outline',
  },
] as const;
