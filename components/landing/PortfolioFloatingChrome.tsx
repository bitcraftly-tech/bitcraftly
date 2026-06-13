"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import MobileStickyCta from "@/components/landing/MobileStickyCta";

const FloatingWhatsAppButton = dynamic(() => import("@/components/landing/FloatingWhatsAppButton"), {
  ssr: false,
});
const FloatingThemeTumbler = dynamic(() => import("@/components/landing/FloatingThemeTumbler"), {
  ssr: false,
});

/** Site-wide floating controls — scroll-to-top on every page. */
export default function PortfolioFloatingChrome() {
  const pathname = usePathname();
  const [showHeavyChrome, setShowHeavyChrome] = useState(false);
  const isPortfolio = pathname?.startsWith("/portfolio");
  const isDayal = pathname?.startsWith("/dayal-builders");
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setShowHeavyChrome(true);
        },
        { timeout: 4500 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setShowHeavyChrome(true);
    }, 2000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const scrollToTop = <FloatingScrollButton />;

  if (isPortfolio || isDayal) {
    return scrollToTop;
  }

  if (isDashboard) {
    return (
      <>
        {scrollToTop}
        {showHeavyChrome ? <FloatingThemeTumbler /> : null}
      </>
    );
  }

  return (
    <>
      <MobileStickyCta />
      {scrollToTop}
      {showHeavyChrome ? (
        <>
          <FloatingWhatsAppButton />
          <FloatingThemeTumbler />
        </>
      ) : null}
    </>
  );
}
