import LandingPage from "@/components/landing/LandingPage";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { buildPageMetadata } from "@/lib/seoMetadata";

export const metadata = buildPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <LandingPage />
    </>
  );
}
