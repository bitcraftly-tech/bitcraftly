"use client";

import { useEffect, useState } from "react";

import { CONTAINER } from "@/lib/constants";

const NAV_ITEMS = [
  { id: "pricing-plans", label: "Plans" },
  { id: "pricing-compare", label: "Compare" },
  { id: "fast-packages", label: "Fast launch" },
  { id: "project-cost-calculator", label: "Calculator" },
  { id: "pricing-faq", label: "FAQ" },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function PricingPageNav() {
  const [activeId, setActiveId] = useState<NavId>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id as NavId);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Pricing page sections"
      className="sticky top-16 z-30 border-b border-border-primary bg-bg-primary/90 backdrop-blur-md dark:border-dark-border-primary dark:bg-dark-bg-primary/90"
    >
      <div
        className={`${CONTAINER} flex gap-2 overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {NAV_ITEMS.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary ${
                active
                  ? "bg-accent-primary text-white dark:bg-indigo-600"
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
