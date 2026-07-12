import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn why ambitious teams choose Bitcraftly as their AI and digital engineering partner.",
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <MarketingPageShell
      title="About"
      description="Bitcraftly is an AI and digital engineering partner helping teams launch, scale, and lead with high-performance products."
      headingId="about-page-heading"
    >
      <div className="mt-[var(--space-4)]">
        <Link
          href={ROUTES.contact}
          className="inline-flex text-[14px] font-semibold text-primary no-underline hover:underline"
        >
          Contact us →
        </Link>
      </div>
    </MarketingPageShell>
  );
}
