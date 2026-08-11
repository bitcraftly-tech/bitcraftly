import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';

export const PRESS_LANDING_META = {
  title: 'Press',
  description:
    'Media resources, company boilerplate, and press contact for Bitcraftly — AI-Powered Digital Engineering Partner.',
  path: ROUTES.press,
} as const;

export const PRESS_HERO = {
  headingId: 'press-page-heading',
  eyebrow: 'Press',
  title: 'Media resources for Bitcraftly',
  titleHighlight: 'Bitcraftly',
  description:
    'Boilerplate, brand assets, and a direct press contact. For interviews, product stories, or Industry Systems coverage — start here.',
  supporting: 'Founder-led studio shipping Complete Digital Systems for SMBs.',
  primaryCta: {
    label: 'Email press',
    href: 'mailto:hello@bitcraftly.com?subject=Press%20inquiry',
  },
  secondaryCta: {
    label: 'About Bitcraftly',
    href: ROUTES.about,
  },
  trustItems: ['Founder interviews', 'Product demos', 'Case study metrics'],
} as const;

export const PRESS_BOILERPLATE = {
  eyebrow: 'Boilerplate',
  title: 'About Bitcraftly',
  paragraphs: [
    'Bitcraftly is an AI-Powered Digital Engineering Partner based in Noida, India. We help SMBs and operators launch Complete Digital Systems — website, AI, dashboard, analytics, and integrations engineered as one Industry System.',
    'Instead of starting from a blank brief, clients configure a Wave 1 Industry System (Healthcare, Real Estate, Restaurant, or Corporate Services), brand it, and go live with written scope and milestone delivery.',
  ],
} as const;

export const PRESS_FACTS = [
  { label: 'Company', value: 'Bitcraftly Technologies Pvt. Ltd.' },
  { label: 'Founded', value: 'Noida, Uttar Pradesh, India' },
  { label: 'Focus', value: 'Industry Systems · AI delivery' },
  { label: 'Stack', value: 'Next.js · React · TypeScript · FastAPI' },
  { label: 'Press email', value: 'hello@bitcraftly.com' },
  { label: 'Phone', value: '+91 96677 10954' },
] as const;

export const PRESS_ASSETS = [
  {
    id: 'logo',
    title: 'Logo & mark',
    description: 'Primary wordmark and icon for light and dark surfaces.',
    href: '/brand/icon.png',
    ctaLabel: 'Download icon',
  },
  {
    id: 'og',
    title: 'Open Graph image',
    description: 'Default social share artwork used across Bitcraftly.com.',
    href: '/opengraph-image.webp',
    ctaLabel: 'View asset',
  },
  {
    id: 'trust',
    title: 'Trust Center',
    description: 'Public standards and governance summaries for due diligence.',
    href: ROUTES.trust,
    ctaLabel: 'Open Trust Center',
  },
  {
    id: 'work',
    title: 'Work & case studies',
    description: 'Shipped outcomes and portfolio systems for coverage angles.',
    href: ROUTES.work,
    ctaLabel: 'Browse work',
  },
] as const;

export const PRESS_ANGLES = [
  {
    id: 'industry-systems',
    title: 'Industry Systems model',
    description:
      'Why Bitcraftly ships website + AI + dashboard as one product instead of a traditional agency rebuild.',
  },
  {
    id: 'ai-ops',
    title: 'AI inside operations',
    description:
      'Lead qualification, intake, and operator assists wired into the same system — not bolt-on chat widgets.',
  },
  {
    id: 'smb-launch',
    title: 'SMB go-live path',
    description:
      'Configure → brand → launch for Healthcare, Real Estate, Restaurant, and Corporate Services.',
  },
] as const;

export const PRESS_CTA = {
  heading: 'Need a quote, demo, or interview?',
  description:
    'Email the press desk with your deadline and angle — we respond with founder availability and product access.',
  primaryCta: {
    label: 'Email hello@bitcraftly.com',
    href: 'mailto:hello@bitcraftly.com?subject=Press%20inquiry',
  },
  tertiaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=press`,
  },
  trust: ['Same-day reply on deadlines', 'Demo-ready environments', 'Written metrics available'],
} as const;
