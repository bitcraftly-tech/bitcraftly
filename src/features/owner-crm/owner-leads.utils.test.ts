import { describe, expect, it } from 'vitest';
import {
  hasActiveOwnerLeadsFilters,
  isPersistedLeadStatus,
  parseOwnerLeadsSearchParams,
  resolveOwnerLeadNotificationStatus,
} from '@/features/owner-crm/owner-leads.utils';

describe('parseOwnerLeadsSearchParams', () => {
  it('parses search and status filters', () => {
    expect(
      parseOwnerLeadsSearchParams({
        q: '  ada@example.com ',
        status: 'qualified',
      }),
    ).toEqual({
      search: 'ada@example.com',
      status: 'qualified',
    });
  });

  it('ignores invalid status values', () => {
    expect(
      parseOwnerLeadsSearchParams({
        q: 'consultation',
        status: 'invalid',
      }),
    ).toEqual({
      search: 'consultation',
      status: undefined,
    });
  });
});

describe('isPersistedLeadStatus', () => {
  it('accepts supported lead statuses', () => {
    expect(isPersistedLeadStatus('new')).toBe(true);
    expect(isPersistedLeadStatus('spam')).toBe(true);
    expect(isPersistedLeadStatus('draft')).toBe(false);
  });
});

describe('hasActiveOwnerLeadsFilters', () => {
  it('detects active filters', () => {
    expect(hasActiveOwnerLeadsFilters({})).toBe(false);
    expect(hasActiveOwnerLeadsFilters({ search: 'ada' })).toBe(true);
    expect(hasActiveOwnerLeadsFilters({ status: 'new' })).toBe(true);
  });
});

describe('resolveOwnerLeadNotificationStatus', () => {
  it('returns sent when notificationSentAt exists', () => {
    const result = resolveOwnerLeadNotificationStatus({
      notificationSentAt: '2026-07-18T12:00:00.000Z',
    });

    expect(result.status).toBe('sent');
    expect(result.label).toContain('Sent');
  });

  it('returns failed when notificationError exists', () => {
    expect(
      resolveOwnerLeadNotificationStatus({
        notificationError: 'Invalid from address',
      }),
    ).toEqual({
      status: 'failed',
      label: 'Failed',
    });
  });

  it('returns pending when no audit fields exist', () => {
    expect(resolveOwnerLeadNotificationStatus({})).toEqual({
      status: 'pending',
      label: 'Pending',
    });
  });
});
