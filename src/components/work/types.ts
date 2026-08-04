import type { IconName } from '@/components/ui/icon';

export type WorkFilterId =
  | 'all'
  | 'Healthcare'
  | 'AI'
  | 'SaaS'
  | 'CRM'
  | 'ERP'
  | 'E-commerce'
  | 'Education'
  | 'Real Estate'
  | 'Retail';

export interface WorkCta {
  readonly label: string;
  readonly href: string;
}

export interface WorkCaseStudyDetails {
  readonly problem: string;
  readonly solution: string;
  readonly architecture: string;
  readonly features: readonly string[];
  readonly techStack: readonly string[];
  readonly timeline: string;
  readonly challenges: readonly string[];
  readonly outcome: string;
  readonly screenshots: readonly {
    readonly src: string;
    readonly alt: string;
  }[];
}

export interface WorkProject {
  readonly id: string;
  readonly name: string;
  readonly overview: string;
  readonly industry: Exclude<WorkFilterId, 'all'>;
  readonly projectType: string;
  readonly technology: readonly string[];
  readonly timeline: string;
  readonly businessImpact: string;
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly featured?: boolean;
  readonly cta: WorkCta;
  readonly details: WorkCaseStudyDetails;
  readonly searchTags?: readonly string[];
}

export interface WorkFilterOption {
  readonly id: WorkFilterId;
  readonly label: string;
}

export interface WorkMetric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly icon?: IconName;
}
