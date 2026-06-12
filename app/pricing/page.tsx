import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import PricingFaqStrip from "@/components/landing/PricingFaqStrip";
import PricingPageIntro from "@/components/landing/PricingPageIntro";
import PricingPageNav from "@/components/landing/PricingPageNav";
import PricingQuickCompare from "@/components/landing/PricingQuickCompare";
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
      <PricingPageIntro />
      <PricingPageNav />
      <FadeInOnView delayMs={30}>
        <ProjectCostCalculator hideTypeGrid showTopBorder={false} />
      </FadeInOnView>
      <FadeInOnView delayMs={45}>
        <PricingQuickCompare />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <FastLaunchPackages />
      </FadeInOnView>
      <FadeInOnView delayMs={75}>
        <Pricing variant="page" />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <PricingFaqStrip />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
