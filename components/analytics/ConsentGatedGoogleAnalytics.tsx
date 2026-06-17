"use client";

import Script from "next/script";

import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { GA4_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";
import { isAnalyticsConsented } from "@/lib/cookieConsent";

/** Loads GA4 only after the visitor accepts analytics cookies. */
export default function ConsentGatedGoogleAnalytics() {
  const { ready, consent } = useCookieConsent();

  if (!isAnalyticsEnabled() || !ready || !isAnalyticsConsented(consent)) return null;

  return (
    <>
      <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="lazyOnload" />
      <Script defer id="bitcraftly-ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
