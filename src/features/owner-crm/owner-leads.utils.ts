import type { PersistedLeadStatus } from '@/features/lead-funnel/services/lead.repository';
import type { OwnerLeadNotificationStatus, OwnerLeadsFilters } from './owner-crm.types';
import { OWNER_LEAD_STATUS_VALUES } from './owner-crm.types';

const STATUS_SET = new Set<string>(OWNER_LEAD_STATUS_VALUES);

export function isPersistedLeadStatus(value: string): value is PersistedLeadStatus {
  return STATUS_SET.has(value);
}

export function parseOwnerLeadsSearchParams(
  params: Record<string, string | string[] | undefined>,
): OwnerLeadsFilters {
  const rawSearch = params.q;
  const rawStatus = params.status;
  const search =
    typeof rawSearch === 'string' && rawSearch.trim().length > 0 ? rawSearch.trim() : undefined;
  const statusValue = typeof rawStatus === 'string' ? rawStatus.trim() : '';
  const status = isPersistedLeadStatus(statusValue) ? statusValue : undefined;

  return { search, status };
}

export function hasActiveOwnerLeadsFilters(filters: OwnerLeadsFilters): boolean {
  return Boolean(filters.search || filters.status);
}

export function formatOwnerLeadSubmittedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function resolveOwnerLeadNotificationStatus(input: {
  readonly notificationSentAt?: string;
  readonly notificationError?: string;
}): {
  readonly status: OwnerLeadNotificationStatus;
  readonly label: string;
} {
  if (input.notificationSentAt) {
    return {
      status: 'sent',
      label: `Sent ${formatOwnerLeadSubmittedAt(input.notificationSentAt)}`,
    };
  }

  if (input.notificationError) {
    return {
      status: 'failed',
      label: 'Failed',
    };
  }

  return {
    status: 'pending',
    label: 'Pending',
  };
}

export function buildOwnerLeadsQueryString(filters: OwnerLeadsFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set('q', filters.search);
  }

  if (filters.status) {
    params.set('status', filters.status);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}
