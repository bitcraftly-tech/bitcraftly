import type { Metadata } from "next";

import { DEFAULT_OG_IMAGE, HOME_SEO, LOCAL_SEO_KEYWORDS, SEO_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

export type PageSeoKey =
  | "home"
  | "pricing"
  | "services"
  | "about"
  | "contact"
  | "faq"
  | "portfolio"
  | "team"
  | "careers"
  | "privacy"
  | "terms";

type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  keywords: readonly string[];
  /** Use for homepage so the root title template does not duplicate the brand name */
  titleAbsolute?: boolean;
};

const LOCAL_PRIMARY = LOCAL_SEO_KEYWORDS.primary;
const LOCAL_NCR = LOCAL_SEO_KEYWORDS.delhiNcr;
const LOCAL_SERVICE = LOCAL_SEO_KEYWORDS.service;
const LOCAL_LONG = LOCAL_SEO_KEYWORDS.longTail;

export const PAGE_SEO = {
  home: {
    path: "/",
    title: HOME_SEO.title,
    titleAbsolute: true,
    description: HOME_SEO.description,
    keywords: [
      ...HOME_SEO.keywords,
      ...LOCAL_PRIMARY,
      ...LOCAL_NCR.slice(0, 4),
      ...SEO_KEYWORDS.react.slice(0, 3),
      ...SEO_KEYWORDS.nextjs.slice(0, 3),
      "website development company India",
      "WhatsApp lead website development",
      "founder led web development studio",
    ],
  },
  pricing: {
    path: "/pricing",
    title: "Website Pricing & Cost Calculator India",
    description:
      "Website development cost from ₹8,999. Compare fast-launch packages, use the 4-step cost calculator, and get a written React/Next.js quote — Ghaziabad, Delhi NCR & India.",
    keywords: [
      "website development cost India",
      "website price Ghaziabad",
      "website development packages India",
      "business website cost calculator",
      "landing page price India",
      "Next.js website development cost",
      "affordable business website Ghaziabad",
      "fast website development 5 days India",
      ...LOCAL_PRIMARY.slice(0, 3),
      ...LOCAL_LONG.slice(0, 2),
    ],
  },
  services: {
    path: "/services",
    title: "React.js & Next.js Web Development Services",
    description:
      "Business websites, mobile app UI, AI chatbots, redesigns, and performance optimization — founder-led React & Next.js delivery from Ghaziabad for Delhi NCR, India & remote.",
    keywords: [
      ...SEO_KEYWORDS.core,
      ...SEO_KEYWORDS.react,
      ...SEO_KEYWORDS.nextjs,
      ...SEO_KEYWORDS.ai.slice(0, 4),
      ...LOCAL_SERVICE,
      "clinic website development Ghaziabad",
      "gym website development Noida",
      "startup website development India",
    ],
  },
  about: {
    path: "/about",
    title: "About Bitcraftly — Founder-Led Web Studio Ghaziabad",
    description:
      "Meet Bitcraftly — a founder-led React.js & Next.js studio led by Sanjay Kr. Singh (18+ years). Clear scope, premium frontend craft, and delivery from Ghaziabad across Delhi NCR & India.",
    keywords: [
      "founder led web development studio",
      "frontend architect India",
      "React.js development company Ghaziabad",
      "Next.js agency India",
      "Sanjay Kr Singh web developer",
      ...LOCAL_PRIMARY,
      ...SEO_KEYWORDS.startup,
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact — Free Consultation & Website Quote",
    description:
      "Book a free 15-minute consultation or request a website quote with Sanjay Kr. Singh — React, Next.js & AI-powered solutions. Ghaziabad, Delhi NCR, India & remote. WhatsApp same-day reply.",
    keywords: [
      "website developer contact Ghaziabad",
      "free website consultation India",
      "website quote WhatsApp",
      "hire React developer India",
      "hire Next.js developer Noida",
      ...LOCAL_PRIMARY,
      ...LOCAL_NCR.slice(0, 4),
      "website audit free India",
    ],
  },
  faq: {
    path: "/faq",
    title: "Website Development FAQ — Pricing, Timelines & Process",
    description:
      "Answers on website cost, delivery timelines, React vs simple sites, Hindi/Hinglish copy, AI chatbots, maintenance, and remote clients — Bitcraftly, Ghaziabad & Delhi NCR.",
    keywords: [
      "website development FAQ India",
      "how much does a website cost Ghaziabad",
      "React vs WordPress business website",
      "website delivery timeline India",
      "website maintenance cost India",
      ...LOCAL_LONG,
      ...LOCAL_SERVICE.slice(0, 4),
    ],
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio — React, Next.js & AI Web Projects",
    description:
      "Live client websites and interactive demos — business sites, ecommerce, clinics, gyms, restaurants, and AI chatbot projects built for leads, SEO, and mobile in India.",
    keywords: [
      "React.js portfolio India",
      "Next.js website examples",
      "business website portfolio Ghaziabad",
      "ecommerce website development India",
      "clinic website design India",
      "restaurant website development NCR",
      ...SEO_KEYWORDS.ai.slice(0, 2),
      ...LOCAL_SERVICE.slice(0, 3),
    ],
  },
  team: {
    path: "/team",
    title: "Founder — Sanjay Kr. Singh",
    description:
      "Sanjay Kr. Singh — Tech Lead & Frontend Architect at Bitcraftly. 18+ years React.js, Next.js, and AI-powered web solutions from Ghaziabad, serving India and remote clients.",
    keywords: [
      "Sanjay Kr Singh frontend architect",
      "React.js developer Ghaziabad",
      "Next.js developer India",
      "hire frontend architect India",
      ...LOCAL_PRIMARY.slice(0, 3),
    ],
  },
  careers: {
    path: "/careers",
    title: "Careers at Bitcraftly",
    description:
      "Join Bitcraftly — build React, Next.js, AI workflows, and Smart Parking products for Indian SMBs. Remote-friendly, ownership-driven engineering team.",
    keywords: [
      "React developer jobs India",
      "Next.js developer jobs remote",
      "frontend developer careers Ghaziabad",
      "web development jobs India",
    ],
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How Bitcraftly collects and uses contact and project information when you enquire about website development services.",
    keywords: ["Bitcraftly privacy policy", "website development agency privacy"],
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms for using Bitcraftly website development, consulting, and related digital services.",
    keywords: ["Bitcraftly terms of service", "web development terms India"],
  },
} as const satisfies Record<PageSeoKey, PageSeoConfig>;

function pageCanonical(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function displayTitle(config: PageSeoConfig): string {
  if ("titleAbsolute" in config && config.titleAbsolute) return config.title;
  return `${config.title} | ${SITE_NAME}`;
}

/** Next.js Metadata with keywords, canonical, Open Graph, and Twitter cards */
export function buildPageMetadata(key: PageSeoKey): Metadata {
  const page = PAGE_SEO[key];
  const canonical = pageCanonical(page.path);
  const ogTitle = displayTitle(page);

  return {
    title: "titleAbsolute" in page && page.titleAbsolute ? { absolute: page.title } : page.title,
    description: page.description,
    keywords: [...page.keywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: SITE_NAME,
      title: ogTitle,
      description: page.description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${SITE_NAME} — React.js & Next.js web development` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
