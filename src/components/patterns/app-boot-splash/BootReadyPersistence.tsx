'use client';

import { useLayoutEffect } from 'react';

import { persistBootReadyIfNeeded } from './boot-ready';

/**
 * Client backup for the inline boot-ready MutationObserver.
 * Keeps `html.bc-app-ready` sticky when React re-applies the server `className`.
 */
export function BootReadyPersistence() {
  useLayoutEffect(() => {
    persistBootReadyIfNeeded();
  }, []);

  return null;
}
