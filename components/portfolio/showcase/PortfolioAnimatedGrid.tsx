"use client";

import { AnimatePresence, motion } from "framer-motion";

import PortfolioShowcaseCard from "@/components/portfolio/showcase/PortfolioShowcaseCard";
import { PORTFOLIO_FEATURED } from "@/lib/portfolioContent";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";

type PortfolioAnimatedGridProps = {
  projects: PortfolioProject[];
  onOpenCaseStudy: (project: PortfolioProject) => void;
  showFeaturedSeparately?: boolean;
};

export default function PortfolioAnimatedGrid({
  projects,
  onOpenCaseStudy,
  showFeaturedSeparately = true,
}: PortfolioAnimatedGridProps) {
  const gridProjects = showFeaturedSeparately
    ? projects.filter((p) => p.slug !== PORTFOLIO_FEATURED.slug)
    : projects;

  if (gridProjects.length === 0) {
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
    <motion.div layout className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {gridProjects.map((project, index) => (
          <PortfolioShowcaseCard key={project.slug} project={project} index={index} onOpenCaseStudy={onOpenCaseStudy} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
