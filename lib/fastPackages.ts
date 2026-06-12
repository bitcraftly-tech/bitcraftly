/** Productized fast-launch packages — quick conversion offers */

export const FAST_PACKAGES_SECTION = {
  id: "fast-packages",
  eyebrow: "Fast-launch packages",
  headline: "Fixed-scope builds — ship fast, pay clear, founder-led",
  subheadline:
    "Productized offers for owners who want a decision today. Starting prices below; scope confirmed in writing before payment. Content ready = faster delivery.",
  urgencyLine: "Founder-led slots are limited each month — book early to reserve your launch window.",
  offerLine: "50% advance to lock your slot · Balance on delivery · Written scope before kickoff",
  founderTrust:
    "Every package is delivered by Sanjay Kr. Singh — Tech Lead & Frontend Architect (18+ yrs). No junior handoff after the sales call.",
  bottomCtaTitle: "Not sure which package fits?",
  bottomCtaBody: "WhatsApp a one-line brief or book a free 15-min consult — we'll point you to the right package in plain language.",
  bottomCtaPrimary: "Book Free Consultation",
  bottomCtaSecondary: "WhatsApp Sanjay",
  pricingNote: "Prices are starting-from. GST as applicable. Custom pages, copywriting, or integrations quoted in writing.",
} as const;

export type FastPackageCategory = "quick" | "industry" | "advanced";

export type FastPackage = {
  id: string;
  name: string;
  contactSlug: string;
  icon: string;
  category: FastPackageCategory;
  bestFor: string;
  timeline: string;
  timelineShort: string;
  price: string;
  priceNote: string;
  mobileDesc: string;
  desc: string;
  urgency?: string;
  includes: readonly string[];
  cta: string;
  accentClass: string;
  buttonClass: string;
  highlight?: boolean;
  popularLabel?: string;
};

export const FAST_PACKAGE_FILTERS: { id: FastPackageCategory | "all"; label: string }[] = [
  { id: "all", label: "All packages" },
  { id: "quick", label: "Quick launch" },
  { id: "industry", label: "Industry packs" },
  { id: "advanced", label: "Startup & AI" },
];

