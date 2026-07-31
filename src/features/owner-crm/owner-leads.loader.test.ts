import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/features/owner-auth/require-owner-session', () => ({
  requireOwnerSession: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/features/lead-funnel/services/lead.repository', () => ({
  getLeadStatusCounts: vi.fn(),
  listLeads: vi.fn(),
}));

import { getLeadStatusCounts, listLeads } from '@/features/lead-funnel/services/lead.repository';
import { loadOwnerLeadsDashboard } from '@/features/owner-crm/owner-leads.loader';

const COUNTS = {
  total: 3,
  new: 2,
  contacted: 1,
  qualified: 0,
  closed: 0,
  spam: 0,
};

const LEAD = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  leadType: 'contact' as const,
  status: 'new' as const,
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  intent: 'consultation' as const,
  message: 'Need help shipping a SaaS MVP.',
  source: 'contact-form',
  pagePath: '/contact',
  submittedAt: '2026-07-18T00:00:00.000Z',
  notificationSentAt: '2026-07-18T01:00:00.000Z',
  createdAt: '2026-07-18T00:00:00.000Z',
  updatedAt: '2026-07-18T01:00:00.000Z',
};

describe('loadOwnerLeadsDashboard', () => {
  beforeEach(() => {
    vi.mocked(getLeadStatusCounts).mockReset();
    vi.mocked(listLeads).mockReset();
    vi.mocked(getLeadStatusCounts).mockResolvedValue({
      ok: true,
      data: COUNTS,
    });
    vi.mocked(listLeads).mockResolvedValue({
      ok: true,
      data: { leads: [LEAD] },
    });
  });

  it('loads dashboard metrics and table rows', async () => {
    const result = await loadOwnerLeadsDashboard({
      search: 'ada',
      status: 'new',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.counts).toEqual(COUNTS);
      expect(result.leads).toHaveLength(1);
      expect(result.leads[0]?.notificationStatus).toBe('sent');
      expect(result.filters).toEqual({ search: 'ada', status: 'new' });
    }
    expect(listLeads).toHaveBeenCalledWith({ search: 'ada', status: 'new' });
  });

  it('returns a failure when counts cannot be loaded', async () => {
    vi.mocked(getLeadStatusCounts).mockResolvedValueOnce({
      ok: false,
      code: 'DATABASE_UNAVAILABLE',
      message: 'Database is unavailable.',
    });

    const result = await loadOwnerLeadsDashboard({});

    expect(result).toEqual({
      ok: false,
      message: 'Unable to load lead summary metrics.',
    });
  });

  it('returns a failure when leads cannot be loaded', async () => {
    vi.mocked(listLeads).mockResolvedValueOnce({
      ok: false,
      code: 'UNKNOWN',
      message: 'An unexpected database error occurred.',
    });

    const result = await loadOwnerLeadsDashboard({});

    expect(result).toEqual({
      ok: false,
      message: 'Unable to load leads.',
    });
  });
});
