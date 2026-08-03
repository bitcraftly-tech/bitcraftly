'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
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

const secondaryCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'lg',
  fullWidth: true,
  className: 'h-[48px] justify-center rounded-[12px] text-[15px]',
});

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  fullWidth: true,
  className: 'group h-[48px] justify-center rounded-[12px] text-[15px]',
});

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuLabelId = useId();
  const panelId = HEADER_MOBILE_MENU_ID;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change without coupling open state to pathname equality.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Portaled menu sits on document.body, so container-query hide on the header
  // does not apply — close when the window reaches desktop chrome width.
  useEffect(() => {
    const desktopChrome = window.matchMedia('(min-width: 1180px)');
    const closeIfDesktop = () => {
      if (desktopChrome.matches) {
        setOpen(false);
      }
    };

    closeIfDesktop();
    desktopChrome.addEventListener('change', closeIfDesktop);
    window.addEventListener('resize', closeIfDesktop);

    return () => {
      desktopChrome.removeEventListener('change', closeIfDesktop);
      window.removeEventListener('resize', closeIfDesktop);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      queueMicrotask(() => {
        (previouslyFocusedRef.current ?? triggerRef.current)?.focus({ preventScroll: true });
        previouslyFocusedRef.current = null;
      });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((wasOpen) => {
      if (wasOpen) {
        return false;
      }
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      return true;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.removeAttribute('data-mobile-nav-open');
      return;
    }

    root.setAttribute('data-mobile-nav-open', 'true');
    root.classList.add('overflow-hidden');

    const main = document.getElementById('main-content');
    const previousMainInert = main?.inert ?? false;
    if (main) {
      main.inert = true;
    }

    const panel = panelRef.current;

    const getFocusable = () => {
      if (!panel) {
        return [] as HTMLElement[];
      }
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );
    };

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
      root.removeAttribute('data-mobile-nav-open');
      root.classList.remove('overflow-hidden');
      if (main) {
        main.inert = previousMainInert;
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, open]);

  const menuPanel =
    open && mounted ? (
      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuLabelId}
        tabIndex={-1}
        className="header-mobile-menu fixed inset-x-0 flex flex-col border-t border-border/70 outline-none focus:outline-none"
        style={{
          top: HEADER_HEIGHT_PX,
          height: `calc(100dvh - ${HEADER_HEIGHT_PX}px)`,
          zIndex: 'var(--z-modal)',
        }}
      >
        <Container size="xl" className="flex min-h-0 flex-1 flex-col py-[var(--space-4)]">
          <p id={menuLabelId} className="sr-only">
            Mobile navigation menu
          </p>

          <p className="header-mobile-menu__eyebrow" aria-hidden>
            Browse
          </p>

          <div className="header-mobile-menu__scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <MobileNavAccordion
              links={HEADER_NAV_LINKS}
              pathname={pathname}
              onNavigate={() => closeMenu()}
            />
          </div>

          <div className="header-mobile-menu__cta shrink-0">
            <p className="header-mobile-menu__cta-hint">
              Ready to ship an Industry System? Start with a strategy call.
            </p>
            <div className="header-mobile-menu__cta-stack">
              <Link
                href={HEADER_CTA_SECONDARY.href}
                onClick={() => closeMenu()}
                className={secondaryCtaClassName}
              >
                {HEADER_CTA_SECONDARY.label}
              </Link>
              <Link
                href={HEADER_CTA_PRIMARY.href}
                onClick={() => closeMenu()}
                className={primaryCtaClassName}
              >
                <span>{HEADER_CTA_PRIMARY.label}</span>
                <ButtonArrow className="text-[15px]" />
              </Link>
            </div>
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
          'header-mobile-trigger relative z-[calc(var(--z-modal)+2)] inline-flex size-[44px] min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg',
          'pointer-events-auto touch-manipulation text-foreground transition-colors duration-200 hover:bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleMenu();
        }}
      >
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
