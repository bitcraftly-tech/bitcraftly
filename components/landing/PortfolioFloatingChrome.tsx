"use client";

import { usePathname } from "next/navigation";

import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import FloatingThemeTumbler from "@/components/landing/FloatingThemeTumbler";
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton";
import MobileStickyCta from "@/components/landing/MobileStickyCta";

/** Site-wide floating controls — hidden on portfolio showcases (they ship their own chrome). */
export default function PortfolioFloatingChrome() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/portfolio") ||
    pathname?.startsWith("/dayal-builders") ||
    pathname?.startsWith("/dashboard")
  ) {
    return null;
  }

  return (
    <>
      <FloatingWhatsAppButton />
      <MobileStickyCta />
      <FloatingScrollButton />
      <FloatingThemeTumbler />
    </>
  );
}
