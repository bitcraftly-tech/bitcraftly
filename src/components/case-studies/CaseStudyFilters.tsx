'use client';

import type { CaseStudyFilterId, CaseStudyFilterOption } from './types';

interface CaseStudyFiltersProps {
  readonly filters: readonly CaseStudyFilterOption[];
  readonly activeFilter: CaseStudyFilterId;
  readonly onChange: (filter: CaseStudyFilterId) => void;
}

export function CaseStudyFilters({ filters, activeFilter, onChange }: CaseStudyFiltersProps) {
  return (
    <div className="cs-filters" role="group" aria-label="Filter case studies by industry">
      {filters.map((filter) => {
        const pressed = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            className="cs-filters__btn"
            aria-pressed={pressed}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
