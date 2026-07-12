import type {
  HeroAssistantSuggestion,
  HeroAutomationStep,
  HeroCapabilityTag,
  HeroCta,
  HeroDashboardStat,
  HeroMetric,
} from "./hero.types";
import { getServiceHref } from "@/constants/services";
import { NAV_ACTIONS, ROUTES, SECTION_IDS } from "@/constants/navigation";

export const HERO_ID = SECTION_IDS.hero;
export const HERO_HEADING_ID = "hero-heading";

export const HERO_EYEBROW_LABEL =
  "AI-Powered • Performance Focused • Results Driven";

export const HERO_HEADING = {
  prefix: "We Build AI-Powered Digital Products That Drive",
  highlight: "Business Growth",
  suffix: "",
} as const;

export const HERO_DESCRIPTION =
  "From high-performance websites to AI automation and custom software, we help businesses launch, scale, and lead in the digital era.";

export const HERO_CTAS: HeroCta[] = [
  {
    label: NAV_ACTIONS.freeConsultation.label,
    href: NAV_ACTIONS.freeConsultation.href,
    variant: "primary",
  },
  {
    label: NAV_ACTIONS.viewWork.label,
    href: NAV_ACTIONS.viewWork.href,
    variant: "outline",
  },
];

export const HERO_CAPABILITY_TAGS: readonly HeroCapabilityTag[] = [
  {
    id: "ai-solutions",
    label: "AI Solutions",
    icon: "brain",
    href: getServiceHref("ai-solutions"),
  },
  {
    id: "erp",
    label: "ERP",
    icon: "trending-up",
    href: getServiceHref("custom-software-development"),
  },
  {
    id: "crm",
    label: "CRM",
    icon: "bot",
    href: getServiceHref("custom-software-development"),
  },
  {
    id: "cms",
    label: "CMS",
    icon: "layout-grid",
    href: getServiceHref("website-development"),
  },
  {
    id: "saas",
    label: "SaaS",
    icon: "cloud",
    href: getServiceHref("web-application-development"),
  },
  {
    id: "automation",
    label: "Automation",
    icon: "workflow",
    href: getServiceHref("ai-solutions"),
  },
] as const;

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
  version: "Assistant · Bitcraftly",
  status: "Online",
  message: "Tell us what you need — website, AI, or automation.",
} as const;

export const HERO_ASSISTANT_SUGGESTIONS: HeroAssistantSuggestion[] = [
  {
    text: "Need a website",
    href: `${ROUTES.contact}?intent=website&source=ask-ai`,
  },
  {
    text: "Need AI solution",
    href: `${ROUTES.contact}?intent=ai&source=ask-ai`,
  },
  {
    text: "Need automation",
    href: `${ROUTES.contact}?intent=automation&source=ask-ai`,
  },
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
