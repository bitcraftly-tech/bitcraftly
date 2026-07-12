import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Solutions that deliver measurable business results — platforms, products, automation, and growth systems.",
  path: ROUTES.solutions,
});

export default function SolutionsPage() {
  return (
    <MarketingPageShell
      title="Solutions"
      description="Explore Bitcraftly solutions designed to launch, scale, and optimize digital products with measurable impact."
      headingId="solutions-page-heading"
    />
  );
}
