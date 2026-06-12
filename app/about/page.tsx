import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { SITE_URL } from "@/lib/seo";

const FounderSection = dynamic(() => import("@/components/landing/FounderSection"));
const WhyChooseUs = dynamic(() => import("@/components/landing/WhyChooseUs"));
const HowWeWork = dynamic(() => import("@/components/landing/HowWeWork"));
const ParkingHowItWorks = dynamic(() => import("@/components/landing/ParkingHowItWorks"));

export const metadata: Metadata = {
  title: "About Bitcraftly",
  description:
    "Founder-led React & Next.js studio. 18+ years frontend experience, clear scope, and delivery you can trust.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <MarketingPageLayout>
      <FadeInOnView delayMs={30}>
        <FounderSection />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <WhyChooseUs />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <HowWeWork />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <ParkingHowItWorks />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
