import CareersCtaSection from "@/components/ats/CareersCtaSection";
import CareersHero from "@/components/ats/CareersHero";
import CultureBenefits from "@/components/ats/CultureBenefits";
import HiringTimeline from "@/components/ats/HiringTimeline";
import OpenPositions from "@/components/ats/OpenPositions";

export default function CareersContent() {
  return (
    <>
      <CareersHero />
      <OpenPositions />
      <CultureBenefits />
      <HiringTimeline />
      <CareersCtaSection />
    </>
  );
}
