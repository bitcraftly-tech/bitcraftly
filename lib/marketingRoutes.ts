/** Marketing site routes — single source for nav and legacy section redirects */

export type HomeHubLink = {
  href: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
  cta?: string;
};

export const MARKETING_NAV = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Websites", href: "/services#websites" },
  { label: "Mobile Apps", href: "/services#mobile-apps" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const HOME_HUB_LINKS: HomeHubLink[] = [
  {
    href: "/pricing",
    title: "Pricing & cost calculator",
    description: "See what your website may cost — packages from ₹8,999 with a step-by-step estimate.",
    icon: "💰",
    featured: true,
    cta: "Get estimate →",
  },
  {
    href: "/services",
    title: "Services",
    description: "Websites, mobile apps, AI integrations, and SEO-ready builds.",
    icon: "✨",
  },
  {
    href: "/about",
    title: "About & process",
    description: "Founder story, why Bitcraftly, and how we deliver projects.",
    icon: "👤",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    description: "Live demos and case studies across industries.",
    icon: "🖼️",
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Common questions on pricing, timelines, and support.",
    icon: "❓",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Free consultation, written scope, and WhatsApp.",
    icon: "📩",
  },
];

/** Legacy `/{section}` paths → dedicated routes */
export const SECTION_REDIRECTS: Record<string, string> = {
  about: "/",
  services: "/services",
  websites: "/services#websites",
  "mobile-apps": "/services#mobile-apps",
  pricing: "/pricing",
  founder: "/about#founder",
  "why-us": "/about#why-us",
  process: "/about#process",
  faq: "/faq",
  "contact-cta": "/contact",
  "how-parking-works": "/about#how-parking-works",
};
