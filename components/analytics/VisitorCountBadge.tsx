"use client";

import { useCallback, useEffect, useState } from "react";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { formatVisitorCount } from "@/lib/formatVisitorCount";
import { isAnalyticsConsented } from "@/lib/cookieConsent";

const REFRESH_MS = 120_000;

async function fetchVisitorCount(): Promise<number | null> {
  const res = await fetch("/api/analytics/visitor-count", { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as { count?: number | null; configured?: boolean };
  if (typeof data.count !== "number" || !data.configured) return null;
  return data.count;
}

export default function VisitorCountBadge() {
  const { ready, consent } = useCookieConsent();
  const [count, setCount] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!isAnalyticsConsented(consent)) return;
    try {
      const next = await fetchVisitorCount();
      if (next !== null) setCount(next);
    } catch {
      /* ignore */
    }
  }, [consent]);

  useEffect(() => {
    if (!ready || !isAnalyticsConsented(consent)) return;

    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, REFRESH_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [ready, consent, refresh]);

  if (count === null) return null;

  return (
    <p className="text-[11px] text-text-tertiary dark:text-dark-text-tertiary" aria-live="polite">
      <span className="font-medium text-text-secondary dark:text-dark-text-secondary">
        {formatVisitorCount(count)}
      </span>{" "}
      visitors
    </p>
  );
}
