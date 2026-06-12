"use client";

import { useEffect } from "react";

type SectionAutoScrollProps = {
  sectionId?: string;
};

export default function SectionAutoScroll({ sectionId }: SectionAutoScrollProps) {
  useEffect(() => {
    const pendingSection =
      sectionId ||
      (typeof window !== "undefined" ? window.sessionStorage.getItem("landingTargetSection") || undefined : undefined);
    if (!pendingSection) return;

    const element = document.getElementById(pendingSection);
    if (!element) return;

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("landingTargetSection");
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [sectionId]);

  return null;
}
