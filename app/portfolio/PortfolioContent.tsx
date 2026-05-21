"use client";

import PortfolioShowcaseSection from "@/components/portfolio/showcase/PortfolioShowcaseSection";
import { portfolioPageItems } from "@/lib/portfolioItems";

export default function PortfolioContent() {
  return <PortfolioShowcaseSection variant="page" items={portfolioPageItems} filterLayoutId="portfolio-filter-page" />;
}
