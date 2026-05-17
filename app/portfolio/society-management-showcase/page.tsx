import type { Metadata } from "next";

import PortfolioShowcaseLayout from "@/components/portfolio/PortfolioShowcaseLayout";

import SocietyManagementShowcaseContent from "./SocietyManagementShowcaseContent";

export const metadata: Metadata = {
  title: "Society Management Portal Showcase | Bitcraftly",
  description:
    "Resident portal mock — notices, bookings & committee workflows in Bitcraftly dark UI.",
};

export default function SocietyManagementShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="society">
      <SocietyManagementShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
