import type { NavFeaturedCard, NavGroup, NavLinkItem } from "./nav.types";

const WORK_BASE = "/work";

export const WORK_GROUPS = [
  {
    id: "featured",
    title: "Featured",
    items: [
      {
        slug: "featured-projects",
        label: "Featured Projects",
        description: "Highlighted deliveries across products and AI.",
        icon: "star",
        href: `${WORK_BASE}/featured-projects`,
      },
      {
        slug: "latest",
        label: "Latest Work",
        description: "Recently shipped websites, apps, and platforms.",
        icon: "sparkles",
        href: `${WORK_BASE}/latest`,
      },
      {
        slug: "enterprise",
        label: "Enterprise Projects",
        description: "Complex systems for regulated and global teams.",
        icon: "shield",
        href: `${WORK_BASE}/enterprise`,
      },
    ],
  },
  {
    id: "case-studies",
    title: "Case Studies",
    items: [
      {
        slug: "healthcare",
        label: "Healthcare",
        description: "Compliant digital products for care teams.",
        icon: "shield",
        href: `${WORK_BASE}/healthcare`,
      },
      {
        slug: "education",
        label: "Education",
        description: "Learning platforms and student experiences.",
        icon: "message",
        href: `${WORK_BASE}/education`,
      },
      {
        slug: "fintech",
        label: "FinTech",
        description: "Payments, lending, and wealth platforms.",
        icon: "trending-up",
        href: `${WORK_BASE}/fintech`,
      },
      {
        slug: "retail",
        label: "Retail",
        description: "Storefronts and commerce operations.",
        icon: "sparkles",
        href: `${WORK_BASE}/retail`,
      },
      {
        slug: "logistics",
        label: "Logistics",
        description: "Tracking, fulfillment, and supply chain.",
        icon: "workflow",
        href: `${WORK_BASE}/logistics`,
      },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    items: [
      {
        slug: "websites",
        label: "Websites",
        description: "Marketing and product websites that convert.",
        icon: "globe",
        href: `${WORK_BASE}/websites`,
      },
      {
        slug: "web-applications",
        label: "Web Applications",
        description: "Dashboards, portals, and SaaS products.",
        icon: "code",
        href: `${WORK_BASE}/web-applications`,
      },
      {
        slug: "mobile-apps",
        label: "Mobile Apps",
        description: "Native and cross-platform mobile products.",
        icon: "rocket",
        href: `${WORK_BASE}/mobile-apps`,
      },
      {
        slug: "ai-solutions",
        label: "AI Solutions",
        description: "Assistants, automation, and AI products.",
        icon: "brain",
        href: `${WORK_BASE}/ai-solutions`,
      },
    ],
  },
  {
    id: "results",
    title: "Results",
    items: [
      {
        slug: "success-stories",
        label: "Client Success Stories",
        description: "Outcomes from long-term partnerships.",
        icon: "star",
        href: `${WORK_BASE}/success-stories`,
      },
      {
        slug: "testimonials",
        label: "Testimonials",
        description: "What teams say about working with us.",
        icon: "quote",
        href: `${WORK_BASE}/testimonials`,
      },
      {
        slug: "outcomes",
        label: "Business Outcomes",
        description: "Measurable impact across delivery programs.",
        icon: "trending-up",
        href: `${WORK_BASE}/outcomes`,
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_WORK_LINKS: readonly NavLinkItem[] = WORK_GROUPS.flatMap(
  (group) => [...group.items],
);

export const WORK_CATEGORY_SLUGS = ALL_WORK_LINKS.map((item) => item.slug);

/** Hub pages under /work that are not only leaf category items. */
export const WORK_HUB_ROUTES = [
  {
    slug: "case-studies",
    label: "Case Studies",
    description: "In-depth stories of delivery, impact, and partnership.",
    href: `${WORK_BASE}/case-studies`,
  },
  {
    slug: "portfolio",
    label: "Portfolio",
    description: "Browse websites, apps, and AI solutions by category.",
    href: `${WORK_BASE}/portfolio`,
  },
  {
    slug: "featured-projects",
    label: "Featured Projects",
    description: "Selected projects that represent our best work.",
    href: `${WORK_BASE}/featured-projects`,
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    description: "Client feedback across industries and engagements.",
    href: `${WORK_BASE}/testimonials`,
  },
] as const;

export function getWorkLinkBySlug(slug: string): NavLinkItem | undefined {
  return ALL_WORK_LINKS.find((item) => item.slug === slug);
}

export function getWorkHref(slug: string): string {
  const match = getWorkLinkBySlug(slug);
  if (match) {
    return match.href ?? `${WORK_BASE}/${slug}`;
  }

  const hub = WORK_HUB_ROUTES.find((item) => item.slug === slug);
  return hub?.href ?? `${WORK_BASE}/${slug}`;
}

export function getWorkPageBySlug(slug: string): {
  slug: string;
  label: string;
  description: string;
  href: string;
} | undefined {
  const link = getWorkLinkBySlug(slug);
  if (link) {
    return {
      slug: link.slug,
      label: link.label,
      description: link.description,
      href: link.href ?? `${WORK_BASE}/${link.slug}`,
    };
  }

  const hub = WORK_HUB_ROUTES.find((item) => item.slug === slug);
  if (hub) {
    return {
      slug: hub.slug,
      label: hub.label,
      description: hub.description,
      href: hub.href,
    };
  }

  return undefined;
}

export const WORK_STATIC_SLUGS = Array.from(
  new Set([
    ...WORK_CATEGORY_SLUGS,
    ...WORK_HUB_ROUTES.map((hub) => hub.slug),
  ]),
);

export const WORK_FEATURED: NavFeaturedCard = {
  eyebrow: "Featured",
  label: "Enterprise Digital Products",
  description:
    "Explore how Bitcraftly helps businesses build modern websites, AI solutions, SaaS platforms, and enterprise software.",
  href: WORK_BASE,
  icon: "rocket",
  ctaLabel: "View All Work",
  badge: "Showcase",
  highlights: [
    "Websites & web apps",
    "AI solutions",
    "SaaS platforms",
    "Enterprise software",
  ],
};

/** Landing page section architecture for /work. */
export const WORK_PAGE_SECTIONS = [
  {
    id: "hero",
    title: "Hero",
    description: "Introduce Bitcraftly work, outcomes, and proof.",
  },
  {
    id: "featured-projects",
    title: "Featured Projects",
    description: "Highlight flagship deliveries across products and AI.",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Deep-dive stories by industry and problem space.",
  },
  {
    id: "success-stories",
    title: "Success Stories",
    description: "Client journeys and long-term partnership outcomes.",
  },
  {
    id: "portfolio-gallery",
    title: "Portfolio Gallery",
    description: "Visual gallery of websites, apps, and platforms.",
  },
  {
    id: "industries-served",
    title: "Industries Served",
    description: "Where Bitcraftly ships work most often.",
  },
  {
    id: "technologies-used",
    title: "Technologies Used",
    description: "Stack and platforms behind delivered systems.",
  },
  {
    id: "client-testimonials",
    title: "Client Testimonials",
    description: "Quotes and feedback from product and business leaders.",
  },
  {
    id: "business-results",
    title: "Business Results",
    description: "Metrics and outcomes from shipped engagements.",
  },
  {
    id: "awards-recognition",
    title: "Awards & Recognition",
    description: "Recognition for product quality and delivery excellence.",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Common questions about our work and engagement model.",
  },
  {
    id: "final-cta",
    title: "Final CTA",
    description: "Invite visitors to book a consultation.",
  },
] as const;

/**
 * Maps service slugs to related Work destinations for internal linking.
 */
export const SERVICE_RELATED_WORK: Record<string, readonly string[]> = {
  "website-development": [`${WORK_BASE}/websites`, `${WORK_BASE}/portfolio`],
  "web-application-development": [
    `${WORK_BASE}/web-applications`,
    `${WORK_BASE}/portfolio`,
  ],
  "mobile-app-development": [`${WORK_BASE}/mobile-apps`, `${WORK_BASE}/portfolio`],
  "ai-solutions": [`${WORK_BASE}/ai-solutions`, `${WORK_BASE}/featured-projects`],
  "ai-chatbots": [`${WORK_BASE}/ai-solutions`],
  "ai-automation": [`${WORK_BASE}/ai-solutions`],
  "ai-agents": [`${WORK_BASE}/ai-solutions`],
  "custom-software-development": [
    `${WORK_BASE}/enterprise`,
    `${WORK_BASE}/web-applications`,
  ],
  "cloud-devops": [`${WORK_BASE}/enterprise`, `${WORK_BASE}/outcomes`],
};

/**
 * Maps work category slugs to related service destinations.
 */
export const WORK_RELATED_SERVICES: Record<string, readonly string[]> = {
  websites: ["/services/website-development"],
  "web-applications": ["/services/web-application-development"],
  "mobile-apps": ["/services/mobile-app-development"],
  "ai-solutions": ["/services/ai-solutions", "/services/ai-automation"],
  healthcare: ["/industries/healthcare", "/services/custom-software-development"],
  education: ["/industries/education"],
  fintech: ["/industries/fintech"],
  retail: ["/industries/retail-ecommerce"],
  logistics: ["/industries/logistics"],
  enterprise: ["/services/custom-software-development", "/solutions/enterprise-portals"],
};

export function getRelatedWorkForService(serviceSlug: string): readonly string[] {
  return SERVICE_RELATED_WORK[serviceSlug] ?? [WORK_BASE];
}

export function getRelatedServicesForWork(
  workSlug: string,
): readonly string[] {
  return WORK_RELATED_SERVICES[workSlug] ?? ["/services"];
}
