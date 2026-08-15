'use client';

import { ArrowRight, Facebook, Instagram, Lock, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { useClayCraftDemo } from './ClayCraftDemoContext';
import { ccPath } from './claycraft-paths';
import { newTabProps } from '@/lib/newTabLink';

const SHOP = [
  { label: 'Dinner Sets', href: ccPath('/shop/dinner-sets') },
  { label: 'Serveware', href: ccPath('/shop/serveware') },
  { label: 'Drinkware', href: ccPath('/shop/mugs') },
  { label: 'Table Decor', href: ccPath('/shop/table-decor') },
  { label: 'Sale', href: ccPath('/shop?sale=1') },
] as const;

const HELP = [
  { label: 'Contact Us', href: ccPath('/contact') },
  { label: 'FAQs', href: ccPath('/faq') },
  { label: 'Shipping & Delivery', href: ccPath('/faq') },
  { label: 'Returns & Exchanges', href: ccPath('/faq') },
  { label: 'Track Order', href: ccPath('/faq') },
] as const;

const COMPANY = [
  { label: 'Our Story', href: ccPath('/about') },
  { label: 'Blog', href: ccPath('/about') },
  { label: 'Careers', href: ccPath('/contact') },
  { label: 'Wholesale', href: ccPath('/contact') },
] as const;

const LEGAL = [
  { label: 'Privacy', href: ccPath('/privacy-policy') },
  { label: 'Terms', href: ccPath('/terms') },
  { label: 'Accessibility', href: ccPath('/faq') },
] as const;

const emailSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

type EmailForm = z.infer<typeof emailSchema>;

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav className="cc-footer__col" aria-label={title}>
      <h3 className="cc-footer__heading">{title}</h3>
      <ul>
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ClayCraftFooter() {
  const { showToast, mockDelay } = useClayCraftDemo();
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });

  return (
    <footer className="cc-footer">
      <div className="cc-container cc-footer__grid">
        <div className="cc-footer__brand">
          <Link
            href={ccPath('/')}
            className="cc-brand"
            aria-label="Crockery Wala Elegant Tableware"
          >
            <Image
              src="/claycraft/brand/logo-glasses.png"
              alt=""
              width={512}
              height={512}
              className="cc-brand__icon"
              unoptimized
            />
            <span className="cc-brand__text">
              <span className="cc-brand__name">Crockery Wala</span>
              <span className="cc-brand__tag">Elegant Tableware</span>
            </span>
          </Link>
          <p className="cc-footer__brand-copy">
            Elegant tableware crafted to turn every meal into a memorable experience.
          </p>
          <div className="cc-footer__social" aria-label="Social links">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              {...newTabProps('https://facebook.com')}
            >
              <Facebook aria-hidden />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              {...newTabProps('https://instagram.com')}
            >
              <Instagram aria-hidden />
            </a>
            <a
              href="https://pinterest.com"
              aria-label="Pinterest"
              {...newTabProps('https://pinterest.com')}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.8 2 4 5.45 4 9.18c0 2.28.86 4.3 2.7 5.05.28.12.53 0 .61-.3l.25-1c.07-.24.04-.33-.15-.54-.43-.5-.7-1.15-.7-2.07 0-2.67 2-5.06 5.2-5.06 2.84 0 4.4 1.73 4.4 4.05 0 3.04-1.35 5.6-3.35 5.6-.99 0-1.73-.82-1.49-1.82.28-1.2.84-2.5.84-3.37 0-.78-.42-1.42-1.28-1.42-.98 0-1.77 1.01-1.77 2.37 0 .86.29 1.45.29 1.45L8.5 18.7c-.34 1.43-.05 3.18-.03 3.36.02.1.14.14.21.05.1-.13 1.37-1.67 1.8-3.21.12-.44.7-2.68.7-2.68.34.66 1.35 1.24 2.42 1.24 3.18 0 5.34-2.9 5.34-6.78C18.94 5.12 16.1 2 12.04 2Z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              {...newTabProps('https://youtube.com')}
            >
              <Youtube aria-hidden />
            </a>
          </div>
        </div>

        <FooterCol title="Shop" links={SHOP} />
        <FooterCol title="Help" links={HELP} />
        <FooterCol title="Company" links={COMPANY} />

        <div className="cc-footer__col cc-footer__connect">
          <h3 className="cc-footer__heading">Stay Connected</h3>
          <p className="cc-footer__newsletter-lead">Offers, new arrivals & dining inspiration.</p>
          <form
            className="cc-footer__form"
            onSubmit={handleSubmit(async (values) => {
              setBusy(true);
              await mockDelay(800);
              setBusy(false);
              reset();
              showToast(`Subscribed ${values.email} — demo confirmation only.`);
            })}
          >
            <label className="sr-only" htmlFor="cc-newsletter-email">
              Email address
            </label>
            <input
              id="cc-newsletter-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            <button type="submit" aria-label="Subscribe" disabled={busy} aria-busy={busy}>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
          {errors.email ? <p className="cc-form-error">{errors.email.message}</p> : null}
          <div className="cc-footer__pay" aria-label="Payment methods">
            <span className="cc-pay--visa">VISA</span>
            <span className="cc-pay--mc">MC</span>
            <span className="cc-pay--paypal">PayPal</span>
            <span className="cc-pay--upi">UPI</span>
          </div>
        </div>
      </div>

      <div className="cc-footer__bottom">
        <div className="cc-container cc-footer__bottom-inner">
          <p>© 2026 Crockery Wala. All Rights Reserved.</p>
          <nav className="cc-footer__legal" aria-label="Legal">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="cc-footer__secure">
            <Lock className="h-3 w-3" aria-hidden />
            SSL Secure
          </p>
          <p className="cc-footer__credit">
            Designed &amp; Developed by{' '}
            <Link href="https://bitcraftly.com/" {...newTabProps('https://bitcraftly.com/')}>
              Bitcraftly
            </Link>{' '}
            <span aria-hidden>❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
