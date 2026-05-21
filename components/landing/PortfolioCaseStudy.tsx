import Link from "next/link";

import { CASE_STUDY_LABELS } from "@/lib/portfolioContent";
import type { PortfolioItem } from "@/lib/portfolioItems";

type PortfolioCaseStudyProps = {
  item: PortfolioItem;
};

function TechPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function PortfolioCaseStudy({ item }: PortfolioCaseStudyProps) {
  const { caseStudy } = item;

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-2xl border border-border-primary bg-bg-secondary/30 p-6 dark:border-dark-border-primary dark:bg-dark-bg-secondary/25 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">{item.badge}</p>
        <p className="mt-2 text-sm font-medium text-text-primary dark:text-dark-text-primary">{item.resultHighlight}</p>
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
            {CASE_STUDY_LABELS.techStack}
          </p>
          <div className="mt-2">
            <TechPills stack={item.techStack} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.problem}</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{caseStudy.problem}</p>
        </div>
        <div>
          <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.solution}</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{caseStudy.solution}</p>
        </div>
      </div>

      <div>
        <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.results}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {caseStudy.results.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 rounded-lg border border-border-primary bg-bg-card px-3 py-2 text-sm text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
            >
              <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-dashed border-border-primary bg-bg-card/50 p-5 dark:border-dark-border-primary dark:bg-dark-bg-card/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">{caseStudy.beforeLabel}</p>
          <ul className="mt-3 space-y-2">
            {caseStudy.beforePoints.map((p) => (
              <li key={p} className="text-sm text-text-secondary dark:text-dark-text-secondary">
                · {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 dark:border-indigo-400/25 dark:bg-indigo-500/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{caseStudy.afterLabel}</p>
          <ul className="mt-3 space-y-2">
            {caseStudy.afterPoints.map((p) => (
              <li key={p} className="text-sm text-text-secondary dark:text-dark-text-secondary">
                ✔ {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-border-primary pt-6 dark:border-dark-border-primary">
        <Link
          href="/contact?intent=consultation&source=case-study"
          className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Scope a project like this
        </Link>
        <Link href="/portfolio" className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary">
          ← All portfolio
        </Link>
      </div>
    </div>
  );
}
