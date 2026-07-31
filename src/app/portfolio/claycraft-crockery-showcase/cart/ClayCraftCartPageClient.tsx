'use client';

import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { formatClayCraftPrice } from '../claycraft-commerce';
import { useClayCraftDemo } from '../ClayCraftDemoContext';
import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { getProductById } from '../claycraft-products';
import { ccPath, ccProductPath } from '../claycraft-paths';

export default function ClayCraftCartPageClient() {
  const {
    cart,
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

  return (
    <>
      <ClayCraftPageHeader title="Shopping Cart" crumbs={[{ label: 'Cart' }]} />
      <div className="cc-container cc-section cc-cart-page">
        {cart.length === 0 ? (
          <div className="cc-empty">
            <p>Your cart is empty.</p>
            <Link href={ccPath('/shop')} className="cc-btn cc-btn--primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cc-cart-page__grid">
            <ul className="cc-drawer__list">
              {cart.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                return (
                  <li
                    key={`${line.productId}-${line.colorId}-${line.size}`}
                    className="cc-drawer__item"
                  >
                    <Link href={ccProductPath(product.slug)}>
                      <Image src={product.image} alt="" width={96} height={96} />
                    </Link>
                    <div className="cc-drawer__item-body">
                      <Link href={ccProductPath(product.slug)}>{product.title}</Link>
                      <p className="cc-price">{formatClayCraftPrice(product.price)}</p>
                      <div className="cc-qty">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() =>
                            updateQty(line.productId, line.qty - 1, line.colorId, line.size)
                          }
                        >
                          <Minus aria-hidden />
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase"
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

            <aside className="cc-cart-page__summary">
              <h2>Order Summary</h2>
              <div className="cc-drawer__coupon">
                {coupon ? (
                  <p>
                    {coupon.code} applied{' '}
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
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon (CLAY10)"
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
                  <dt>Tax</dt>
                  <dd>{formatClayCraftPrice(tax)}</dd>
                </div>
                <div className="cc-drawer__grand">
                  <dt>Total</dt>
                  <dd>{formatClayCraftPrice(grandTotal)}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="cc-btn cc-btn--primary"
                onClick={() => {
                  showToast('Demo order placed — no payment processed.');
                  clearCart();
                }}
              >
                Checkout (Demo)
              </button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
