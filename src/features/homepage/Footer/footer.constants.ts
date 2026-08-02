import { ROUTES } from '@/constants/navigation';
import { getIndustryHref } from '@/constants/industries';
import type {
  FooterBrandCopy,
  FooterContactItem,
  FooterNavColumn,
  FooterSocialLink,
} from './footer.types';

export const FOOTER_ID = 'footer';

export const FOOTER_BRAND: FooterBrandCopy = {
  description:
    'Complete Digital Systems for your industry — website, AI, dashboard, analytics, and integrations.',
};

/** Order: LinkedIn, Instagram, YouTube, Twitter/X, Facebook */
export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  {
    id: 'linkedin',
    label: 'Bitcraftly on LinkedIn',
    href: 'https://www.linkedin.com/company/bitcraftly',
    icon: 'linkedin',
  },
  {
    id: 'instagram',
    label: 'Bitcraftly on Instagram',
    href: 'https://www.instagram.com/bitcraftly',
    icon: 'instagram',
  },
  {
    id: 'youtube',
    label: 'Bitcraftly on YouTube',
    href: 'https://www.youtube.com/@bitcraftly',
    icon: 'youtube',
  },
  {
    id: 'twitter',
    label: 'Bitcraftly on Twitter',
    href: 'https://x.com/bitcraftly',
    icon: 'x',
  },
  {
    id: 'facebook',
    label: 'Bitcraftly on Facebook',
    href: 'https://www.facebook.com/bitcraftly',
    icon: 'facebook',
  },
];

/** Footer mirrors frozen IA: Industry Systems → Explore → Resources → Company */
export const FOOTER_NAV_COLUMNS: readonly FooterNavColumn[] = [
  {
    id: 'industries',
    title: 'Industry Systems',
    links: [
      { label: 'Healthcare System', href: getIndustryHref('healthcare') },
      { label: 'Real Estate System', href: getIndustryHref('real-estate') },
      { label: 'Restaurant System', href: getIndustryHref('restaurant') },
      {
        label: 'Corporate Services System',
        href: getIndustryHref('corporate-services'),
      },
      { label: 'Explore all industries', href: ROUTES.industries },
    ],
  },
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { label: 'Solutions', href: ROUTES.solutions },
      { label: 'AI', href: ROUTES.assistant },
      { label: 'Work', href: ROUTES.work },
      { label: 'Pricing', href: ROUTES.pricing },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      { label: 'Blog', href: ROUTES.blog },
      { label: 'Case Studies', href: ROUTES.caseStudies },
      { label: 'Documentation', href: `${ROUTES.resources}/documentation` },
      { label: 'Guides', href: `${ROUTES.resources}/guides` },
      { label: 'FAQ', href: ROUTES.resourcesFaq },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About', href: ROUTES.about },
      { label: 'Careers', href: ROUTES.careers },
      { label: 'Contact', href: ROUTES.contact },
      { label: 'Book Strategy Call', href: `${ROUTES.contact}?intent=strategy` },
    ],
  },
];

/** Industry Systems / Explore / Resources — middle grid columns */
export const FOOTER_LINK_COLUMNS: readonly FooterNavColumn[] = [
  FOOTER_NAV_COLUMNS[0],
  FOOTER_NAV_COLUMNS[1],
  FOOTER_NAV_COLUMNS[2],
];

export const FOOTER_COMPANY_COLUMN: FooterNavColumn = FOOTER_NAV_COLUMNS[3];
export const FOOTER_CONTACT_ITEMS: readonly FooterContactItem[] = [
  {
    id: 'phone',
    label: '+91 96677 10954',
    href: 'tel:+919667710954',
    icon: 'phone',
  },
  {
    id: 'email',
    label: 'hello@bitcraftly.com',
    href: 'mailto:hello@bitcraftly.com',
    icon: 'mail',
  },
  {
    id: 'location',
    label: 'Noida, Uttar Pradesh, India',
    href: 'https://maps.google.com/?q=Noida,+Uttar+Pradesh,+India',
    icon: 'map-pin',
    external: true,
  },
];

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} Bitcraftly Technologies Pvt. Ltd. All rights reserved.`;

/** Trust Center row — matches https://bitcraftly.com/ footer (Cookies opens prefs). */
export const FOOTER_TRUST_LINKS = [
  { id: 'trust', label: 'Trust Center', href: ROUTES.trust, kind: 'link' as const },
  { id: 'privacy', label: 'Privacy', href: ROUTES.privacy, kind: 'link' as const },
  { id: 'terms', label: 'Terms', href: ROUTES.terms, kind: 'link' as const },
  { id: 'cookies', label: 'Cookies', href: '#cookies', kind: 'cookies' as const },
] as const;
