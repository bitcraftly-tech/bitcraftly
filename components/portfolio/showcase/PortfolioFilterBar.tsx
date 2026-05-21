"use client";

import { motion } from "framer-motion";

import { PORTFOLIO_FILTER_ACTIVE, PORTFOLIO_FILTER_IDLE } from "@/lib/portfolioPalette";
import { countByCategory, PORTFOLIO_CATEGORIES, type PortfolioCategoryId } from "@/lib/portfolio/categories";
import type { PortfolioItem } from "@/lib/portfolioItems";

type PortfolioFilterBarProps = {
  active: PortfolioCategoryId;
  onChange: (id: PortfolioCategoryId) => void;
  items: PortfolioItem[];
  layoutId?: string;
};

export default function PortfolioFilterBar({ active, onChange, items, layoutId = "portfolio-filter" }: PortfolioFilterBarProps) {
  return (
    <div
      className="relative -mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-thin sm:flex-wrap sm:overflow-visible"
      role="tablist"
      aria-label="Filter portfolio projects"
    >
      {PORTFOLIO_CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        const count = countByCategory(items, cat.id);
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={`relative shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 ${
              isActive ? PORTFOLIO_FILTER_ACTIVE : PORTFOLIO_FILTER_IDLE
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full border border-[#3498db]/40 bg-[#3498db]/12"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.shortLabel}</span>
              <span className="rounded-full bg-[#34495e]/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[#7f8c8d] dark:bg-[#ecf0f1]/10 dark:text-[#bdc3c7]">
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
