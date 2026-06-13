import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import PricingHomeTeaser from "@/components/landing/PricingHomeTeaser";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";

const FounderIntroVideo = dynamic(() => import("@/components/landing/FounderIntroVideo"), {
  loading: () => <section className="mx-auto min-h-[12rem] max-w-7xl px-4 sm:px-6 lg:px-12" aria-hidden />,
});
const HomePageHub = dynamic(() => import("@/components/landing/HomePageHub"));
const WebsiteAuditLeadMagnet = dynamic(() => import("@/components/landing/WebsiteAuditLeadMagnet"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));

type LandingPageProps = {
  sectionId?: string;
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <MarketingPageLayout sectionId={sectionId}>
      <Hero />
      <PricingHomeTeaser />
      <FounderIntroVideo />
      <HomePageHub />
      <PortfolioShowcase />
      <WebsiteAuditLeadMagnet />
      <FinalCTA />
    </MarketingPageLayout>
  );
}
