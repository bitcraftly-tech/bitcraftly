"use client";

import { useEffect } from "react";

type MarketingScrollEffectsProps = {
  sectionId?: string;
};

/** Deferred hash / section scroll — keeps marketing layout off the critical hydration path. */
export default function MarketingScrollEffects({ sectionId }: MarketingScrollEffectsProps) {
  useEffect(() => {
    const pendingSection =
      sectionId || window.sessionStorage.getItem("landingTargetSection") || undefined;

    if (pendingSection) {
      const element = document.getElementById(pendingSection);
      if (element) {
        window.sessionStorage.removeItem("landingTargetSection");
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const hashTarget = document.getElementById(hash);
    if (!hashTarget) return;

    window.requestAnimationFrame(() => {
      hashTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [sectionId]);

  return null;
}
