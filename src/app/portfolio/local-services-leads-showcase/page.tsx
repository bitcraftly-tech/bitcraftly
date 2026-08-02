import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@/components/portfolio/PortfolioShowcaseLayout';

import LocalServicesLeadShowcaseContent from './LocalServicesLeadShowcaseContent';

export const metadata: Metadata = {
  title: 'Local Services Lead Site Showcase | Bitcraftly',
  description:
    'Hyperlocal lead funnel mock — strong CTAs, WhatsApp routing & service grids in Bitcraftly dark UI.',
};

export default function LocalServicesLeadsShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="local">
      <LocalServicesLeadShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
