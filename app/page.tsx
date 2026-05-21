import type { Metadata } from "next";

import LandingPage from "@/components/landing/LandingPage";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { HOME_SEO, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  keywords: [...HOME_SEO.keywords],
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <LandingPage />
    </>
  );
}
