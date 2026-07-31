import ClayCraftBackToTopThumbler from './ClayCraftBackToTopThumbler';
import ClayCraftDemoShell from './ClayCraftDemoShell';
import ClayCraftFooter from './ClayCraftFooter';
import ClayCraftHeader from './ClayCraftHeader';
import { claycraftBody, claycraftDisplay } from './claycraft-fonts';
import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import './claycraft-showcase.css';

export default function ClayCraftShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShowcaseScopedThemeProvider
      showcaseId="claycraft"
      className={`${claycraftBody.variable} ${claycraftDisplay.variable} crockery-home claycraft-showcase flex min-h-screen flex-col`}
    >
      <ClayCraftDemoShell>
        <div id="top" className="flex min-h-0 flex-1 flex-col" tabIndex={-1}>
          <ClayCraftHeader />
          <main className="flex-1">{children}</main>
          <ClayCraftFooter />
        </div>
        <ClayCraftBackToTopThumbler />
      </ClayCraftDemoShell>
    </ShowcaseScopedThemeProvider>
  );
}
