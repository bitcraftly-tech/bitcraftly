import type { PersistedLeadStatus } from '@/features/lead-funnel/services/lead.repository';

export const OWNER_CRM_ROUTES = {
  leads: '/owner/leads',
} as const;

export interface OwnerLeadsFilters {
  readonly search?: string;
  readonly status?: PersistedLeadStatus;
}

export type OwnerLeadNotificationStatus = 'sent' | 'failed' | 'pending';

export interface OwnerLeadTableRow {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly intent: string;
  readonly status: PersistedLeadStatus;
  readonly notificationStatus: OwnerLeadNotificationStatus;
  readonly notificationLabel: string;
  readonly submittedAt: string;
  readonly submittedAtLabel: string;
}

export const OWNER_LEAD_STATUS_VALUES = [
  'new',
  'contacted',
  'qualified',
  'closed',
  'spam',
] as const satisfies readonly PersistedLeadStatus[];

export const OWNER_LEAD_STATUS_LABELS: Record<PersistedLeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
  spam: 'Spam',
};

export const OWNER_LEAD_STATUS_FILTER_OPTIONS = OWNER_LEAD_STATUS_VALUES.map((status) => ({
  value: status,
  label: OWNER_LEAD_STATUS_LABELS[status],
}));
