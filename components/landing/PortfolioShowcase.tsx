"use client";

import PortfolioShowcaseSection from "@/components/portfolio/showcase/PortfolioShowcaseSection";
import { homePortfolioItems } from "@/lib/portfolioItems";

type PortfolioShowcaseProps = {
  revampLayout?: boolean;
};

export default function PortfolioShowcase({ revampLayout = false }: PortfolioShowcaseProps) {
  return (
    <PortfolioShowcaseSection
      variant="home"
      items={homePortfolioItems}
      filterLayoutId="portfolio-filter-home"
      revampLayout={revampLayout}
    />
  );
}
