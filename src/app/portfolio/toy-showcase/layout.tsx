import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';

import { ToyShowcaseLayout } from './ToyShowcaseLayout';
import { TOY_BASE } from './toy-paths';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  preload: true,
  weight: ['400', '500', '600', '700', '800'],
});

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playnest',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'PlayNest Premium Toy Store',
    template: '%s | PlayNest',
  },
  description:
    'PlayNest — toys that spark joy. Premium toy ecommerce demo with category shopping, age filters, bestsellers, and calm cart UX.',
  openGraph: {
    title: 'PlayNest Premium Toy Store',
    description: 'Toys that spark joy — premium toy ecommerce showcase.',
    url: TOY_BASE,
    siteName: 'PlayNest',
    type: 'website',
  },
};

export default function ToyShowcaseRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${nunito.variable} ${fredoka.variable} ${nunito.className}`}>
      <ToyShowcaseLayout>{children}</ToyShowcaseLayout>
    </div>
  );
}
