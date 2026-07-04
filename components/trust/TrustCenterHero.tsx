import { ArrowRight, FileText } from "lucide-react";

import MarketingPageHero from "@/components/landing/MarketingPageHero";
import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
const PUBLIC_VISION_PDF =
  "/documents/public/BDS-FND-001_Bitcraftly_Vision_Mission_Purpose_Values_v1.0.pdf";

export default function TrustCenterHero() {
  return (
    <MarketingPageHero
      id="trust-hero"
      eyebrow="Trust Center"
      title={
        <>
          How Bitcraftly{" "}
          <span className="whitespace-normal sm:whitespace-nowrap">operates with transparency</span>
        </>
      }
      description="Public summaries of our standards and policies. Internal operational documents remain available only to authorized team members through the dashboard document library."
      actions={
        <>
          <MarketingSectionLink path="/trust" sectionId="trust-standards" className="marketing-hero-btn marketing-hero-btn--primary">
            View standards
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </MarketingSectionLink>          <a href={PUBLIC_VISION_PDF} className="marketing-hero-btn marketing-hero-btn--secondary">
            <FileText className="size-4 shrink-0 opacity-70" aria-hidden />
            Download vision PDF
          </a>
        </>
      }
    />
  );
}
