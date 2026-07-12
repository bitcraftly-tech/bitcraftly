import { getIndustryHref } from "@/constants/industries";
import { ROUTES } from "@/constants/navigation";
import type {
  HomepageIndustry,
  IndustriesFeaturedContent,
} from "./industries.types";

export const INDUSTRIES_SECTION_ID = "industries";
export const INDUSTRIES_HEADING_ID = "industries-heading";

export const INDUSTRIES_LABEL = "Industries";

export const INDUSTRIES_HEADING = "Industries We Transform";

export const INDUSTRIES_DESCRIPTION =
  "Helping businesses build AI-powered digital products across multiple industries.";

export const HOMEPAGE_INDUSTRIES: readonly HomepageIndustry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "Secure, compliant digital products for care teams, clinics, and health platforms.",
    href: getIndustryHref("healthcare"),
    icon: "shield",
    ctaLabel: "Explore",
  },
  {
    id: "education",
    title: "Education",
    description:
      "Learning platforms and student experiences built for engagement and scale.",
    href: getIndustryHref("education"),
    icon: "message",
    ctaLabel: "Explore",
  },
  {
    id: "retail-ecommerce",
    title: "Retail & Ecommerce",
    description:
      "Storefronts, commerce operations, and conversion-focused digital experiences.",
    href: getIndustryHref("retail-ecommerce"),
    icon: "sparkles",
    ctaLabel: "Explore",
  },
  {
    id: "fintech",
    title: "FinTech",
    description:
      "Payments, lending, and wealth platforms engineered for trust and performance.",
    href: getIndustryHref("fintech"),
    icon: "trending-up",
    ctaLabel: "Explore",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Production visibility, plant software, and connected industrial workflows.",
    href: getIndustryHref("manufacturing"),
    icon: "database",
    ctaLabel: "Explore",
  },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "Tracking, fulfillment, and supply-chain systems that keep operations moving.",
    href: getIndustryHref("logistics"),
    icon: "workflow",
    ctaLabel: "Explore",
  },
  {
    id: "travel",
    title: "Travel",
    description:
      "Booking, operations, and traveler products designed for speed and reliability.",
    href: getIndustryHref("travel"),
    icon: "rocket",
    ctaLabel: "Explore",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description:
      "Property platforms and digital experiences for listings, teams, and buyers.",
    href: getIndustryHref("real-estate"),
    icon: "globe",
    ctaLabel: "Explore",
  },
  {
    id: "startups",
    title: "Startups",
    description:
      "MVP to scale with product engineering, AI, and growth-ready architecture.",
    href: getIndustryHref("startups"),
    icon: "zap",
    ctaLabel: "Explore",
  },
] as const;

export const INDUSTRIES_FEATURED_CARD: IndustriesFeaturedContent = {
  title: "Industry Expertise",
  highlights: [
    "Enterprise AI",
    "Automation",
    "Cloud",
    "Digital Products",
  ],
  ctaLabel: "View Industries",
  href: ROUTES.industries,
};
