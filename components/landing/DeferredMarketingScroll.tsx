"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import MarketingScrollEffects from "@/components/landing/MarketingScrollEffects";
import { hasPendingScrollTarget } from "@/lib/scrollToMarketingSection";

type DeferredMarketingScrollProps = {
  sectionId?: string;
};

export default function DeferredMarketingScroll({ sectionId }: DeferredMarketingScrollProps) {
  const pathname = usePathname();
  const [show, setShow] = useState(
    () => Boolean(sectionId) || (typeof window !== "undefined" && hasPendingScrollTarget()),
  );

  useEffect(() => {
    if (sectionId || hasPendingScrollTarget(pathname)) {
      setShow(true);
      return;
    }

    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setShow(true);
        },
        { timeout: 3000 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setShow(true);
    }, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [sectionId, pathname]);

  if (!show) return null;
  return <MarketingScrollEffects sectionId={sectionId} />;
}
