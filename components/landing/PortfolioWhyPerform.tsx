import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";

export default function PortfolioWhyPerform() {
  return (
    <div className={`${CONTAINER} border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Performance
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
        {PORTFOLIO.whyPerformTitle}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.whyPerformIntro}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.whyPerformPoints.map((point) => (
          <article
            key={point.title}
            className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{point.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{point.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
