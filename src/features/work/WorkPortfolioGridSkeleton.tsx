interface WorkPortfolioGridSkeletonProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="work-card-skeleton" aria-hidden>
      <div className="work-card-skeleton__cover" />
      <div className="work-card-skeleton__body">
        <div className="work-card-skeleton__line work-card-skeleton__line--short" />
        <div className="work-card-skeleton__line work-card-skeleton__line--title" />
        <div className="work-card-skeleton__line" />
        <div className="work-card-skeleton__line work-card-skeleton__line--mid" />
        <div className="work-card-skeleton__chips">
          <span />
          <span />
          <span />
        </div>
        <div className="work-card-skeleton__line work-card-skeleton__line--cta" />
      </div>
    </div>
  );
}

/**
 * Loading placeholders for the Portfolio Grid (filter transitions / pending state).
 */
export function WorkPortfolioGridSkeleton({ count = 6 }: WorkPortfolioGridSkeletonProps) {
  return (
    <ul
      className="work-pf-grid work-portfolio-grid--skeleton"
      aria-busy="true"
      aria-label="Loading portfolio projects"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <SkeletonCard />
        </li>
      ))}
    </ul>
  );
}
