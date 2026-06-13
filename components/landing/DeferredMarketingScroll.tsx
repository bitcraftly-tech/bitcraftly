"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MarketingScrollEffects = dynamic(() => import("@/components/landing/MarketingScrollEffects"), {
  ssr: false,
});

type DeferredMarketingScrollProps = {
  sectionId?: string;
};

export default function DeferredMarketingScroll({ sectionId }: DeferredMarketingScrollProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
  }, []);

  if (!show) return null;
  return <MarketingScrollEffects sectionId={sectionId} />;
}
