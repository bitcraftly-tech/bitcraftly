import type { TrustedByStat, TrustedByValue } from './trusted-by.types';

export const TRUSTED_BY_ID = 'trusted-by';
export const TRUSTED_BY_HEADING_ID = 'trusted-by-heading';

export const TRUSTED_BY_HEADING_LINE_1 = 'Trusted Engineering.';
export const TRUSTED_BY_HEADING_LINE_2 = 'Measurable Outcomes.';

export const TRUSTED_BY_VALUES: readonly TrustedByValue[] = [
  {
    id: 'ai-powered',
    icon: 'sparkles',
    line1: 'AI\u2011Powered',
    line2: 'Solutions',
    label: 'AI-Powered Solutions',
  },
  {
    id: 'enterprise-architecture',
    icon: 'layers',
    line1: 'Enterprise',
    line2: 'Architecture',
    label: 'Enterprise Architecture',
  },
  {
    id: 'performance',
    icon: 'gauge',
    line1: 'Performance',
    line2: 'Optimized',
    label: 'Performance Optimized',
  },
  {
    id: 'secure',
    icon: 'shield-check',
    line1: 'Secure',
    line2: 'Development',
    label: 'Secure Development',
  },
  {
    id: 'scalable',
    icon: 'trend-up',
    line1: 'Scalable',
    line2: 'Systems',
    label: 'Scalable Systems',
  },
  {
    id: 'partnership',
    icon: 'handshake',
    line1: 'Long\u2011term',
    line2: 'Partnership',
    label: 'Long-term Partnership',
  },
] as const;

/** Homepage metrics — available for reuse below the trust bar if needed. */
export const TRUSTED_BY_STATS: readonly TrustedByStat[] = [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support' },
] as const;
