import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { SITE_URL } from "@/lib/seo";

const ProjectCostCalculator = dynamic(() => import("@/components/landing/ProjectCostCalculator"));
const FastLaunchPackages = dynamic(() => import("@/components/landing/FastLaunchPackages"));
const Pricing = dynamic(() => import("@/components/landing/Pricing"));

export const metadata: Metadata = {
  title: "Pricing & Website Cost Calculator",
  description:
    "Estimate your website cost in 4 steps. Fast-launch packages from ₹8,999 and transparent business pricing from Bitcraftly.",
  alternates: { canonical: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  return (
    <MarketingPageLayout>
      <FadeInOnView delayMs={30}>
        <ProjectCostCalculator />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <FastLaunchPackages />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <Pricing />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
