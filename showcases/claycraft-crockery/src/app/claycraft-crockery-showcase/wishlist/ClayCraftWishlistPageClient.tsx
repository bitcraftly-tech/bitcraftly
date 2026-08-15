'use client';

import Link from 'next/link';

import { ClayCraftProductCard } from '../ClayCraftProductCard';
import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { useClayCraftDemo } from '../ClayCraftDemoContext';
import { getProductById } from '../claycraft-products';
import { ccPath } from '../claycraft-paths';

export default function ClayCraftWishlistPageClient() {
  const { wishlist } = useClayCraftDemo();
  const products = wishlist.map((id) => getProductById(id)).filter(Boolean);

  return (
    <>
      <ClayCraftPageHeader title="Wishlist" crumbs={[{ label: 'Wishlist' }]} />
      <div className="cc-container cc-section">
        {products.length === 0 ? (
          <div className="cc-empty">
            <p>Your wishlist is empty.</p>
            <Link href={ccPath('/shop')} className="cc-btn cc-btn--primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="cc-bestsellers__grid">
            {products.map((p) => (p ? <ClayCraftProductCard key={p.id} product={p} /> : null))}
          </div>
        )}
      </div>
    </>
  );
}
