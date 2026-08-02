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
    <header className="sticky top-0 z-50">
      <div className="ec-header-bar">
        <div className={`${EC_CONTAINER} flex flex-wrap items-center gap-3 py-2.5 md:gap-4`}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ec-logo-btn flex shrink-0 items-center gap-2 px-1 py-1"
            aria-label="Ecommerce Store home"
          >
            <EcommerceLogoMark className="h-8 w-8 shrink-0 md:h-9 md:w-9" />
            <span className="flex items-baseline gap-1.5 leading-none">
              <span className="text-base font-bold tracking-tight md:text-lg">Ecommerce</span>
              <span className="ec-brand-accent text-base font-bold md:text-lg">Store</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPincodeOpen(true)}
            className="ec-header-hit hidden min-w-0 items-start gap-1.5 rounded-md border px-2.5 py-1.5 text-left lg:flex"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span className="min-w-0">
              <span className="ec-header-muted block text-[11px] leading-4">Deliver to</span>
              <span className="block max-w-[140px] truncate text-sm font-bold leading-5">
                {pincode.split(' · ')[1] ?? pincode}
              </span>
            </span>
          </button>

          <form
            className="ec-search-shell order-3 basis-full md:order-none md:basis-auto"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
          >
            <div ref={deptRef} className="relative hidden shrink-0 sm:block">
              <button
                type="button"
                onClick={() => setDeptOpen((o) => !o)}
                className="ec-search-shell__dept"
                aria-expanded={deptOpen}
                aria-haspopup="listbox"
              >
                {department === 'All' ? 'All' : department}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </button>
              {deptOpen ? (
                <ul
                  className="ec-bg-surface ec-text ec-border absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-md border py-1 shadow-lg"
                  role="listbox"
                >
                  {DEPARTMENTS.map((d) => (
                    <li key={d} role="option" aria-selected={department === d}>
                      <button
                        type="button"
                        onClick={() => pickDepartment(d)}
                        className={`ec-hover-surface block w-full px-3 py-2.5 text-left text-xs ${
                          department === d ? 'font-bold ec-link' : ''
                        }`}
                      >
                        {d}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <label className="flex min-w-0 flex-1">
              <span className="sr-only">Search Ecommerce Store</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ecommerce Store"
                className="ec-search-shell__input"
              />
            </label>
            <button type="submit" className="ec-search-submit" aria-label="Search">
              <Search className="h-5 w-5" aria-hidden />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="ec-header-hit flex items-center justify-center rounded-md border px-2 py-1.5 sm:hidden"
              aria-label={signedInAs ? `Account, ${signedInAs}` : 'Sign in'}
            >
              <UserRound className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="ec-header-hit hidden rounded-md border px-2.5 py-1.5 text-left sm:block"
            >
              <span className="ec-header-muted block text-[11px] leading-4">
                {signedInAs ? `Hello, ${signedInAs.split(' ')[0]}` : 'Hello, sign in'}
              </span>
              <span className="flex items-center gap-0.5 text-sm font-bold leading-5">
                Account &amp; Lists
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOrdersOpen(true)}
              className="ec-header-hit hidden rounded-md border px-2.5 py-1.5 text-left md:block"
            >
              <span className="ec-header-muted block text-[11px] leading-4">Returns</span>
              <span className="text-sm font-bold leading-5">&amp; Orders</span>
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={`ec-cart-btn ec-header-hit flex items-end gap-1 rounded-md border px-2.5 py-1${cartScrolling ? ' ec-cart-btn--scrolling' : ''}`}
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
            >
              <span className="ec-cart-btn__icon relative inline-block">
                <ShoppingCart className="h-8 w-8" aria-hidden />
                {cartCount > 0 ? (
                  <span className="ec-cart-badge absolute -right-1 top-0 rounded-full px-1.5 text-[11px] font-bold">
                    {cartCount}
                  </span>
                ) : null}
              </span>
              <span className="hidden pb-1 text-sm font-bold sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="ec-header-nav-bar" aria-label="Shop departments">
        <div
          className={`${EC_CONTAINER} flex items-center gap-1 overflow-x-auto py-2 scrollbar-none`}
        >
          <button
            type="button"
            onClick={() => scrollToSection('search-results')}
            className="ec-header-hit mr-1 flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-bold"
          >
            <Menu className="h-5 w-5" aria-hidden />
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
              className="ec-header-hit shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium sm:text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
