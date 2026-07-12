import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Product, AI, and engineering insights from the Bitcraftly team.",
  path: ROUTES.blog,
});

export default function BlogPage() {
  return (
    <MarketingPageShell
      title="Blog"
      description="Product, AI, and engineering insights from the Bitcraftly team."
      headingId="blog-page-heading"
    />
  );
}
