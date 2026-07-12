import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "End-to-end digital engineering services including AI solutions, websites, apps, custom software, and cloud DevOps.",
  path: ROUTES.services,
});

export default function ServicesPage() {
  return (
    <MarketingPageShell
      title="Services"
      description="End-to-end digital engineering services for ambitious teams — from strategy and product design to AI, cloud, and long-term support."
      headingId="services-page-heading"
    />
  );
}
