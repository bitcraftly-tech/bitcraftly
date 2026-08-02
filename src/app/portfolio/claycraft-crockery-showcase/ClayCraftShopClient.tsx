'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ClayCraftProductCard } from './ClayCraftProductCard';
import { CLAYCRAFT_CATEGORIES } from './claycraft-catalog';
import { CLAYCRAFT_PRODUCTS, type ClayCraftProduct } from './claycraft-products';
import { ccPath, ccCategoryPath } from './claycraft-paths';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

function sortProducts(list: ClayCraftProduct[], sort: SortKey): ClayCraftProduct[] {
  const next = [...list];
  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price);
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating);
    default:
      return next;
  }
}

export default function ClayCraftShopClient({
  categoryId,
}: {
  categoryId?: string;
  heading?: string;
  description?: string;
}) {
  const searchParams = useSearchParams();
  const saleOnly = searchParams.get('sale') === '1';
  const [sort, setSort] = useState<SortKey>('featured');
  const [q, setQ] = useState('');

  const products = useMemo(() => {
    let list = [...CLAYCRAFT_PRODUCTS];
    if (categoryId) list = list.filter((p) => p.categoryId === categoryId);
    if (saleOnly) list = list.filter((p) => Boolean(p.compareAt) || p.badge?.tone === 'sale');
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(needle));
    }
    return sortProducts(list, sort);
  }, [categoryId, saleOnly, q, sort]);

  return (
    <div className="cc-shop">
      <div className="cc-container">
        <div className="cc-shop__layout">
          <aside className="cc-shop__filters" aria-label="Filters">
            <h2>Categories</h2>
            <ul>
              <li>
                <Link href={ccPath('/shop')} className={!categoryId ? 'is-active' : undefined}>
                  All
                </Link>
              </li>
              {CLAYCRAFT_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={ccCategoryPath(c.id)}
                    className={categoryId === c.id ? 'is-active' : undefined}
                    aria-current={categoryId === c.id ? 'page' : undefined}
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={ccPath('/shop?sale=1')}
              className={saleOnly ? 'is-active cc-shop__sale' : 'cc-shop__sale'}
            >
              On Sale
            </Link>
          </aside>

          <div className="cc-shop__main">
            <div className="cc-shop__toolbar">
              <p className="cc-shop__count">{products.length} products</p>
              <div className="cc-shop__controls">
                <label className="sr-only" htmlFor="cc-shop-search">
                  Filter products
                </label>
                <input
                  id="cc-shop-search"
                  type="search"
                  placeholder="Filter…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <label className="sr-only" htmlFor="cc-shop-sort">
                  Sort
                </label>
                <select
                  id="cc-shop-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <p className="cc-empty">No products match your filters.</p>
            ) : (
              <div className="cc-bestsellers__grid">
                {products.map((p) => (
                  <ClayCraftProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
