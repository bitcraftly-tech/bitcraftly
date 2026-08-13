import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@/components/portfolio/PortfolioShowcaseLayout';

import SocietyManagementShowcaseContent from './SocietyManagementShowcaseContent';

export const metadata: Metadata = {
  title: 'Riverstone Resident Portal · Society RMS Showcase | Bitcraftly',
  description:
    'Harmony Heights resident portal specimen — maintenance bills, visitors, complaints, notices, events and amenity bookings.',
};

export default function SocietyManagementShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="society">
      <SocietyManagementShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
