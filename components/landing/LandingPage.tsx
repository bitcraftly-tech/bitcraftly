import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import SectionAutoScroll from "@/components/landing/SectionAutoScroll";
import FadeInOnView from "@/components/ui/FadeInOnView";

const DemoStrip = dynamic(() => import("@/components/landing/DemoStrip"));
const Features = dynamic(() => import("@/components/landing/Features"));
const SocialProof = dynamic(() => import("@/components/landing/SocialProof"));
const Pricing = dynamic(() => import("@/components/landing/Pricing"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));
const ParkingHowItWorks = dynamic(() => import("@/components/landing/ParkingHowItWorks"));
const Footer = dynamic(() => import("@/components/landing/Footer"));

type LandingPageProps = {
  sectionId?: "websites" | "mobile-apps" | "ai-automation" | "smart-parking" | "pricing" | "how-parking-works" | "about";
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <SectionAutoScroll sectionId={sectionId} />
      <Navbar />
      <FadeInOnView delayMs={30}>
        <Hero />
      </FadeInOnView>
      <FadeInOnView delayMs={80}>
        <DemoStrip />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <Features />
      </FadeInOnView>
      <FadeInOnView delayMs={160}>
        <SocialProof />
      </FadeInOnView>
      <FadeInOnView delayMs={200}>
        <Pricing />
      </FadeInOnView>
      <FadeInOnView delayMs={240}>
        <FinalCTA />
      </FadeInOnView>
      <FadeInOnView delayMs={280}>
        <ParkingHowItWorks />
      </FadeInOnView>
      <FadeInOnView delayMs={320}>
        <Footer />
      </FadeInOnView>
    </main>
  );
}
