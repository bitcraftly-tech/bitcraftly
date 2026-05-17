"use client";

import { usePathname } from "next/navigation";

import FloatingScrollButton from "@/components/landing/FloatingScrollButton";
import FloatingThemeTumbler from "@/components/landing/FloatingThemeTumbler";
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton";

/** Site-wide floating controls — hidden on portfolio showcases (they ship their own chrome). */
export default function PortfolioFloatingChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portfolio")) return null;

  return (
    <>
      <FloatingWhatsAppButton />
      <FloatingScrollButton />
      <FloatingThemeTumbler />
    </>
  );
}
