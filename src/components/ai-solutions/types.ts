import type { IconName } from '@/components/ui/icon';

export interface AiSolutionsCta {
  readonly label: string;
  readonly href: string;
}

export interface AiSolutionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly benefits: readonly string[];
  readonly icon: IconName;
  readonly cta: AiSolutionsCta;
}

export interface AiIndustryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface AiProcessStep {
  readonly id: string;
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface AiWhyItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface AiFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}
