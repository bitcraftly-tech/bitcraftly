import {
  getLeadStatusCounts,
  listLeads,
  type LeadStatusCounts,
  type PersistedLeadRecord,
} from '@/features/lead-funnel/services/lead.repository';
import { requireOwnerSession } from '@/features/owner-auth/require-owner-session';
import type { OwnerLeadsFilters } from './owner-crm.types';
import {
  formatOwnerLeadSubmittedAt,
  resolveOwnerLeadNotificationStatus,
} from './owner-leads.utils';
import type { OwnerLeadTableRow } from './owner-crm.types';

export interface OwnerLeadsDashboardSuccess {
  readonly ok: true;
  readonly counts: LeadStatusCounts;
  readonly leads: readonly OwnerLeadTableRow[];
  readonly filters: OwnerLeadsFilters;
}

export interface OwnerLeadsDashboardFailure {
  readonly ok: false;
  readonly message: string;
}

export type OwnerLeadsDashboardResult = OwnerLeadsDashboardSuccess | OwnerLeadsDashboardFailure;

function mapLeadToTableRow(lead: PersistedLeadRecord): OwnerLeadTableRow {
  const notification = resolveOwnerLeadNotificationStatus(lead);

  return {
    id: lead.id,
    name: lead.name,
    company: lead.company ?? '—',
    email: lead.email,
    intent: lead.intent,
    status: lead.status,
    notificationStatus: notification.status,
    notificationLabel: notification.label,
    submittedAt: lead.submittedAt,
    submittedAtLabel: formatOwnerLeadSubmittedAt(lead.submittedAt),
  };
}

export async function loadOwnerLeadsDashboard(
  filters: OwnerLeadsFilters,
): Promise<OwnerLeadsDashboardResult> {
  await requireOwnerSession();

  const [countsResult, leadsResult] = await Promise.all([
    getLeadStatusCounts(),
    listLeads(filters),
  ]);

  if (!countsResult.ok) {
    return {
      ok: false,
      message: 'Unable to load lead summary metrics.',
    };
  }

  if (!leadsResult.ok) {
    return {
      ok: false,
      message: 'Unable to load leads.',
    };
  }

  return {
    ok: true,
    counts: countsResult.data,
    leads: leadsResult.data.leads.map(mapLeadToTableRow),
    filters,
  };
}
