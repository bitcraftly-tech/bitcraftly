import type { IconName } from "@/components/ui/icon";

export interface HomepageIndustry {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
}

export interface IndustriesFeaturedContent {
  title: string;
  highlights: readonly string[];
  ctaLabel: string;
  href: string;
}
