import type { ReactNode } from 'react';

import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import LocalServicesFooter from './LocalServicesFooter';
import LocalServicesHeader from './LocalServicesHeader';
import LocalServicesThemeSync from './LocalServicesThemeSync';

import './local-services-motion.css';

/** Applies the stored showcase theme before first paint so dark mode never flashes light. */
const THEME_BOOT_SCRIPT = `(function(){try{var t=window.localStorage.getItem('theme-showcase-local');document.documentElement.setAttribute('data-lsx-theme',t==='dark'?'dark':'light');}catch(e){}})();`;

/** Showcase chrome for Steel City Home Pros — themed header, page, and footer. */
export default function LocalServicesShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <ShowcaseScopedThemeProvider showcaseId="local" className="lsx-shell">
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      <LocalServicesThemeSync />
      <LocalServicesHeader />
      <main>{children}</main>
      <LocalServicesFooter />
    </ShowcaseScopedThemeProvider>
  );
}
