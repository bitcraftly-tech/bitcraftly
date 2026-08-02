'use client';

import {
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Heart,
  Menu,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useClayCraftDemo } from './ClayCraftDemoContext';
import { CLAYCRAFT_CATEGORIES } from './claycraft-catalog';
import { ccPath } from './claycraft-paths';

const NAV_LINKS = [
  { label: 'Home', href: ccPath('/') },
  { label: 'Shop', href: ccPath('/shop') },
  { label: 'Dinner Sets', href: ccPath('/shop/dinner-sets') },
  { label: 'Serveware', href: ccPath('/shop/serveware') },
  { label: 'Drinkware', href: ccPath('/shop/mugs') },
  { label: 'Table Decor', href: ccPath('/shop/table-decor') },
  { label: 'Collections', href: ccPath('/collections') },
  { label: 'Sale', href: ccPath('/shop?sale=1') },
] as const;

export default function ClayCraftHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { cartCount, wishlistCount, setCartOpen, setSearchOpen, setAccountOpen, signedInAs } =
    useClayCraftDemo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  return (
    <header className={`cc-header${scrolled ? ' cc-header--scrolled' : ''}`}>
      <div className="cc-topbar">
        <div className="cc-container cc-topbar__inner">
          <div className="cc-topbar__left">
            <span className="cc-topbar__item">
              <Truck aria-hidden />
              Free Shipping on Orders Above ₹999
            </span>
          </div>
          <div className="cc-topbar__center" aria-label="Trust signals">
            <span className="cc-topbar__item">
              <CheckCircle2 aria-hidden />
              Premium Quality
            </span>
            <span className="cc-topbar__sep" aria-hidden />
            <span className="cc-topbar__item">
              <RefreshCcw aria-hidden />
              Easy Returns
            </span>
            <span className="cc-topbar__sep" aria-hidden />
            <span className="cc-topbar__item">
              <ShieldCheck aria-hidden />
              Secure Payments
            </span>
          </div>
          <div className="cc-topbar__right">
            <Link href={ccPath('/faq')} className="cc-topbar__item">
              <Tag aria-hidden />
              Track Order
            </Link>
            <span className="cc-topbar__sep" aria-hidden />
            <Link href={ccPath('/contact')} className="cc-topbar__item">
              <CircleHelp aria-hidden />
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <div className="cc-container cc-nav">
        <Link
          href={ccPath('/')}
          className="cc-brand"
          aria-label="Crockery Wala Elegant Tableware home"
        >
          <Image
            src="/claycraft/brand/logo-glasses.png"
            alt=""
            width={512}
            height={512}
            className="cc-brand__icon"
            priority
            unoptimized
          />
          <span className="cc-brand__text">
            <span className="cc-brand__name">Crockery Wala</span>
            <span className="cc-brand__tag">Elegant Tableware</span>
          </span>
        </Link>

        <nav className="cc-menu" aria-label="Crockery Wala primary">
          {NAV_LINKS.map((link) => {
            const isShop = link.label === 'Shop';
            const active = pathname === link.href || (isShop && pathname?.includes('/shop'));
            if (isShop) {
              return (
                <div key={link.label} className="cc-menu__dropdown">
                  <button
                    type="button"
                    className={`cc-menu__link${active ? ' cc-menu__link--active' : ''}`}
                    aria-expanded={shopOpen}
                    onClick={() => setShopOpen((o) => !o)}
                    onBlur={() => setTimeout(() => setShopOpen(false), 150)}
                  >
                    Shop
                    <ChevronDown aria-hidden />
                  </button>
                  {shopOpen ? (
                    <div className="cc-menu__panel">
                      <Link href={ccPath('/shop')}>All Products</Link>
                      {CLAYCRAFT_CATEGORIES.map((c) => (
                        <Link key={c.id} href={c.href}>
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`cc-menu__link${active ? ' cc-menu__link--active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="cc-actions">
          <button
            type="button"
            className="cc-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search aria-hidden />
          </button>
          <button
            type="button"
            className="cc-icon-btn"
            aria-label={signedInAs ? `Account, ${signedInAs}` : 'Account'}
            onClick={() => setAccountOpen(true)}
          >
            <UserRound aria-hidden />
          </button>
          <Link
            href={ccPath('/wishlist')}
            className="cc-icon-btn"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart aria-hidden />
            <span className="cc-badge">{wishlistCount}</span>
          </Link>
          <button
            type="button"
            className="cc-icon-btn"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart aria-hidden />
            <span className="cc-badge">{cartCount}</span>
          </button>
          <button
            type="button"
            className="cc-icon-btn cc-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="cc-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="cc-mobile-menu"
        className={`cc-container cc-mobile-menu${menuOpen ? ' cc-mobile-menu--open' : ''}`}
      >
        {NAV_LINKS.map((link) => (
          <Link key={`m-${link.label}`} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href={ccPath('/about')} onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link href={ccPath('/contact')} onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </header>
  );
}
