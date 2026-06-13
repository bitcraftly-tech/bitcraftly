"use client";

import { usePathname } from "next/navigation";

import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import FloatingThemeTumbler from "@/components/landing/FloatingThemeTumbler";
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton";
import MobileStickyCta from "@/components/landing/MobileStickyCta";

/** Site-wide floating controls — scroll-to-top on every page. */
export default function PortfolioFloatingChrome() {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio");
  const isDayal = pathname?.startsWith("/dayal-builders");
  const isDashboard = pathname?.startsWith("/dashboard");

  const scrollToTop = <FloatingScrollButton />;

  if (isPortfolio || isDayal) {
    return scrollToTop;
  }

  if (isDashboard) {
    return (
      <>
        {scrollToTop}
        <FloatingThemeTumbler />
      </>
    );
  }

  return (
    <>
      <FloatingWhatsAppButton />
      <MobileStickyCta />
      {scrollToTop}
      <FloatingThemeTumbler />
    </>
  );
}
