'use client';

import { Heart, Minus, Plus, Share2, ShoppingBag, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { formatClayCraftPrice } from '../../claycraft-commerce';
import { useClayCraftDemo } from '../../ClayCraftDemoContext';
import { ClayCraftProductCard } from '../../ClayCraftProductCard';
import { getCategoryById } from '../../claycraft-catalog';
import { getProductsByCategory, type ClayCraftProduct } from '../../claycraft-products';
import { ccCategoryPath, ccPath } from '../../claycraft-paths';

export default function ClayCraftProductDetailClient({ product }: { product: ClayCraftProduct }) {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useClayCraftDemo();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [zoomed, setZoomed] = useState(false);

  const category = getCategoryById(product.categoryId);
  const related = useMemo(
    () =>
      getProductsByCategory(product.categoryId)
        .filter((p) => p.id !== product.id)
        .slice(0, 3),
    [product],
  );
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="cc-pdp">
      <div className="cc-container">
        <nav className="cc-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href={ccPath('/')}>Home</Link>
            </li>
            <li>
              <Link href={ccPath('/shop')}>Shop</Link>
            </li>
            {category ? (
              <li>
                <Link href={ccCategoryPath(category.id)}>{category.title}</Link>
              </li>
            ) : null}
            <li>
              <span aria-current="page">{product.title}</span>
            </li>
          </ol>
        </nav>

        <div className="cc-pdp__grid">
          <div className="cc-pdp__gallery">
            <div
              className={`cc-pdp__main${zoomed ? ' is-zoomed' : ''}`}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              <Image
                src={product.images[active] ?? product.image}
                alt={product.imageAlt}
                width={900}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="cc-quickview__thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={i === active ? 'is-active' : undefined}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setActive(i)}
                >
                  <Image src={src} alt="" width={88} height={88} />
                </button>
              ))}
            </div>
          </div>

          <div className="cc-pdp__info">
            {product.badge ? (
              <span
                className={`cc-product-card__badge cc-product-card__badge--${product.badge.tone}`}
              >
                {product.badge.label}
              </span>
            ) : null}
            <h1 className="cc-section-title">{product.title}</h1>
            <p className="cc-quickview__rating">
              ★ {product.rating} · {product.reviewCount} reviews
            </p>
            <div className="cc-product-card__prices">
              <p className="cc-price">{formatClayCraftPrice(product.price)}</p>
              {product.compareAt ? (
                <span className="cc-price-old">{formatClayCraftPrice(product.compareAt)}</span>
              ) : null}
            </div>
            <p className="cc-product-meta">
              {product.inStock ? product.stockLabel : 'Out of stock'}
            </p>
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
                aria-pressed={wishlisted}
                aria-label="Wishlist"
                onClick={() => toggleWishlist(product)}
              >
                <Heart aria-hidden />
              </button>
              <button
                type="button"
                className="cc-icon-btn"
                aria-label="Share"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    showToast('Link copied');
                  } catch {
                    showToast('Unable to copy', 'error');
                  }
                }}
              >
                <Share2 aria-hidden />
              </button>
            </div>

            <p className="cc-pdp__ship">
              <Truck aria-hidden /> {product.shippingNote}
            </p>
          </div>
        </div>

        <section className="cc-pdp__tabs" aria-labelledby="cc-specs-heading">
          <h2 id="cc-specs-heading">Specifications</h2>
          <dl className="cc-specs">
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cc-pdp__reviews" aria-labelledby="cc-reviews-heading">
          <h2 id="cc-reviews-heading">Customer Reviews</h2>
          <ul>
            {product.reviews.map((r) => (
              <li key={r.id} className="cc-testimonial-card">
                <p className="cc-quickview__rating">★ {r.rating}</p>
                <p className="cc-quote">“{r.text}”</p>
                <p className="cc-quote__name">{r.name}</p>
                <p className="cc-quote__role">{r.date}</p>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 ? (
          <section className="cc-section" aria-labelledby="cc-related-heading">
            <h2 id="cc-related-heading" className="cc-section-title">
              You May Also Like
            </h2>
            <div className="cc-bestsellers__grid cc-related-grid">
              {related.map((p) => (
                <ClayCraftProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
