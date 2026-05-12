import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import SectionAutoScroll from "@/components/landing/SectionAutoScroll";
import FadeInOnView from "@/components/ui/FadeInOnView";

const DemoStrip = dynamic(() => import("@/components/landing/DemoStrip"));
const ServicesGrid = dynamic(() => import("@/components/landing/ServicesGrid"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));
const IndustriesWeServe = dynamic(() => import("@/components/landing/IndustriesWeServe"));
const Features = dynamic(() => import("@/components/landing/Features"));
const WhyChooseUs = dynamic(() => import("@/components/landing/WhyChooseUs"));
const Pricing = dynamic(() => import("@/components/landing/Pricing"));
const HowWeWork = dynamic(() => import("@/components/landing/HowWeWork"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));
const TrustReviewsPlaceholder = dynamic(() => import("@/components/landing/TrustReviewsPlaceholder"));
const ParkingHowItWorks = dynamic(() => import("@/components/landing/ParkingHowItWorks"));
const Footer = dynamic(() => import("@/components/landing/Footer"));

type LandingPageProps = {
  sectionId?:
    | "about"
    | "services"
    | "websites"
    | "mobile-apps"
    | "why-us"
    | "pricing"
    | "contact-cta"
    | "how-parking-works"
    | "process";
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <SectionAutoScroll sectionId={sectionId} />
      <Navbar />
      <FadeInOnView delayMs={30}>
        <Hero />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <ServicesGrid />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <PortfolioShowcase />
      </FadeInOnView>
      <FadeInOnView delayMs={105}>
        <IndustriesWeServe />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <Features />
      </FadeInOnView>
      <FadeInOnView delayMs={150}>
        <DemoStrip />
      </FadeInOnView>
      <FadeInOnView delayMs={180}>
        <WhyChooseUs />
      </FadeInOnView>
      <FadeInOnView delayMs={195}>
        <HowWeWork />
      </FadeInOnView>
      <FadeInOnView delayMs={210}>
        <Pricing />
      </FadeInOnView>
      <FadeInOnView delayMs={225}>
        <TrustReviewsPlaceholder />
      </FadeInOnView>
      <FadeInOnView delayMs={240}>
        <FinalCTA />
      </FadeInOnView>
      <FadeInOnView delayMs={265}>
        <ParkingHowItWorks />
      </FadeInOnView>
      <FadeInOnView delayMs={285}>
        <Footer />
      </FadeInOnView>
    </main>
  );
}
