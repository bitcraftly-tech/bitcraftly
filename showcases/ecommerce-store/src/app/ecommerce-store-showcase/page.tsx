import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import EcommerceStoreShowcaseDemo from './EcommerceStoreShowcaseDemo';

export const metadata: Metadata = {
  title: 'Ecommerce Marketplace UI Showcase | Bitcraftly',
  description:
    'Functional ecommerce demo — search, filters, cart, checkout flow, coupons, and light/dark theme.',
};

export default function EcommerceStoreShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="ecommerce">
      <EcommerceStoreShowcaseDemo />
    </PortfolioShowcaseLayout>
  );
}
