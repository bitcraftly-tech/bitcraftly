import type { Metadata, Viewport } from "next";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import { inter, playfair } from "@/lib/fonts";
import ConsentGatedGoogleAnalytics from "@/components/analytics/ConsentGatedGoogleAnalytics";
import DeferredAnalyticsListener from "@/components/analytics/DeferredAnalyticsListener";
import RootBootEffects from "@/components/boot/RootBootEffects";
import IosScrollDebugOverlay from "@/components/debug/IosScrollDebugOverlay";
import CookieConsentBanner from "@/components/consent/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/consent/CookieConsentProvider";
import { GSC_VERIFICATION } from "@/lib/analytics";
import { IS_STAGING } from "@/lib/appEnv";
import { buildPageMetadata } from "@/lib/seoMetadata";
import { LOADER_COPY, LOADER_ENABLED } from "@/lib/loader/config";
import { HOME_SEO, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
/** Re-enable when chatbot should ship: uncomment import + <ChatSupportWidget /> below */
// import ChatSupportWidget from "@/components/chat/ChatSupportWidget";
import BitcraftlyChat from "@/components/chat/BitcraftlyChat";
import DeferredFloatingChrome from "@/components/landing/DeferredFloatingChrome";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { LoaderProvider } from "@/components/providers/LoaderProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StagingEnvironmentBanner from "@/components/ui/StagingEnvironmentBanner";
import DeferredToaster from "@/components/ui/DeferredToaster";

type RootLayoutProps = {
  children: ReactNode;
};

const rootSeo = buildPageMetadata("home");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_SEO.description,
  keywords: [...HOME_SEO.keywords],
  authors: [{ name: "Sanjay Kr. Singh", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  openGraph: {
    ...rootSeo.openGraph,
    images: [{ url: DEFAULT_OG_IMAGE, alt: `${SITE_NAME} — React.js & Next.js web development` }],
  },
  twitter: rootSeo.twitter,
  robots: IS_STAGING
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: {
    canonical: SITE_URL,
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans-brand antialiased">
        <RootBootEffects />
        {LOADER_ENABLED ? (
          <div id="bc-static-loader" className="bc-static-loader" aria-hidden>
            <div className="bc-static-loader__glow" />
            <div className="bc-static-loader__content">
              <div className="bc-static-loader__orbit" aria-hidden>
                <span className="bc-static-loader__ring bc-static-loader__ring--1" />
                <span className="bc-static-loader__ring bc-static-loader__ring--2" />
                <span className="bc-static-loader__ring bc-static-loader__ring--3" />
                <div className="bc-static-loader__orbit-spin">
                  <span className="bc-static-loader__dot" style={{ ["--orbit-deg" as string]: "0deg" }} />
                  <span className="bc-static-loader__dot" style={{ ["--orbit-deg" as string]: "120deg" }} />
                  <span className="bc-static-loader__dot" style={{ ["--orbit-deg" as string]: "240deg" }} />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/bitcraftly-mark.png"
                  alt=""
                  width={38}
                  height={38}
                  className="bc-static-loader__logo"
                  fetchPriority="low"
                />
              </div>
              <p className="bc-static-loader__brand">{LOADER_COPY.brand}</p>
              <p className="bc-static-loader__tagline">{LOADER_COPY.tagline}</p>
              <div className="bc-static-loader__bar" aria-hidden>
                <span className="bc-static-loader__bar-fill" />
              </div>
              <p className="bc-static-loader__label">{LOADER_COPY.label}</p>
            </div>
          </div>
        ) : null}
        <CookieConsentProvider>
          <ConsentGatedGoogleAnalytics />
          <Suspense fallback={null}>
            <DeferredAnalyticsListener />
          </Suspense>
          <CookieConsentBanner />
          <StagingEnvironmentBanner />
          <ThemeProvider>
            <LoaderProvider>
              <AuthSessionProvider>{children}</AuthSessionProvider>
              {/* <ChatSupportWidget /> */}
              {/* <BitcraftlyChat /> */}
              {/* <DeferredFloatingChrome /> */}
              <DeferredToaster />
            </LoaderProvider>
          </ThemeProvider>
        </CookieConsentProvider>
        <IosScrollDebugOverlay />
      </body>
    </html>
  );
}

