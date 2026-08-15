import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import LocalServicesLeadShowcaseContent from './LocalServicesLeadShowcaseContent';

export const metadata: Metadata = {
  title: 'Steel City Home Pros · Local Services Showcase | Bitcraftly',
  description:
    'Hyperlocal home-services lead funnel — verified crews, transparent pricing, Jamshedpur zone dispatch and WhatsApp booking.',
};

export default function LocalServicesLeadsShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="local">
      <LocalServicesLeadShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
