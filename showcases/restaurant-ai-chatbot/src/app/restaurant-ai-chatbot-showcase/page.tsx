import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@bitcraftly/showcase-shared/PortfolioShowcaseLayout';

import RestaurantAiExperiencePage from './RestaurantAiExperiencePage';

export const metadata: Metadata = {
  title: 'Tasting Desk AI · Restaurant AI Host Showcase | Bitcraftly',
  description:
    'Interactive restaurant AI host showcase — menu-aware chat, ordering, reservations, multilingual guest care, and operator insights.',
};

export default function RestaurantAiChatbotShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="chatbot">
      <RestaurantAiExperiencePage />
    </PortfolioShowcaseLayout>
  );
}
