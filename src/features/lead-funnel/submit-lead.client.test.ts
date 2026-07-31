import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/lead-funnel/services/lead.repository', () => ({
  saveLead: vi.fn(),
  markNotificationSent: vi.fn(),
  markNotificationFailed: vi.fn(),
}));

import { mapSubmitLeadFailureToUserMessage } from '@/features/lead-funnel/submit-lead.client';

describe('mapSubmitLeadFailureToUserMessage', () => {
  it('returns validation messages from the server', () => {
    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'VALIDATION',
        message: 'Enter a valid email address.',
      }),
    ).toBe('Enter a valid email address.');
  });

  it('never exposes internal delivery errors', () => {
    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'DELIVERY',
        message: 'Lead email delivery is not configured.',
      }),
    ).toBe(
      'We could not deliver your message right now. Please try again or contact us on WhatsApp.',
    );
  });

  it('never exposes internal persistence errors', () => {
    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'PERSISTENCE',
        message: 'Database is unavailable.',
      }),
    ).toBe('We could not save your request right now. Please try again or contact us on WhatsApp.');
  });

  it('maps honeypot, rate limit, and unknown failures to safe copy', () => {
    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'HONEYPOT',
        message: 'internal',
      }),
    ).toBe('Unable to submit your request. Please try again.');

    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'RATE_LIMIT',
        message: 'internal',
      }),
    ).toContain('Too many submissions');

    expect(
      mapSubmitLeadFailureToUserMessage({
        ok: false,
        code: 'UNKNOWN',
        message: 'internal',
      }),
    ).toBe('Something went wrong. Please try again.');
  });
});
