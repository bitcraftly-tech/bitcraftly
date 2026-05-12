export type PortfolioMockup =
  | "restaurant"
  | "school"
  | "gym"
  | "ecommerce"
  | "chatbot"
  | "clinic"
  | "local"
  | "generic";

export type PortfolioItem = {
  title: string;
  hint: string;
  gradient: string;
  emoji: string;
  mockup: PortfolioMockup;
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
    title: "Restaurant Website",
    hint: "Menus, reservations, brand story",
    gradient: "from-orange-500/20 to-amber-500/10",
    emoji: "🍽️",
    mockup: "restaurant",
    tag: "Website",
  },
  {
    title: "School Website",
    hint: "Admissions, notices, parent trust",
    gradient: "from-blue-500/20 to-indigo-500/10",
    emoji: "🎓",
    mockup: "school",
    tag: "Website",
  },
  {
    title: "Gym Website",
    hint: "Memberships, trainers, class schedules",
    gradient: "from-rose-500/20 to-fuchsia-500/10",
    emoji: "💪",
    mockup: "gym",
    tag: "Website",
  },
  {
    title: "Ecommerce Website",
    hint: "Catalog, payments, delivery trust",
    gradient: "from-violet-500/20 to-purple-500/10",
    emoji: "🛍️",
    mockup: "ecommerce",
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
    tag: "Website",
    details: "Clean layouts that feel credible — services, doctors, and secure enquiry flows.",
  },
  {
    title: "Local Services Lead Site",
    hint: "Coaching, salons, CA firms — calls & WhatsApp",
    gradient: "from-amber-500/20 to-yellow-500/10",
    emoji: "📍",
    mockup: "local",
    tag: "Website",
    details:
      "One-page or multi-page funnels with strong CTAs for Jamshedpur and nearby local search.",
  },
];

export const portfolioPageItems: PortfolioItem[] = [
  ...homePortfolioItems.map((item) => ({
    ...item,
    details:
      item.title === "Restaurant Website"
        ? restaurantDetails
        : item.title === "School Website"
          ? schoolDetails
          : item.title === "Gym Website"
            ? gymDetails
            : item.title === "Ecommerce Website"
              ? ecommerceDetails
              : "Tailored layout and flows for your industry.",
  })),
  ...portfolioExtras,
];
