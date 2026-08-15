'use client';

import { Minus, Plus, ShoppingBag, Tag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { formatClayCraftPrice } from './claycraft-commerce';
import { useClayCraftDemo } from './ClayCraftDemoContext';
import { getProductById } from './claycraft-products';
import { ccPath, ccProductPath } from './claycraft-paths';

export default function ClayCraftCartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartSubtotal,
    shipping,
    tax,
    discount,
    grandTotal,
    coupon,
    applyCoupon,
    clearCoupon,
    updateQty,
    removeFromCart,
    clearCart,
    showToast,
  } = useClayCraftDemo();
  const [code, setCode] = useState('');

  if (!cartOpen) return null;

  return (
    <div className="cc-overlay" role="presentation">
      <button
        type="button"
        className="cc-overlay__backdrop"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
      />
      <aside className="cc-drawer" role="dialog" aria-modal="true" aria-labelledby="cc-cart-title">
        <div className="cc-drawer__head">
          <h2 id="cc-cart-title">Your Cart</h2>
          <button
            type="button"
            className="cc-icon-btn"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <X aria-hidden />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cc-drawer__empty">
            <ShoppingBag aria-hidden />
            <p>Your cart is empty.</p>
            <Link
              href={ccPath('/shop')}
              className="cc-btn cc-btn--primary"
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="cc-drawer__list">
              {cart.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                return (
                  <li
                    key={`${line.productId}-${line.colorId ?? ''}-${line.size ?? ''}`}
                    className="cc-drawer__item"
                  >
                    <Link href={ccProductPath(product.slug)} onClick={() => setCartOpen(false)}>
                      <Image src={product.image} alt="" width={80} height={80} />
                    </Link>
                    <div className="cc-drawer__item-body">
                      <Link href={ccProductPath(product.slug)} onClick={() => setCartOpen(false)}>
                        {product.title}
                      </Link>
                      <p className="cc-drawer__meta">
                        {line.colorId ? `${line.colorId}` : null}
                        {line.colorId && line.size ? ' · ' : null}
                        {line.size ?? null}
                      </p>
                      <p className="cc-price">{formatClayCraftPrice(product.price)}</p>
                      <div className="cc-qty">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQty(line.productId, line.qty - 1, line.colorId, line.size)
                          }
                        >
                          <Minus aria-hidden />
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQty(line.productId, line.qty + 1, line.colorId, line.size)
                          }
                        >
                          <Plus aria-hidden />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cc-drawer__remove"
                      aria-label={`Remove ${product.title}`}
                      onClick={() => removeFromCart(line.productId, line.colorId, line.size)}
                    >
                      <X aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cc-drawer__coupon">
              <Tag aria-hidden />
              {coupon ? (
                <p>
                  {coupon.code} applied
                  <button type="button" onClick={clearCoupon}>
                    Remove
                  </button>
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyCoupon(code);
                    setCode('');
                  }}
                >
                  <label className="sr-only" htmlFor="cc-coupon">
                    Coupon code
                  </label>
                  <input
                    id="cc-coupon"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon code"
                  />
                  <button type="submit">Apply</button>
                </form>
              )}
            </div>

            <dl className="cc-drawer__totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatClayCraftPrice(cartSubtotal)}</dd>
              </div>
              {discount > 0 ? (
                <div>
                  <dt>Discount</dt>
                  <dd>−{formatClayCraftPrice(discount)}</dd>
                </div>
              ) : null}
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatClayCraftPrice(shipping)}</dd>
              </div>
              <div>
                <dt>Tax (GST 5%)</dt>
                <dd>{formatClayCraftPrice(tax)}</dd>
              </div>
              <div className="cc-drawer__grand">
                <dt>Total</dt>
                <dd>{formatClayCraftPrice(grandTotal)}</dd>
              </div>
            </dl>

            <div className="cc-drawer__actions">
              <Link
                href={ccPath('/cart')}
                className="cc-btn cc-btn--secondary"
                onClick={() => setCartOpen(false)}
              >
                View Cart
              </Link>
              <button
                type="button"
                className="cc-btn cc-btn--primary"
                onClick={() => {
                  showToast(
                    'Demo checkout complete — no payment was processed. Order confirmed for demonstration.',
                    'success',
                  );
                  clearCart();
                  setCartOpen(false);
                }}
              >
                Checkout (Demo)
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
