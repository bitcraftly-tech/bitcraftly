"use client";

import { useEffect, useState } from "react";

import { CONTAINER } from "@/lib/constants";

const NAV_ITEMS = [
  { id: "project-cost-calculator", label: "Calculator" },
  { id: "pricing-compare", label: "Compare" },
  { id: "fast-packages", label: "Fast packages" },
  { id: "pricing-standard", label: "Standard" },
  { id: "pricing-faq", label: "FAQ" },
] as const;

export default function PricingPageNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Pricing page sections"
      className="sticky top-16 z-30 border-b border-border-primary bg-bg-primary/90 backdrop-blur-md dark:border-dark-border-primary dark:bg-dark-bg-primary/90"
    >
      <div className={`${CONTAINER} flex gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        {NAV_ITEMS.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-[11px] ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
