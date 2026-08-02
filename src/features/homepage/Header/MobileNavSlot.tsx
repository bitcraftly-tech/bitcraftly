'use client';

import { MobileNavigation } from './MobileNavigation';

/** Mobile drawer — synchronous import avoids SSR/hydration skeleton swap flicker in the header. */
export function MobileNavSlot() {
  return <MobileNavigation />;
}
