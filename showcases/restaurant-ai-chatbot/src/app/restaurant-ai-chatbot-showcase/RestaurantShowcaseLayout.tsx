import type { ReactNode } from 'react';

import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import RestaurantShowcaseFooter from './RestaurantShowcaseFooter';
import RestaurantShowcaseHeader from './RestaurantShowcaseHeader';
import RestaurantThemeSync from './RestaurantThemeSync';

import './restaurant-ai-experience.css';

/** Applies the stored showcase theme before first paint so dark mode never flashes light. */
const THEME_BOOT_SCRIPT = `(function(){try{var t=window.localStorage.getItem('theme-showcase-chatbot');document.documentElement.setAttribute('data-ra-theme',t==='dark'?'dark':'light');}catch(e){}})();`;

/** Showcase chrome for Tasting Desk AI — themed header, page, and footer. */
export default function RestaurantShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <ShowcaseScopedThemeProvider showcaseId="chatbot" className="ra-shell">
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      <RestaurantThemeSync />
      <RestaurantShowcaseHeader />
      <main>{children}</main>
      <RestaurantShowcaseFooter />
    </ShowcaseScopedThemeProvider>
  );
}
