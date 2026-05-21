"use client";

import { AnimatePresence, motion } from "framer-motion";

import PortfolioShowcaseCard from "@/components/portfolio/showcase/PortfolioShowcaseCard";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";

type PortfolioAnimatedGridProps = {
  projects: PortfolioProject[];
  onOpenCaseStudy: (project: PortfolioProject) => void;
  layout?: "home" | "page";
};

export default function PortfolioAnimatedGrid({ projects, onOpenCaseStudy, layout = "home" }: PortfolioAnimatedGridProps) {
  const gridClass =
    layout === "home"
      ? "grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";

  if (projects.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-dashed border-[#95a5a6]/50 bg-bg-card px-4 py-8 text-center text-sm text-text-secondary dark:border-[#7f8c8d]/50"
      >
        No projects in this category — try another filter or{" "}
        <a href="/contact" className="font-semibold text-[#2980b9] hover:underline">
          contact us
        </a>{" "}
        for a custom build.
      </motion.p>
    );
  }

  return (
    <motion.div layout className={gridClass}>
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <PortfolioShowcaseCard key={project.slug} project={project} index={index} onOpenCaseStudy={onOpenCaseStudy} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