export const FAST_PACKAGES: FastPackage[] = [
  {
    id: "business-5-days",
    name: "Business Website in 5 Days",
    contactSlug: "Business Website in 5 Days",
    icon: "🌐",
    category: "quick",
    bestFor: "Shops, agencies & local brands",
    timeline: "5 working days from content handoff",
    timelineShort: "5 days",
    price: "₹12,999",
    priceNote: "one-time · up to 5 pages",
    mobileDesc: "Full business site — mobile, SEO, WhatsApp leads. Live in 5 days when content is ready.",
    desc: "Premium multi-page business website for shops, agencies, and local brands — trust layout, service pages, WhatsApp CTA, forms, and basic SEO. Ideal when you need to look credible and start getting enquiries this week.",
    urgency: "Most booked fast-launch offer",
    includes: ["Up to 5 pages", "Mobile-first responsive UI", "WhatsApp & contact form", "Basic SEO + speed pass", "1 revision round"],
    cta: "Reserve 5-Day Slot →",
    accentClass: "text-violet-500",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    highlight: true,
    popularLabel: "Most Popular",
  },
  {
    id: "landing-48h",
    name: "Landing Page in 48 Hours",
    contactSlug: "Landing Page in 48 Hours",
    icon: "🚀",
    category: "quick",
    bestFor: "Ads, offers & launches",
    timeline: "48 hours from approved brief",
    timelineShort: "48 hrs",
    price: "₹8,999",
    priceNote: "one-time · single high-intent page",
    mobileDesc: "One conversion-focused page — campaign, offer, or launch. Live in 48 hours.",
    desc: "Single landing page built to convert — hero, proof, offer, FAQ strip, and CTA to WhatsApp or form. Perfect for ads, festivals, new service launches, or investor teaser pages.",
    urgency: "Fastest turnaround",
    includes: ["1 conversion-focused page", "Mobile + speed optimized", "WhatsApp / form CTA", "SEO meta & OG tags", "48h delivery window*"],
    cta: "Start 48-Hour Build →",
    accentClass: "text-amber-600 dark:text-amber-400",
    buttonClass: "bg-amber-600 text-white hover:bg-amber-700",
  },
  {
    id: "clinic",
    name: "Clinic Website Package",
    contactSlug: "Clinic Website Package",
    icon: "🏥",
    category: "industry",
    bestFor: "Doctors & clinics",
    timeline: "5–7 days · clinic content ready",
    timelineShort: "5–7 days",
    price: "₹13,999",
    priceNote: "one-time · healthcare-focused layout",
    mobileDesc: "Doctors & clinics — services, timings, trust, appointment/WhatsApp flow.",
    desc: "Healthcare-ready website — doctor profiles, treatments, timings, location map, patient trust sections, and enquiry/WhatsApp handoff. Structured for local discovery and calm, professional first impressions.",
    includes: ["Doctor / treatment pages", "Timings & location blocks", "Trust & compliance-friendly layout", "WhatsApp enquiry CTA", "Local SEO basics"],
    cta: "Launch Clinic Site →",
    accentClass: "text-sky-500",
    buttonClass: "bg-sky-600 text-white hover:bg-sky-700",
  },
  {
    id: "gym",
    name: "Gym Website Package",
    contactSlug: "Gym Website Package",
    icon: "💪",
    category: "industry",
    bestFor: "Gyms & fitness studios",
    timeline: "5–7 days · gym content ready",
    timelineShort: "5–7 days",
    price: "₹13,999",
    priceNote: "one-time · fitness brand layout",
    mobileDesc: "Gyms & studios — plans, trainers, gallery, join-now WhatsApp funnel.",
    desc: "High-energy gym website — membership plans, programs, trainer highlights, gallery, and join-now CTAs wired to WhatsApp. Built for mobile discovery and trial sign-ups.",
    includes: ["Plans & programs sections", "Trainer / facility highlights", "Gallery or testimonials zone", "WhatsApp join CTA", "Mobile-first performance"],
    cta: "Launch Gym Site →",
    accentClass: "text-rose-500",
    buttonClass: "bg-rose-600 text-white hover:bg-rose-700",
  },
  {
    id: "coaching",
    name: "Coaching Website Package",
    contactSlug: "Coaching Website Package",
    icon: "🎯",
    category: "industry",
    bestFor: "Coaches & consultants",
    timeline: "5–7 days · coach content ready",
    timelineShort: "5–7 days",
    price: "₹12,999",
    priceNote: "one-time · coach / course funnel",
    mobileDesc: "Coaches & consultants — offer, outcomes, booking/WhatsApp lead path.",
    desc: "Authority-building site for coaches, trainers, and consultants — clear offer, outcomes, about story, testimonials zone, and book-a-call / WhatsApp funnel for high-ticket enquiries.",
    includes: ["Offer & outcomes sections", "About + credibility blocks", "Testimonials / results zone", "WhatsApp / booking CTA", "SEO-ready structure"],
    cta: "Launch Coach Site →",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    id: "startup-mvp",
    name: "Startup MVP Frontend",
    contactSlug: "Startup MVP Frontend",
    icon: "⚛️",
    category: "advanced",
    bestFor: "Startups & SaaS MVPs",
    timeline: "2–3 weeks · scoped sprint",
    timelineShort: "2–3 wks",
    price: "₹34,999+",
    priceNote: "custom quote · React / Next.js",
    mobileDesc: "Investor-ready React/Next.js UI — product shell, auth-ready, scalable patterns.",
    desc: "MVP-grade frontend for startups and SaaS — React.js or Next.js product shell, core flows, component architecture, and performance baseline so your next dev can extend. Scoped sprint with written milestones.",
    includes: ["React or Next.js MVP UI", "Core user flows & components", "API-ready integration points", "Performance & responsive pass", "Handoff docs for your team"],
    cta: "Scope MVP Sprint →",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot Integration",
    contactSlug: "AI Chatbot Integration",
    icon: "✨",
    category: "advanced",
    bestFor: "FAQ & lead automation",
    timeline: "3–5 days · add-on or standalone",
    timelineShort: "3–5 days",
    price: "₹9,999+",
    priceNote: "add-on · existing site or new build",
    mobileDesc: "FAQ & lead bot on your site — escalates to WhatsApp when it matters.",
    desc: "Practical AI chat on your website — FAQs, services, lead qualification — with human handoff to WhatsApp or your team. No gimmick bots; scoped to what actually reduces repeat enquiries.",
    includes: ["FAQ / services-aware chat", "Lead capture + WhatsApp handoff", "Admin-friendly knowledge base", "Privacy-conscious setup", "Works with existing site"],
    cta: "Add AI Chat →",
    accentClass: "text-fuchsia-600 dark:text-fuchsia-400",
    buttonClass: "bg-fuchsia-600 text-white hover:bg-fuchsia-700",
  },
];
