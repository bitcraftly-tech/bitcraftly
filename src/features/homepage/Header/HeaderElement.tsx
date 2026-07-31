import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { HEADER_HEIGHT_PX, HEADER_ID } from './header.constants';
import { HeaderHomeScrollEffect } from './HeaderHomeScrollEffect';

interface HeaderElementProps {
  children: ReactNode;
}

/** Server-rendered header shell; scroll styling driven by HeaderHomeScrollEffect. */
export function HeaderElement({ children }: HeaderElementProps) {
  return (
    <>
      <HeaderHomeScrollEffect />
      <header
        id={HEADER_ID}
        className={cn(
          'header-adaptive sticky top-0 z-[var(--z-sticky)] flex w-full min-w-0 items-center overflow-x-clip border-b',
          'xl:overflow-visible',
          'transition-[background-color,border-color,backdrop-filter] duration-200 ease-out',
        )}
        style={{ height: HEADER_HEIGHT_PX }}
      >
        {children}
      </header>
    </>
  );
}
