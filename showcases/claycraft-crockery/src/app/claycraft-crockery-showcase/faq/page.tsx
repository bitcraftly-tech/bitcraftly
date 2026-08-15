import type { Metadata } from 'next';

import ClayCraftFaqPageClient from './ClayCraftFaqPageClient';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Crockery Wala shipping, returns, care, and demo coupons.',
};

export default function ClayCraftFaqPage() {
  return <ClayCraftFaqPageClient />;
}
