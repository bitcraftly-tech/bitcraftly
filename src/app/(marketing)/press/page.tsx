import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Press",
  description: "News and media resources from Bitcraftly.",
  path: ROUTES.press,
});

export default function PressPage() {
  return (
    <MarketingPageShell
      title="Press"
      description="News and media resources from Bitcraftly."
      headingId="press-page-heading"
    />
  );
}
