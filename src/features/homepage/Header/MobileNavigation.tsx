'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import {
  HEADER_CTA_PRIMARY,
  HEADER_CTA_SECONDARY,
  HEADER_HEIGHT_PX,
  HEADER_MOBILE_MENU_ID,
  HEADER_NAV_LINKS,
} from './header.constants';
import { MobileNavAccordion } from './MobileNavAccordion';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const mobileMenuButtonBase = cn(
  'inline-flex h-[48px] w-full items-center justify-center gap-[8px]',
  'rounded-[12px] text-[15px] font-semibold leading-none no-underline',
  'transition-[opacity,transform,box-shadow,border-color,background-color] duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

export function MobileNavigation() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = openForPath === pathname;
  const menuLabelId = useId();
  const panelId = HEADER_MOBILE_MENU_ID;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpenForPath(null);
    if (restoreFocus) {
      queueMicrotask(() => {
        (previouslyFocusedRef.current ?? triggerRef.current)?.focus({ preventScroll: true });
        previouslyFocusedRef.current = null;
      });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setOpenForPath((current) => {
      if (current === pathname) {
        return null;
      }
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      return pathname;
    });
  }, [pathname]);

  useEffect(() => {
    if (!open || !mounted) {
      return;
    }

    const root = document.documentElement;
    const main = document.getElementById('main-content');
    const previousMainInert = main?.inert ?? false;

    root.classList.add('overflow-hidden');
    root.setAttribute('data-mobile-nav-open', 'true');
    if (main) {
      main.inert = true;
    }

    const panel = panelRef.current;
    if (!panel) {
      return () => {
        root.classList.remove('overflow-hidden');
        root.removeAttribute('data-mobile-nav-open');
        if (main) {
          main.inert = previousMainInert;
        }
      };
    }

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );

    // Move focus into the dialog after paint.
    queueMicrotask(() => {
      const focusable = getFocusable();
      (focusable[0] ?? panel).focus({ preventScroll: true });
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (!panel) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusable();
      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusable || activeElement === panel)) {
        event.preventDefault();
        lastFocusable?.focus({ preventScroll: true });
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus({ preventScroll: true });
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      root.classList.remove('overflow-hidden');
      root.removeAttribute('data-mobile-nav-open');
      if (main) {
        main.inert = previousMainInert;
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, mounted, open]);

  const menuPanel =
    open && mounted ? (
      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuLabelId}
        tabIndex={-1}
        className="header-mobile-menu fixed inset-x-0 z-[calc(var(--z-sticky)-1)] flex flex-col border-t border-border bg-background"
        style={{
          top: HEADER_HEIGHT_PX,
          height: `calc(100dvh - ${HEADER_HEIGHT_PX}px)`,
        }}
      >
        <Container size="xl" className="flex min-h-0 flex-1 flex-col py-[var(--space-4)]">
          <p id={menuLabelId} className="sr-only">
            Mobile navigation menu
          </p>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <MobileNavAccordion
              links={HEADER_NAV_LINKS}
              pathname={pathname}
              onNavigate={() => closeMenu()}
            />
          </div>

          <div
            className={cn(
              'mt-[var(--space-4)] flex shrink-0 flex-col gap-[var(--space-2)]',
              'border-t border-border pt-[var(--space-4)]',
              'pb-[max(var(--space-2),env(safe-area-inset-bottom,0px))]',
            )}
          >
            <Link
              href={HEADER_CTA_SECONDARY.href}
              onClick={() => closeMenu()}
              className={cn(
                mobileMenuButtonBase,
                'rounded-[8px] border border-foreground/12 bg-background text-foreground',
                'hover:bg-canvas',
              )}
            >
              {HEADER_CTA_SECONDARY.label}
            </Link>
            <Link
              href={HEADER_CTA_PRIMARY.href}
              onClick={() => closeMenu()}
              className={cn(
                mobileMenuButtonBase,
                'rounded-[8px] border-0 bg-primary text-primary-foreground',
                'hover:bg-primary/90',
              )}
            >
              {HEADER_CTA_PRIMARY.label}
            </Link>
          </div>
        </Container>
      </div>
    ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          'header-mobile-trigger inline-flex size-[44px] min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg',
          'text-foreground transition-colors duration-200 hover:bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={toggleMenu}
      >
        {/* Stack both icons so open/close swap never reflows the button box. */}
        <span className="relative inline-flex size-[24px] shrink-0 items-center justify-center">
          <Icon
            name="menu"
            size="lg"
            aria-hidden
            className={cn(
              'absolute inset-0 m-auto h-[24px] w-[24px]',
              open ? 'invisible' : 'visible',
            )}
          />
          <Icon
            name="close"
            size="lg"
            aria-hidden
            className={cn(
              'absolute inset-0 m-auto h-[24px] w-[24px]',
              open ? 'visible' : 'invisible',
            )}
          />
        </span>
      </button>

      {menuPanel ? createPortal(menuPanel, document.body) : null}
    </>
  );
}
