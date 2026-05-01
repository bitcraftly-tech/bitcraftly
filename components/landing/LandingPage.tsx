import DemoStrip from "@/components/landing/DemoStrip";
import Features from "@/components/landing/Features";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import SectionAutoScroll from "@/components/landing/SectionAutoScroll";
import SocialProof from "@/components/landing/SocialProof";

type LandingPageProps = {
  sectionId?: "features" | "pricing" | "demo" | "about";
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <SectionAutoScroll sectionId={sectionId} />
      <Navbar />
      <Hero />
      <DemoStrip />
      <Features />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
