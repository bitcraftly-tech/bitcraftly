/** Pricing page welcome guide — copy & persistence keys */

export const PRICING_GUIDE_STORAGE = {
  sessionDismissed: "bitcraftly-pricing-guide-dismissed",
  hidePermanently: "bitcraftly-pricing-guide-hide",
} as const;

export type PricingGuideStep = {
  step: number;
  anchorId: string;
  title: string;
  hint: string;
  timeLabel: string;
};

export const PRICING_WELCOME_STEPS: readonly PricingGuideStep[] = [
  {
    step: 1,
    anchorId: "pricing-compare",
    title: "Packages compare karo",
    hint: "Fast vs standard — features aur starting price ek table mein.",
    timeLabel: "~1 min",
  },
  {
    step: 2,
    anchorId: "fast-packages",
    title: "Fast launch choose karo",
    hint: "48h–7 day delivery — fixed scope, clear price, seedha WhatsApp ya quote.",
    timeLabel: "Jaldi launch",
  },
  {
    step: 3,
    anchorId: "pricing-standard",
    title: "Standard plan dekho",
    hint: "Zyaada pages, admin, ya custom scope — starting-from prices yahan.",
    timeLabel: "Custom scope",
  },
  {
    step: 4,
    anchorId: "project-cost-calculator",
    title: "Calculator se estimate lo",
    hint: "4 steps — type, project, features, hosting. Live breakdown right side par.",
    timeLabel: "~2 min",
  },
] as const;

export const CALCULATOR_STEP_HINTS = [
  "Personal ya Business — seedha package nahi chahiye to yahan se custom estimate banao.",
  "Project type select karo — portfolio, startup, ecommerce, etc.",
  "Optional features add karo — admin, blog, payment, apps. Skip bhi kar sakte ho.",
  "Domain/hosting — already hai ya hum setup karein. Total yahan update hoga.",
] as const;
