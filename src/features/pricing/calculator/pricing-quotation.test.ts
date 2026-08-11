import { describe, expect, it } from 'vitest';
import { calculatePricingEstimate } from './pricing-calculator.engine';
import { ECOMMERCE_QUOTE_PRESET, formatFeatureWiseQuotation } from './pricing-quotation';

describe('formatFeatureWiseQuotation', () => {
  it('builds an ecommerce feature-wise quotation with line items', () => {
    const estimate = calculatePricingEstimate(ECOMMERCE_QUOTE_PRESET);
    const text = formatFeatureWiseQuotation({
      values: ECOMMERCE_QUOTE_PRESET,
      estimate,
      siteOrigin: 'https://bitcraftly.com',
      clientLabel: 'Demo Client',
    });

    expect(estimate.isReady).toBe(true);
    expect(text).toContain('Prepared for: Demo Client');
    expect(text).toContain('Ecommerce store');
    expect(text).toContain('Feature-wise breakdown:');
    expect(text).toContain('Payment Gateway (Razorpay)');
    expect(text).toContain('Admin panel');
    expect(text).toContain('Payment gateway (included for ecommerce):');
    expect(text).toContain('Razorpay checkout');
    expect(text).toContain('https://bitcraftly.com/pricing');
  });
});
