"use client";

import { useDeferredValue, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { WORK_PORTFOLIO_COPY, WORK_PROJECTS } from "./work.content";
import { filterProjectsByExplorer } from "./work.filters";
import { useWorkExplorer } from "./work-explorer-context";
import { WorkFeaturedShowcase } from "./WorkFeaturedShowcase";
import { WorkPortfolioEmptyState } from "./WorkPortfolioEmptyState";
import { WorkPortfolioGridSkeleton } from "./WorkPortfolioGridSkeleton";
import { WorkProjectCard } from "./WorkProjectCard";
import "./work.css";

/**
 * Portfolio grid — equal 3-column cards like bitcraftly.com/portfolio.
 */
export function WorkPortfolioGrid() {
  const { state, clearFilters, isPending } = useWorkExplorer();
  const deferredState = useDeferredValue(state);

  const projects = useMemo(
    () =>
      filterProjectsByExplorer(WORK_PROJECTS, deferredState).filter(
        (project) => project.status !== "future",
      ),
    [deferredState],
  );

  const futureProject = WORK_PROJECTS.find(
    (project) => project.status === "future",
  );

  const filtering = isPending || deferredState !== state;
  const showEmpty = !filtering && projects.length === 0;

  return (
    <Section
      id="work-portfolio"
      spacing="lg"
      background="surface"
      aria-labelledby="work-portfolio-heading"
      className="work-portfolio border-b border-border/40"
    >
      <header className="sr-only">
        <h2 id="work-portfolio-heading">{WORK_PORTFOLIO_COPY.heading}</h2>
      </header>

      {filtering ? <WorkPortfolioGridSkeleton count={6} /> : null}

      {showEmpty ? (
        <WorkPortfolioEmptyState onClearFilters={clearFilters} />
      ) : null}

      {!filtering && !showEmpty ? (
        <ul className="work-pf-grid" aria-label="Portfolio projects">
          {projects.map((project) => (
            <li key={project.slug}>
              <WorkProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : null}

      {futureProject ? <WorkFeaturedShowcase project={futureProject} /> : null}
    </Section>
  );
}
