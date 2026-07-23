import type { Metadata } from "next";
import { ResourcesLandingPage } from "@/features/resources";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "Guides, FAQ, blog, case studies, and company resources from Bitcraftly on product engineering, AI, and digital growth.",
  path: ROUTES.resources,
});

export default function ResourcesPage() {
  return <ResourcesLandingPage />;
}
