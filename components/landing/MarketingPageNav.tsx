"use client";

import { useEffect, useState } from "react";

import { CONTAINER, FOCUS_RING } from "@/lib/constants";
import type { PageNavItem } from "@/lib/pageSequences";

type MarketingPageNavProps = {
  items: readonly PageNavItem[];
  ariaLabel: string;
};

export default function MarketingPageNav({ items, ariaLabel }: MarketingPageNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
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
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-16 z-30 border-b border-border-primary bg-bg-primary/90 backdrop-blur-md dark:border-dark-border-primary dark:bg-dark-bg-primary/90"
    >
      <div className={`${CONTAINER} flex gap-2 overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:text-[11px] ${FOCUS_RING} ${
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
