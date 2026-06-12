import dynamic from "next/dynamic";

import HomePageHub from "@/components/landing/HomePageHub";
import Hero from "@/components/landing/Hero";
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
      <FadeInOnView delayMs={30}>
        <Hero />
      </FadeInOnView>
      <FadeInOnView delayMs={45}>
        <HomePageHub />
      </FadeInOnView>
      <FadeInOnView delayMs={75}>
        <WebsiteAuditLeadMagnet />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <PortfolioShowcase />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <FinalCTA />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
