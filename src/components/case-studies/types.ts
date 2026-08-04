export type CaseStudyIndustry =
  | 'AI'
  | 'Healthcare'
  | 'E-commerce'
  | 'Education'
  | 'Real Estate'
  | 'CRM'
  | 'ERP'
  | 'Marketplace';

export type CaseStudyFilterId = 'all' | CaseStudyIndustry;

export interface CaseStudyFilterOption {
  readonly id: CaseStudyFilterId;
  readonly label: string;
}

export interface CaseStudyDetailsContent {
  readonly problem: string;
  readonly solution: string;
  readonly technology: string;
  readonly architecture: string;
  readonly features: readonly string[];
  readonly timeline: string;
  readonly challenges: readonly string[];
  readonly results: string;
}

export interface CaseStudyItem {
  readonly id: string;
  readonly industry: CaseStudyIndustry;
  readonly name: string;
  readonly description: string;
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly techStack: readonly string[];
  readonly timeline: string;
  readonly keyFeatures: readonly string[];
  readonly businessOutcome: string;
  readonly ctaLabel: string;
  readonly details: CaseStudyDetailsContent;
}
