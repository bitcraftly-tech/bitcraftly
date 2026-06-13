import dynamic from "next/dynamic";

import FounderIntroVideo from "@/components/landing/FounderIntroVideo";
import HomePageHub from "@/components/landing/HomePageHub";
import Hero from "@/components/landing/Hero";
import PricingHomeTeaser from "@/components/landing/PricingHomeTeaser";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import SectionAutoScroll from "@/components/landing/SectionAutoScroll";
import FadeInOnView from "@/components/ui/FadeInOnView";

const WebsiteAuditLeadMagnet = dynamic(() => import("@/components/landing/WebsiteAuditLeadMagnet"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));

type LandingPageProps = {
  sectionId?: string;
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <MarketingPageLayout>
      <SectionAutoScroll sectionId={sectionId} />
      <Hero />
      <FadeInOnView delayMs={38}>
        <PricingHomeTeaser />
      </FadeInOnView>
      <FadeInOnView delayMs={42}>
        <FounderIntroVideo />
      </FadeInOnView>
      <FadeInOnView delayMs={48}>
        <HomePageHub />
      </FadeInOnView>
      <FadeInOnView delayMs={75}>
        <PortfolioShowcase />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <WebsiteAuditLeadMagnet />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <FinalCTA />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
