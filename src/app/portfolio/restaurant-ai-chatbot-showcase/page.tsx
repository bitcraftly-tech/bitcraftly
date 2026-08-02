import type { Metadata } from 'next';

import PortfolioShowcaseLayout from '@/components/portfolio/PortfolioShowcaseLayout';

import RestaurantAiChatbotShowcaseContent from './RestaurantAiChatbotShowcaseContent';

export const metadata: Metadata = {
  title: 'Restaurant AI Chatbot Showcase | Bitcraftly',
  description:
    'Menu-aware assistant mock — WhatsApp handoff, FAQs & smart replies in Bitcraftly dark UI.',
};

export default function RestaurantAiChatbotShowcasePage() {
  return (
    <PortfolioShowcaseLayout themeId="chatbot">
      <RestaurantAiChatbotShowcaseContent />
    </PortfolioShowcaseLayout>
  );
}
