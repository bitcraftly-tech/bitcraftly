import { describe, expect, it } from 'vitest';
import {
  calculatePricingEstimate,
  formatInr,
} from '@/features/pricing/calculator/pricing-calculator.engine';

describe('calculatePricingEstimate', () => {
  it('returns an incomplete state when required fields are missing', () => {
    const result = calculatePricingEstimate({});
    expect(result.isReady).toBe(false);
    expect(result.packageName).toBe('Complete the form');
    expect(result.estimatedTotal).toBe(0);
  });

  it('computes a ready estimate for a standard business site', () => {
    const result = calculatePricingEstimate({
      websiteType: 'business',
      pages: '6-10',
      features: ['seo'],
      timeline: 'standard',
      budget: '50k-1L',
    });

    expect(result.isReady).toBe(true);
    expect(result.estimatedTotal).toBeGreaterThan(0);
    expect(result.estimatedMin).toBeLessThanOrEqual(result.estimatedTotal);
    expect(result.estimatedMax).toBeGreaterThanOrEqual(result.estimatedTotal);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.packageName.length).toBeGreaterThan(0);
  });

  it('flags budget alignment when the estimate exceeds the selected band', () => {
    const result = calculatePricingEstimate({
      websiteType: 'saas',
      pages: '40+',
      features: ['cms', 'auth', 'payments', 'admin', 'api', 'ai-chat'],
      timeline: 'rush',
      budget: 'under-25k',
    });

    expect(result.isReady).toBe(true);
    expect(result.budgetAlignment).toBe('above');
  });
});

describe('formatInr', () => {
  it('formats values as Indian Rupees without fraction digits', () => {
    const formatted = formatInr(125000);
    expect(formatted).toContain('1,25,000');
    expect(formatted).toMatch(/₹|INR/);
  });
});
