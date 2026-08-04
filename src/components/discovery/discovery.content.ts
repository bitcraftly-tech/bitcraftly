import { ROUTES } from '@/constants/navigation';
import type {
  DiscoveryBudgetId,
  DiscoveryFeatureId,
  DiscoveryIndustryId,
  DiscoveryOption,
  DiscoveryProductId,
  DiscoveryQuestionConfig,
  DiscoveryTimelineId,
} from './types';

export const DISCOVERY_INTRO = {
  eyebrow: 'AI Discovery',
  title: 'Get a free estimate in minutes',
  description:
    'Answer a few questions. Our AI business consultant will recommend the right package, timeline, and stack — no commitment.',
  startLabel: 'Get Free Estimate',
  trustItems: ['No credit card', 'Mock estimate only', 'Talk to a human anytime'] as const,
} as const;

export const DISCOVERY_QUESTIONS: readonly DiscoveryQuestionConfig[] = [
  {
    id: 'product',
    prompt: 'What would you like to build?',
    helper: 'Choose the closest match — we can refine later.',
  },
  {
    id: 'industry',
    prompt: 'Which industry are you in?',
    helper: 'This helps us tailor workflows and compliance needs.',
  },
  {
    id: 'budget',
    prompt: 'What’s your approximate budget?',
    helper: 'Ranges keep scoping honest and realistic.',
  },
  {
    id: 'timeline',
    prompt: 'When do you need to launch?',
    helper: 'We’ll balance speed with quality and scope.',
  },
  {
    id: 'features',
    prompt: 'Which features do you need?',
    helper: 'Select all that apply. You can skip if you’re unsure.',
    multi: true,
  },
] as const;

export const DISCOVERY_PRODUCT_OPTIONS: readonly DiscoveryOption<DiscoveryProductId>[] = [
  { id: 'website', label: 'Website', description: 'Marketing or business site' },
  { id: 'web-app', label: 'Web App', description: 'Dashboards, portals, systems' },
  { id: 'mobile-app', label: 'Mobile App', description: 'iOS, Android, or cross-platform' },
  { id: 'ai-solution', label: 'AI Solution', description: 'Chatbots, agents, automation' },
  { id: 'other', label: 'Other', description: 'Something custom' },
] as const;

export const DISCOVERY_INDUSTRY_OPTIONS: readonly DiscoveryOption<DiscoveryIndustryId>[] = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'travel', label: 'Travel' },
  { id: 'finance', label: 'Finance' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'other', label: 'Other' },
] as const;

export const DISCOVERY_BUDGET_OPTIONS: readonly DiscoveryOption<DiscoveryBudgetId>[] = [
  { id: 'below-50k', label: 'Below ₹50K' },
  { id: '50k-1l', label: '₹50K–₹1L' },
  { id: '1l-5l', label: '₹1L–₹5L' },
  { id: '5l-plus', label: '₹5L+' },
] as const;

export const DISCOVERY_TIMELINE_OPTIONS: readonly DiscoveryOption<DiscoveryTimelineId>[] = [
  { id: 'urgent', label: 'Urgent' },
  { id: '1-month', label: '1 Month' },
  { id: '2-3-months', label: '2–3 Months' },
  { id: 'flexible', label: 'Flexible' },
] as const;

export const DISCOVERY_FEATURE_OPTIONS: readonly DiscoveryOption<DiscoveryFeatureId>[] = [
  { id: 'authentication', label: 'Authentication' },
  { id: 'admin', label: 'Admin' },
  { id: 'payments', label: 'Payments' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'ai', label: 'AI' },
  { id: 'cms', label: 'CMS' },
  { id: 'booking', label: 'Booking' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'reports', label: 'Reports' },
] as const;

export const DISCOVERY_ANALYZING = {
  title: 'Analyzing your requirements…',
  steps: [
    'Mapping product type to delivery patterns',
    'Aligning industry workflows',
    'Balancing budget and timeline',
    'Assembling package recommendation',
  ] as const,
} as const;

export const DISCOVERY_RESULT_META = {
  eyebrow: 'Your estimate',
  title: 'Recommended path forward',
  description: 'A mock recommendation based on your answers — refined on a discovery call.',
  continueLabel: 'Save & continue',
} as const;

export const DISCOVERY_LEAD_META = {
  eyebrow: 'Almost done',
  title: 'Where should we send your estimate?',
  description: 'We’ll use this to prepare a clearer proposal. Nothing is submitted to a backend in this demo.',
  submitLabel: 'Continue to next steps',
} as const;

export const DISCOVERY_COMPLETE_META = {
  eyebrow: 'Next steps',
  title: 'Your discovery estimate is ready',
  description: 'Choose how you’d like to move forward with Bitcraftly.',
} as const;

export const DISCOVERY_FINAL_ACTIONS = [
  {
    id: 'book-call',
    label: 'Book Discovery Call',
    href: ROUTES.contact,
    variant: 'primary' as const,
  },
  {
    id: 'download-proposal',
    label: 'Download Proposal',
    href: ROUTES.contact,
    variant: 'outline' as const,
  },
  {
    id: 'talk-expert',
    label: 'Talk to an Expert',
    href: ROUTES.contact,
    variant: 'outline' as const,
  },
] as const;

export const DISCOVERY_NAV = {
  backLabel: 'Back',
  skipFeaturesLabel: 'Skip features',
  continueFeaturesLabel: 'Continue',
  restartLabel: 'Start over',
} as const;
