import { describe, expect, it } from 'vitest';
import {
  buildLeadServerMetadata,
  resolveClientIp,
} from '@/features/lead-funnel/services/lead-server-context';
import { createLeadRecordFromContactInput } from '@/features/lead-funnel/services/lead-payload.schema';

describe('lead server metadata', () => {
  it('maps request headers into LeadServerMetadata', () => {
    const meta = buildLeadServerMetadata(
      { source: 'contact-form', pagePath: '/contact' },
      {
        referer: 'https://bitcraftly.com/services',
        userAgent: 'Mozilla/5.0 Test',
        clientIp: '203.0.113.10',
      },
      '2026-07-18T00:00:00.000Z',
    );

    expect(meta).toEqual({
      submittedAt: '2026-07-18T00:00:00.000Z',
      source: 'contact-form',
      pagePath: '/contact',
      referer: 'https://bitcraftly.com/services',
      userAgent: 'Mozilla/5.0 Test',
    });
  });

  it('resolves client IP from x-forwarded-for', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.10, 70.41.3.18',
    });

    expect(resolveClientIp(headers)).toBe('203.0.113.10');
  });

  it('embeds server metadata on LeadRecord', () => {
    const parsed = createLeadRecordFromContactInput(
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: '',
        company: '',
        intent: 'consultation',
        message: 'Need help with a SaaS MVP.',
        website: '',
        _honeypot: '',
        source: 'contact-form',
        pagePath: '/contact',
        leadType: 'contact',
      },
      {
        submittedAt: '2026-07-18T00:00:00.000Z',
        source: 'contact-form',
        pagePath: '/contact',
        referer: 'https://bitcraftly.com/',
        userAgent: 'Mozilla/5.0 Test',
      },
    );

    expect(parsed.referer).toBe('https://bitcraftly.com/');
    expect(parsed.userAgent).toBe('Mozilla/5.0 Test');
    expect(parsed.submittedAt).toBe('2026-07-18T00:00:00.000Z');
  });
});
