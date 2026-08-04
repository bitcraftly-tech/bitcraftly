export type DiscoveryStepId =
  | 'intro'
  | 'product'
  | 'industry'
  | 'budget'
  | 'timeline'
  | 'features'
  | 'analyzing'
  | 'result'
  | 'lead'
  | 'complete';

export type DiscoveryProductId =
  | 'website'
  | 'web-app'
  | 'mobile-app'
  | 'ai-solution'
  | 'other';

export type DiscoveryIndustryId =
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'real-estate'
  | 'travel'
  | 'finance'
  | 'manufacturing'
  | 'other';

export type DiscoveryBudgetId = 'below-50k' | '50k-1l' | '1l-5l' | '5l-plus';

export type DiscoveryTimelineId = 'urgent' | '1-month' | '2-3-months' | 'flexible';

export type DiscoveryFeatureId =
  | 'authentication'
  | 'admin'
  | 'payments'
  | 'dashboard'
  | 'ai'
  | 'cms'
  | 'booking'
  | 'inventory'
  | 'reports';

export interface DiscoveryOption<T extends string = string> {
  readonly id: T;
  readonly label: string;
  readonly description?: string;
}

export interface DiscoveryAnswers {
  readonly product: DiscoveryProductId | null;
  readonly industry: DiscoveryIndustryId | null;
  readonly budget: DiscoveryBudgetId | null;
  readonly timeline: DiscoveryTimelineId | null;
  readonly features: readonly DiscoveryFeatureId[];
}

export interface DiscoveryRecommendation {
  readonly packageName: string;
  readonly packageSummary: string;
  readonly estimatedTimeline: string;
  readonly estimatedInvestment: string;
  readonly techStack: readonly string[];
  readonly suggestedAddOns: readonly string[];
  readonly why: readonly string[];
}

export interface DiscoveryLead {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly company: string;
}

export interface DiscoveryQuestionConfig {
  readonly id: Exclude<
    DiscoveryStepId,
    'intro' | 'analyzing' | 'result' | 'lead' | 'complete'
  >;
  readonly prompt: string;
  readonly helper: string;
  readonly multi?: boolean;
}
