'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ClayCraftProductCard } from './ClayCraftProductCard';
import { CLAYCRAFT_BEST_SELLERS } from './claycraft-products';
import { ccPath } from './claycraft-paths';

export default function ClayCraftBestSellers() {
  return (
    <section
      id="best-sellers"
      className="cc-section cc-bestsellers"
      aria-labelledby="cc-bestsellers-heading"
    >
      <div className="cc-container">
        <div className="cc-bestsellers__head" data-cc-reveal>
          <h2 id="cc-bestsellers-heading" className="cc-section-title">
            Our Bestsellers
          </h2>
          <Link href={ccPath('/shop')} className="cc-bestsellers__view-all">
            View All Products
            <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="cc-bestsellers__grid" data-cc-reveal-group>
          {CLAYCRAFT_BEST_SELLERS.map((product) => (
            <ClayCraftProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
