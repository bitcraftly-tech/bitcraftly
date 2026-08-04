export type WizardStepId =
  | 'intro'
  | 'product'
  | 'industry'
  | 'goals'
  | 'budget'
  | 'timeline'
  | 'analyzing'
  | 'result';

export type WizardProductId =
  | 'website'
  | 'web-application'
  | 'mobile-app'
  | 'ai-product'
  | 'saas-platform'
  | 'not-sure';

export type WizardIndustryId =
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'real-estate'
  | 'manufacturing'
  | 'finance'
  | 'travel'
  | 'restaurant'
  | 'startup'
  | 'other';

export type WizardGoalId =
  | 'generate-leads'
  | 'automate-business'
  | 'sell-products'
  | 'internal-dashboard'
  | 'booking'
  | 'crm'
  | 'erp'
  | 'marketplace'
  | 'ai';

export type WizardBudgetId = 'below-50k' | '50k-1l' | '1l-5l' | '5l-plus';

export type WizardTimelineId = 'asap' | '1-month' | '2-months' | '3-plus-months';

export interface WizardOption<T extends string = string> {
  readonly id: T;
  readonly label: string;
  readonly description?: string;
}

export interface WizardAnswers {
  readonly product: WizardProductId | null;
  readonly industry: WizardIndustryId | null;
  readonly goals: readonly WizardGoalId[];
  readonly budget: WizardBudgetId | null;
  readonly timeline: WizardTimelineId | null;
}

export interface WizardPhase {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly duration: string;
}

export interface WizardRecommendation {
  readonly solutionName: string;
  readonly solutionSummary: string;
  readonly bestPackage: string;
  readonly packageSummary: string;
  readonly estimatedTimeline: string;
  readonly estimatedCost: string;
  readonly suggestedTechnology: readonly string[];
  readonly aiOpportunities: readonly string[];
  readonly developmentPhases: readonly WizardPhase[];
  readonly recommendedAddOns: readonly string[];
  readonly why: readonly string[];
}

export interface WizardQuestionConfig {
  readonly id: Extract<WizardStepId, 'product' | 'industry' | 'goals' | 'budget' | 'timeline'>;
  readonly prompt: string;
  readonly helper: string;
  readonly multi?: boolean;
}
