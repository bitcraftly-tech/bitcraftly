'use client';

import {
  Gift,
  Heart,
  HelpCircle,
  LayoutGrid,
  MapPin,
  Search,
  ShoppingCart,
  Tag,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';

import { TOY_BRAND, TOY_NAV } from './toy-data';
import { useToyCart } from './ToyCartContext';

export function ToyHeader() {
  const { count, openCart } = useToyCart();

  return (
    <header className="toy-header">
      <div className="toy-promo-bar">
        <div className="toy-shell toy-promo-bar__inner">
          <p className="toy-promo-bar__msg">
            <span aria-hidden>🎁</span>
            Flat 10% OFF on First Order | Use Code: <strong>PLAY10</strong>
          </p>
          <div className="toy-promo-bar__links">
            <a href="#top">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Track Order
            </a>
            <a href="#footer">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              Help Center
            </a>
          </div>
        </div>
      </div>

      <div className="toy-header__main">
        <div className="toy-shell toy-header__row">
          <a href="#top" className="toy-brand" aria-label={`${TOY_BRAND.name} home`}>
            <span className="toy-brand__mark">
              <Image
                src={TOY_BRAND.logo}
                alt=""
                width={40}
                height={40}
                className="toy-brand__logo"
                priority
              />
            </span>
            <span className="toy-brand__text">
              <span className="toy-brand__name">{TOY_BRAND.name}</span>
              <span className="toy-brand__tag">{TOY_BRAND.tagline}</span>
            </span>
          </a>

          <form className="toy-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="toy-search-input">
              Search toys
            </label>
            <button type="button" className="toy-search__cat" aria-haspopup="listbox">
              All Categories
            </button>
            <input
              id="toy-search-input"
              type="search"
              placeholder="Search for toys, brands, gifts..."
              autoComplete="off"
            />
            <button type="submit" className="toy-search__submit" aria-label="Search">
              <Search className="h-4 w-4" aria-hidden />
            </button>
          </form>

          <div className="toy-utils">
            <a href="#top" className="toy-util">
              <MapPin className="h-5 w-5" aria-hidden />
              <span>Track Order</span>
            </a>
            <a href="#shop" className="toy-util">
              <Heart className="h-5 w-5" aria-hidden />
              <span>Wishlist</span>
            </a>
            <button type="button" className="toy-util" onClick={openCart} aria-haspopup="dialog">
              <span className="toy-util__icon-wrap">
                <ShoppingCart className="h-5 w-5" aria-hidden />
                {count > 0 ? (
                  <span className="toy-util__badge" aria-label={`${count} items in cart`}>
                    {count}
                  </span>
                ) : null}
              </span>
              <span>Cart</span>
            </button>
            <a href="#top" className="toy-util">
              <UserRound className="h-5 w-5" aria-hidden />
              <span>Login / Register</span>
            </a>
          </div>

          <button
            type="button"
            className="toy-cart-mobile"
            onClick={openCart}
            aria-haspopup="dialog"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            {count > 0 ? <span className="toy-util__badge">{count}</span> : null}
          </button>
        </div>
      </div>

      <div className="toy-menubar">
        <div className="toy-shell toy-menubar__inner">
          <button type="button" className="toy-menubar__cats">
            <LayoutGrid className="h-4 w-4" aria-hidden />
            All Categories
          </button>
          <nav className="toy-nav" aria-label="Primary">
            {TOY_NAV.map((item, index) => (
              <a key={item.label} href={item.href} aria-current={index === 0 ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#promos" className="toy-menubar__offers">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            Offers Zone
            <Gift className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
