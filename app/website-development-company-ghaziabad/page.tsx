import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import SeoLandingJsonLd from "@/components/seo-landing/SeoLandingJsonLd";
import SeoLandingPage from "@/components/seo-landing/SeoLandingPage";
import { buildSeoLandingMetadata } from "@/lib/seo-landing/metadata";
import { ghaziabadSeoLandingConfig } from "@/lib/seo-landing/pages/ghaziabad";

export const metadata = buildSeoLandingMetadata(ghaziabadSeoLandingConfig);

export default function WebsiteDevelopmentCompanyGhaziabadPage() {
  return (
    <MarketingPageLayout showFooterCta={false}>
      <SeoLandingJsonLd config={ghaziabadSeoLandingConfig} />
      <SeoLandingPage config={ghaziabadSeoLandingConfig} />
    </MarketingPageLayout>
  );
}
