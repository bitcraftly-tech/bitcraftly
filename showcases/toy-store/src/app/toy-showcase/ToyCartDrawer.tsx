'use client';

import { ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

import { formatToyInr } from './toy-data';
import { useToyCart } from './ToyCartContext';

export function ToyCartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQty, removeItem } = useToyCart();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="toy-drawer-backdrop"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside
        className="toy-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="toy-cart-title"
      >
        <div className="toy-drawer__head">
          <h2 id="toy-cart-title">Your cart</h2>
          <button
            type="button"
            className="toy-drawer__close"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="toy-drawer__body">
          {lines.length === 0 ? (
            <p className="toy-drawer__empty">Your nest is empty — pick a toy to begin.</p>
          ) : (
            <ul>
              {lines.map((line) => (
                <li key={line.product.id} className="toy-line-item">
                  <div className={`toy-line-item__thumb ${line.product.tone}`}>
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="toy-line-item__img"
                    />
                  </div>
                  <div>
                    <p className="toy-line-item__name">{line.product.name}</p>
                    <p className="toy-line-item__meta">{formatToyInr(line.product.price)}</p>
                    <div className="toy-qty">
                      <button
                        type="button"
                        aria-label={`Decrease quantity for ${line.product.name}`}
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity for ${line.product.name}`}
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => removeItem(line.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong>{formatToyInr(line.product.price * line.qty)}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="toy-drawer__foot">
          <div className="toy-drawer__total">
            <span>Subtotal</span>
            <span>{formatToyInr(subtotal)}</span>
          </div>
          <button type="button" className="toy-btn toy-btn--primary" style={{ width: '100%' }}>
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Checkout demo
          </button>
        </div>
      </aside>
    </>
  );
}
