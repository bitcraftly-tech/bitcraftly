"use client";

import { useState } from "react";

const MOBILE_ENTRANCE_MQ = "(max-width: 767px)";

/**
 * On mobile viewports, skip opacity-0 entrance animations so content is visible
 * without waiting for IntersectionObserver / whileInView (unreliable on iOS Safari).
 */
export function useMobileStaticEntrance(): boolean {
  const [staticEntrance] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_ENTRANCE_MQ).matches;
  });

  return staticEntrance;
}
