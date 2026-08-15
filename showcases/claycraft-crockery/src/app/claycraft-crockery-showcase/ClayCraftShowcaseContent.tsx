import { ArrowRight, Lock, RefreshCcw, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import ClayCraftBestSellers from './ClayCraftBestSellers';
import ClayCraftCollections from './ClayCraftCollections';
import ClayCraftHeroCategories from './ClayCraftHeroCategories';
import ClayCraftInstagram from './ClayCraftInstagram';
import ClayCraftNewsletter from './ClayCraftNewsletter';
import ClayCraftScrollReveal from './ClayCraftScrollReveal';
import ClayCraftTestimonials from './ClayCraftTestimonials';
import ClayCraftTrustBar from './ClayCraftTrustBar';
import ClayCraftWhyChoose from './ClayCraftWhyChoose';
import { ccPath } from './claycraft-paths';

type HeroTrustItem = {
  id: string;
  lines: readonly [string, string];
  icon: ReactNode;
};

const HERO_TRUST: readonly HeroTrustItem[] = [
  { id: 'quality', lines: ['Premium', 'Quality'], icon: <ShieldCheck /> },
  { id: 'shipping', lines: ['Free Shipping', 'Above ₹999'], icon: <Truck /> },
  { id: 'returns', lines: ['Easy', 'Returns'], icon: <RefreshCcw /> },
  { id: 'payments', lines: ['Secure', 'Payments'], icon: <Lock /> },
];

/**
 * ClayCraft homepage middle content.
 */
export default function ClayCraftShowcaseContent() {
  return (
    <>
      <ClayCraftScrollReveal />

      <section className="cc-hero" aria-labelledby="cc-hero-heading">
        <div className="cc-hero__media">
          <Image
            src="/claycraft/hero/hero-wine-decanter.png"
            alt="Red wine, white wine, and champagne glasses beside a crystal decanter, gold-rimmed ceramic plates, and a bowl on a linen table"
            fill
            priority
            sizes="100vw"
            className="cc-hero__img"
          />
        </div>
        <div className="cc-container cc-hero__content">
          <div className="cc-hero__inner">
            <p className="cc-hero__eyebrow">Elegantly yours</p>
            <h1 id="cc-hero-heading" className="cc-hero__title">
              Beautiful Moments Deserve <span className="cc-highlight">Beautiful Tableware</span>
            </h1>
            <span className="cc-hero__flourish" aria-hidden>
              <svg viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M2 8h34" strokeLinecap="round" />
                <path d="M84 8h34" strokeLinecap="round" />
                <path d="M44 8c4-5 8-5 12 0-4 5-8 5-12 0Z" />
                <path d="M64 8c4-5 8-5 12 0-4 5-8 5-12 0Z" />
                <path d="M60 3.5v9" strokeLinecap="round" />
              </svg>
            </span>
            <p className="cc-hero__desc">
              Premium glassware, fine crockery, and timeless serveware crafted to elevate every meal
              and every celebration.
            </p>
            <div className="cc-hero__actions">
              <Link href={ccPath('/shop')} className="cc-btn cc-btn--primary">
                Shop Now
                <ArrowRight aria-hidden />
              </Link>
              <Link href={ccPath('/collections')} className="cc-btn cc-btn--secondary">
                Explore Collections
              </Link>
            </div>
            <ul className="cc-hero__trust">
              {HERO_TRUST.map((item) => (
                <li key={item.id} className="cc-hero__trust-item">
                  <span className="cc-hero__trust-icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="cc-hero__trust-label">
                    {item.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClayCraftHeroCategories />
      <ClayCraftBestSellers />
      <ClayCraftCollections />
      <ClayCraftWhyChoose />
      <ClayCraftTestimonials />
      <ClayCraftInstagram />
      <ClayCraftNewsletter />
      <ClayCraftTrustBar />
    </>
  );
}
