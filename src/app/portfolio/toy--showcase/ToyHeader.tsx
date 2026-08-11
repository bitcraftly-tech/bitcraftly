'use client';

import { ShoppingBag } from 'lucide-react';

import { TOY_BRAND, TOY_NAV } from './toy-data';
import { useToyCart } from './ToyCartContext';

export function ToyHeader() {
  const { count, openCart } = useToyCart();

  return (
    <header className="toy-header">
      <div className="toy-shell toy-header__inner">
        <a href="#top" className="toy-brand" aria-label={`${TOY_BRAND.name} home`}>
          <span className="toy-brand__mark" aria-hidden>
            ✦
          </span>
          <span className="toy-brand__text">
            <span className="toy-brand__name">{TOY_BRAND.name}</span>
            <span className="toy-brand__tag">{TOY_BRAND.tagline}</span>
          </span>
        </a>

        <nav className="toy-nav" aria-label="PlayNest">
          {TOY_NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="toy-header__actions">
          <button type="button" className="toy-cart-btn" onClick={openCart} aria-haspopup="dialog">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            <span>Cart</span>
            <span className="toy-cart-btn__count" aria-label={`${count} items in cart`}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
