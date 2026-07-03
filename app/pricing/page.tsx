import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import { buildPageMetadata } from "@/lib/seoMetadata";

import PricingBottomCta from "./components/PricingBottomCta";
import PricingFaq from "./components/PricingFaq";
import PricingFeatureTable from "./components/PricingFeatureTable";
import PricingHero from "./components/PricingHero";
import PricingPageNav from "./components/PricingPageNav";
import SkipScrollReveal from "@/components/landing/SkipScrollReveal";
import PricingStickyCalculatorBar from "./components/PricingStickyCalculatorBar";
import PricingTierCards from "./components/PricingTierCards";
import "./pricing.css";

const ProjectCostCalculator = dynamic(() => import("@/components/landing/ProjectCostCalculator"));
const FastLaunchPackages = dynamic(() => import("@/components/landing/FastLaunchPackages"));

export const metadata = buildPageMetadata("pricing");

export default function PricingPage() {
  return (
    <MarketingPageLayout>
      <PricingHero />
      <SkipScrollReveal>
        <PricingPageNav />
      </SkipScrollReveal>
      <PricingTierCards />
      <PricingFeatureTable />
      <FastLaunchPackages />
      <ProjectCostCalculator hideTypeGrid showTopBorder={false} />
      <PricingFaq />
      <PricingBottomCta
        title="Package choose ho gaya?"
        description="Compare ke baad quote request bhejo — 1-minute form, same day reply. Free consultation bhi available hai."
        links={[
          { href: "/contact?intent=quote&source=pricing-page", label: "Get written quote →", primary: true },
          { href: "/contact?intent=consultation&source=pricing-page", label: "Free consultation" },
        ]}
      />
      <PricingStickyCalculatorBar />
    </MarketingPageLayout>
  );
}
