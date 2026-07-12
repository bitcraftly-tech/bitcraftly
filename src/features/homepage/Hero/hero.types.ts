export interface HeroEyebrowSegment {
  text: string;
  highlight?: boolean;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroDashboardStat {
  label: string;
  value: string;
  change: string;
}

export interface HeroAssistantSuggestion {
  text: string;
  href: string;
}

export interface HeroAutomationStep {
  label: string;
  completed: boolean;
}

export interface HeroCapabilityTag {
  id: string;
  label: string;
  icon: import("@/components/ui/icon").IconName;
  href?: string;
}
