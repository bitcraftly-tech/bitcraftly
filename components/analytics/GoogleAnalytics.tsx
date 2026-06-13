import Script from "next/script";

import { GA4_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";

/** Loads GA4 gtag — page views are sent manually from AnalyticsListener */
export default function GoogleAnalytics() {
  if (!isAnalyticsEnabled()) return null;

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
