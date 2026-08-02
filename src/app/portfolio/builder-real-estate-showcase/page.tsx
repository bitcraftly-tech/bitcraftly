import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@/components/portfolio/PortfolioShowcaseLayout';

import BuilderRealEstateShowcaseContent from './BuilderRealEstateShowcaseContent';

export const metadata: Metadata = {
  title: 'Builder & Real Estate Website Showcase | Bitcraftly',
  description:
    'Premium builder showcase mock — project galleries, enquiry flows & credibility rails in Bitcraftly dark UI.',
};

export default function BuilderRealEstateShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="builder">
      <BuilderRealEstateShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
