"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  clearPendingScrollTarget,
  getPendingScrollTarget,
  scrollToElementWithRetry,
} from "@/lib/scrollToMarketingSection";

type MarketingScrollEffectsProps = {
  sectionId?: string;
};

/** Runs pending section scroll after route changes — no hash in URL. */
export default function MarketingScrollEffects({ sectionId }: MarketingScrollEffectsProps) {
  const pathname = usePathname();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cancelRef.current?.();
    cancelRef.current = null;

    const pendingSection = sectionId || getPendingScrollTarget(pathname);
    if (!pendingSection) return;

    cancelRef.current = scrollToElementWithRetry(pendingSection, {
      startDelayMs: 120,
      maxWaitMs: 15_000,
      intervalMs: 100,
      onSuccess: clearPendingScrollTarget,
    });

    return () => {
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, [pathname, sectionId]);

  return null;
}
