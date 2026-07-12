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
    function updateScrolled() {
      setScrolled(window.scrollY > 12);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [pathname]);

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
