import { describe, expect, it } from 'vitest';
import { contactLeadFormSchema } from '@/features/lead-funnel/contact-form.schema';

describe('contactLeadFormSchema', () => {
  it('accepts a valid lead payload', () => {
    const parsed = contactLeadFormSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      phone: '+91 90000 00000',
      company: 'Analytical Engines',
      intent: 'consultation',
      message: 'We need a marketing site and AI assistant.',
      website: 'https://example.com',
    });

    expect(parsed.success).toBe(true);
  });

  it('rejects short messages and invalid email', () => {
    const parsed = contactLeadFormSchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      intent: 'audit',
      message: 'Hi',
      phone: '',
      company: '',
      website: '',
    });

    expect(parsed.success).toBe(false);
  });
});
