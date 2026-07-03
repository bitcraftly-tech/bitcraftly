"use client";

import { useEffect, useRef, useState } from "react";

import PortfolioMockupInterior from "@/components/portfolio/showcase/PortfolioMockupInterior";
import type { PortfolioProject } from "@/lib/portfolio/projectUtils";

type PortfolioCardThumbnailProps = {
  project: PortfolioProject;
  variant?: "card" | "compact" | "featured";
};

/** Browser-frame website preview — 16:10, neutral SaaS aesthetic */
export default function PortfolioCardThumbnail({ project, variant = "card" }: PortfolioCardThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const compact = variant === "compact";
  const featured = variant === "featured";

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

  if (featured) {
    return (
      <div ref={ref} className="ps-browser-frame overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="flex items-center gap-1.5 border-b border-[#E5E7EB] bg-white px-2.5 py-2">
          <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
          <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
          <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
          <span className="ml-1 h-3.5 min-w-0 flex-1 rounded bg-[#F3F4F6]" aria-hidden />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          {visible ? (
            <div className="ps-featured-preview absolute inset-0 origin-center transition-transform duration-250 ease-out group-hover:scale-[1.02]">
              <PortfolioMockupInterior variant={project.mockup} />
            </div>
          ) : (
            <div className="absolute inset-0 animate-pulse bg-[#F3F4F6]" aria-hidden />
          )}
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        ref={ref}
        className="relative size-[88px] shrink-0 overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] sm:size-[100px]"
      >
        {visible ? (
          <div className="absolute inset-0 p-1.5">
            <PortfolioMockupInterior variant={project.mockup} />
          </div>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#F3F4F6]" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="ps-browser-frame overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
      <div className="flex items-center gap-1.5 border-b border-[#E5E7EB] bg-white px-2.5 py-2">
        <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
        <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
        <span className="size-2 rounded-full bg-[#E5E7EB]" aria-hidden />
        <span className="ml-1 h-3.5 min-w-0 flex-1 rounded bg-[#F3F4F6]" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        {visible ? (
          <div className="ps-browser-preview absolute inset-0 origin-center transition-transform duration-250 ease-out group-hover:scale-[1.03]">
            <PortfolioMockupInterior variant={project.mockup} />
          </div>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#F3F4F6]" aria-hidden />
        )}
      </div>
    </div>
  );
}
