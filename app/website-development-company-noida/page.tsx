import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import SeoLandingJsonLd from "@/components/seo-landing/SeoLandingJsonLd";
import SeoLandingPage from "@/components/seo-landing/SeoLandingPage";
import { buildSeoLandingMetadata } from "@/lib/seo-landing/metadata";
import { noidaSeoLandingConfig } from "@/lib/seo-landing/pages/noida";

export const metadata = buildSeoLandingMetadata(noidaSeoLandingConfig);

export default function WebsiteDevelopmentCompanyNoidaPage() {
  return (
    <MarketingPageLayout showFooterCta={false} breadcrumb={noidaSeoLandingConfig.breadcrumb}>
      <SeoLandingJsonLd config={noidaSeoLandingConfig} />
      <SeoLandingPage config={noidaSeoLandingConfig} />
    </MarketingPageLayout>
  );
}
