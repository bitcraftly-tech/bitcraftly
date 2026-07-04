"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  clearPendingScrollTarget,
  getPendingScrollTarget,
  scrollToElementWithRetry,
} from "@/lib/scrollToMarketingSection";

function consumeScrollQueryParam(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);
  const scrollTarget = params.get("scroll");
  if (!scrollTarget) return undefined;

  const url = new URL(window.location.href);
  url.searchParams.delete("scroll");
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", nextUrl || url.pathname);

  return scrollTarget;
}

/** Legacy hash bookmarks — scroll then strip `#section` from the URL. */
function consumeLocationHash(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const hash = window.location.hash.replace("#", "");
  if (!hash) return undefined;

  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  return hash;
}

type MarketingScrollEffectsProps = {
  sectionId?: string;
};

/** Runs pending section scroll after route changes — no hash in URL. */
export default function MarketingScrollEffects({ sectionId }: MarketingScrollEffectsProps) {
  const pathname = usePathname();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cancelRef.current?.();
    cancelRef.current = null;

    const pendingSection =
      sectionId || getPendingScrollTarget(pathname) || consumeScrollQueryParam() || consumeLocationHash();
    if (!pendingSection) return;

    cancelRef.current = scrollToElementWithRetry(pendingSection, {
      startDelayMs: 120,
      maxWaitMs: 15_000,
      intervalMs: 100,
      onSuccess: clearPendingScrollTarget,
    });

    return () => {
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, [pathname, sectionId]);

  return null;
}
