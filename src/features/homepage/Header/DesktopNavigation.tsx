'use client';

import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/ui/container';
import { hasMegaMenu, isNavLinkActive, type SiteNavLink } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { HEADER_HEIGHT_PX, HEADER_NAV_ID, HEADER_NAV_LINKS } from './header.constants';
import { NavigationLink } from './NavigationLink';

const MegaMenuPanel = dynamic(() => import('./MegaMenuPanel').then((mod) => mod.MegaMenuPanel), {
  ssr: false,
});

const HOVER_DELAY_MS = 100;
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function DesktopNavigation() {
  const pathname = usePathname();
  const baseId = useId();
  const [openState, setOpenState] = useState<{
    path: string;
    href: string;
  } | null>(null);
  const openHref = openState?.path === pathname ? openState.href : null;
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (href: string, immediate = false) => {
      clearTimers();
      if (immediate) {
        setOpenState({ path: pathname, href });
        return;
      }
      openTimerRef.current = setTimeout(() => {
        setOpenState({ path: pathname, href });
      }, HOVER_DELAY_MS);
    },
    [clearTimers, pathname],
  );

  const closeMenu = useCallback(
    (immediate = false) => {
      clearTimers();
      if (immediate) {
        setOpenState(null);
        return;
      }
      closeTimerRef.current = setTimeout(() => {
        setOpenState(null);
      }, HOVER_DELAY_MS);
    },
    [clearTimers],
  );

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!openHref) {
      return;
    }

    const panel = document.getElementById(`${baseId}-${openHref}-menu`);
    const trigger = triggerRefs.current.get(openHref);

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenState(null);
        trigger?.focus();
      }
    }

    function handlePointerDown(event: MouseEvent | PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const clickedTrigger = trigger?.contains(target);
      const clickedPanel = panel?.contains(target);
      if (clickedTrigger || clickedPanel) {
        return;
      }

      setOpenState(null);
    }

    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [baseId, openHref]);

  const openLink = HEADER_NAV_LINKS.find((link) => link.href === openHref);

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, link: SiteNavLink) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu(link.href, true);
      requestAnimationFrame(() => {
        const panel = document.getElementById(`${baseId}-${link.href}-menu`);
        const first = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        first?.focus();
      });
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }
  }

  return (
    <nav
      ref={navRef}
      id={HEADER_NAV_ID}
      aria-label="Main navigation"
      className="relative flex max-w-full min-w-0 flex-nowrap items-center justify-center gap-x-[10px] text-[13px]"

      onMouseLeave={() => closeMenu()}
    >
      {HEADER_NAV_LINKS.map((link) => {
        const isActive = isNavLinkActive(pathname, link.href);
        const hasDropdownMenu = hasMegaMenu(link);
        const menuId = `${baseId}-${link.href}-menu`;
        const isOpen = openHref === link.href;

        if (!hasDropdownMenu) {
          return (
            <NavigationLink
              key={`${link.label}-${link.href}`}
              href={link.href}
              label={link.label}
              isActive={isActive}
            />
          );
        }

        return (
          <div
            key={`${link.label}-${link.href}`}
            className="relative"
            onMouseEnter={() => openMenu(link.href)}
          >
            <button
              ref={(node) => {
                if (node) {
                  triggerRefs.current.set(link.href, node);
                } else {
                  triggerRefs.current.delete(link.href);
                }
              }}
              type="button"
              className={cn(
                'header-nav-item relative inline-flex items-center gap-[4px] py-[8px]',
                'font-sans text-[13px] font-medium leading-none tracking-[-0.01em] whitespace-nowrap',
                'transition-colors duration-200 ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive || isOpen
                  ? 'header-nav-active text-primary'
                  : 'text-foreground/80 hover:text-primary',
              )}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={menuId}
              onClick={() => {
                if (isOpen) {
                  closeMenu(true);
                } else {
                  openMenu(link.href, true);
                }
              }}
              onKeyDown={(event) => handleTriggerKeyDown(event, link)}
            >
              <span>{link.label}</span>
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden
                className={cn(
                  'h-[14px] w-[14px] [stroke-width:1.75] transition-transform duration-200 ease-out',
                  isOpen && 'rotate-180',
                  isActive || isOpen ? 'text-primary opacity-100' : 'opacity-70',
                )}
              />
            </button>
          </div>
        );
      })}

      {openLink && hasMegaMenu(openLink) ? (
        <div
          className="fixed inset-x-0 z-[var(--z-popover)]"
          style={{ top: HEADER_HEIGHT_PX }}
          onMouseEnter={() => openMenu(openLink.href, true)}
          onMouseLeave={() => closeMenu()}
        >
          <Container size="xl">
            <MegaMenuPanel
              link={openLink}
              menuId={`${baseId}-${openLink.href}-menu`}
              onSelect={() => closeMenu(true)}
            />
          </Container>
        </div>
      ) : null}
    </nav>
  );
}
