import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import {
  WORK_RESULT_HIGHLIGHTS,
  WORK_RESULT_KPIS,
  WORK_RESULTS_COPY,
} from "./work.content";
import type { WorkResultKpi } from "./work.types";
import "./work.css";

const WorkResultsDashboardVisual = dynamic(
  () =>
    import("./WorkResultsDashboardVisual").then(
      (mod) => mod.WorkResultsDashboardVisual,
    ),
  {
    loading: () => (
      <div
        className="work-results__dashboard work-results__dashboard--skeleton"
        aria-hidden
      />
    ),
    ssr: true,
  },
);

function KpiMicroChart({ kpi }: { kpi: WorkResultKpi }) {
  if (kpi.chart === "ring") {
    return (
      <div
        className="work-results__ring work-results__ring--card"
        style={{ ["--ring-progress" as string]: String(kpi.progress) }}
        role="img"
        aria-label={`${kpi.progress}% progress for ${kpi.label}`}
      >
        <span>{kpi.progress}%</span>
      </div>
    );
  }

  if (kpi.chart === "sparkline") {
    return (
      <svg
        className="work-results__sparkline"
        viewBox="0 0 120 36"
        role="img"
        aria-label={`Rising trend for ${kpi.label}`}
      >
        <path
          d="M0 28 L20 24 L40 26 L60 16 L80 18 L100 10 L120 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kpi.chart === "trend") {
    return (
      <div
        className={cn(
          "work-results__trend",
          kpi.trend === "down" && "work-results__trend--down",
        )}
        role="img"
        aria-label={`${kpi.trend === "down" ? "Downward" : "Upward"} trend for ${kpi.label}`}
      >
        <Icon
          name="trending-up"
          size="sm"
          aria-hidden
          className="h-[16px] w-[16px]"
        />
        <span>{kpi.trend === "down" ? "Improving" : "Growing"}</span>
      </div>
    );
  }

  const heights = [42, 58, 48, 70, Math.max(36, kpi.progress)];
  return (
    <div
      className="work-results__mini-bars"
      role="img"
      aria-label={`Bar chart indicating ${kpi.value} for ${kpi.label}`}
    >
      {heights.map((height, index) => (
        <span
          key={index}
          style={{ ["--bar-h" as string]: `${height}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Business Results & Impact — measurable outcomes (Sprint 5F).
 */
export function WorkResultsSection() {
  return (
    <Section
      id="work-business-results"
      spacing="lg"
      aria-labelledby="work-results-heading"
      className="work-results border-b border-border/40"
    >
      <header className="work-results__intro">
        <p className="work-results__eyebrow">{WORK_RESULTS_COPY.eyebrow}</p>
        <h2 id="work-results-heading" className="work-results__title">
          {WORK_RESULTS_COPY.heading}
        </h2>
        <p className="work-results__description">
          {WORK_RESULTS_COPY.description}
        </p>
      </header>

      <div className="work-results__layout">
        <div className="work-results__kpis">
          <ul className="work-results__kpi-grid" aria-label="Business KPI cards">
            {WORK_RESULT_KPIS.map((kpi) => (
              <li key={kpi.id}>
                <article
                  className={cn(
                    "work-results__kpi",
                    "work-results__glass",
                    `work-results__kpi--${kpi.tone}`,
                  )}
                >
                  <div className="work-results__kpi-top">
                    <span className="work-results__kpi-icon" aria-hidden>
                      <Icon
                        name={kpi.icon}
                        size="sm"
                        className="h-[20px] w-[20px]"
                      />
                    </span>
                    <KpiMicroChart kpi={kpi} />
                  </div>
                  <p className="work-results__kpi-value">{kpi.value}</p>
                  <h3 className="work-results__kpi-label">{kpi.label}</h3>
                  {kpi.hint ? (
                    <p className="work-results__kpi-hint">{kpi.hint}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside
          className="work-results__visual"
          aria-label={WORK_RESULTS_COPY.dashboardLabel}
        >
          <WorkResultsDashboardVisual />
        </aside>
      </div>

      <ul
        className="work-results__highlights"
        aria-label={WORK_RESULTS_COPY.highlightsLabel}
      >
        {WORK_RESULT_HIGHLIGHTS.map((item) => (
          <li key={item.id} className="work-results__highlight work-results__glass">
            <span className="work-results__highlight-arrow" aria-hidden>
              ↓
            </span>
            <div>
              <p className="work-results__highlight-value">{item.value}</p>
              <p className="work-results__highlight-label">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
