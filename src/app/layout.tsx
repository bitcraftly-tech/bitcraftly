import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { AppBootShell } from '@/components/patterns/app-boot-splash';
import { RootDeferredCss } from '@/components/patterns/root-deferred-css/RootDeferredCss';
import StructuredData from '@/components/seo/StructuredData';
import { getSiteUrl } from '@/lib/seo/site';
import { isInteractiveDemoPath } from '@/components/patterns/app-boot-splash/boot-path';
import '@/styles/globals.css';

const SITE_TITLE = 'Bitcraftly | AI-Powered Digital Engineering Partner';

const SITE_DESCRIPTION =
  'Complete Digital Systems for your industry — website, AI, dashboard, analytics, and integrations engineered as one Industry System.';

const SITE_URL = getSiteUrl();

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: '%s | Bitcraftly',
  },

  description: SITE_DESCRIPTION,

  keywords: [
    'Bitcraftly',
    'Industry Systems',
    'Complete Digital Systems',
    'AI-Powered Digital Engineering Partner',
    'Intelligent Business Automation',
    'Digital Engineering',
    'Next.js',
    'Healthcare Industry System',
    'Real Estate Industry System',
  ],

  authors: [
    {
      name: 'Bitcraftly',
      url: SITE_URL,
    },
  ],

  applicationName: 'Bitcraftly',

  category: 'technology',

  creator: 'Bitcraftly',

  publisher: 'Bitcraftly',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Bitcraftly',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    images: [
      {
        url: '/opengraph-image.webp',
        width: 1200,
        height: 630,
        alt: 'Bitcraftly — Complete Digital Systems for Your Industry',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/twitter-image.webp'],
  },

  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),

  icons: {
    icon: [
      { url: '/brand/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/brand/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050B18',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const headerMode = headerList.get('x-bc-boot-mode');
  const pathname = headerList.get('x-pathname') ?? '';
  const bootMode =
    headerMode === 'demo' || headerMode === 'brand'
      ? headerMode
      : isInteractiveDemoPath(pathname)
        ? 'demo'
        : 'brand';

  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppBootShell mode={bootMode} pathname={pathname} />
        <RootDeferredCss />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
