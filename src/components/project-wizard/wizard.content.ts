import { ROUTES } from '@/constants/navigation';
import type {
  WizardBudgetId,
  WizardGoalId,
  WizardIndustryId,
  WizardOption,
  WizardProductId,
  WizardQuestionConfig,
  WizardTimelineId,
} from './types';

export const WIZARD_INTRO = {
  eyebrow: 'AI Project Wizard',
  title: 'Find the right solution in minutes',
  description:
    'Answer five short questions. We’ll recommend a solution, package, timeline, stack, and AI opportunities — no sales call required to explore.',
  startLabel: 'Start Project Wizard',
  trustItems: ['No account needed', 'Mock estimate only', 'Talk to us anytime'] as const,
} as const;

export const WIZARD_QUESTIONS: readonly WizardQuestionConfig[] = [
  {
    id: 'product',
    prompt: 'What do you want to build?',
    helper: 'Pick the closest match. We can refine on a discovery call.',
  },
  {
    id: 'industry',
    prompt: 'Choose your industry',
    helper: 'Industry context shapes workflows, compliance, and UX priorities.',
  },
  {
    id: 'goals',
    prompt: 'What are your business goals?',
    helper: 'Select all that apply.',
    multi: true,
  },
  {
    id: 'budget',
    prompt: 'What’s your budget range?',
    helper: 'Honest ranges help us recommend a realistic package.',
  },
  {
    id: 'timeline',
    prompt: 'When do you need to launch?',
    helper: 'We’ll balance speed with quality and scope.',
  },
] as const;

export const WIZARD_PRODUCT_OPTIONS: readonly WizardOption<WizardProductId>[] = [
  { id: 'website', label: 'Website', description: 'Marketing or business website' },
  { id: 'web-application', label: 'Web Application', description: 'Portals, dashboards, systems' },
  { id: 'mobile-app', label: 'Mobile App', description: 'iOS, Android, or cross-platform' },
  { id: 'ai-product', label: 'AI Product', description: 'Chatbots, agents, automation' },
  { id: 'saas-platform', label: 'SaaS Platform', description: 'Multi-tenant product foundation' },
  { id: 'not-sure', label: 'Not Sure', description: 'Help me decide the right path' },
] as const;

export const WIZARD_INDUSTRY_OPTIONS: readonly WizardOption<WizardIndustryId>[] = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'finance', label: 'Finance' },
  { id: 'travel', label: 'Travel' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'startup', label: 'Startup' },
  { id: 'other', label: 'Other' },
] as const;

export const WIZARD_GOAL_OPTIONS: readonly WizardOption<WizardGoalId>[] = [
  { id: 'generate-leads', label: 'Generate Leads' },
  { id: 'automate-business', label: 'Automate Business' },
  { id: 'sell-products', label: 'Sell Products' },
  { id: 'internal-dashboard', label: 'Internal Dashboard' },
  { id: 'booking', label: 'Booking' },
  { id: 'crm', label: 'CRM' },
  { id: 'erp', label: 'ERP' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'ai', label: 'AI' },
] as const;

export const WIZARD_BUDGET_OPTIONS: readonly WizardOption<WizardBudgetId>[] = [
  { id: 'below-50k', label: '< ₹50K' },
  { id: '50k-1l', label: '₹50K–₹1L' },
  { id: '1l-5l', label: '₹1L–₹5L' },
  { id: '5l-plus', label: '₹5L+' },
] as const;

export const WIZARD_TIMELINE_OPTIONS: readonly WizardOption<WizardTimelineId>[] = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-month', label: '1 Month' },
  { id: '2-months', label: '2 Months' },
  { id: '3-plus-months', label: '3+ Months' },
] as const;

export const WIZARD_ANALYZING = {
  title: 'Designing your project recommendation…',
  steps: [
    'Matching product type to delivery patterns',
    'Aligning industry workflows and goals',
    'Balancing budget and timeline',
    'Surfacing AI opportunities and phases',
  ] as const,
} as const;

export const WIZARD_RESULT_META = {
  eyebrow: 'Your recommendation',
  title: 'Recommended project path',
  description:
    'A mock recommendation based on your answers. We’ll refine scope, cost, and timeline on a discovery call.',
} as const;

export const WIZARD_NAV = {
  backLabel: 'Back',
  continueLabel: 'Continue',
  skipGoalsLabel: 'Skip goals',
  restartLabel: 'Start over',
} as const;

export const WIZARD_FINAL_ACTIONS = [
  {
    id: 'book-call',
    label: 'Book Discovery Call',
    href: `${ROUTES.contact}?intent=discovery&source=project-wizard`,
    variant: 'primary' as const,
  },
  {
    id: 'download-proposal',
    label: 'Download Proposal',
    href: `${ROUTES.contact}?intent=proposal&source=project-wizard`,
    variant: 'outline' as const,
  },
  {
    id: 'send-requirements',
    label: 'Send Requirements',
    href: `${ROUTES.contact}?intent=requirements&source=project-wizard`,
    variant: 'outline' as const,
  },
] as const;
