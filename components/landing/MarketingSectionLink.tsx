"use client";

import type { MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  navigateToMarketingSection,
  parseSectionHref,
  scrollToElementWithRetry,
} from "@/lib/scrollToMarketingSection";

type MarketingSectionLinkProps = {
  path: string;
  sectionId: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

export function useMarketingSectionNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (href: string, event?: MouseEvent, onNavigate?: () => void) => {
    const parsed = parseSectionHref(href);
    if (!parsed) return false;

    event?.preventDefault();

    if (!parsed.path || parsed.path === pathname) {
      scrollToElementWithRetry(parsed.sectionId);
      onNavigate?.();
      return true;
    }

    navigateToMarketingSection({
      path: parsed.path,
      sectionId: parsed.sectionId,
      pathname,
      push: (url, options) => router.push(url, options),
    });
    onNavigate?.();
    return true;
  };
}

export default function MarketingSectionLink({
  path,
  sectionId,
  label,
  children,
  className,
  onNavigate,
}: MarketingSectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (pathname === path) {
      scrollToElementWithRetry(sectionId);
      onNavigate?.();
      return;
    }

    navigateToMarketingSection({
      path,
      sectionId,
      pathname,
      push: (url, options) => router.push(url, options),
    });
    onNavigate?.();
  };

  return (
    <a href={path} className={className} onClick={handleClick}>
      {children ?? label}
    </a>
  );
}

type MarketingSectionAnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

/** Accepts `/path#section` or `#section` — scrolls in-page; cross-page uses sessionStorage (no hash URL). */
export function MarketingSectionAnchor({ href, children, className, onNavigate }: MarketingSectionAnchorProps) {
  const pathname = usePathname();
  const navigate = useMarketingSectionNavigation();
  const parsed = parseSectionHref(href);
  const displayHref = parsed ? parsed.path || pathname || "/" : href;

  return (
    <a
      href={displayHref}
      className={className}
      onClick={(event) => {
        if (navigate(href, event, onNavigate)) return;
      }}
    >
      {children}
    </a>
  );
}
