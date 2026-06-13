"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PortfolioFloatingChrome = dynamic(() => import("@/components/landing/PortfolioFloatingChrome"), {
  ssr: false,
});

export default function DeferredFloatingChrome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setShow(true);
        },
        { timeout: 3500 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setShow(true);
    }, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!show) return null;
  return <PortfolioFloatingChrome />;
}
