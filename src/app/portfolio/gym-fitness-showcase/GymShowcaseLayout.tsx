'use client';

import type { ReactNode } from 'react';

import GymAiChatbot from '@/components/portfolio/gym/GymAiChatbot';
import GymBackToTopThumbler from '@/components/portfolio/gym/GymBackToTopThumbler';
import GymFooter from '@/components/portfolio/gym/GymFooter';
import GymNavbar from '@/components/portfolio/gym/GymNavbar';
import GymWhatsAppFab from '@/components/portfolio/gym/GymWhatsAppFab';
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
