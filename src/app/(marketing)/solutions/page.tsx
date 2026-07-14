import type { Metadata } from "next";
import { SolutionsLandingPage } from "@/features/solutions";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Enterprise business and AI solutions from Bitcraftly — CRM, ERP, CMS, SaaS platforms, automation, dashboards, and workflows with measurable outcomes.",
  path: ROUTES.solutions,
  keywords: [
    "Bitcraftly solutions",
    "CRM ERP CMS SaaS",
    "AI automation solutions",
    "enterprise dashboards India",
    "workflow automation",
  ],
});

export default function SolutionsPage() {
  return <SolutionsLandingPage />;
}
