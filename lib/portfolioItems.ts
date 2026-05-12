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
  /** Primary CTA destination (legacy); use `liveUrl` for external sites */
  demoHref?: string;
  /** Public live site URL — opens in new tab when set */
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
    demoHref: "/portfolio",
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
    demoHref: "/portfolio",
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
    demoHref: "/portfolio",
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
    demoHref: "/portfolio",
    ctaLabel: "View Live Project →",
    tag: "Ecommerce",
  },
];

const portfolioExtras: PortfolioItem[] = [
  {
    title: "AI Chatbot for Restaurant",
    hint: "Menu FAQs, smart replies & WhatsApp handoff",
    gradient: "from-indigo-500/15 to-slate-500/15",
    emoji: "💬",
    mockup: "chatbot",
    featureBullets: ["Quick menu answers", "WhatsApp handoff", "Hours & FAQs"],
    demoHref: "/portfolio",
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
    demoHref: "/portfolio",
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
    demoHref: "/portfolio",
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
