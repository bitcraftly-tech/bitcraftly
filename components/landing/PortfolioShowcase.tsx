"use client";

import PortfolioShowcaseSection from "@/components/portfolio/showcase/PortfolioShowcaseSection";
import { homePortfolioItems } from "@/lib/portfolioItems";

export default function PortfolioShowcase() {
  return <PortfolioShowcaseSection variant="home" items={homePortfolioItems} filterLayoutId="portfolio-filter-home" />;
}
