import type { Metadata } from "next";
import { IndustriesLandingPage } from "@/features/industries";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description:
    "Industry-focused digital engineering for SaaS, e-commerce, education, healthcare, and enterprise teams.",
  path: ROUTES.industries,
});

export default function IndustriesPage() {
  return <IndustriesLandingPage />;
}
