'use client';

import dynamic from 'next/dynamic';
import { DesktopNavFallback } from './DesktopNavFallback';

const DesktopNavigation = dynamic(
  () => import('./DesktopNavigation').then((mod) => mod.DesktopNavigation),
  {
    loading: () => <DesktopNavFallback />,
  },
);

/** Code-splits mega-menu navigation out of the critical header path. */
export function DesktopNavSlot() {
  return <DesktopNavigation />;
}
