"use client";

import dynamic from "next/dynamic";

const PortfolioFloatingChrome = dynamic(() => import("@/components/landing/PortfolioFloatingChrome"), {
  ssr: false,
});

export default function DeferredFloatingChrome() {
  return <PortfolioFloatingChrome />;
}
