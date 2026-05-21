import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";
import { PORTFOLIO_PERF_METRIC, PORTFOLIO_STRUCTURE_STEP } from "@/lib/portfolioPalette";

export default function PortfolioWhyPerform() {
  return (
    <div className={`${CONTAINER} border-t border-[#bdc3c7]/40 py-6 dark:border-[#34495e]/50 lg:py-8`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        {PORTFOLIO.performanceSectionTitle}
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
        {PORTFOLIO.whyPerformTitle}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.whyPerformIntro}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.performanceMetrics.map((metric) => (
          <div key={metric.label} className={PORTFOLIO_PERF_METRIC}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#16a085] dark:text-[#48c9b0]">{metric.label}</p>
            <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-[#2980b9] dark:text-[#5dade2]">{metric.value}</p>
            <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.whyPerformPoints.map((point) => (
          <article key={point.title} className={`${PORTFOLIO_STRUCTURE_STEP} p-4`}>
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{point.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{point.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
