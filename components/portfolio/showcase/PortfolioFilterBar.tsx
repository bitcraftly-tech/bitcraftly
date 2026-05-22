"use client";

import { motion } from "framer-motion";

import PortfolioFilterIcon from "@/components/portfolio/showcase/PortfolioFilterIcon";
import { countByCategory, PORTFOLIO_CATEGORIES, type PortfolioCategoryId } from "@/lib/portfolio/categories";
import { PS_FILTER_ACTIVE, PS_FILTER_IDLE } from "@/lib/portfolioShowcaseTheme";
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
      className="relative -mx-1 flex gap-2 overflow-x-auto pb-2 scrollbar-thin sm:flex-wrap sm:overflow-visible"
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
            className={`relative shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 ${
              isActive ? PS_FILTER_ACTIVE : PS_FILTER_IDLE
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[#8e44ad]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className={`relative flex items-center gap-1.5 ${isActive ? "text-white" : "text-[#2c3e50]"}`}>
              <PortfolioFilterIcon name={cat.icon} className="size-3.5 shrink-0 opacity-90" />
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.shortLabel}</span>
              {!isActive && count > 0 ? (
                <span className="rounded-full bg-[#ecf0f1] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[#7f8c8d]">
                  {count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
