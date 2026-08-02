import { z } from 'zod';

export const websiteTypeValues = ['marketing', 'business', 'ecommerce', 'web-app', 'saas'] as const;

export const pageRangeValues = ['1-5', '6-10', '11-20', '21-40', '40+'] as const;

export const featureValues = [
  'cms',
  'auth',
  'payments',
  'blog',
  'admin',
  'seo',
  'analytics',
  'ai-chat',
  'multilingual',
  'api',
] as const;

export const timelineValues = ['flexible', 'standard', 'fast', 'rush'] as const;

export const budgetValues = [
  'under-25k',
  '25k-50k',
  '50k-1L',
  '1L-2L',
  '2L-plus',
  'unsure',
] as const;

export const pricingCalculatorSchema = z.object({
  websiteType: z.enum(websiteTypeValues, {
    error: 'Select a website type',
  }),
  pages: z.enum(pageRangeValues, {
    error: 'Select an approximate page count',
  }),
  features: z.array(z.enum(featureValues)).min(0).max(featureValues.length),
  timeline: z.enum(timelineValues, {
    error: 'Select a preferred timeline',
  }),
  budget: z.enum(budgetValues, {
    error: 'Select a budget range',
  }),
});

export type PricingCalculatorFormValues = z.infer<typeof pricingCalculatorSchema>;

export type WebsiteType = (typeof websiteTypeValues)[number];
export type PageRange = (typeof pageRangeValues)[number];
export type FeatureId = (typeof featureValues)[number];
export type TimelineId = (typeof timelineValues)[number];
export type BudgetId = (typeof budgetValues)[number];
