"use client";

import { AnimatePresence, motion } from "framer-motion";

import PortfolioShowcaseCard from "@/components/portfolio/showcase/PortfolioShowcaseCard";
import PortfolioShowcaseCardRevamp from "@/components/portfolio/showcase/PortfolioShowcaseCardRevamp";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";

type PortfolioAnimatedGridProps = {
  projects: PortfolioProject[];
  onOpenCaseStudy: (project: PortfolioProject) => void;
  showFeaturedSeparately?: boolean;
  revampLayout?: boolean;
  maxItems?: number;
};

export default function PortfolioAnimatedGrid({
  projects,
  onOpenCaseStudy,
  showFeaturedSeparately = true,
  revampLayout = false,
  maxItems,
}: PortfolioAnimatedGridProps) {
  const gridProjects = showFeaturedSeparately
    ? projects.filter((p) => p.slug !== PORTFOLIO_FEATURED.slug)
    : projects;
  const visibleProjects = maxItems ? gridProjects.slice(0, maxItems) : gridProjects;

  if (visibleProjects.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-dashed border-[#bdc3c7]/60 bg-white px-6 py-10 text-center text-sm text-[#7f8c8d]"
      >
        No projects in this category — try another filter or{" "}
        <a href="/contact" className="font-semibold text-[#8e44ad] hover:underline">
          contact us
        </a>{" "}
        for a custom build.
      </motion.p>
    );
  }

  return (
    <motion.div layout className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {visibleProjects.map((project, index) =>
          revampLayout ? (
            <PortfolioShowcaseCardRevamp key={project.slug} project={project} index={index} />
          ) : (
            <PortfolioShowcaseCard key={project.slug} project={project} index={index} onOpenCaseStudy={onOpenCaseStudy} />
          ),
        )}
      </AnimatePresence>
    </motion.div>
  );
}
