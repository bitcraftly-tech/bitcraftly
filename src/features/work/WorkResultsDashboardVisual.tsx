"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { WORK_RESULT_HIGHLIGHTS } from "./work.content";

const DASHBOARD_TABS = [
  {
    id: "performance",
    label: "Performance",
    value: "+40%",
    caption: "Faster delivery cycles",
    bars: [42, 58, 51, 67, 74, 82, 88],
  },
  {
    id: "automation",
    label: "Automation",
    value: "65%",
    caption: "Manual process coverage",
    bars: [28, 36, 44, 49, 55, 61, 65],
  },
  {
    id: "scale",
    label: "Scale",
    value: "2M+",
    caption: "Users on delivered surfaces",
    bars: [30, 38, 47, 56, 68, 79, 91],
  },
] as const;

/**
 * Interactive analytics illustration — CSS/SVG only, no chart libraries.
 */
export function WorkResultsDashboardVisual() {
  const baseId = useId();
  const [activeId, setActiveId] = useState<(typeof DASHBOARD_TABS)[number]["id"]>(
    "performance",
  );
  const active = DASHBOARD_TABS.find((tab) => tab.id === activeId) ?? DASHBOARD_TABS[0];
  const tablistId = `${baseId}-tabs`;

  return (
    <div
      className="work-results__dashboard work-results__glass"
      aria-label="Interactive analytics dashboard illustration"
    >
      <div className="work-results__dashboard-head">
        <div>
          <p className="work-results__dashboard-eyebrow">Live impact view</p>
          <p className="work-results__dashboard-title">Delivery analytics</p>
        </div>
        <span className="work-results__metric-badge" aria-hidden>
          ↑ trending
        </span>
      </div>

      <div
        className="work-results__dashboard-tabs"
        role="tablist"
        aria-label="Impact metrics"
        id={tablistId}
      >
        {DASHBOARD_TABS.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "work-results__dashboard-tab",
                selected && "work-results__dashboard-tab--active",
              )}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => {
                const index = DASHBOARD_TABS.findIndex((item) => item.id === tab.id);
                let nextIndex: number | null = null;
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  nextIndex = (index + 1) % DASHBOARD_TABS.length;
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  nextIndex =
                    (index - 1 + DASHBOARD_TABS.length) % DASHBOARD_TABS.length;
                }
                if (nextIndex === null) return;
                const next = DASHBOARD_TABS[nextIndex];
                setActiveId(next.id);
                requestAnimationFrame(() => {
                  document
                    .getElementById(`${baseId}-tab-${next.id}`)
                    ?.focus();
                });
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="work-results__dashboard-panel"
      >
        <div className="work-results__dashboard-hero-metric">
          <p className="work-results__dashboard-value">{active.value}</p>
          <p className="work-results__dashboard-caption">{active.caption}</p>
        </div>

        <div
          className="work-results__dashboard-bars"
          role="img"
          aria-label={`${active.label} trend bars illustrating ${active.value} ${active.caption}`}
        >
          {active.bars.map((height, index) => (
            <span
              key={`${active.id}-${index}`}
              className="work-results__dashboard-bar"
              style={{ ["--bar-h" as string]: `${height}%` }}
            />
          ))}
        </div>

        <svg
          className="work-results__dashboard-spark"
          viewBox="0 0 220 56"
          role="img"
          aria-label={`${active.label} sparkline rising toward ${active.value}`}
        >
          <defs>
            <linearGradient id={`${baseId}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 42 L32 38 L64 40 L96 28 L128 30 L160 18 L192 14 L220 8 V56 H0 Z"
            fill={`url(#${baseId}-fill)`}
          />
          <path
            d="M0 42 L32 38 L64 40 L96 28 L128 30 L160 18 L192 14 L220 8"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="work-results__dashboard-rings" aria-hidden>
          <div
            className="work-results__ring work-results__ring--lg"
            style={{ ["--ring-progress" as string]: "78" }}
          >
            <span>78%</span>
          </div>
          <div
            className="work-results__ring"
            style={{ ["--ring-progress" as string]: "65" }}
          >
            <span>65%</span>
          </div>
        </div>
      </div>

      <ul className="work-results__dashboard-chips" aria-label="Spotlight metrics">
        {WORK_RESULT_HIGHLIGHTS.slice(0, 3).map((item) => (
          <li key={item.id}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
