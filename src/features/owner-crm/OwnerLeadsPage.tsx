import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader';
import { hasActiveOwnerLeadsFilters } from './owner-leads.utils';
import type { OwnerLeadsDashboardSuccess } from './owner-leads.loader';
import { OwnerLeadsFiltersForm } from './components/OwnerLeadsFiltersForm';
import { OwnerLeadsStatCards } from './components/OwnerLeadsStatCards';
import { OwnerLeadsTable } from './components/OwnerLeadsTable';

interface OwnerLeadsDashboardProps {
  readonly data: OwnerLeadsDashboardSuccess;
}

export function OwnerLeadsDashboard({ data }: OwnerLeadsDashboardProps) {
  const filtersActive = hasActiveOwnerLeadsFilters(data.filters);
  const emptyLabel =
    data.counts.total === 0
      ? 'No leads captured yet.'
      : filtersActive
        ? 'No leads match your search or filter.'
        : 'No leads captured yet.';

  return (
    <div className="admin-page owner-leads-page">
      <AdminPageHeader
        title="Lead Intelligence"
        description="Read-only owner dashboard for captured leads, lifecycle status, and notification delivery audit."
        actionLabel="Export"
        actionDisabledReason="Export is planned for a later sprint."
      />

      <OwnerLeadsStatCards counts={data.counts} />
      <OwnerLeadsFiltersForm filters={data.filters} />

      <section aria-labelledby="owner-leads-table-heading" className="admin-section">
        <h2 id="owner-leads-table-heading" className="admin-section__title">
          Leads
        </h2>
        <OwnerLeadsTable rows={data.leads} emptyLabel={emptyLabel} />
      </section>
    </div>
  );
}

interface OwnerLeadsErrorStateProps {
  readonly message: string;
}

export function OwnerLeadsErrorState({ message }: OwnerLeadsErrorStateProps) {
  return (
    <div className="admin-page owner-leads-page">
      <AdminPageHeader
        title="Lead Intelligence"
        description="Read-only owner dashboard for captured leads, lifecycle status, and notification delivery audit."
        actionLabel="Export"
        actionDisabledReason="Export is planned for a later sprint."
      />
      <div className="admin-empty owner-leads-empty" role="alert">
        <p>{message}</p>
      </div>
    </div>
  );
}
