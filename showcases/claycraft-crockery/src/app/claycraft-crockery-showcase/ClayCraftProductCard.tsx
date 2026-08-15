'use client';

import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { formatClayCraftPrice } from './claycraft-commerce';
import { useClayCraftDemo } from './ClayCraftDemoContext';
import type { ClayCraftProduct } from './claycraft-products';
import { ccProductPath } from './claycraft-paths';

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div
      className="cc-product-card__rating"
      aria-label={`${rating} out of 5 stars, ${reviewCount} reviews`}
    >
      <span className="cc-product-card__stars" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i));
          return (
            <span key={i} className="cc-product-card__star">
              <Star className="cc-product-card__star-empty" />
              {fill > 0 ? (
                <span className="cc-product-card__star-fill" style={{ width: `${fill * 100}%` }}>
                  <Star />
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      <span className="cc-product-meta">({reviewCount})</span>
    </div>
  );
}

export function ClayCraftProductCard({ product }: { product: ClayCraftProduct }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useClayCraftDemo();
  const wishlisted = isWishlisted(product.id);
  const variantLabel = product.sizes[0];
  /* Sale badges are omitted: the price row already spells the saving out. */
  const badge = product.badge?.tone === 'new' ? product.badge : undefined;
  const discountPercent =
    product.compareAt != null && product.compareAt > product.price
      ? Math.round((1 - product.price / product.compareAt) * 100)
      : null;

  return (
    <article className="cc-product-card">
      <div className="cc-product-card__media-wrap">
        <Link href={ccProductPath(product.slug)} className="cc-product-card__media">
          {badge ? (
            <span className={`cc-product-card__badge cc-product-card__badge--${badge.tone}`}>
              {badge.label}
            </span>
          ) : null}
          {!product.inStock ? (
            <span className="cc-product-card__badge cc-product-card__badge--oos">Sold out</span>
          ) : null}
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={640}
            height={640}
            sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
        </Link>

        <button
          type="button"
          className={`cc-product-card__wish${wishlisted ? ' is-active' : ''}`}
          aria-label={
            wishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={wishlisted}
          onClick={() => toggleWishlist(product)}
        >
          <Heart aria-hidden />
        </button>

        <button
          type="button"
          className="cc-product-card__quick"
          aria-label={`Quick view ${product.title}`}
          onClick={() => openQuickView(product)}
        >
          <Eye aria-hidden />
          Quick View
        </button>
      </div>

      <div className="cc-product-card__body">
        <h3 className="cc-product-title">
          <Link href={ccProductPath(product.slug)}>{product.title}</Link>
        </h3>

        {variantLabel ? <p className="cc-product-card__variant">{variantLabel}</p> : null}

        <div className="cc-product-card__prices">
          <p className="cc-price">{formatClayCraftPrice(product.price)}</p>
          {product.compareAt != null ? (
            <span className="cc-price-old">{formatClayCraftPrice(product.compareAt)}</span>
          ) : null}
          {discountPercent != null ? (
            <span className="cc-product-card__discount">({discountPercent}% OFF)</span>
          ) : null}
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <button
          type="button"
          className="cc-product-card__cta"
          disabled={!product.inStock}
          aria-label={
            product.inStock ? `Add ${product.title} to cart` : `${product.title} is out of stock`
          }
          onClick={() => addToCart(product, 1)}
        >
          <span className="cc-product-card__cta-label">
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </span>
          <ShoppingBag aria-hidden />
        </button>
      </div>
    </article>
  );
}
