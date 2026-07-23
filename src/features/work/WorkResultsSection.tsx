import dynamic from "next/dynamic";
import Link from "next/link";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import {
  WORK_RESULT_HIGHLIGHTS,
  WORK_RESULT_KPIS,
  WORK_RESULTS_COPY,
} from "./work.content";
import "./work.css";

const WorkResultsDashboardVisual = dynamic(
  () =>
    import("./WorkResultsDashboardVisual").then(
      (mod) => mod.WorkResultsDashboardVisual,
    ),
  {
    loading: () => (
      <div className="work-results__dash work-results__dash--skeleton" aria-hidden />
    ),
    ssr: true,
  },
);

/**
 * Business Outcomes — single outcomes panel (KPIs + analytics + highlights).
 */
export function WorkResultsSection() {
  return (
    <Section
      id="work-business-results"
      spacing="lg"
      aria-labelledby="work-results-heading"
      className="work-results border-b border-border/40"
    >
      <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow={WORK_RESULTS_COPY.eyebrow}
          headingId="work-results-heading"
          title={WORK_RESULTS_COPY.heading}
          description={WORK_RESULTS_COPY.description}
        />
        <Link
          href="/contact?intent=consultation&source=work-results"
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Book a call
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px]"
          />
        </Link>
      </div>

      <div className="work-results__panel">
        <ul className="work-results__stats" aria-label="Business KPI cards">
          {WORK_RESULT_KPIS.map((kpi) => (
            <li key={kpi.id}>
              <article
                className={cn(
                  "work-results__stat",
                  `work-results__stat--${kpi.tone}`,
                )}
              >
                <span className="work-results__stat-icon" aria-hidden>
                  <Icon
                    name={kpi.icon}
                    size="sm"
                    className="h-[15px] w-[15px]"
                  />
                </span>
                <div className="work-results__stat-copy">
                  <p className="work-results__stat-value">{kpi.value}</p>
                  <h3 className="work-results__stat-label">{kpi.label}</h3>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <aside
          className="work-results__visual"
          aria-label={WORK_RESULTS_COPY.dashboardLabel}
        >
          <WorkResultsDashboardVisual />
        </aside>

        <ul
          className="work-results__pills"
          aria-label={WORK_RESULTS_COPY.highlightsLabel}
        >
          {WORK_RESULT_HIGHLIGHTS.map((item) => (
            <li key={item.id}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
