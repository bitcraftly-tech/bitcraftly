'use client';

import type { ReactNode } from 'react';

import GymAiChatbot from '@bitcraftly/showcase-gym-fitness/components/gym/GymAiChatbot';
import GymBackToTopThumbler from '@bitcraftly/showcase-gym-fitness/components/gym/GymBackToTopThumbler';
import GymFooter from '@bitcraftly/showcase-gym-fitness/components/gym/GymFooter';
import GymNavbar from '@bitcraftly/showcase-gym-fitness/components/gym/GymNavbar';
import GymWhatsAppFab from '@bitcraftly/showcase-gym-fitness/components/gym/GymWhatsAppFab';
import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import { GymDemoProvider } from './GymDemoContext';
import { GymDemoOverlays } from './GymDemoOverlays';

import './gym-showcase.css';

export default function GymShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <GymDemoProvider>
      <ShowcaseScopedThemeProvider
        showcaseId="gym"
        className="gym-showcase flex min-h-screen flex-col gym-bg-page"
      >
        <div id="top" tabIndex={-1} className="flex min-h-0 flex-1 flex-col outline-none">
          <GymNavbar />
          <main className="flex-1">{children}</main>
          <GymFooter />
          <GymDemoOverlays />
          <GymWhatsAppFab />
          <GymAiChatbot />
          <GymBackToTopThumbler />
        </div>
      </ShowcaseScopedThemeProvider>
    </GymDemoProvider>
  );
}
