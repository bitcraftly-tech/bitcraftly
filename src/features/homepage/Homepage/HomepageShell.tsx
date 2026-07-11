import { FAQSection } from "../FAQ";
import { FinalCTASection } from "../FinalCTA";
import { FooterSection } from "../Footer";
import { HeaderSection } from "../Header";
import { HeroSection } from "../Hero";
import { IndustriesSection } from "../Industries";
import { ProcessSection } from "../Process";
import { ServicesSection } from "../Services";
import { TechnologiesSection } from "../Technologies";
import { TestimonialsSection } from "../Testimonials";
import { TrustedBySection } from "../TrustedBy";
import { WhyBitcraftlySection } from "../WhyBitcraftly";

export function HomepageShell() {
  return (
    <>
      <HeaderSection />

      <main id="main-content">
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <IndustriesSection />
        <TechnologiesSection />
        <ProcessSection />
        <WhyBitcraftlySection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <FooterSection />
    </>
  );
}
