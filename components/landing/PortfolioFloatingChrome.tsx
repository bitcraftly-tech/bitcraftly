"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { hasMobileStickyCta } from "@/lib/mobileStickyCta";

const FloatingWhatsAppButton = dynamic(() => import("@/components/landing/FloatingWhatsAppButton"), {
  ssr: false,
});

/** Site-wide floating controls — scroll-to-top on every page. */
export default function PortfolioFloatingChrome() {
  const pathname = usePathname();
  const [showHeavyChrome, setShowHeavyChrome] = useState(false);
  const isPortfolio = pathname?.startsWith("/portfolio");
  const isDayal = pathname?.startsWith("/dayal-builders");

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

  useEffect(() => {
    const root = document.documentElement;
    const mobileMq = window.matchMedia("(max-width: 767px)");

    const syncFloatingLayout = () => {
      const hasChat =
        !pathname?.startsWith("/interactive-demos") && !pathname?.startsWith("/portfolio");
      const mobileSticky = hasMobileStickyCta(pathname) && mobileMq.matches;

      root.toggleAttribute("data-bc-chat", hasChat);
      root.toggleAttribute("data-bc-mobile-sticky", mobileSticky);
    };

    syncFloatingLayout();
    mobileMq.addEventListener("change", syncFloatingLayout);

    return () => {
      mobileMq.removeEventListener("change", syncFloatingLayout);
      root.removeAttribute("data-bc-chat");
      root.removeAttribute("data-bc-mobile-sticky");
    };
  }, [pathname]);

  const scrollToTop = <FloatingScrollButton />;

  if (isPortfolio || isDayal) {
    return scrollToTop;
  }

  return (
    <>
      <MobileStickyCta />
      {scrollToTop}
      {showHeavyChrome ? <FloatingWhatsAppButton /> : null}
    </>
  );
}
