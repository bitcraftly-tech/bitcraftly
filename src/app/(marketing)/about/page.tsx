import type { Metadata } from "next";
import { AboutLandingPage, ABOUT_LANDING_META } from "@/features/about";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: ABOUT_LANDING_META.title,
  description: ABOUT_LANDING_META.description,
  path: ABOUT_LANDING_META.path,
  keywords: ABOUT_LANDING_META.keywords,
});

export default function AboutPage() {
  return <AboutLandingPage />;
}
