'use client';

import type { ReactNode } from 'react';

import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import { ToyCartDrawer } from './ToyCartDrawer';
import { ToyCartProvider } from './ToyCartContext';
import { ToyHeader } from './ToyHeader';

import './toy-showcase.css';

export function ToyShowcaseLayout({ children }: { readonly children: ReactNode }) {
  return (
    <ShowcaseScopedThemeProvider showcaseId="playnest" className="playnest flex min-h-screen flex-col">
      <ToyCartProvider>
        <div id="top" className="flex min-h-0 flex-1 flex-col" tabIndex={-1}>
          <ToyHeader />
          <main className="flex-1">{children}</main>
        </div>
        <ToyCartDrawer />
      </ToyCartProvider>
    </ShowcaseScopedThemeProvider>
  );
}
