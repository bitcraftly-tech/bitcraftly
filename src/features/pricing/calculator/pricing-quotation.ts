import type { PricingEstimateResult } from './pricing-calculator.engine';
import { formatInr } from './pricing-calculator.engine';
import type { PricingCalculatorFormValues } from './pricing-calculator.schema';
import {
  PAGE_RANGE_OPTIONS,
  TIMELINE_OPTIONS,
  WEBSITE_TYPE_OPTIONS,
} from './pricing-calculator.config';

/**
 * One-click preset for ecommerce quotations.
 * Payment Gateway (Razorpay) is always included for store builds.
 */
export const ECOMMERCE_QUOTE_PRESET: PricingCalculatorFormValues = {
  websiteType: 'ecommerce',
  pages: '6-10',
  features: ['payments', 'admin', 'seo', 'analytics'],
  timeline: 'standard',
  budget: '50k-1L',
};

/** Features that must stay selected for ecommerce store quotes. */
export const ECOMMERCE_REQUIRED_FEATURES = ['payments'] as const;

/**
 * Builds a WhatsApp / email ready feature-wise quotation text.
 */
export function formatFeatureWiseQuotation(options: {
  readonly values: Partial<PricingCalculatorFormValues>;
  readonly estimate: PricingEstimateResult;
  readonly siteOrigin?: string;
  readonly clientLabel?: string;
}): string {
  const { values, estimate, siteOrigin = 'https://bitcraftly.com', clientLabel } = options;

  if (!estimate.isReady) {
    return 'Complete website type, pages, timeline, and budget to generate a quotation.';
  }

  const isEcommerce = values.websiteType === 'ecommerce';
  const typeLabel =
    WEBSITE_TYPE_OPTIONS.find((item) => item.id === values.websiteType)?.label ?? 'Website';
  const pagesLabel =
    PAGE_RANGE_OPTIONS.find((item) => item.id === values.pages)?.label ?? 'Pages TBD';
  const timelineLabel =
    TIMELINE_OPTIONS.find((item) => item.id === values.timeline)?.label ?? estimate.timelineLabel;

  const lines = [
    'Bitcraftly — Feature-wise quotation (indicative)',
    clientLabel ? `Prepared for: ${clientLabel}` : null,
    '',
    `Project type: ${typeLabel}`,
    `Pages: ${pagesLabel}`,
    `Timeline: ${timelineLabel}`,
    `Recommended package: ${estimate.packageName}`,
    '',
    'Feature-wise breakdown:',
    ...estimate.lines.map((line) => `• ${line.label} — ${formatInr(line.amount)}`),
    '',
    `Subtotal (approx): ${formatInr(estimate.estimatedTotal)}`,
    `Estimated range: ${formatInr(estimate.estimatedMin)} – ${formatInr(estimate.estimatedMax)}`,
    '',
    isEcommerce ? 'Payment gateway (included for ecommerce):' : null,
    isEcommerce ? '• Razorpay checkout — UPI, cards, netbanking' : null,
    isEcommerce ? '• Order success / failure handling' : null,
    isEcommerce ? '• Client Razorpay account + live keys at go-live' : null,
    isEcommerce ? '• Razorpay transaction fees are charged by Razorpay (not Bitcraftly)' : null,
    isEcommerce ? '' : null,
    'Notes:',
    '• Indicative only — GST extra',
    '• Final written quote after discovery / scope confirmation',
    '• No payment required to discuss scope',
    '',
    `Pricing page: ${siteOrigin}/pricing`,
    `Book call: ${siteOrigin}/contact?intent=quote&source=feature-quotation`,
  ];

  return lines.filter((line) => line !== null).join('\n');
}
