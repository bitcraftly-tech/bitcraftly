"use client";

import { useEffect, useRef, useState } from "react";

import type { PortfolioProject } from "@/lib/portfolio/projectUtils";
import { PS_THUMB } from "@/lib/portfolioShowcaseTheme";
import { cardPreviewAccent } from "@/lib/portfolioVisualUtils";

type PortfolioCardThumbnailProps = {
  project: PortfolioProject;
  variant?: "card" | "compact";
};

/** Lazy-rendered preview — pastel gradient + project icon */
export default function PortfolioCardThumbnail({ project, variant = "card" }: PortfolioCardThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const compact = variant === "compact";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (compact) {
    return (
      <div
        ref={ref}
        className={`${PS_THUMB} size-[88px] sm:size-[100px] ${project.gradient}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cardPreviewAccent(project)}`} aria-hidden />
        {visible ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl drop-shadow-sm sm:text-4xl" aria-hidden>
              {project.emoji}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#ecf0f1]/40" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${cardPreviewAccent(project)}`} aria-hidden />
      {visible ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl drop-shadow-sm sm:text-5xl" aria-hidden>
            {project.emoji}
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-[#ecf0f1]/40" aria-hidden />
      )}
    </div>
  );
}
