import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { ROUTES } from '@/constants/navigation';
import { buildFaqPageJsonLd } from '@/lib/seo/json-ld-faq';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { PricingAddons } from './components/PricingAddons';
import { PricingClientTrust } from './components/PricingClientTrust';
import { PricingFaq } from './components/PricingFaq';
import { PricingFinalCta } from './components/PricingFinalCta';
import { PricingPackages } from './components/PricingPackages';
import { PricingPageHero } from './components/PricingPageHero';
import { PricingProcess } from './components/PricingProcess';
import { PricingTrustBanner } from './components/PricingTrustBanner';
import { PricingTrustTimeline } from './components/PricingTrustTimeline';
import { PricingWhatsIncluded } from './components/PricingWhatsIncluded';
import { PricingWhy } from './components/PricingWhy';
import { PRICING_FAQ } from './pricing.content';
import './pricing-page.css';

export const PRICING_LANDING_META = {
  title: 'Pricing',
  description:
    'Transparent Bitcraftly pricing for websites, web apps, and AI systems — AI estimates, clear packages, and written proposals.',
  path: ROUTES.pricing,
} as const;

export function PricingLandingPage() {
  const pageUrl = getAbsoluteUrl(ROUTES.pricing);

  return (
    <PageShell className="pricing-page">
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl}#webpage`,
              url: pageUrl,
              name: PRICING_LANDING_META.title,
              description: PRICING_LANDING_META.description,
              isPartOf: { '@id': WEBSITE_ID },
            },
            buildFaqPageJsonLd(pageUrl, PRICING_FAQ),
          ],
        }}
      />
      <PricingPageHero />
      <PricingPackages />
      <PricingAddons />
      <PricingWhatsIncluded />
      <PricingClientTrust />
      <PricingTrustTimeline />
      <PricingProcess />
      <PricingWhy />
      <PricingFaq />
      <PricingTrustBanner />
      <PricingFinalCta />
    </PageShell>
  );
}
