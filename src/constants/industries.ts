import type { NavFeaturedCard, NavGroup, NavLinkItem } from "./nav.types";

const INDUSTRIES_BASE = "/industries";

export const INDUSTRY_GROUPS = [
  {
    id: "industries",
    title: "Industries",
    items: [
      {
        slug: "healthcare",
        label: "Healthcare",
        description: "Secure, compliant products for care teams.",
        icon: "shield",
      },
      {
        slug: "education",
        label: "Education",
        description: "Learning platforms and student experiences.",
        icon: "message",
      },
      {
        slug: "fintech",
        label: "FinTech",
        description: "Payments, lending, and wealth platforms.",
        icon: "trending-up",
      },
      {
        slug: "retail-ecommerce",
        label: "Retail & Ecommerce",
        description: "Storefronts and commerce operations.",
        icon: "sparkles",
      },
      {
        slug: "logistics",
        label: "Logistics",
        description: "Tracking, fulfillment, and supply chain.",
        icon: "workflow",
      },
      {
        slug: "manufacturing",
        label: "Manufacturing",
        description: "Production visibility and plant software.",
        icon: "database",
      },
      {
        slug: "real-estate",
        label: "Real Estate",
        description: "Property platforms and digital experiences.",
        icon: "globe",
      },
      {
        slug: "travel",
        label: "Travel",
        description: "Booking, operations, and traveler products.",
        icon: "rocket",
      },
      {
        slug: "startups",
        label: "Startups",
        description: "MVP to scale with product and AI engineering.",
        icon: "zap",
      },
      {
        slug: "enterprise",
        label: "Enterprise",
        description: "Secure systems for complex organizations.",
        icon: "shield",
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_INDUSTRIES: readonly NavLinkItem[] = INDUSTRY_GROUPS.flatMap(
  (group) => [...group.items],
);

export const INDUSTRY_SLUGS = ALL_INDUSTRIES.map((industry) => industry.slug);

export function getIndustryBySlug(slug: string): NavLinkItem | undefined {
  return ALL_INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryHref(slug: string): string {
  return `${INDUSTRIES_BASE}/${slug}`;
}

export const INDUSTRIES_FEATURED: NavFeaturedCard = {
  eyebrow: "Featured",
  label: "Industry Expertise",
  description: "Domain-aware delivery across regulated and growth markets.",
  href: INDUSTRIES_BASE,
  icon: "star",
  ctaLabel: "Learn More",
  badge: "Expertise",
  highlights: [
    "Healthcare & FinTech",
    "Retail & Logistics",
    "Startups to Enterprise",
    "Compliant delivery",
  ],
};
