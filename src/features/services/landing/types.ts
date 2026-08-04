import type { IconName } from '@/components/ui/icon';

export interface ServicesLandingCta {
  readonly label: string;
  readonly href: string;
}

export interface ServiceOffering {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly bestFor: string;
  readonly startingPrice: string;
  readonly technologies: readonly string[];
  readonly icon: IconName;
  readonly cta: ServicesLandingCta;
}

export interface ServiceCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly offerings: readonly ServiceOffering[];
}

export interface ServicesWhyItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface ServicesProcessStep {
  readonly id: string;
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface ServicesTechGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
}

export interface ServicesIndustryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface ServicesFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}
