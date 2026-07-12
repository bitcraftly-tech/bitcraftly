import { CostCalculatorSection, FounderMessageSection } from "../CostCalculator";
import { DashboardShowcaseSection } from "../DashboardShowcase";
import { FAQSection } from "../FAQ";
import { FinalCTASection } from "../FinalCTA";
import { HeroSection } from "../Hero";
import { PerformanceSection } from "../Performance";
import { PortfolioSection } from "../Portfolio";
import { ProcessSection } from "../Process";
import { ServicesSection } from "../Services";
import { TechnologiesSection } from "../Technologies";
import { TestimonialsSection } from "../Testimonials";
import { TrustedBySection } from "../TrustedBy";
import { WebsiteAuditSection } from "../WebsiteAudit";
import { WhyBitcraftlySection } from "../WhyBitcraftly";
import "./homepage-shell.css";

/**
 * Homepage landing content.
 * Site chrome (Header / Footer) lives in the marketing layout.
 *
 * Conversion stack order (after Hero / Trusted By / Services):
 * Technologies → Portfolio → Dashboard → Founder Message → Cost Calculator →
 * Process → Performance → Audit → Why → Testimonials → FAQ → Final CTA
 */
export function HomepageShell() {
  return (
    <div className="homepage-sections">
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <TechnologiesSection />
      <PortfolioSection />
      <DashboardShowcaseSection />
      <FounderMessageSection />
      <CostCalculatorSection />
      <ProcessSection />
      <PerformanceSection />
      <WebsiteAuditSection />
      <WhyBitcraftlySection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
