import type { Metadata, Viewport } from "next";
import { ReactNode, Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnalyticsListener from "@/components/analytics/AnalyticsListener";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GSC_VERIFICATION } from "@/lib/analytics";
import { IS_STAGING } from "@/lib/appEnv";
import { buildPageMetadata } from "@/lib/seoMetadata";
import { LOADER_ENABLED } from "@/lib/loader/config";
import { loaderBootScript } from "@/lib/loader/bootSnippet";
import { HOME_SEO, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
/** Re-enable when chatbot should ship: uncomment import + <ChatSupportWidget /> below */
// import ChatSupportWidget from "@/components/chat/ChatSupportWidget";
import PortfolioFloatingChrome from "@/components/landing/PortfolioFloatingChrome";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { LoaderProvider } from "@/components/providers/LoaderProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StagingEnvironmentBanner from "@/components/ui/StagingEnvironmentBanner";
import Toaster from "@/components/ui/Toaster";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

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
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {LOADER_ENABLED ? (
          <script
            dangerouslySetInnerHTML={{
              __html: loaderBootScript(),
            }}
          />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;if(p.indexOf("/portfolio/")===0||p.indexOf("/dayal-builders")===0){document.documentElement.classList.remove("dark");return;}var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-[var(--font-inter)] antialiased">
        {LOADER_ENABLED ? (
          <div id="bc-static-loader" className="bc-static-loader" aria-hidden>
            <span className="bc-static-loader__brand">Bitcraftly</span>
            <span className="bc-static-loader__label">Loading…</span>
          </div>
        ) : null}
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
        <StagingEnvironmentBanner />
        <ThemeProvider>
          <LoaderProvider>
            <AuthSessionProvider>{children}</AuthSessionProvider>
            {/* <ChatSupportWidget /> */}
            <PortfolioFloatingChrome />
            <Toaster />
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

