"use client";

import { useEffect, useState } from "react";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { formatVisitorCount } from "@/lib/formatVisitorCount";
import { isAnalyticsConsented } from "@/lib/cookieConsent";

export default function VisitorCountBadge() {
  const { ready, consent } = useCookieConsent();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!ready || !isAnalyticsConsented(consent)) return;

    let cancelled = false;

    void fetch("/api/analytics/visitor-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelled || typeof data?.count !== "number") return;
        setCount(data.count);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [ready, consent]);

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
