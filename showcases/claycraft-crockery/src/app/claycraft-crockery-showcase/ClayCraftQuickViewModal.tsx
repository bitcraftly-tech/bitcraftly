'use client';

import { Heart, Minus, Plus, Share2, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { formatClayCraftPrice } from './claycraft-commerce';
import { useClayCraftDemo } from './ClayCraftDemoContext';
import { getProductsByCategory } from './claycraft-products';
import { ccProductPath } from './claycraft-paths';

export default function ClayCraftQuickViewModal() {
  const {
    quickViewProduct: product,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
  } = useClayCraftDemo();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [colorId, setColorId] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();

  useEffect(() => {
    if (!product) return;
    setActiveImage(0);
    setQty(1);
    setColorId(product.colors[0]?.id);
    setSize(product.sizes[0]);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, closeQuickView]);

  if (!product) return null;

  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="cc-overlay" role="presentation">
      <button
        type="button"
        className="cc-overlay__backdrop"
        aria-label="Close quick view"
        onClick={closeQuickView}
      />
      <div className="cc-quickview" role="dialog" aria-modal="true" aria-labelledby="cc-qv-title">
        <button
          type="button"
          className="cc-quickview__close cc-icon-btn"
          aria-label="Close"
          onClick={closeQuickView}
        >
          <X aria-hidden />
        </button>

        <div className="cc-quickview__gallery">
          <div className="cc-quickview__main">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.imageAlt}
              width={640}
              height={640}
              sizes="(max-width: 900px) 90vw, 40vw"
            />
          </div>
          <div className="cc-quickview__thumbs">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={i === activeImage ? 'is-active' : undefined}
                aria-label={`View image ${i + 1}`}
                onClick={() => setActiveImage(i)}
              >
                <Image src={src} alt="" width={72} height={72} />
              </button>
            ))}
          </div>
        </div>

        <div className="cc-quickview__info">
          <p className="cc-product-meta">{product.inStock ? product.stockLabel : 'Out of stock'}</p>
          <h2 id="cc-qv-title">{product.title}</h2>
          <p className="cc-quickview__rating">
            ★ {product.rating} · {product.reviewCount} reviews
          </p>
          <div className="cc-product-card__prices">
            <p className="cc-price">{formatClayCraftPrice(product.price)}</p>
            {product.compareAt ? (
              <span className="cc-price-old">{formatClayCraftPrice(product.compareAt)}</span>
            ) : null}
          </div>
          <p className="cc-quickview__desc">{product.description}</p>

          {product.colors.length > 0 ? (
            <fieldset className="cc-option-set">
              <legend>Color</legend>
              <div className="cc-swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cc-swatch${colorId === c.id ? ' is-active' : ''}`}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                    aria-pressed={colorId === c.id}
                    onClick={() => setColorId(c.id)}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {product.sizes.length > 0 ? (
            <fieldset className="cc-option-set">
              <legend>Size</legend>
              <div className="cc-size-pills">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={size === s ? 'is-active' : undefined}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="cc-quickview__qty-row">
            <div className="cc-qty">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus aria-hidden />
              </button>
              <span>{qty}</span>
              <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
                <Plus aria-hidden />
              </button>
            </div>
            <button
              type="button"
              className="cc-btn cc-btn--primary"
              disabled={!product.inStock}
              onClick={() => addToCart(product, qty, { colorId, size })}
            >
              <ShoppingBag aria-hidden />
              Add to Cart
            </button>
            <button
              type="button"
              className={`cc-icon-btn${wishlisted ? ' is-active' : ''}`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              onClick={() => toggleWishlist(product)}
            >
              <Heart aria-hidden />
            </button>
            <button
              type="button"
              className="cc-icon-btn"
              aria-label="Share product"
              onClick={async () => {
                const url =
                  typeof window !== 'undefined'
                    ? `${window.location.origin}${ccProductPath(product.slug)}`
                    : '';
                try {
                  await navigator.clipboard.writeText(url);
                  showToast('Product link copied');
                } catch {
                  showToast('Unable to copy link', 'error');
                }
              }}
            >
              <Share2 aria-hidden />
            </button>
          </div>

          <Link
            href={ccProductPath(product.slug)}
            className="cc-quickview__full"
            onClick={closeQuickView}
          >
            View full details
          </Link>

          {related.length > 0 ? (
            <div className="cc-quickview__related">
              <h3>Related</h3>
              <ul>
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={ccProductPath(r.slug)} onClick={closeQuickView}>
                      <Image src={r.image} alt="" width={64} height={64} />
                      <span>{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
