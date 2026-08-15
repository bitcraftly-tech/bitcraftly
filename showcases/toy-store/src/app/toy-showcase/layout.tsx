import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

import { ToyShowcaseLayout } from './ToyShowcaseLayout';
import { TOY_BASE } from './toy-paths';

const toyFontVariables = {
  '--font-nunito': '"Trebuchet MS", "Segoe UI", sans-serif',
  '--font-playnest': '"Arial Rounded MT Bold", "Trebuchet MS", "Segoe UI", sans-serif',
} as CSSProperties;

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
    <div style={toyFontVariables}>
      <ToyShowcaseLayout>{children}</ToyShowcaseLayout>
    </div>
  );
}
