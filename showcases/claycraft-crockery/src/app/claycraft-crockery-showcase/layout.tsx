import type { Metadata } from 'next';

import ClayCraftShowcaseLayout from './ClayCraftShowcaseLayout';
import { CLAYCRAFT_BASE } from './claycraft-paths';

export const metadata: Metadata = {
  title: {
    default: 'Crockery Wala Elegant Tableware',
    template: '%s | Crockery Wala',
  },
  description:
    'Premium tableware ecommerce demo — shop dinner sets, serveware, and drinkware. Portfolio showcase by Bitcraftly.',
  openGraph: {
    title: 'Crockery Wala Elegant Tableware',
    description: 'Premium ceramic and tableware demo storefront.',
    url: CLAYCRAFT_BASE,
    siteName: 'Crockery Wala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crockery Wala Elegant Tableware',
    description: 'Premium ceramic and tableware demo storefront.',
  },
};

export default function ClayCraftLayout({ children }: { children: React.ReactNode }) {
  return <ClayCraftShowcaseLayout>{children}</ClayCraftShowcaseLayout>;
}
