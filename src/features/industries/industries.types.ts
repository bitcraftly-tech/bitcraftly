import type { IconName } from "@/components/ui/icon";

export interface IndustryPainSolution {
  pain: string;
  solution: string;
}

export interface IndustryModel {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: IconName;
  illustration:
    | "care"
    | "learn"
    | "shop"
    | "factory"
    | "finance"
    | "property"
    | "ship"
    | "stay"
    | "travel"
    | "civic"
    | "launch"
    | "saas";
  painPoints: readonly string[];
  solutions: readonly string[];
  /** Typical buyer size band shown on cards. */
  companySize: string;
  /** Typical engagement duration to first useful release. */
  projectDuration: string;
  /** Primary technologies referenced on cards. */
  technologyTags: readonly string[];
  /** Common business goals shown as secondary CTA context. */
  businessGoals: readonly string[];
  featured?: boolean;
  accent: "teal" | "indigo" | "amber" | "rose" | "sky" | "emerald";
}

export interface IndustryProofItem {
  id: string;
  industry: string;
  outcome: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber" | "sky";
}

export interface IndustryChallenge {
  id: string;
  title: string;
  problem: string;
  impact: string;
  approach: string;
  outcome: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber";
}

export interface IndustrySolutionOffer {
  id: string;
  title: string;
  description: string;
  recommendedServices: readonly string[];
  technologyStack: readonly string[];
  deliveryModel: string;
  typicalTimeline: string;
  icon: IconName;
  href: string;
  ctaLabel: string;
  tone: "primary" | "accent" | "emerald" | "amber";
}

export interface IndustryTechItem {
  name: string;
  category: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "sky" | "amber" | "rose";
}

export interface IndustryCaseStudy {
  id: string;
  industry: string;
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  href: string;
  ctaLabel: string;
  icon: IconName;
  tone: "teal" | "amber" | "emerald";
}

export interface IndustryMetric {
  id: string;
  value: string;
  label: string;
  hint: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber";
}

export interface IndustryRoiOutcome {
  id: string;
  title: string;
  example: string;
  value: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber" | "sky";
}

export interface IndustryComparisonRow {
  id: string;
  criterion: string;
  generic: string;
  bitcraftly: string;
}

export interface IndustryProcessStep {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber";
}

export interface IndustryWhyItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: IconName;
  tone: "primary" | "accent" | "emerald" | "amber";
}

export interface IndustryFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface IndustryRelatedService {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  relatedIndustryCount: number;
  ctaLabel: string;
}
