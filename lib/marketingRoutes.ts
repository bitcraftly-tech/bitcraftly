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

/** Main header — conversion-focused (3 items only) */
export const MARKETING_NAV: readonly MarketingNavItem[] = [
  { label: "Services", href: "/services", mobileHint: "Websites, web apps, mobile & AI" },
  { label: "Portfolio", href: "/portfolio", mobileHint: "Live demos & case studies" },
  { label: "Pricing", href: "/pricing", mobileHint: "Packages, compare & cost calculator" },
] as const;

/** Services dropdown — max 4 items (path + sectionId; no hash URLs) */
export const HEADER_SERVICES_DROPDOWN = [
  { label: "Website Development", path: "/services", sectionId: "websites" },
  { label: "Web App Development", path: "/services", sectionId: "services" },
  { label: "Mobile App Development", path: "/services", sectionId: "mobile-apps" },
  { label: "AI Solutions & Automation", path: "/services", sectionId: "services" },
] as const;

export const HOME_HUB_LINKS: HomeHubLink[] = [
  {
    href: "/pricing",
    title: "Pricing & cost calculator",
    description: "See what your website may cost — packages from ₹8,999 with a step-by-step estimate.",
    icon: "💰",
    featured: true,
    cta: "Get estimate →",
    step: 1,
  },
  {
    href: "/services",
    title: "Services",
    description: "Websites, mobile apps, AI integrations, and SEO-ready builds.",
    icon: "✨",
    step: 2,
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    description: "Live demos and case studies across industries.",
    icon: "🖼️",
    step: 3,
  },
  {
    href: "/about",
    title: "About & process",
    description: "Founder story, why Bitcraftly, and how we deliver projects.",
    icon: "👤",
    step: 4,
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Common questions on pricing, timelines, and support.",
    icon: "❓",
    step: 5,
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Free consultation, written scope, and WhatsApp.",
    icon: "📩",
    cta: "Get quote →",
    step: 6,
  },
];

/** Legacy `/{section}` paths → dedicated routes (scroll via ?scroll=, not hash) */
export const SECTION_REDIRECTS: Record<string, string> = {
  about: "/",
  services: "/services",
  websites: "/services?scroll=websites",
  "mobile-apps": "/services?scroll=mobile-apps",
  pricing: "/pricing",
  founder: "/about?scroll=founder",
  "why-us": "/about?scroll=why-us",
  process: "/about?scroll=process",
  faq: "/faq",
  "contact-cta": "/contact",
  "how-parking-works": "/contact?service=Smart%20Parking&intent=demo&source=parking-legacy",
};
