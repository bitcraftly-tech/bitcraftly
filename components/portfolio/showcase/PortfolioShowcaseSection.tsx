"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

import PortfolioAnimatedGrid from "@/components/portfolio/showcase/PortfolioAnimatedGrid";
import PortfolioDetailModal from "@/components/portfolio/showcase/PortfolioDetailModal";
import PortfolioFeaturedCard from "@/components/portfolio/showcase/PortfolioFeaturedCard";
import PortfolioFilterBar from "@/components/portfolio/showcase/PortfolioFilterBar";
import PortfolioShowcaseCta from "@/components/portfolio/showcase/PortfolioShowcaseCta";
import PortfolioShowcaseHero from "@/components/portfolio/showcase/PortfolioShowcaseHero";
import PortfolioAfterCta from "@/components/landing/PortfolioAfterCta";
import PortfolioWhyPerform from "@/components/landing/PortfolioWhyPerform";
import { CONTAINER, SECTION_PY_CTA, SECTION_SCROLL_MT } from "@/lib/constants";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import { filterPortfolioByCategory, type PortfolioCategoryId } from "@/lib/portfolio/categories";
import { enrichProjects, type PortfolioProject } from "@/lib/portfolio/projectUtils";
import type { PortfolioItem } from "@/lib/portfolioItems";
import { PORTFOLIO_LIGHT_WRAPPER } from "@/lib/portfolioShowcaseTheme";

import "./portfolio-showcase.css";

export type PortfolioShowcaseVariant = "home" | "page";

type PortfolioShowcaseSectionProps = {
  variant: PortfolioShowcaseVariant;
  items: PortfolioItem[];
  filterLayoutId?: string;
};

export default function PortfolioShowcaseSection({
  variant,
  items,
  filterLayoutId,
}: PortfolioShowcaseSectionProps) {
  const [category, setCategory] = useState<PortfolioCategoryId>("all");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  useReducedMotion();

  const filtered = useMemo(() => enrichProjects(filterPortfolioByCategory(items, category)), [items, category]);
  const showFeatured = category === "all" || category === "startup-mvp" || category === "ui-systems";

  const isHome = variant === "home";
  const sectionId = isHome ? "portfolio" : undefined;
  const filterId = filterLayoutId ?? (isHome ? "portfolio-filter-home" : "portfolio-filter-page");

  const content = (
    <section
      id={sectionId}
      className={`ps-showcase-section ${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY_CTA}`}
      aria-labelledby={isHome ? "portfolio-showcase-heading" : "portfolio-page-heading"}
    >
      <div className="ps-showcase-mesh" aria-hidden />

      <div className="ps-showcase-inner space-y-10 md:space-y-12">
        <PortfolioShowcaseHero variant={variant} />

        <PortfolioFilterBar active={category} onChange={setCategory} items={items} layoutId={filterId} />

        <PortfolioAnimatedGrid projects={filtered} onOpenCaseStudy={setSelected} showFeaturedSeparately={showFeatured} />

        {showFeatured ? (
          <div className="space-y-4">
            <div className="ps-showcase-divider" aria-hidden />
            <PortfolioFeaturedCard />
          </div>
        ) : null}

        <PortfolioShowcaseCta source={isHome ? "portfolio-home" : "portfolio-page"} />
      </div>
    </section>
  );

  if (isHome) {
    return (
      <div className={PORTFOLIO_LIGHT_WRAPPER}>
        {content}
        <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
        <PortfolioWhyPerform light />
        <PortfolioAfterCta />
      </div>
    );
  }

  return (
    <div className={PORTFOLIO_LIGHT_WRAPPER}>
      {content}
      <PortfolioDetailModal project={selected} onClose={() => setSelected(null)} />
      <PortfolioWhyPerform light />
      <PortfolioAfterCta />
    </div>
  );
}
