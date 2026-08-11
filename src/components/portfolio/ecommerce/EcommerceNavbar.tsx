'use client';

import { ChevronDown, MapPin, Menu, Search, ShoppingCart, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useEcommerceDemo } from '@/app/portfolio/ecommerce-store-showcase/EcommerceDemoContext';
import type { ShopDepartment } from '@/app/portfolio/ecommerce-store-showcase/ecommerce-demo-data';

import { EC_CONTAINER } from './ecommerce-layout';
import EcommerceLogoMark from './EcommerceLogoMark';

const SUB_NAV = ['Deals', 'Electronics', 'Fashion', 'Home & Kitchen', 'Best sellers'] as const;

const DEPARTMENTS: ShopDepartment[] = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Deals'];

export default function EcommerceNavbar() {
  const {
    searchQuery,
    setSearchQuery,
    runSearch,
    department,
    setDepartment,
    cartCount,
    setCartOpen,
    setAccountOpen,
    setPincodeOpen,
    setOrdersOpen,
    signedInAs,
    pincode,
    scrollToSection,
    setSort,
  } = useEcommerceDemo();

  const [deptOpen, setDeptOpen] = useState(false);
  const [cartScrolling, setCartScrolling] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);
  const scrollIdleRef = useRef<number | null>(null);

  const deliverLabel = pincode.split(' · ')[1] ?? pincode;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDeptOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onScroll = () => {
      setCartScrolling(true);
      if (scrollIdleRef.current != null) window.clearTimeout(scrollIdleRef.current);
      scrollIdleRef.current = window.setTimeout(() => {
        setCartScrolling(false);
        scrollIdleRef.current = null;
      }, 160);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollIdleRef.current != null) window.clearTimeout(scrollIdleRef.current);
    };
  }, []);

  const pickDepartment = (d: ShopDepartment) => {
    setDepartment(d);
    setDeptOpen(false);
    scrollToSection('search-results');
  };

  return (
    <header className="ec-header sticky top-0 z-50">
      <div className="ec-header-bar">
        <div className={`${EC_CONTAINER} ec-header-bar__row`}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ec-logo-btn"
            aria-label="Ecommerce Store home"
          >
            <EcommerceLogoMark className="ec-logo-btn__mark" />
            <span className="ec-logo-btn__text">
              <span className="ec-logo-btn__name">Ecommerce</span>
              <span className="ec-brand-accent ec-logo-btn__accent">Store</span>
            </span>
          </button>

          <form
            className="ec-search-shell"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
          >
            <div ref={deptRef} className="ec-search-shell__dept-wrap">
              <button
                type="button"
                onClick={() => setDeptOpen((o) => !o)}
                className="ec-search-shell__dept"
                aria-expanded={deptOpen}
                aria-haspopup="listbox"
              >
                {department === 'All' ? 'All' : department}
                <ChevronDown className="ec-search-shell__dept-icon" aria-hidden />
              </button>
              {deptOpen ? (
                <ul
                  className="ec-bg-surface ec-text ec-border ec-search-shell__menu"
                  role="listbox"
                >
                  {DEPARTMENTS.map((d) => (
                    <li key={d} role="option" aria-selected={department === d}>
                      <button
                        type="button"
                        onClick={() => pickDepartment(d)}
                        className={`ec-hover-surface ec-search-shell__option${
                          department === d ? ' is-selected' : ''
                        }`}
                      >
                        {d}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <label className="ec-search-shell__field">
              <span className="sr-only">Search Ecommerce Store</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands & more"
                className="ec-search-shell__input"
              />
            </label>
            <button type="submit" className="ec-search-submit" aria-label="Search">
              <Search className="ec-search-submit__icon" aria-hidden />
            </button>
          </form>

          <div className="ec-header-actions">
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="ec-header-action ec-header-action--icon sm:hidden"
              aria-label={signedInAs ? `Account, ${signedInAs}` : 'Sign in'}
            >
              <UserRound className="ec-header-action__icon" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="ec-header-action ec-header-action--account"
            >
              <UserRound className="ec-header-action__icon" aria-hidden />
              <span className="ec-header-action__copy">
                <span className="ec-header-muted">
                  {signedInAs ? `Hello, ${signedInAs.split(' ')[0]}` : 'Hello, sign in'}
                </span>
                <span className="ec-header-action__strong">
                  Account &amp; Lists
                  <ChevronDown className="ec-header-action__chevron" aria-hidden />
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOrdersOpen(true)}
              className="ec-header-action ec-header-action--orders"
            >
              <span className="ec-header-action__copy">
                <span className="ec-header-muted">Returns</span>
                <span className="ec-header-action__strong">&amp; Orders</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={`ec-cart-btn ec-header-action ec-header-action--cart${
                cartScrolling ? ' ec-cart-btn--scrolling' : ''
              }`}
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <span className="ec-cart-btn__icon">
                <ShoppingCart className="ec-cart-btn__svg" aria-hidden />
                {cartCount > 0 ? (
                  <span className="ec-cart-badge">{cartCount}</span>
                ) : (
                  <span className="ec-cart-badge ec-cart-badge--empty" aria-hidden>
                    0
                  </span>
                )}
              </span>
              <span className="ec-header-action__cart-label">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="ec-header-utility">
        <div className={`${EC_CONTAINER} ec-header-utility__row`}>
          <button
            type="button"
            onClick={() => setPincodeOpen(true)}
            className="ec-header-deliver"
          >
            <MapPin className="ec-header-deliver__icon" aria-hidden />
            <span className="ec-header-deliver__text">
              Deliver to <strong>{deliverLabel}</strong>
              <span className="ec-header-deliver__update"> · Update location</span>
            </span>
          </button>
          <p className="ec-header-utility__perk" aria-hidden>
            Free shipping over ₹499 · Easy returns
          </p>
        </div>
      </div>

      <nav className="ec-header-nav-bar" aria-label="Shop departments">
        <div className={`${EC_CONTAINER} ec-header-nav-bar__row`}>
          <button
            type="button"
            onClick={() => scrollToSection('search-results')}
            className="ec-header-nav-link ec-header-nav-link--all"
          >
            <Menu className="ec-header-nav-link__menu" aria-hidden />
            All
          </button>
          {SUB_NAV.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === 'Deals') {
                  setDepartment('Deals');
                  scrollToSection('deals');
                } else if (
                  item === 'Electronics' ||
                  item === 'Fashion' ||
                  item === 'Home & Kitchen'
                ) {
                  setDepartment(item);
                  scrollToSection('search-results');
                } else {
                  setSort('rating');
                  scrollToSection('search-results');
                }
              }}
              className="ec-header-nav-link"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
