import type { Metadata } from "next";
import { IndustriesLandingPage } from "@/features/industries";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description:
    "Bitcraftly engineers industry platforms for healthcare, education, retail, finance, logistics, SaaS, and more — domain networks with measurable delivery.",
  path: ROUTES.industries,
  keywords: [
    "industry software development",
    "healthcare digital platforms",
    "fintech engineering",
    "retail ecommerce development",
    "Bitcraftly industries",
  ],
});

export default function IndustriesPage() {
  return <IndustriesLandingPage />;
}
