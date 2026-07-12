import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

const PATH = "/resources/documentation";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation",
  description: "Technical references and implementation notes from Bitcraftly.",
  path: PATH,
});

export default function DocumentationPage() {
  return (
    <MarketingPageShell
      title="Documentation"
      description="Technical references and implementation notes from Bitcraftly."
      headingId="documentation-page-heading"
    />
  );
}
