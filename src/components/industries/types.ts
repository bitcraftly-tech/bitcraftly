import type { IconName } from '@/components/ui/icon';

export type IndustryId =
  | 'healthcare'
  | 'ecommerce'
  | 'education'
  | 'real-estate'
  | 'manufacturing'
  | 'logistics'
  | 'finance'
  | 'travel'
  | 'restaurants'
  | 'retail'
  | 'saas'
  | 'startups';

export interface IndustriesCta {
  readonly label: string;
  readonly href: string;
}

export interface IndustryItem {
  readonly id: IndustryId;
  readonly name: string;
  readonly shortDescription: string;
  readonly icon: IconName;
  readonly challenges: readonly string[];
  readonly solutions: readonly string[];
  readonly recommendedServices: readonly string[];
  readonly technologyStack: readonly string[];
  readonly typicalTimeline: string;
  readonly startingInvestment: string;
  readonly cta: IndustriesCta;
}

export interface IndustriesWhyItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface IndustriesMetric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface IndustriesFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}
