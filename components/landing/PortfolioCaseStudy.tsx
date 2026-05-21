import Link from "next/link";

import { CASE_STUDY_LABELS, PORTFOLIO } from "@/lib/portfolioContent";
import type { PortfolioItem } from "@/lib/portfolioItems";
import { newTabProps } from "@/lib/newTabLink";
import {
  PORTFOLIO_CASE_AFTER,
  PORTFOLIO_CASE_BEFORE,
  PORTFOLIO_CASE_DEMO,
  PORTFOLIO_CASE_LIVE,
  PORTFOLIO_CASE_OVERVIEW,
  PORTFOLIO_CTA_PRIMARY,
  PORTFOLIO_CTA_SECONDARY,
  PORTFOLIO_PERF_METRIC,
  PORTFOLIO_RESULT_HIGHLIGHT,
} from "@/lib/portfolioPalette";
import {
  PORTFOLIO_CHECK_ICON,
  projectBadgeClasses,
  projectFocusClasses,
  techStackBadgeClasses,
} from "@/lib/portfolioVisualUtils";

type PortfolioCaseStudyProps = {
  item: PortfolioItem;
};

function TechPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span key={tech} className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${techStackBadgeClasses(tech)}`}>
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function PortfolioCaseStudy({ item }: PortfolioCaseStudyProps) {
  const { caseStudy } = item;
  const live = item.liveUrl?.trim();
  const demo = item.demoHref?.trim();

  return (
    <div className="mt-10 space-y-8">
      <div className={PORTFOLIO_CASE_OVERVIEW}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2980b9] dark:text-[#5dade2]">{CASE_STUDY_LABELS.overview}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${projectFocusClasses(item.projectFocus)}`}>
            {item.projectFocus}
          </span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${projectBadgeClasses(item.badge)}`}>
            {item.badge}
          </span>
        </div>
        <p className={`mt-3 text-sm font-medium ${PORTFOLIO_RESULT_HIGHLIGHT}`}>{item.resultHighlight}</p>
        {caseStudy.trustNote ? (
          <p className="mt-3 text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
            <span className="font-semibold not-italic text-[#7f8c8d] dark:text-[#bdc3c7]">{CASE_STUDY_LABELS.trust}: </span>
            {caseStudy.trustNote}
          </p>
        ) : null}
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7f8c8d] dark:text-[#bdc3c7]">{CASE_STUDY_LABELS.techStack}</p>
          <div className="mt-2">
            <TechPills stack={item.techStack} />
          </div>
        </div>
      </div>

      {live ? (
        <div className={PORTFOLIO_CASE_LIVE}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#27ae60] dark:text-[#58d68d]">{CASE_STUDY_LABELS.live}</p>
          <p className="mt-2 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{PORTFOLIO.liveProjectTitle}</p>
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.liveProjectBody}</p>
          <a href={live} className={`mt-4 inline-flex ${PORTFOLIO_CTA_PRIMARY}`} {...newTabProps(live)}>
            Open live site →
          </a>
        </div>
      ) : demo ? (
        <div className={PORTFOLIO_CASE_DEMO}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e44ad] dark:text-[#c39bd3]">{PORTFOLIO.demoProjectTitle}</p>
          <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{PORTFOLIO.demoProjectBody}</p>
          <a href={demo} className={`mt-4 inline-flex ${PORTFOLIO_CTA_SECONDARY}`} {...newTabProps(demo)}>
            {item.ctaLabel ?? "Open demo →"}
          </a>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#bdc3c7]/40 bg-bg-card/60 p-5 dark:border-[#34495e]/45 dark:bg-dark-bg-card/60">
          <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.problem}</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{caseStudy.problem}</p>
        </div>
        <div className="rounded-xl border border-[#3498db]/25 bg-[#3498db]/4 p-5 dark:border-[#2980b9]/30 dark:bg-[#2980b9]/8">
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
              className="flex items-start gap-2 rounded-lg border border-[#bdc3c7]/40 bg-bg-card px-3 py-2 text-sm text-text-secondary dark:border-[#34495e]/45 dark:bg-dark-bg-card dark:text-dark-text-secondary"
            >
              <span className={PORTFOLIO_CHECK_ICON} aria-hidden>
                ✔
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {caseStudy.performance && caseStudy.performance.length > 0 ? (
        <div>
          <h2 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{CASE_STUDY_LABELS.performance}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.performance.map((metric) => (
              <div key={metric.label} className={PORTFOLIO_PERF_METRIC}>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#16a085] dark:text-[#48c9b0]">{metric.label}</p>
                <p className="mt-1 font-[var(--font-playfair)] text-lg font-semibold text-[#2980b9] dark:text-[#5dade2]">{metric.value}</p>
                {metric.note ? <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{metric.note}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className={PORTFOLIO_CASE_BEFORE}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#95a5a6] dark:text-[#bdc3c7]">{caseStudy.beforeLabel}</p>
          <ul className="mt-3 space-y-2">
            {caseStudy.beforePoints.map((p) => (
              <li key={p} className="text-sm text-text-secondary dark:text-dark-text-secondary">
                · {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={PORTFOLIO_CASE_AFTER}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2980b9] dark:text-[#5dade2]">{caseStudy.afterLabel}</p>
          <ul className="mt-3 space-y-2">
            {caseStudy.afterPoints.map((p) => (
              <li key={p} className="text-sm text-text-secondary dark:text-dark-text-secondary">
                ✔ {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[#bdc3c7]/40 pt-6 dark:border-[#34495e]/50">
        <Link
          href={`/contact?service=${encodeURIComponent(item.title)}&intent=consultation&source=case-study`}
          className={PORTFOLIO_CTA_PRIMARY}
        >
          Scope a project like this
        </Link>
        <Link href="/portfolio" className={PORTFOLIO_CTA_SECONDARY}>
          ← All portfolio
        </Link>
      </div>
    </div>
  );
}
