import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootDeferredCss } from "@/components/patterns/root-deferred-css/RootDeferredCss";
import StructuredData from "@/components/seo/StructuredData";
import { getSiteUrl } from "@/lib/seo/site";
import "@/styles/globals.css";

const SITE_TITLE = "Bitcraftly | AI & Digital Engineering Partner";

const SITE_DESCRIPTION =
  "Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.";

const SITE_URL = getSiteUrl();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | Bitcraftly",
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Bitcraftly",
    "AI Development",
    "Web Development",
    "Next.js",
    "React",
    "SaaS Development",
    "Automation",
    "Digital Engineering",
    "Enterprise Software",
  ],

  authors: [
    {
      name: "Bitcraftly",
      url: SITE_URL,
    },
  ],

  creator: "Bitcraftly",

  publisher: "Bitcraftly",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Bitcraftly",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Bitcraftly - AI & Digital Engineering Partner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.webp"],
  },

  icons: {
    icon: [
      { url: "/brand/icon.webp", type: "image/webp" },
      { url: "/brand/icon.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <RootDeferredCss />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}