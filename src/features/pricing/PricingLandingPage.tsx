import { PageShell } from '@/components/patterns/marketing-layout';
import { ROUTES } from '@/constants/navigation';
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
import './pricing-page.css';

export function PricingLandingPage() {
  return (
    <PageShell className="pricing-page">
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

export const PRICING_LANDING_META = {
  title: 'Pricing',
  description:
    'Transparent Bitcraftly pricing for websites, web apps, and AI systems — AI estimates, clear packages, and written proposals.',
  path: ROUTES.pricing,
} as const;
