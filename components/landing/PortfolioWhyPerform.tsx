import { CONTAINER, SECTION_PY_COMPACT } from "@/lib/constants";
import { PORTFOLIO } from "@/lib/portfolioContent";
import { PORTFOLIO_PERF_METRIC, PORTFOLIO_STRUCTURE_STEP } from "@/lib/portfolioPalette";

type PortfolioWhyPerformProps = {
  light?: boolean;
};

export default function PortfolioWhyPerform({ light }: PortfolioWhyPerformProps) {
  const border = light ? "border-[#e8ecef]" : "border-[#bdc3c7]/40 dark:border-[#34495e]/50";
  const eyebrow = light ? "text-[#8e44ad]" : "text-text-secondary dark:text-dark-text-secondary";
  const title = light ? "text-[#2c3e50]" : "text-text-primary dark:text-dark-text-primary";
  const body = light ? "text-[#7f8c8d]" : "text-text-secondary dark:text-dark-text-secondary";
  const metricCard = light
    ? "rounded-xl border border-[#e8ecef] bg-white p-4 shadow-sm"
    : PORTFOLIO_PERF_METRIC;
  const stepCard = light
    ? "rounded-xl border border-[#e8ecef] bg-white p-4 shadow-sm transition hover:border-[rgba(142,68,173,0.2)]"
    : `${PORTFOLIO_STRUCTURE_STEP} p-4`;

  return (
    <div className={`${CONTAINER} border-t ${border} ${SECTION_PY_COMPACT} ${light ? "bg-[#fafbfc]" : ""}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.15em] ${eyebrow}`}>{PORTFOLIO.performanceSectionTitle}</p>
      <h2 className={`mt-3 font-[var(--font-playfair)] text-2xl sm:text-3xl ${title}`}>{PORTFOLIO.whyPerformTitle}</h2>
      <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${body}`}>{PORTFOLIO.whyPerformIntro}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.performanceMetrics.map((metric) => (
          <div key={metric.label} className={metricCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#16a085]">{metric.label}</p>
            <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-[#8e44ad]">{metric.value}</p>
            <p className={`mt-1 text-xs ${body}`}>{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO.whyPerformPoints.map((point) => (
          <article key={point.title} className={stepCard}>
            <p className={`text-sm font-semibold ${title}`}>{point.title}</p>
            <p className={`mt-2 text-xs leading-relaxed ${body}`}>{point.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
