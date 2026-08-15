'use client';

import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { formatClayCraftPrice } from './claycraft-commerce';
import { useClayCraftDemo } from './ClayCraftDemoContext';
import { searchProducts } from './claycraft-products';
import { ccProductPath } from './claycraft-paths';

export default function ClayCraftSearchModal() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useClayCraftDemo();

  const results = useMemo(() => searchProducts(searchQuery).slice(0, 8), [searchQuery]);

  if (!searchOpen) return null;

  return (
    <div className="cc-overlay" role="presentation">
      <button
        type="button"
        className="cc-overlay__backdrop"
        aria-label="Close search"
        onClick={() => setSearchOpen(false)}
      />
      <div
        className="cc-search-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-search-title"
      >
        <div className="cc-search-modal__head">
          <h2 id="cc-search-title" className="sr-only">
            Search products
          </h2>
          <Search aria-hidden />
          <input
            autoFocus
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dinner sets, mugs, bowls…"
            aria-label="Search products"
          />
          <button
            type="button"
            className="cc-icon-btn"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X aria-hidden />
          </button>
        </div>
        <ul className="cc-search-modal__results">
          {results.length === 0 ? (
            <li className="cc-search-modal__empty">No products match “{searchQuery}”.</li>
          ) : (
            results.map((product) => {
              const q = searchQuery.trim().toLowerCase();
              const title = product.title;
              const idx = q ? title.toLowerCase().indexOf(q) : -1;
              return (
                <li key={product.id}>
                  <Link
                    href={ccProductPath(product.slug)}
                    className="cc-search-modal__item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <Image src={product.image} alt="" width={56} height={56} />
                    <span>
                      {idx >= 0 ? (
                        <>
                          {title.slice(0, idx)}
                          <mark>{title.slice(idx, idx + q.length)}</mark>
                          {title.slice(idx + q.length)}
                        </>
                      ) : (
                        title
                      )}
                      <small>{formatClayCraftPrice(product.price)}</small>
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
