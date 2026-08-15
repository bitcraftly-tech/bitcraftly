'use client';

import {
  ChevronDown,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { useEcommerceDemo } from '@bitcraftly/showcase-ecommerce-store/app/ecommerce-store-showcase/EcommerceDemoContext';
import {
  discountPct,
  formatInr,
  SHOP_PRODUCTS,
  type ShopDepartment,
  type ShopProduct,
} from '@bitcraftly/showcase-ecommerce-store/app/ecommerce-store-showcase/ecommerce-demo-data';

import { EC_CONTAINER } from './ecommerce-layout';
import EcommerceLogoMark from './EcommerceLogoMark';

const SUB_NAV = ['Deals', 'Electronics', 'Fashion', 'Home & Kitchen', 'Best sellers'] as const;

const DEPARTMENTS: ShopDepartment[] = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Deals'];

type TrendingOffer =
  | {
      readonly kind: 'product';
      readonly productId: string;
      readonly eyebrow: string;
    }
  | {
      readonly kind: 'deals';
      readonly eyebrow: string;
      readonly title: string;
    };

const TRENDING_OFFERS: readonly TrendingOffer[] = [
  { kind: 'product', productId: 'echo-dot', eyebrow: 'Trending' },
  { kind: 'product', productId: 'galaxy-m34', eyebrow: 'Hot deal' },
  { kind: 'deals', eyebrow: 'Offers', title: 'Festival deals live now' },
  { kind: 'product', productId: 'mixer', eyebrow: 'Home pick' },
  { kind: 'deals', eyebrow: 'Perk', title: 'Free shipping over ₹499' },
];

function resolveTrendingProduct(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id);
}

function shortProductTitle(title: string): string {
  const clipped = title.split('·')[0]?.trim() ?? title;
  return clipped.length > 28 ? `${clipped.slice(0, 26)}…` : clipped;
}

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
    setProductModal,
    signedInAs,
    pincode,
    scrollToSection,
    setSort,
  } = useEcommerceDemo();

  const [deptOpen, setDeptOpen] = useState(false);
  const [cartScrolling, setCartScrolling] = useState(false);
  const [trendIndex, setTrendIndex] = useState(0);
  const [trendPaused, setTrendPaused] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);
  const scrollIdleRef = useRef<number | null>(null);
  const trendLabelId = useId();

  const deliverLabel = pincode.split(' · ')[1] ?? pincode;
  const activeOffer = TRENDING_OFFERS[trendIndex] ?? TRENDING_OFFERS[0];
  const activeProduct =
    activeOffer?.kind === 'product' ? resolveTrendingProduct(activeOffer.productId) : undefined;

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

  useEffect(() => {
    if (trendPaused || TRENDING_OFFERS.length < 2) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setTrendIndex((i) => (i + 1) % TRENDING_OFFERS.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [trendPaused]);

  const pickDepartment = (d: ShopDepartment) => {
    setDepartment(d);
    setDeptOpen(false);
    scrollToSection('search-results');
  };

  const openTrendingOffer = () => {
    if (activeOffer?.kind === 'product' && activeProduct) {
      setProductModal(activeProduct);
      return;
    }
    setDepartment('Deals');
    scrollToSection('deals');
  };

  const productPct =
    activeProduct != null ? discountPct(activeProduct.price, activeProduct.list) : 0;

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
            <span className="ec-logo-btn__lockup">
              <span className="ec-logo-btn__text">
                <span className="ec-logo-btn__name">Ecommerce</span>
                <span className="ec-brand-accent ec-logo-btn__accent">Store</span>
              </span>
              <span className="ec-logo-btn__tagline">Fresh finds. Smarter prices.</span>
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
              className="ec-header-action"
              aria-label={signedInAs ? `Account, ${signedInAs}` : 'Sign in'}
            >
              <UserRound className="ec-header-action__icon" aria-hidden />
              <span className="ec-header-action__label">
                {signedInAs ? signedInAs.split(' ')[0] : 'Sign in'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOrdersOpen(true)}
              className="ec-header-action ec-header-action--orders"
              aria-label="Returns and orders"
            >
              <Package className="ec-header-action__icon" aria-hidden />
              <span className="ec-header-action__label">Orders</span>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={`ec-header-action ec-header-action--cart${
                cartScrolling ? ' ec-cart-btn--scrolling' : ''
              }`}
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <span className="ec-cart-btn__icon">
                <ShoppingCart className="ec-header-action__icon ec-cart-btn__svg" aria-hidden />
                <span className={`ec-cart-badge${cartCount === 0 ? ' ec-cart-badge--empty' : ''}`}>
                  {cartCount}
                </span>
              </span>
              <span className="ec-header-action__label">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="ec-header-nav-bar" aria-label="Shop departments">
        <div className={`${EC_CONTAINER} ec-header-nav-bar__row`}>
          <button
            type="button"
            onClick={() => setPincodeOpen(true)}
            className="ec-header-deliver"
            aria-label={`Deliver to ${deliverLabel}`}
          >
            <MapPin className="ec-header-deliver__icon" aria-hidden />
            <span className="ec-header-deliver__place">{deliverLabel}</span>
          </button>

          <div className="ec-header-nav-bar__links" role="list">
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

          <button
            type="button"
            className="ec-header-trend"
            onClick={openTrendingOffer}
            onMouseEnter={() => setTrendPaused(true)}
            onMouseLeave={() => setTrendPaused(false)}
            onFocus={() => setTrendPaused(true)}
            onBlur={() => setTrendPaused(false)}
            aria-labelledby={trendLabelId}
          >
            <Sparkles className="ec-header-trend__icon" aria-hidden />
            <span className="ec-header-trend__copy" id={trendLabelId}>
              <span className="ec-header-trend__eyebrow">
                {activeOffer?.kind === 'product'
                  ? activeOffer.eyebrow
                  : (activeOffer?.eyebrow ?? 'Trending')}
              </span>
              <span className="ec-header-trend__title">
                {activeOffer?.kind === 'product' && activeProduct
                  ? shortProductTitle(activeProduct.title)
                  : activeOffer?.kind === 'deals'
                    ? activeOffer.title
                    : 'Trending offers'}
              </span>
            </span>
            {activeOffer?.kind === 'product' && activeProduct ? (
              <span className="ec-header-trend__meta">
                {productPct > 0 ? (
                  <span className="ec-header-trend__badge">{productPct}% off</span>
                ) : null}
                <span className="ec-header-trend__price">{formatInr(activeProduct.price)}</span>
              </span>
            ) : (
              <span className="ec-header-trend__badge">Shop now</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
