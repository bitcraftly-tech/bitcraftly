"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  clearPendingScrollTarget,
  getPendingScrollTarget,
  scrollToElementWithRetry,
} from "@/lib/scrollToMarketingSection";

type SectionAutoScrollProps = {
  sectionId?: string;
};

export default function SectionAutoScroll({ sectionId }: SectionAutoScrollProps) {
  const pathname = usePathname();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cancelRef.current?.();
    cancelRef.current = null;

    const pendingSection = sectionId || getPendingScrollTarget(pathname);
    if (!pendingSection) return;

    cancelRef.current = scrollToElementWithRetry(pendingSection, {
      startDelayMs: 120,
      onSuccess: clearPendingScrollTarget,
    });

    return () => {
      cancelRef.current?.();
    };
  }, [pathname, sectionId]);

  return null;
}
