"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { PortfolioCard } from "./PortfolioCard";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_PRIMARY_CTA,
  PORTFOLIO_PROJECTS,
} from "./portfolio.constants";
import type { PortfolioFilterId } from "./portfolio.types";
import "./portfolio.css";

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>("all");

  const projects = useMemo(() => {
    if (activeFilter === "all") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((project) =>
      project.filterIds.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <div className="w-full min-w-0">
      <div
        className="portfolio-filters"
        role="group"
        aria-label="Portfolio filters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: 8,
          margin: 0,
        }}
      >
        {PORTFOLIO_FILTERS.map((filter) => {
          const isActive = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              className={cn(
                "portfolio-filter rounded-full px-[14px] py-[8px]",
                "font-sans text-[13px] font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive && "is-active",
              )}
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <ul
        className={cn(
          "portfolio-grid-list m-0 grid list-none p-0",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {projects.map((project, index) => (
          <li key={project.id} className="min-w-0">
            <HomepageReveal
              name="portfolio"
              delayMs={index * 70}
              className="h-full"
            >
              <PortfolioCard project={project} />
            </HomepageReveal>
          </li>
        ))}
      </ul>

      {projects.length === 0 ? (
        <p className="mt-[var(--space-5)] text-left text-[15px] text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : null}

      <div
        className="portfolio-grid-footer"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
          paddingTop: 16,
        }}
      >
        <Link
          href={PORTFOLIO_PRIMARY_CTA.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex items-center gap-[6px] no-underline",
            "font-sans text-[15px] font-semibold text-primary",
            "hover:text-primary-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        >
          {PORTFOLIO_PRIMARY_CTA.label}
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[14px] w-[14px] transition-transform duration-[var(--duration-normal)] group-hover:translate-x-[3px]"
          />
        </Link>
      </div>
    </div>
  );
}
