import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bitcraftly | AI & Digital Engineering Partner",
    template: "%s | Bitcraftly",
  },
  description:
    "Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.",
  openGraph: {
    type: "website",
    url: "https://bitcraftly.com",
    siteName: "Bitcraftly",
    title: "Bitcraftly | AI & Digital Engineering Partner",
    description:
      "Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bitcraftly - AI & Digital Engineering Partner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bitcraftly | AI & Digital Engineering Partner",
    description:
      "Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [{ url: "/brand/icon.png", type: "image/png" }],
    shortcut: "/brand/favicon.ico",
    apple: "/brand/icon.png",
  },
  metadataBase: new URL("https://bitcraftly.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
