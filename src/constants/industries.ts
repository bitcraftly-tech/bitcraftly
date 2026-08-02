import type { NavFeaturedCard, NavGroup, NavLinkItem } from './nav.types';

const INDUSTRIES_BASE = '/industries';

export const INDUSTRY_GROUPS = [
  {
    id: 'wave-1',
    title: 'Wave 1 Industry Systems',
    items: [
      {
        slug: 'healthcare',
        label: 'Healthcare System',
        description: 'Patient-ready website, ops dashboard, AI intake, and analytics.',
        icon: 'shield',
      },
      {
        slug: 'real-estate',
        label: 'Real Estate System',
        description: 'Listings, lead pipeline, AI assistant, and performance analytics.',
        icon: 'globe',
      },
      {
        slug: 'restaurant',
        label: 'Restaurant System',
        description: 'Brand site, reservations/leads, AI concierge, and ops dashboard.',
        icon: 'sparkles',
      },
      {
        slug: 'corporate-services',
        label: 'Corporate Services System',
        description: 'Authority website, CRM leads, AI assistant, and executive analytics.',
        icon: 'workflow',
      },
    ],
  },
  {
    id: 'more-industries',
    title: 'More industries',
    items: [
      {
        slug: 'education',
        label: 'Education',
        description: 'Learning platforms and student experiences.',
        icon: 'message',
      },
      {
        slug: 'fintech',
        label: 'FinTech',
        description: 'Payments, lending, and wealth platforms.',
        icon: 'trending-up',
      },
      {
        slug: 'retail-ecommerce',
        label: 'Retail & Ecommerce',
        description: 'Storefronts and commerce operations.',
        icon: 'sparkles',
      },
      {
        slug: 'logistics',
        label: 'Logistics',
        description: 'Tracking, fulfillment, and supply chain.',
        icon: 'workflow',
      },
      {
        slug: 'manufacturing',
        label: 'Manufacturing',
        description: 'Production visibility and plant software.',
        icon: 'database',
      },
      {
        slug: 'travel',
        label: 'Travel',
        description: 'Booking, operations, and traveler products.',
        icon: 'rocket',
      },
      {
        slug: 'startups',
        label: 'Startups',
        description: 'MVP to scale with product and AI engineering.',
        icon: 'zap',
      },
      {
        slug: 'saas',
        label: 'SaaS',
        description: 'Multi-tenant products with billing-ready architecture.',
        icon: 'cloud',
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_INDUSTRIES: readonly NavLinkItem[] = INDUSTRY_GROUPS.flatMap((group) => [
  ...group.items,
]);

export const INDUSTRY_SLUGS = ALL_INDUSTRIES.map((industry) => industry.slug);

export const WAVE1_INDUSTRY_SLUGS = [
  'healthcare',
  'real-estate',
  'restaurant',
  'corporate-services',
] as const;

export function getIndustryBySlug(slug: string): NavLinkItem | undefined {
  return ALL_INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryHref(slug: string): string {
  return `${INDUSTRIES_BASE}/${slug}`;
}

export const INDUSTRIES_FEATURED: NavFeaturedCard = {
  eyebrow: 'Wave 1',
  label: 'Industry Systems',
  description:
    'Complete Digital Systems for Healthcare, Real Estate, Restaurant, and Corporate Services.',
  href: INDUSTRIES_BASE,
  icon: 'star',
  ctaLabel: 'Explore Industry Systems',
  badge: 'Systems',
  highlights: [
    'Website + AI + Dashboard',
    'Analytics + Integrations',
    'CMS + Lead Management',
    'Deployment Ready',
  ],
};
