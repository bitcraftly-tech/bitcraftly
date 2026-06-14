import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import PricingFaqStrip from "@/components/landing/PricingFaqStrip";
import PricingPageIntro from "@/components/landing/PricingPageIntro";
import PricingPageNav from "@/components/landing/PricingPageNav";
import PricingQuickCompare from "@/components/landing/PricingQuickCompare";
import PricingWelcomeGuide from "@/components/landing/PricingWelcomeGuide";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { buildPageMetadata } from "@/lib/seoMetadata";

const ProjectCostCalculator = dynamic(() => import("@/components/landing/ProjectCostCalculator"));
const FastLaunchPackages = dynamic(() => import("@/components/landing/FastLaunchPackages"));
const Pricing = dynamic(() => import("@/components/landing/Pricing"));

export const metadata = buildPageMetadata("pricing");

export default function PricingPage() {
  return (
    <MarketingPageLayout>
      <PricingPageIntro />
      <PricingPageNav />
      <PricingWelcomeGuide />
      <FadeInOnView delayMs={30}>
        <PricingQuickCompare />
      </FadeInOnView>
      <FadeInOnView delayMs={45}>
        <FastLaunchPackages />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <Pricing variant="page" />
      </FadeInOnView>
      <FadeInOnView delayMs={75}>
        <ProjectCostCalculator hideTypeGrid showTopBorder={false} />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <PricingFaqStrip />
      </FadeInOnView>
      <MarketingNextStep
        title="Package choose ho gaya?"
        description="Compare ke baad Quote for this click karo — 1-minute form, same day reply. Free consultation bhi available hai."
        links={[
          { href: "/contact?intent=quote&source=pricing-page", label: "Get written quote →", primary: true },
          { href: "/contact?intent=consultation&source=pricing-page", label: "Free consultation" },
        ]}
      />
    </MarketingPageLayout>
  );
}
