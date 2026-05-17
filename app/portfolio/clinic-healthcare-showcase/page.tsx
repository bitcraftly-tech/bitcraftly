import type { Metadata } from "next";

import PortfolioShowcaseLayout from "@/components/portfolio/PortfolioShowcaseLayout";

import ClinicHealthcareShowcaseContent from "./ClinicHealthcareShowcaseContent";

export const metadata: Metadata = {
  title: "Clinic & Healthcare Website Showcase | Bitcraftly",
  description:
    "Clinical credibility mock — doctors, services & appointment flows in Bitcraftly dark UI.",
};

export default function ClinicHealthcareShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="clinic">
      <ClinicHealthcareShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
