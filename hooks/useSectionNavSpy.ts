"use client";

import { useEffect, useState } from "react";

const SECTION_NAV_SELECTOR = ".bc-section-nav";

function getScrollOffset(): number {
  const root = document.documentElement;
  const navHeight =
    Number.parseFloat(getComputedStyle(root).getPropertyValue("--bc-nav-height")) || 72;
  const sectionNavEl = document.querySelector(SECTION_NAV_SELECTOR);
  const sectionNavHeight = sectionNavEl?.getBoundingClientRect().height ?? 48;
  return navHeight + sectionNavHeight + 8;
}

/** Highlights the section whose top has passed the sticky header + section nav. */
export default function useSectionNavSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const updateActive = () => {
      const offset = getScrollOffset();
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds]);

  return activeId;
}
