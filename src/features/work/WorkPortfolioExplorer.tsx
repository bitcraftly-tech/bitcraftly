"use client";

import { useDeferredValue, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import {
  WORK_PORTFOLIO_FILTERS,
  WORK_PROJECTS,
} from "./work.content";
import {
  filterProjectsByExplorer,
  matchesPortfolioFilter,
} from "./work.filters";
import { useWorkExplorer } from "./work-explorer-context";
import "./work.css";

/**
 * Portfolio filter chips — same pattern as bitcraftly.com/portfolio.
 */
export function WorkPortfolioExplorer() {
  const { state, setState, startTransition } = useWorkExplorer();
  const deferredState = useDeferredValue(state);
  const matches = useMemo(
    () => filterProjectsByExplorer(WORK_PROJECTS, deferredState),
    [deferredState],
  );

  const catalog = WORK_PROJECTS.filter((project) => project.status !== "future");

  function onSelect(filterId: string) {
    startTransition(() => {
      setState((current) => ({
        ...current,
        portfolioFilter: filterId,
        industries: [],
        services: [],
        technologies: [],
        query: "",
      }));
    });
  }

  return (
    <Section
      id="work-explorer"
      spacing="md"
      background="default"
      aria-labelledby="work-explorer-heading"
      className="work-explorer border-b border-border/40"
    >
      <h2 id="work-explorer-heading" className="sr-only">
        Filter portfolio projects
      </h2>
      <ul className="work-pf-filters" aria-label="Project filters">
        {WORK_PORTFOLIO_FILTERS.map((filter) => {
          const count =
            filter.id === "all"
              ? catalog.length
              : catalog.filter((project) =>
                  matchesPortfolioFilter(project, filter.id),
                ).length;
          const active = state.portfolioFilter === filter.id;
          return (
            <li key={filter.id}>
              <button
                type="button"
                className={cn(
                  "work-pf-filter",
                  active && "work-pf-filter--active",
                )}
                aria-pressed={active}
                onClick={() => onSelect(filter.id)}
              >
                <span>{filter.label}</span>
                <span className="work-pf-filter__count">{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="work-pf-filters__status" aria-live="polite">
        Showing {matches.filter((p) => p.status !== "future").length} projects
      </p>
    </Section>
  );
}
