export type CostCalculatorAnalyticsEvent =
  | 'calculator_opened'
  | 'estimate_generated'
  | 'founder_audio_played'
  | 'language_switched'
  | 'book_consultation_clicked'
  | 'view_packages_clicked'
  | 'quote_requested'
  | 'download_estimate_clicked';

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Lightweight analytics bridge — pushes to dataLayer when available.
 */
export function trackCostCalculatorEvent(
  event: CostCalculatorAnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') return;

  const entry = {
    event: `homepage_cost_calculator_${event}`,
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(entry);
}
