import type {
  HeroAssistantSuggestion,
  HeroAutomationStep,
  HeroCta,
  HeroDashboardStat,
  HeroEyebrowSegment,
  HeroMetric,
} from "./hero.types";

export const HERO_ID = "hero";
export const HERO_HEADING_ID = "hero-heading";

export const HERO_EYEBROW: HeroEyebrowSegment[] = [
  { text: "AI-Powered", highlight: true },
  { text: "Performance" },
  { text: "Results Driven" },
];

export const HERO_HEADING = {
  prefix: "We build",
  highlight: "AI-powered",
  suffix: "digital products that drive business growth",
} as const;

export const HERO_DESCRIPTION =
  "From high-performance websites to AI automation and custom software — Bitcraftly helps ambitious teams launch, scale, and lead in the digital era.";

export const HERO_CTAS: HeroCta[] = [
  {
    label: "Get Free Consultation",
    href: "#cta",
    variant: "primary",
  },
  {
    label: "View Our Work",
    href: "#projects",
    variant: "outline",
  },
];

export const HERO_METRICS: HeroMetric[] = [
  { value: "18+", label: "Years of Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support & Maintenance" },
];

export const HERO_DASHBOARD = {
  url: "app.bitcraftly.com/analytics",
  title: "Revenue Overview",
  subtitle: "Last 30 days · live",
  growth: "+18.6%",
  revenueLabel: "Total Revenue",
  revenueValue: "$24,850",
  previousValue: "$20,940",
} as const;

export const HERO_DASHBOARD_STATS: HeroDashboardStat[] = [
  { label: "Projects", value: "32", change: "+12.4%" },
  { label: "Leads", value: "248", change: "+15.2%" },
  { label: "Success", value: "98%", change: "+2.1%" },
];

export const HERO_ASSISTANT = {
  name: "Bitcraftly AI",
  version: "Assistant · v2.4",
  status: "Online",
  message: "Hi! How can I help you today?",
} as const;

export const HERO_ASSISTANT_SUGGESTIONS: HeroAssistantSuggestion[] = [
  { text: "Need a website" },
  { text: "Need AI solution" },
  { text: "Need automation" },
];

export const HERO_AUTOMATION = {
  title: "Automation Flow",
  subtitle: "4 steps · running",
  status: "Live",
} as const;

export const HERO_AUTOMATION_STEPS: HeroAutomationStep[] = [
  { label: "Trigger", completed: true },
  { label: "AI Process", completed: true },
  { label: "Notify", completed: true },
  { label: "Update CRM", completed: true },
];
