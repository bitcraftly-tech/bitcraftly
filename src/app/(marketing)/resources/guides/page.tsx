import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

const PATH = "/resources/guides";

export const metadata: Metadata = createPageMetadata({
  title: "Guides",
  description: "Practical playbooks for product and engineering teams.",
  path: PATH,
});

export default function GuidesPage() {
  return (
    <MarketingPageShell
      title="Guides"
      description="Practical playbooks for product and engineering teams."
      headingId="guides-page-heading"
    />
  );
}
