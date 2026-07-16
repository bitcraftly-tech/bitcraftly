import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StructuredData from "@/components/seo/StructuredData";
import "@/styles/globals.css";

const SITE_TITLE = "Bitcraftly | AI & Digital Engineering Partner";

const SITE_DESCRIPTION =
  "Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.";

const SITE_URL = "https://bitcraftly.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    icon: [{ url: "/brand/icon.png", type: "image/png" }],
    shortcut: "/brand/favicon.ico",
    apple: "/brand/icon.png",
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
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}