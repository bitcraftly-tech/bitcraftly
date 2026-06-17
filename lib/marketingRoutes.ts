/** Marketing site routes — single source for nav and legacy section redirects */

export type HomeHubLink = {
  href: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
  cta?: string;
  step?: number;
};

export type MarketingNavItem = {
  label: string;
  href: string;
  mobileHint: string;
};

/** Top nav — matches typical customer decision order */
export const MARKETING_NAV: readonly MarketingNavItem[] = [
  { label: "Pricing", href: "/pricing", mobileHint: "Packages, compare & cost calculator" },
  { label: "Services", href: "/services", mobileHint: "Websites, apps & AI integrations" },
  { label: "Portfolio", href: "/portfolio", mobileHint: "Live demos & case studies" },
  { label: "About", href: "/about", mobileHint: "Founder, process & why us" },
] as const;

export const HOME_HUB_LINKS: HomeHubLink[] = [
  {
    href: "/pricing",
    title: "Pricing & Cost Calculator",
    description: "See what your website may cost — packages from ₹8,999 with a step-by-step estimate.",
    icon: "🧮",
    featured: true,
    cta: "Get estimate",
  },
  {
    href: "/services",
    title: "Services",
    description: "Websites, mobile apps, AI integrations, and SEO-ready builds.",
    icon: "💻",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    description: "Live demos and case studies across industries.",
    icon: "🖼️",
    cta: "View portfolio",
  },
  {
    href: "/about",
    title: "About & Process",
    description: "Founder story, why Bitcraftly, and how we deliver projects.",
    icon: "👤",
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
    cta: "Get in touch",
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
  "how-parking-works": "/contact?service=Smart%20Parking&intent=demo&source=parking-legacy",
};
