import Link from 'next/link';
import type { OwnerLeadsFilters } from '../owner-crm.types';
import { OWNER_CRM_ROUTES, OWNER_LEAD_STATUS_FILTER_OPTIONS } from '../owner-crm.types';

interface OwnerLeadsFiltersFormProps {
  readonly filters: OwnerLeadsFilters;
}

export function OwnerLeadsFiltersForm({ filters }: OwnerLeadsFiltersFormProps) {
  const searchId = 'owner-leads-search';
  const statusId = 'owner-leads-status';

  return (
    <section aria-labelledby="owner-leads-filters-heading" className="owner-leads-filters">
      <h2 id="owner-leads-filters-heading" className="admin-section__title">
        Search and filter
      </h2>

      <form method="get" action={OWNER_CRM_ROUTES.leads} className="owner-leads-filters__form">
        <div className="owner-leads-filters__field">
          <label htmlFor={searchId}>Search</label>
          <input
            id={searchId}
            name="q"
            type="search"
            defaultValue={filters.search ?? ''}
            placeholder="Name, company, email, or intent"
            autoComplete="off"
          />
        </div>

        <div className="owner-leads-filters__field">
          <label htmlFor={statusId}>Status</label>
          <select id={statusId} name="status" defaultValue={filters.status ?? ''}>
            <option value="">All statuses</option>
            {OWNER_LEAD_STATUS_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="owner-leads-filters__actions">
          <button type="submit" className="owner-leads-button">
            Apply
          </button>
          {filters.search || filters.status ? (
            <Link href={OWNER_CRM_ROUTES.leads} className="owner-leads-link">
              Clear filters
            </Link>
          ) : null}
        </div>
      </form>
    </section>
  );
}
