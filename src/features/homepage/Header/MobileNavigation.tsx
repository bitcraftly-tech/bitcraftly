"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import {
  HEADER_BOOK_CALL,
  HEADER_CTA,
  HEADER_MOBILE_MENU_ID,
  HEADER_NAV_LINKS,
} from "./header.constants";
import { NavigationLink } from "./NavigationLink";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const menuLabelId = useId();
  const panelId = HEADER_MOBILE_MENU_ID;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.documentElement.classList.add("overflow-hidden");

    const panel = panelRef.current;
    if (!panel) {
      return () => {
        document.documentElement.classList.remove("overflow-hidden");
      };
    }

    const focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-lg lg:hidden",
          "text-foreground transition-colors hover:bg-surface",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={toggleMenu}
      >
        <Icon name={open ? "close" : "menu"} size="md" aria-hidden />
      </button>

      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuLabelId}
          className="header-mobile-menu fixed inset-x-0 top-16 z-[calc(var(--z-sticky)-1)] border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto w-full max-w-[var(--container-xl)] px-[var(--container-padding)] py-[var(--space-4)]">
            <p id={menuLabelId} className="sr-only">
              Mobile navigation menu
            </p>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-[var(--space-1)]"
            >
              {HEADER_NAV_LINKS.map((link) => (
                <NavigationLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={closeMenu}
                  className="px-[var(--space-2)] py-[var(--space-2)] text-base"
                />
              ))}
            </nav>

            <div className="mt-[var(--space-4)] flex flex-col gap-[var(--space-2)] border-t border-border pt-[var(--space-4)]">
              <NavigationLink
                href={HEADER_BOOK_CALL.href}
                label={HEADER_BOOK_CALL.label}
                onClick={closeMenu}
                className="justify-center px-[var(--space-2)] py-[var(--space-2)] text-center text-base font-semibold"
              />
              <NavigationLink
                href={HEADER_CTA.href}
                label={HEADER_CTA.label}
                onClick={closeMenu}
                className={cn(
                  "header-brand-gradient flex items-center justify-center gap-[var(--space-1)]",
                  "rounded-xl px-[var(--space-4)] py-[var(--space-3)] text-base font-semibold text-primary-foreground shadow-lg",
                )}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
