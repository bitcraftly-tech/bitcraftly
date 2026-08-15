import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import RestaurantWebsiteShowcaseContent from './RestaurantWebsiteShowcaseContent';

export const metadata: Metadata = {
  title: 'Restaurant Website UI Showcase | Bitcraftly',
  description:
    'Premium dining landing mock — menu rails, chef specials, reservations & delivery strip in Bitcraftly dark luxury UI.',
};

export default function RestaurantWebsiteShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="restaurant">
      <RestaurantWebsiteShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
