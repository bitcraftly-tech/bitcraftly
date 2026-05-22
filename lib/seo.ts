/** Central SEO config — titles, descriptions, keywords for pages & content planning */

export const SITE_URL = "https://bitcraftly.com";
export const SITE_NAME = "Bitcraftly";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icon.png`;

export const HOME_SEO = {
  title: "Bitcraftly | React.js & Next.js Web Development | AI-Powered Frontend | Ghaziabad",
  description:
    "Founder-led React.js & Next.js website development, AI-powered business solutions, redesigns & frontend architecture. Sanjay Kr. Singh · 18+ years · Ghaziabad, India & remote.",
  keywords: [
    "React.js development company India",
    "Next.js website development",
    "AI-powered website development",
    "frontend architect India",
    "website development Ghaziabad",
    "business website development",
    "website redesign services",
    "landing page development",
    "frontend architecture consulting",
    "website performance optimization",
  ],
} as const;

/** Primary keyword clusters for content & future service pages */
export const SEO_KEYWORDS = {
  core: [
    "frontend development company",
    "web development company India",
    "React.js development services",
    "Next.js development agency",
    "AI website solutions",
    "custom business website",
  ],
  local: [
    "website development company Ghaziabad",
    "web developer Ghaziabad",
    "React.js developer Ghaziabad",
    "Next.js website development Ghaziabad",
    "website designer Ghaziabad",
    "website development company Noida",
    "website development Delhi NCR",
    "web developer Greater Noida",
    "website development Gurugram",
    "website development Uttar Pradesh",
    "website development Patna",
    "website development Ranchi",
    "website development Jamshedpur",
    "website developer Noida",
  ],
  react: [
    "React.js developer India",
    "hire React developer",
    "React.js website development",
    "React frontend development company",
    "React UI development services",
    "React dashboard development",
  ],
  nextjs: [
    "Next.js developer India",
    "Next.js website development company",
    "Next.js SEO website",
    "Next.js App Router development",
    "Next.js agency India",
    "SSR website development",
  ],
  ai: [
    "AI website development",
    "AI chatbot for business website",
    "AI-powered business website",
    "website AI integration India",
    "AI lead generation website",
    "smart chatbot website development",
  ],
  startup: [
    "startup website development India",
    "SaaS frontend development",
    "MVP website development",
    "startup landing page development",
    "founder-led web development",
  ],
} as const;

/** Planned service page paths (create when content is ready) */
export const PLANNED_SERVICE_PAGES = [
  "/services/reactjs-development",
  "/services/nextjs-development",
  "/services/ai-website-solutions",
  "/services/frontend-architecture",
  "/services/website-redesign",
  "/services/landing-page-development",
  "/services/business-websites",
  "/services/performance-optimization",
] as const;

/** Planned blog paths */
export const PLANNED_BLOG_POSTS = [
  "/blog/react-vs-wordpress-business-website",
  "/blog/nextjs-website-development-cost-india",
  "/blog/ai-chatbot-business-website-india",
  "/blog/website-development-ghaziabad-guide",
  "/blog/gym-website-features-india",
  "/blog/clinic-website-design-tips",
] as const;

export const LOCAL_BUSINESS = {
  name: "Bitcraftly",
  founder: "Sanjay Kr. Singh",
  addressLocality: "Ghaziabad",
  addressRegion: "Uttar Pradesh",
  addressCountry: "IN",
  telephone: "+91-96677-10954",
  areaServed: [
    "Ghaziabad",
    "Noida",
    "Greater Noida",
    "Delhi",
    "Gurugram",
    "Faridabad",
    "Delhi NCR",
    "Uttar Pradesh",
    "Bihar",
    "Jharkhand",
    "India",
  ],
  geo: {
    latitude: 28.6692,
    longitude: 77.4538,
  },
} as const;

export { GBP_DESCRIPTION, LOCAL_SEO_KEYWORDS, GBP_CATEGORIES } from "@/lib/localSeo";
