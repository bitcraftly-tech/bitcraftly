import { TrustedBySection } from "../TrustedBy";
import { ServicesSection } from "../Services";
import { TechnologiesSection } from "../Technologies";
import { PortfolioSection } from "../Portfolio";
import { DashboardShowcaseSection } from "../DashboardShowcase";
import {
  CostCalculatorSection,
  FounderMessageSection,
} from "../CostCalculator";
import { ProcessSection } from "../Process";
import { PerformanceSection } from "../Performance";
import { WebsiteAuditSection } from "../WebsiteAudit";
import { WhyBitcraftlySection } from "../WhyBitcraftly";
import { TestimonialsSection } from "../Testimonials";
import { FAQSection } from "../FAQ";
import { FinalCTASection } from "../FinalCTA";

/**
 * Below-ATF homepage stack — Server Components (SSR HTML always present).
 * Includes TrustedBy/Services so Hero is the only ATF section in the shell.
 */
export function HomepageBelowFold() {
  return (
    <>
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
    </>
  );
}
