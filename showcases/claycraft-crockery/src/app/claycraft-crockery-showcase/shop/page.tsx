import type { Metadata } from 'next';
import { Suspense } from 'react';

import ClayCraftPageHeader from '../ClayCraftPageHeader';
import ClayCraftShopClient from '../ClayCraftShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse Crockery Wala dinnerware, serveware, drinkware, and table décor.',
};

export default function ClayCraftShopPage() {
  return (
    <>
      <ClayCraftPageHeader
        title="Shop All"
        description="Explore our full collection of premium tableware."
        crumbs={[{ label: 'Shop' }]}
      />
      <Suspense fallback={<div className="cc-container cc-section">Loading shop…</div>}>
        <ClayCraftShopClient
          heading="All Products"
          description="Every piece, curated for beautiful everyday dining."
        />
      </Suspense>
    </>
  );
}
