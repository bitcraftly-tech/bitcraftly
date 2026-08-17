import type { ReactNode } from 'react';

import EcommerceShowcaseLayout from '@bitcraftly/showcase-ecommerce-store/app/ecommerce-store-showcase/EcommerceShowcaseLayout';
import GymShowcaseLayout from '@bitcraftly/showcase-gym-fitness/app/gym-fitness-showcase/GymShowcaseLayout';
import LocalServicesShowcaseLayout from '@bitcraftly/showcase-local-services-leads/app/local-services-leads-showcase/LocalServicesShowcaseLayout';
import RestaurantShowcaseLayout from '@bitcraftly/showcase-restaurant-ai-chatbot/app/restaurant-ai-chatbot-showcase/RestaurantShowcaseLayout';
import SchoolShowcaseLayout from '@bitcraftly/showcase-school-website/app/school-website-showcase/SchoolShowcaseLayout';
import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';
import { getPortfolioShowcaseTheme, type ShowcaseThemeId } from '@/lib/portfolioShowcaseThemes';

import PortfolioShowcaseFooter from './PortfolioShowcaseFooter';
import PortfolioShowcaseNavbar from './PortfolioShowcaseNavbar';

type Props = {
  themeId: ShowcaseThemeId;
  children: ReactNode;
};

/** Full-page client website mock — light theme, branded header/footer per vertical */
export default function PortfolioShowcaseLayout({ themeId, children }: Props) {
  if (themeId === 'ecommerce') {
    return <EcommerceShowcaseLayout>{children}</EcommerceShowcaseLayout>;
  }

  if (themeId === 'gym') {
    return <GymShowcaseLayout>{children}</GymShowcaseLayout>;
  }

  if (themeId === 'school') {
    return <SchoolShowcaseLayout>{children}</SchoolShowcaseLayout>;
  }

  if (themeId === 'chatbot') {
    return <RestaurantShowcaseLayout>{children}</RestaurantShowcaseLayout>;
  }

  if (themeId === 'local') {
    return <LocalServicesShowcaseLayout>{children}</LocalServicesShowcaseLayout>;
  }

  const theme = getPortfolioShowcaseTheme(themeId);

  return (
    <ShowcaseScopedThemeProvider showcaseId={themeId} className={theme.shell}>
      <PortfolioShowcaseNavbar theme={theme} />
      <main className={theme.mainBg}>{children}</main>
      <PortfolioShowcaseFooter theme={theme} />
    </ShowcaseScopedThemeProvider>
  );
}
