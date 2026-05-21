import { CONTAINER } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";
import { PORTFOLIO_STRUCTURE_STEP } from "@/lib/portfolioPalette";

/** How we present projects — trust & case study format (homepage + portfolio page) */
export default function PortfolioShowcaseStructure() {
  return (
    <div className={`${CONTAINER} border-t border-[#bdc3c7]/40 py-6 dark:border-[#34495e]/50 lg:py-8`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        {PORTFOLIO.structureTitle}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.trustStoryline}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.structureSteps.map((item) => (
          <article key={item.step} className={PORTFOLIO_STRUCTURE_STEP}>
            <p className="text-xs font-bold text-[#2980b9] dark:text-[#5dade2]">{item.step}</p>
            <p className="mt-2 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
