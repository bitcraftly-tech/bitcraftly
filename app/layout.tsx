import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { HOME_SEO, SITE_NAME, SITE_URL } from "@/lib/seo";
/** Re-enable when chatbot should ship: uncomment import + <ChatSupportWidget /> below */
// import ChatSupportWidget from "@/components/chat/ChatSupportWidget";
import PortfolioFloatingChrome from "@/components/landing/PortfolioFloatingChrome";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Toaster from "@/components/ui/Toaster";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_SEO.description,
  keywords: [...HOME_SEO.keywords],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;if(p.indexOf("/portfolio/")===0){document.documentElement.classList.remove("dark");return;}var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-[var(--font-inter)] antialiased">
        <ThemeProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
          {/* <ChatSupportWidget /> */}
          <PortfolioFloatingChrome />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

