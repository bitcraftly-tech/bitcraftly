import type { IconName } from '@/components/ui/icon';

export type CalculatorCustomerId = 'personal' | 'business';

export type CalculatorProjectTypeId =
  | 'website'
  | 'web-app'
  | 'ai-solution'
  | 'erp'
  | 'crm'
  | 'saas'
  | 'dashboard'
  | 'mobile-app'
  | 'custom-software';

export type CalculatorFeatureId =
  'authentication' | 'cms' | 'admin' | 'dashboard' | 'payment' | 'api' | 'ai-integration';

export type CalculatorHostingId = 'already-have' | 'setup-for-me';

export type CalculatorMaintenanceId = 'none' | 'monthly';

export type CalculatorTimelineId = 'standard' | 'fast' | 'rush';

export type FounderLanguageId = 'en' | 'hi';

export type CalculatorWizardStepId =
  'customer' | 'project' | 'features' | 'hosting' | 'timeline' | 'summary';

export interface CalculatorCustomerOption {
  id: CalculatorCustomerId;
  label: string;
  description: string;
  icon: IconName;
}

export interface CalculatorProjectType {
  id: CalculatorProjectTypeId;
  label: string;
  description: string;
  icon: IconName;
  /** Shown for these customer types; empty = all */
  customerIds: readonly CalculatorCustomerId[];
  basePrice: number;
  timelineWeeksMin: number;
  timelineWeeksMax: number;
  recommendedStack: readonly string[];
  suggestedPackage: string;
}

export interface CalculatorFeatureOption {
  id: CalculatorFeatureId;
  label: string;
  description: string;
  icon: IconName;
  price: number;
}

export interface CalculatorHostingOption {
  id: CalculatorHostingId;
  label: string;
  description: string;
  icon: IconName;
  /** One-time setup / first-year amount */
  price: number;
  /** Recurring annual amount when applicable */
  annualRenewal: number;
}

export interface CalculatorMaintenanceOption {
  id: CalculatorMaintenanceId;
  label: string;
  description: string;
  icon: IconName;
  monthlyPrice: number;
}

export interface CalculatorTimelineOption {
  id: CalculatorTimelineId;
  label: string;
  description: string;
  icon: IconName;
  multiplier: number;
}

export interface CalculatorWizardStep {
  id: CalculatorWizardStepId;
  label: string;
  tip: string;
}

export interface CalculatorEstimateLine {
  id: string;
  label: string;
  amount: number;
  category: 'project' | 'feature' | 'hosting' | 'maintenance' | 'discount' | 'tax';
  recurring?: boolean;
}

export interface CalculatorSelections {
  customerTypeId: CalculatorCustomerId | null;
  projectTypeId: CalculatorProjectTypeId | null;
  featureIds: CalculatorFeatureId[];
  hostingId: CalculatorHostingId | null;
  maintenanceId: CalculatorMaintenanceId;
  timelineId: CalculatorTimelineId | null;
}

export interface CalculatorEstimateResult {
  lines: CalculatorEstimateLine[];
  projectTotal: number;
  featuresTotal: number;
  hostingTotal: number;
  maintenanceMonthly: number;
  discountTotal: number;
  taxTotal: number;
  estimatedTotal: number;
  annualRenewal: number;
  timelineLabel: string;
  suggestedPackage: string;
  recommendedStack: readonly string[];
  hostingLabel: string;
  isComplete: boolean;
}

export interface FounderLanguageTrack {
  id: FounderLanguageId;
  label: string;
  audioSrc: string;
  transcript: string;
  durationHint?: string;
}

export interface FounderMessageContent {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  heading: string;
  description: string;
  founderName: string;
  founderRole: string;
  founderPhotoSrc: string;
  founderPhotoAlt: string;
  trustBadges: readonly string[];
  languages: readonly FounderLanguageTrack[];
}

export interface CostCalculatorIntroContent {
  badge: string;
  heading: string;
  description: string;
  pricingBadge: string;
  trustBadges: readonly string[];
  calculateCtaLabel: string;
  packagesCtaLabel: string;
  packagesHref: string;
}

export interface CostCalculatorActionLinks {
  bookConsultationHref: string;
  bookConsultationLabel: string;
  requestQuoteHref: string;
  requestQuoteLabel: string;
  downloadEstimateLabel: string;
}

export interface PricingCalculatorCopy {
  eyebrow: string;
  heading: string;
  description: string;
  emptyBreakdownTitle: string;
  emptyBreakdownHint: string;
  liveBreakdownLabel: string;
  estimatedCostLabel: string;
  runningTotalLabel: string;
  annualRenewalLabel: string;
  timelineLabel: string;
  packageLabel: string;
  stackLabel: string;
  disclaimer: string;
  backLabel: string;
  nextLabel: string;
  stickyEstimateLabel: string;
  storageKey: string;
}

export interface PricingTaxConfig {
  enabled: boolean;
  label: string;
  /** Percentage, e.g. 18 for GST */
  ratePercent: number;
}

export interface PricingDiscountConfig {
  enabled: boolean;
  label: string;
  amount: number;
}

/** Full CMS document for homepage cost section + pricing wizard */
export interface CostCalculatorCmsContent {
  sectionId: string;
  headingId: string;
  intro: CostCalculatorIntroContent;
  founder: FounderMessageContent;
  calculator: PricingCalculatorCopy;
  actions: CostCalculatorActionLinks;
  steps: readonly CalculatorWizardStep[];
  customers: readonly CalculatorCustomerOption[];
  projectTypes: readonly CalculatorProjectType[];
  features: readonly CalculatorFeatureOption[];
  hostingOptions: readonly CalculatorHostingOption[];
  maintenanceOptions: readonly CalculatorMaintenanceOption[];
  timelines: readonly CalculatorTimelineOption[];
  tax: PricingTaxConfig;
  discount: PricingDiscountConfig;
  defaultSelections: CalculatorSelections;
}
