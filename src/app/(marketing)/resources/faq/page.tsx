import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Bitcraftly services, process, timelines, and engagement models.",
  path: ROUTES.resourcesFaq,
});

export default function ResourcesFaqPage() {
  return (
    <MarketingPageShell
      title="Frequently asked questions"
      description="Answers to common questions about working with Bitcraftly — from discovery and delivery to support."
      headingId="resources-faq-page-heading"
    />
  );
}
