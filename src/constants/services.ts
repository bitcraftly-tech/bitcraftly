import type { NavFeaturedCard, NavGroup, NavLinkItem } from "./nav.types";

const SERVICES_BASE = "/services";

export const SERVICE_GROUPS = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    items: [
      {
        slug: "ai-solutions",
        label: "AI Solutions",
        description: "Intelligent products and AI engineering.",
        icon: "brain",
      },
      {
        slug: "ai-chatbots",
        label: "AI Chatbots",
        description: "Conversational assistants for support and sales.",
        icon: "bot",
      },
      {
        slug: "ai-automation",
        label: "AI Automation",
        description: "Automate repetitive workflows with AI.",
        icon: "zap",
      },
      {
        slug: "ai-agents",
        label: "AI Agents",
        description: "Autonomous agents for complex operations.",
        icon: "sparkles",
      },
      {
        slug: "llm-integration",
        label: "LLM Integration",
        description: "OpenAI, Gemini, and custom model wiring.",
        icon: "workflow",
      },
      {
        slug: "document-ai",
        label: "Document AI",
        description: "Extract, classify, and process documents.",
        icon: "quote",
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      {
        slug: "website-development",
        label: "Website Development",
        description: "Marketing and product websites that convert.",
        icon: "globe",
      },
      {
        slug: "web-application-development",
        label: "Web Application Development",
        description: "Web apps, dashboards, and portals.",
        icon: "code",
      },
      {
        slug: "mobile-app-development",
        label: "Mobile App Development",
        description: "Native and cross-platform mobile apps.",
        icon: "rocket",
      },
      {
        slug: "custom-software-development",
        label: "Custom Software Development",
        description: "Software tailored to your operations.",
        icon: "database",
      },
      {
        slug: "cloud-devops",
        label: "Cloud & DevOps",
        description: "Cloud architecture, CI/CD, reliability.",
        icon: "cloud",
      },
      {
        slug: "api-integration",
        label: "API Integration",
        description: "Reliable APIs and system integrations.",
        icon: "workflow",
      },
    ],
  },
  {
    id: "digital-growth",
    title: "Digital Growth",
    items: [
      {
        slug: "ui-ux-design",
        label: "UI/UX Design",
        description: "Product design systems and experiences.",
        icon: "sparkles",
      },
      {
        slug: "technical-seo",
        label: "Technical SEO",
        description: "Crawlability, structure, and search performance.",
        icon: "trending-up",
      },
      {
        slug: "performance-optimization",
        label: "Performance Optimization",
        description: "Speed, Core Web Vitals, and scale.",
        icon: "zap",
      },
      {
        slug: "analytics-dashboard",
        label: "Analytics Dashboard",
        description: "Decision-ready product and business analytics.",
        icon: "trending-up",
      },
      {
        slug: "website-maintenance",
        label: "Website Maintenance",
        description: "Ongoing care, updates, and reliability.",
        icon: "shield",
      },
      {
        slug: "security-monitoring",
        label: "Security & Monitoring",
        description: "Hardening, monitoring, and incident readiness.",
        icon: "shield",
      },
    ],
  },
] as const satisfies readonly NavGroup[];

export const ALL_SERVICES: readonly NavLinkItem[] = SERVICE_GROUPS.flatMap(
  (group) => [...group.items],
);

export const SERVICE_SLUGS = ALL_SERVICES.map((service) => service.slug);

export function getServiceBySlug(slug: string): NavLinkItem | undefined {
  return ALL_SERVICES.find((service) => service.slug === slug);
}

export function getServiceHref(slug: string): string {
  return `${SERVICES_BASE}/${slug}`;
}

export const SERVICES_FEATURED: NavFeaturedCard = {
  eyebrow: "Featured Service",
  label: "Enterprise AI Engineering",
  description: "Build intelligent products and automate workflows with AI.",
  href: getServiceHref("ai-solutions"),
  icon: "brain",
  ctaLabel: "Learn More",
  badge: "Popular",
  highlights: [
    "AI Chatbots",
    "Workflow Automation",
    "CRM Integration",
    "OpenAI / Gemini",
    "AI Agents",
  ],
};
