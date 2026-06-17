"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { isAnalyticsConsented } from "@/lib/cookieConsent";

const AnalyticsListener = dynamic(() => import("@/components/analytics/AnalyticsListener"), {
  ssr: false,
});

export default function DeferredAnalyticsListener() {
  const { ready, consent } = useCookieConsent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(
        () => {
          if (!cancelled) setShow(true);
        },
        { timeout: 4000 },
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(() => {
      if (!cancelled) setShow(true);
    }, 1800);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready || !isAnalyticsConsented(consent) || !show) return null;
  return <AnalyticsListener />;
}
