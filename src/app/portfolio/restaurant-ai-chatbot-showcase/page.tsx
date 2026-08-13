import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@/components/portfolio/PortfolioShowcaseLayout';

import RestaurantAiChatbotShowcaseContent from './RestaurantAiChatbotShowcaseContent';

export const metadata: Metadata = {
  title: 'Tasting Desk AI · Restaurant Assistant Showcase | Bitcraftly',
  description:
    'Premium restaurant AI assistant specimen — menu-aware chat, table booking, WhatsApp handoff, and outcome telemetry.',
};

export default function RestaurantAiChatbotShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="chatbot">
      <RestaurantAiChatbotShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
