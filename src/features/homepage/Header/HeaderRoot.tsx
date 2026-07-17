"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/navigation";
import { HEADER_HEIGHT_PX, HEADER_ID } from "./header.constants";

interface HeaderRootProps {
  children: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Non-home routes are always solid — skip scroll work and listeners.
    if (!isHome) {
      return;
    }

    let frame = 0;
    let idleId = 0;
    let timeoutId = 0;
    let attached = false;

    function updateScrolled() {
      const next = window.scrollY > 12;
      setScrolled((prev) => (prev === next ? prev : next));
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrolled);
    }

    function attach() {
      if (attached) return;
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      frame = requestAnimationFrame(updateScrolled);
    }

    // Defer scroll listener until idle so it does not compete with LCP/TBT.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(attach, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(attach, 200);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      cancelAnimationFrame(frame);
      if (attached) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [pathname, isHome]);

  // Homepage: transparent over hero, solid on scroll.
  // Other pages: always solid so chrome matches the home scrolled state.
  const solid = !isHome || scrolled;

  return (
    <header
      id={HEADER_ID}
      className={cn(
        "sticky top-0 z-[var(--z-sticky)] flex w-full items-center overflow-visible border-b",
        "transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
        solid
          ? "header-surface-solid border-[var(--border)]"
          : "border-transparent bg-transparent",
      )}
      style={{ height: HEADER_HEIGHT_PX }}
    >
      {children}
    </header>
  );
}
