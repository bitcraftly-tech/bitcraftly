export type PortfolioMockup =
  | "restaurant"
  | "school"
  | "gym"
  | "ecommerce"
  | "chatbot"
  | "clinic"
  | "local"
  | "generic";

/** Shown on homepage recent-project cards */
export const RECENT_PROJECT_TRUST_LINES = ["Mobile friendly", "SEO ready", "WhatsApp integration", "Fast loading"];

export type PortfolioItem = {
  title: string;
  hint: string;
  gradient: string;
  emoji: string;
  mockup: PortfolioMockup;
  /** Trust or feature lines under the subtitle */
  featureBullets: string[];
  /** Showcase path `/portfolio/...`; wins over `liveUrl` when set */
  demoHref?: string;
  /** External live site URL — card opens in new tab; used when `demoHref` is unset */
  liveUrl?: string;
  /** CTA label (default: live project) */
  ctaLabel?: string;
  /** Shown on full portfolio page only */
  details?: string;
  tag: "Website" | "Ecommerce";
};

const restaurantDetails =
  "Hero story, menu highlights, map & hours, WhatsApp ordering handoff.";
const schoolDetails = "Admission funnel, fee enquiry forms, news & calendar for parents.";
const gymDetails = "Plans, trainer roster, class timetable, trial enquiry strip.";
const ecommerceDetails =
  "Category-led UX, trust badges, shipping & COD messaging tuned for your audience.";

export const homePortfolioItems: PortfolioItem[] = [
  {
    title: "Shrishti Cloud Kitchen",
    hint: "Menu-led UX, fast ordering path, local delivery trust",
    gradient: "from-orange-500/20 to-amber-500/10",
    emoji: "🍽️",
    mockup: "restaurant",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    liveUrl: "https://www.shrishticloud.kitchen/",
    ctaLabel: "View Live Project →",
    tag: "Website",
  },
  {
    title: "Gym Website",
    hint: "Plans, trainers, class schedules & trial enquiries",
    gradient: "from-rose-500/20 to-fuchsia-500/10",
    emoji: "💪",
    mockup: "gym",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    demoHref: "/portfolio/gym-fitness-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
  },
  {
    title: "School Website",
    hint: "Admissions, notices & parent-friendly structure",
    gradient: "from-blue-500/20 to-indigo-500/10",
    emoji: "🎓",
    mockup: "school",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    demoHref: "/portfolio/school-website-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
  },
  {
    title: "Ecommerce Store",
    hint: "Catalog, checkout clarity & delivery messaging",
    gradient: "from-violet-500/20 to-purple-500/10",
    emoji: "🛍️",
    mockup: "ecommerce",
    featureBullets: [...RECENT_PROJECT_TRUST_LINES],
    demoHref: "/portfolio/ecommerce-store-showcase",
    ctaLabel: "View Live Project →",
    tag: "Ecommerce",
  },
];

const portfolioExtras: PortfolioItem[] = [
  {
    title: "Builder Website",
    hint: "Projects, credibility & enquiry-ready layouts",
    gradient: "from-slate-500/18 to-zinc-500/10",
    emoji: "🏗️",
    mockup: "local",
    featureBullets: ["Project highlights", "Lead enquiries", "Mobile friendly"],
    demoHref: "/portfolio/builder-real-estate-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
    details:
      "Trust-first pages for builders — project showcases and enquiry flows scoped to how you sell, without turning your site into a listings portal.",
  },
  {
    title: "Society Portal",
    hint: "Residents, notices & practical workflows",
    gradient: "from-emerald-500/15 to-teal-500/12",
    emoji: "🏘️",
    mockup: "generic",
    featureBullets: ["Clear resident UX", "Forms & notices", "WhatsApp-friendly"],
    demoHref: "/portfolio/society-management-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
    details:
      "Lightweight resident-facing sites or small portals — notices, forms and handoffs scoped to what your committee needs — not a full ERP pitch.",
  },
  {
    title: "AI Chatbot for Restaurant",
    hint: "Menu FAQs, smart replies & WhatsApp handoff",
    gradient: "from-indigo-500/15 to-slate-500/15",
    emoji: "💬",
    mockup: "chatbot",
    featureBullets: ["Quick menu answers", "WhatsApp handoff", "Hours & FAQs"],
    demoHref: "/portfolio/restaurant-ai-chatbot-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
    details:
      "Customer-facing assistant for menus, hours, and quick questions — with a clean handoff to staff or WhatsApp.",
  },
  {
    title: "Clinic & Healthcare",
    hint: "Doctors, timings, appointment requests",
    gradient: "from-cyan-500/20 to-teal-500/10",
    emoji: "🏥",
    mockup: "clinic",
    featureBullets: ["Doctor profiles", "Appointment requests", "Mobile friendly"],
    demoHref: "/portfolio/clinic-healthcare-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
    details: "Clean layouts that feel credible — services, doctors, and secure enquiry flows.",
  },
  {
    title: "Local Services Lead Site",
    hint: "Coaching, salons, CA firms — calls & WhatsApp",
    gradient: "from-amber-500/20 to-yellow-500/10",
    emoji: "📍",
    mockup: "local",
    featureBullets: ["Strong CTAs", "WhatsApp contact", "Local-ready pages"],
    demoHref: "/portfolio/local-services-leads-showcase",
    ctaLabel: "View Live Project →",
    tag: "Website",
    details:
      "One-page or multi-page funnels with strong CTAs for Jamshedpur and nearby local search.",
  },
];

export const portfolioPageItems: PortfolioItem[] = [
  ...homePortfolioItems.map((item) => ({
    ...item,
    details:
      item.title === "Shrishti Cloud Kitchen"
        ? restaurantDetails
        : item.title === "School Website"
          ? schoolDetails
          : item.title === "Gym Website"
            ? gymDetails
            : item.title === "Ecommerce Store"
              ? ecommerceDetails
              : "Tailored layout and flows for your industry.",
  })),
  ...portfolioExtras,
];

/** URL segment for root `/gym-website` etc. — generateStaticParams + card anchors; CTAs prefer `demoHref` showcases */
export function slugifyPortfolioTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPortfolioPageItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioPageItems.find((item) => slugifyPortfolioTitle(item.title) === slug);
}
