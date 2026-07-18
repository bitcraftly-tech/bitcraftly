export default function OwnerLeadsLoading() {
  return (
    <div
      className="admin-page owner-leads-page"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <h1 className="admin-page-header__title">Lead Intelligence</h1>
          <p className="admin-page-header__description">
            Loading captured leads and pipeline metrics…
          </p>
        </div>
      </div>

      <section aria-labelledby="owner-leads-loading-stats" className="admin-section">
        <h2 id="owner-leads-loading-stats" className="admin-section__title">
          Pipeline snapshot
        </h2>
        <div className="owner-leads-loading__stats">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={`owner-leads-stat-${index}`}
              className="owner-leads-loading__card"
              aria-hidden="true"
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="owner-leads-loading-table" className="admin-section">
        <h2 id="owner-leads-loading-table" className="admin-section__title">
          Leads
        </h2>
        <div className="owner-leads-loading__table">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={`owner-leads-row-${index}`}
              className="owner-leads-loading__row"
              aria-hidden="true"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
