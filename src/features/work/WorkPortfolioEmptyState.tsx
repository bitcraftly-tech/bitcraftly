interface WorkPortfolioEmptyStateProps {
  onClearFilters: () => void;
  title?: string;
  description?: string;
  clearLabel?: string;
}

/**
 * Reusable empty state when Portfolio Explorer filters match nothing.
 */
export function WorkPortfolioEmptyState({
  onClearFilters,
  title = 'No results found.',
  description = 'Try a different industry, service, technology, or search term.',
  clearLabel = 'Clear Filters',
}: WorkPortfolioEmptyStateProps) {
  return (
    <div className="work-portfolio-empty" role="status" aria-live="polite" aria-atomic="true">
      <p className="work-portfolio-empty__title">{title}</p>
      <p className="work-portfolio-empty__description">{description}</p>
      <button type="button" className="work-portfolio-empty__clear" onClick={onClearFilters}>
        {clearLabel}
      </button>
    </div>
  );
}
