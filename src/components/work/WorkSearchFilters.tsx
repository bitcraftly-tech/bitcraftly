import { Icon } from '@/components/ui/icon';
import { WORK_FILTERS, WORK_HERO } from './work.content';
import type { WorkFilterId } from './types';

interface WorkSearchFiltersProps {
  readonly query: string;
  readonly activeFilter: WorkFilterId;
  readonly onQueryChange: (value: string) => void;
  readonly onFilterChange: (filter: WorkFilterId) => void;
}

export function WorkSearchFilters({
  query,
  activeFilter,
  onQueryChange,
  onFilterChange,
}: WorkSearchFiltersProps) {
  return (
    <div className="wp-controls">
      <div className="wp-search">
        <span className="wp-search__icon" aria-hidden>
          <Icon name="search" size="sm" className="h-[16px] w-[16px]" />
        </span>
        <label htmlFor="work-search-input" className="sr-only">
          Search work projects
        </label>
        <input
          id="work-search-input"
          type="search"
          className="wp-search__input"
          value={query}
          placeholder={WORK_HERO.searchPlaceholder}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="wp-filters" role="group" aria-label="Filter work by industry">
        {WORK_FILTERS.map((filter) => {
          const pressed = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              className="wp-filters__btn"
              aria-pressed={pressed}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
