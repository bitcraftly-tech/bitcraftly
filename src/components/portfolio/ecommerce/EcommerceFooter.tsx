import type { LucideIcon } from 'lucide-react';
import {
  BadgePercent,
  Banknote,
  Building2,
  CircleHelp,
  CreditCard,
  Facebook,
  Globe,
  Headphones,
  Instagram,
  Landmark,
  Megaphone,
  Newspaper,
  Package,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Twitter,
  UserRound,
  Users,
  Wallet,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import { newTabProps } from '@/lib/newTabLink';

import { EC_CONTAINER } from './ecommerce-layout';

type FooterLink = {
  label: string;
  icon: LucideIcon;
};

type FooterCol = {
  title: string;
  icon: LucideIcon;
  links: readonly FooterLink[];
};

const FOOTER_COLS: readonly FooterCol[] = [
  {
    title: 'Get to Know Us',
    icon: Building2,
    links: [
      { label: 'About Ecommerce Store', icon: Store },
      { label: 'Careers', icon: Users },
      { label: 'Press Releases', icon: Newspaper },
      { label: 'Ecommerce Store Science', icon: Sparkles },
    ],
  },
  {
    title: 'Connect with Us',
    icon: Share2,
    links: [
      { label: 'Facebook', icon: Facebook },
      { label: 'Twitter', icon: Twitter },
      { label: 'Instagram', icon: Instagram },
      { label: 'YouTube', icon: Youtube },
    ],
  },
  {
    title: 'Make Money with Us',
    icon: BadgePercent,
    links: [
      { label: 'Sell on Ecommerce Store', icon: ShoppingBag },
      { label: 'Protect your brand', icon: ShieldCheck },
      { label: 'Advertise', icon: Megaphone },
      { label: 'Fulfilment by Ecommerce Store', icon: Package },
    ],
  },
  {
    title: 'Let Us Help You',
    icon: CircleHelp,
    links: [
      { label: 'Your Account', icon: UserRound },
      { label: 'Returns Centre', icon: RotateCcw },
      { label: 'Purchase Protection', icon: ShieldCheck },
      { label: 'Help', icon: Headphones },
    ],
  },
] as const;

const TRUST_ITEMS = [
  { icon: Truck, label: 'Fast delivery', detail: 'Pincode-based ETA' },
  { icon: RotateCcw, label: 'Easy returns', detail: 'Hassle-free process' },
  { icon: ShieldCheck, label: 'Secure checkout', detail: 'Protected payments' },
  { icon: Headphones, label: 'Help centre', detail: 'Demo support flow' },
] as const;

const PAYMENT_METHODS = [
  { label: 'UPI', icon: Wallet },
  { label: 'Cards', icon: CreditCard },
  { label: 'Netbanking', icon: Landmark },
  { label: 'COD', icon: Banknote },
] as const;

export default function EcommerceFooter() {
  return (
    <footer className="ec-footer">
      <div className="ec-footer-trust">
        <div className={`${EC_CONTAINER} grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {TRUST_ITEMS.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="ec-footer-trust__item">
              <span className="ec-footer-trust__icon" aria-hidden>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-[var(--ec-header-muted)]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ec-footer-mid text-[var(--ec-chrome-text)]">
        <div className={`${EC_CONTAINER} grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10`}>
          {FOOTER_COLS.map((col) => {
            const TitleIcon = col.icon;

            return (
              <nav key={col.title} aria-label={col.title}>
                <p className="ec-footer-col__title">
                  <TitleIcon className="ec-footer-col__title-icon" aria-hidden />
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(({ label, icon: Icon }) => (
                    <li key={label}>
                      <ShowcaseAnchor href="#catalog" className="ec-footer-link">
                        <Icon className="ec-footer-link__icon" aria-hidden />
                        {label}
                      </ShowcaseAnchor>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="ec-footer-brand-bar">
          <div
            className={`${EC_CONTAINER} flex flex-col items-center gap-5 py-7 lg:flex-row lg:justify-between`}
          >
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <p className="flex items-baseline gap-1.5 text-xl font-bold tracking-tight md:text-2xl">
                <span className="text-white">Ecommerce</span>
                <span className="ec-brand-accent">Store</span>
              </p>
              <p className="max-w-sm text-xs leading-relaxed text-[var(--ec-header-muted)]">
                A fictional marketplace UI specimen — search, cart, coupons, and checkout in one
                polished demo.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <div className="ec-footer-chip" role="presentation">
                <Globe className="h-3.5 w-3.5 shrink-0 text-[var(--ec-brand)]" aria-hidden />
                English · India
              </div>
              <ul
                className="flex flex-wrap items-center justify-center gap-2"
                aria-label="Payment methods"
              >
                {PAYMENT_METHODS.map(({ label, icon: Icon }) => (
                  <li key={label} className="ec-footer-pay">
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="ec-footer-deep">
        <div
          className={`${EC_CONTAINER} flex flex-col items-center gap-2 py-5 text-center text-xs`}
        >
          <p className="text-[var(--ec-header-muted)]">
            Designed &amp; developed by{' '}
            <Link
              href="https://bitcraftly.com/"
              className="ec-brand-accent font-medium hover:underline"
              {...newTabProps('https://bitcraftly.com/')}
            >
              Bitcraftly
            </Link>
          </p>
          <p className="text-[color-mix(in_srgb,var(--ec-header-muted)_70%,transparent)]">
            Ecommerce Store is fictional · not affiliated with any retailer · © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
