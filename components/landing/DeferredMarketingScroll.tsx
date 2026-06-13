"use client";

import MarketingScrollEffects from "@/components/landing/MarketingScrollEffects";

type DeferredMarketingScrollProps = {
  sectionId?: string;
};

export default function DeferredMarketingScroll({ sectionId }: DeferredMarketingScrollProps) {
  return <MarketingScrollEffects sectionId={sectionId} />;
}
