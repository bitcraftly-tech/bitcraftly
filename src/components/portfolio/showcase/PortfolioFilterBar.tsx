'use client';

import { motion } from 'framer-motion';

import PortfolioFilterIcon from '@/components/portfolio/showcase/PortfolioFilterIcon';
import {
  countByCategory,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryId,
} from '@/lib/portfolio/categories';
import type { PortfolioItem } from '@/lib/portfolioItems';

import './portfolio-showcase.css';

type PortfolioFilterBarProps = {
  active: PortfolioCategoryId;
  onChange: (id: PortfolioCategoryId) => void;
  items: PortfolioItem[];
  layoutId?: string;
};

export default function PortfolioFilterBar({
  active,
  onChange,
  items,
  layoutId = 'portfolio-filter',
}: PortfolioFilterBarProps) {
  return (
    <div className="ps-filter-dock">
      <div className="ps-filter-scroll" role="tablist" aria-label="Filter portfolio projects">
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
              className={`ps-filter-tab ${isActive ? 'ps-filter-tab--active' : 'ps-filter-tab--idle'}`}
            >
              {isActive ? (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-[#8e44ad]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span
                className={`relative flex items-center gap-1.5 ${isActive ? 'text-white' : ''}`}
              >
                <PortfolioFilterIcon name={cat.icon} className="size-3.5 shrink-0 opacity-90" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.shortLabel}</span>
                {!isActive && count > 0 ? <span className="ps-filter-count">{count}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
