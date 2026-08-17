import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import LocalServicesExperiencePage from './LocalServicesExperiencePage';

export const metadata: Metadata = {
  title: 'Steel City Home Pros · Local Services Showcase | Bitcraftly',
  description:
    'Interactive home-services lead funnel — live dispatch board, service explorer, scroll-linked process, zone radar and multi-step WhatsApp booking.',
};

export default function LocalServicesLeadsShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="local">
      <LocalServicesExperiencePage />
    </PortfolioShowcaseLayout>
  );
}
