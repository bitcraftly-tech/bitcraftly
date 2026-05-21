/** Portfolio & case study marketing copy */

export const PORTFOLIO = {
  eyebrow: "Portfolio",
  heading: "Work built to perform — not just look good",
  intro:
    "Live client sites and interactive demos across business websites, startups, ecommerce, and AI-powered experiences. Every build is structured for mobile visitors, local SEO, WhatsApp leads, and maintainable React/Next.js where your roadmap needs scale.",
  introNote:
    "Demos show industry-ready patterns — your project is scoped and customized after discovery. Live badge = production site.",
  whyPerformTitle: "Why our projects perform better",
  whyPerformIntro:
    "Pretty mockups are easy. Outcomes need architecture — clear funnels, fast pages, and tech choices that match how your customers actually behave.",
  whyPerformPoints: [
    {
      title: "Conversion-first structure",
      body: "Hero, trust, services, and CTAs placed for enquiries — not buried below endless scroll.",
    },
    {
      title: "React & Next.js when it counts",
      body: "SEO-friendly, fast, component-driven frontends for startups and growing brands — not bloated page builders.",
    },
    {
      title: "AI with a purpose",
      body: "Chat, smart forms, and automation only where they shorten the path to a human conversation or sale.",
    },
    {
      title: "Founder-led quality bar",
      body: "Senior architecture review on layout, performance, and handoff — so your site stays maintainable after launch.",
    },
  ] as const,
  ctaTitle: "Want a project like these for your business?",
  ctaBody:
    "Share your industry and goals — we'll recommend React vs Next.js scope, timeline, and a written starting estimate. Free 15-minute consultation.",
  primaryCta: "Book Free Consultation",
  secondaryCta: "WhatsApp Project Enquiry",
  pageHeading: "Portfolio — React, Next.js & AI-ready business builds",
  pageIntro:
    "Explore live work and interactive showcases. Filter by category, open a project for the case-study breakdown, then book a call to scope yours.",
} as const;

export type PortfolioCategoryId =
  | "all"
  | "business-websites"
  | "startup-saas"
  | "react-nextjs"
  | "ai-powered"
  | "ecommerce";

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategoryId; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "business-websites", label: "Business websites" },
  { id: "startup-saas", label: "Startups & SaaS" },
  { id: "react-nextjs", label: "React & Next.js" },
  { id: "ai-powered", label: "AI-powered" },
  { id: "ecommerce", label: "Ecommerce" },
];

/** Case study section labels — used on detail pages */
export const CASE_STUDY_LABELS = {
  problem: "The challenge",
  solution: "What we built",
  results: "Outcomes & focus",
  before: "Before",
  after: "After",
  techStack: "Tech stack",
} as const;
