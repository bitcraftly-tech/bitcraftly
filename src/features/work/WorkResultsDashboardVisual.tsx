"use client";

import { useId, useState } from "react";
import {
  SlidingPillIndicator,
  useSlidingPillIndicator,
} from "@/components/patterns/sliding-pill";
import { cn } from "@/lib/cn";

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
 * Compact impact analytics — tabs + metric + bars.
 */
export function WorkResultsDashboardVisual() {
  const baseId = useId();
  const [activeId, setActiveId] = useState<(typeof DASHBOARD_TABS)[number]["id"]>(
    "performance",
  );
  const active =
    DASHBOARD_TABS.find((tab) => tab.id === activeId) ?? DASHBOARD_TABS[0];
  const pill = useSlidingPillIndicator(activeId);

  return (
    <div
      className="work-results__dash"
      aria-label="Interactive analytics dashboard illustration"
    >
      <div className="work-results__dash-head">
        <div>
          <p className="work-results__dash-eyebrow">Live impact view</p>
          <p className="work-results__dash-title">Delivery analytics</p>
        </div>

        <div
          ref={pill.containerRef}
          className="work-results__dash-tabs sliding-pill-track"
          role="tablist"
          aria-label="Impact metrics"
        >
          <SlidingPillIndicator style={pill.indicatorStyle} variant="primary" />
          {DASHBOARD_TABS.map((tab) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                ref={pill.itemRef(tab.id)}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "work-results__dash-tab",
                  selected && "work-results__dash-tab--active",
                )}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => {
                  const index = DASHBOARD_TABS.findIndex(
                    (item) => item.id === tab.id,
                  );
                  let nextIndex: number | null = null;
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    nextIndex = (index + 1) % DASHBOARD_TABS.length;
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    nextIndex =
                      (index - 1 + DASHBOARD_TABS.length) %
                      DASHBOARD_TABS.length;
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
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="work-results__dash-body"
      >
        <div className="work-results__dash-metric">
          <p className="work-results__dash-value">{active.value}</p>
          <p className="work-results__dash-caption">{active.caption}</p>
        </div>

        <div
          className="work-results__dash-bars"
          role="img"
          aria-label={`${active.label} trend bars illustrating ${active.value} ${active.caption}`}
        >
          {active.bars.map((height, index) => (
            <span
              key={`${active.id}-${index}`}
              className="work-results__dash-bar"
              style={{ ["--bar-h" as string]: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
