/** Frontend-only mock estimator — delegates intelligence to recommendation engine. */

import { buildProjectRecommendation } from './components/recommendation';

export interface MockEstimate {
  readonly projectType: string;
  readonly businessCategory: string;
  readonly minLabel: string;
  readonly maxLabel: string;
  readonly packageName: string;
  readonly packageSummary: string;
  readonly timeline: string;
  readonly techStack: readonly string[];
  readonly addOns: readonly string[];
  readonly whyPackage: string;
  readonly reply: string;
}

export function isBriefVague(text: string): boolean {
  const cleaned = text.trim();
  if (cleaned.length < 12) {
    return true;
  }

  const hasSignal =
    /website|web\s?app|site|landing|brochure|business|starter|professional|corporate|shop|store|ecommerce|e-?commerce|grocery|clinic|hospital|doctor|crm|booking|dashboard|portal|saas|ai|chat|bot|whatsapp|cms|blog|payment|form|auth|login|admin/.test(
      cleaned.toLowerCase(),
    );

  return !hasSignal;
}

export function mockEstimateFromPrompt(prompt: string, priorContext = ''): MockEstimate {
  const recommendation = buildProjectRecommendation(prompt, priorContext);

  return {
    projectType: recommendation.projectType,
    businessCategory: recommendation.businessCategory,
    minLabel: recommendation.minLabel,
    maxLabel: recommendation.maxLabel,
    packageName: recommendation.packageName,
    packageSummary: recommendation.packageSummary,
    timeline: recommendation.timeline,
    techStack: recommendation.techStack,
    addOns: recommendation.addOns,
    whyPackage: recommendation.whyRecommendation,
    reply: recommendation.reply,
  };
}

export const ESTIMATOR_LOADING_STEPS = [
  'Understanding requirements',
  'Detecting industry & project type',
  'Matching the best package',
  'Estimating timeline & investment',
  'Preparing recommendation',
] as const;
