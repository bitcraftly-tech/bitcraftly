/** Customer-facing page order — nav, sections, and intro copy */

export type PageNavItem = { id: string; label: string };

export const CUSTOMER_JOURNEY_STEPS = [
  "See pricing & packages",
  "Check services & fit",
  "View portfolio proof",
  "Read FAQ / about",
  "Get quote or consult",
] as const;

export const PRICING_PAGE_NAV: PageNavItem[] = [
  { id: "pricing-compare", label: "Compare" },
  { id: "fast-packages", label: "Fast packages" },
  { id: "pricing-standard", label: "Standard" },
  { id: "project-cost-calculator", label: "Calculator" },
  { id: "pricing-faq", label: "FAQ" },
];

export const SERVICES_PAGE_NAV: PageNavItem[] = [
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "websites", label: "Websites" },
  { id: "mobile-apps", label: "Mobile apps" },
];

export const ABOUT_PAGE_NAV: PageNavItem[] = [
  { id: "why-us", label: "Why us" },
  { id: "process", label: "Process" },
  { id: "founder", label: "Founder" },
];

export const PAGE_INTROS = {
  services: {
    eyebrow: "What we build",
    title: "Websites, apps & AI — clear scope, founder-led delivery",
    description:
      "Pehle services dekho aur industry fit samjho. Pricing clear hai — packages /pricing par. Jab ready ho, portfolio proof dekho ya seedha quote lo.",
    steps: ["Services overview", "Your industry", "Website details", "Mobile apps"],
  },
  about: {
    eyebrow: "About Bitcraftly",
    title: "Why trust us — process, proof & founder-led delivery",
    description:
      "Website project mein trust sabse pehle. Yahan dekhoge kaun deliver karta hai, kaise kaam hota hai, aur kyun clients repeat karte hain.",
    steps: ["Why Bitcraftly", "How we work", "Meet the founder"],
  },
  faq: {
    eyebrow: "Questions answered",
    title: "FAQ — pricing, timelines & support",
    description:
      "Common sawal ek jagah. Package price ke liye /pricing par compare karo — phir bhi doubt ho to free consultation book karo.",
    steps: ["Read answers", "Check pricing", "Book consult"],
  },
  portfolio: {
    eyebrow: "Proof of work",
    title: "Live projects & interactive demos",
    description:
      "Pehle dekho humne kya banaya — phir pricing par package choose karo ya similar project ke liye quote lo.",
    steps: ["Browse work", "Open case study", "Get similar quote"],
  },
} as const;
