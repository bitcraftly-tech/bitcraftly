'use client';

import {
  ArrowRight,
  Award,
  Baby,
  Bot,
  Boxes,
  Car,
  ChevronRight,
  ChevronUp,
  Clock3,
  Headphones,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import {
  TOY_AGES,
  TOY_BRAND,
  TOY_FOOTER_COLS,
  TOY_PRODUCTS,
  TOY_PROMOS,
  TOY_SERVICES,
  TOY_SIDEBAR_CATEGORIES,
  formatToyInr,
  type ToyAgeBand,
  type ToyCategory,
} from './toy-data';
import { ToyHeroCarousel } from './ToyHeroCarousel';
import { ToyBrandsSlider } from './ToyBrandsSlider';
import { useToyCart } from './ToyCartContext';

const SERVICE_ICONS = {
  truck: Truck,
  refresh: RefreshCw,
  shield: ShieldCheck,
  award: Award,
  headset: Headphones,
} as const;

const SIDEBAR_ICONS: Record<(typeof TOY_SIDEBAR_CATEGORIES)[number]['icon'], LucideIcon> = {
  bot: Bot,
  blocks: Boxes,
  heart: Heart,
  lightbulb: Lightbulb,
  car: Car,
  palette: Palette,
  baby: Baby,
  sun: Sun,
  puzzle: Puzzle,
};

function StarRow({ rating }: { readonly rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="toy-stars" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3${i < full ? ' is-on' : ''}`}
          fill={i < full ? 'currentColor' : 'none'}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function ToyShowcaseContent() {
  const { addItem, toast } = useToyCart();
  const [category, setCategory] = useState<ToyCategory | 'all'>('all');
  const [age, setAge] = useState<ToyAgeBand | 'all'>('all');

  const products = useMemo(() => {
    return TOY_PRODUCTS.filter((product) => {
      const categoryOk = category === 'all' || product.category === category;
      const ageOk = age === 'all' || product.age === age;
      return categoryOk && ageOk;
    }).slice(0, 5);
  }, [age, category]);

  const whatsappUrl = `https://wa.me/${TOY_BRAND.phoneE164}?text=${encodeURIComponent(
    `Hi ${TOY_BRAND.name}! I want help picking a toy.`,
  )}`;

  return (
    <>
      <section className="toy-hero" aria-label="PlayNest featured offers">
        <div className="toy-shell toy-hero__layout">
          <aside className="toy-sidebar" aria-label="Shop by category">
            <p className="toy-sidebar__title">Shop by Category</p>
            <ul className="toy-sidebar__list">
              {TOY_SIDEBAR_CATEGORIES.map((item) => {
                const Icon = SIDEBAR_ICONS[item.icon];
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`toy-sidebar__item toy-sidebar__item--${item.tone}${category === item.id ? ' is-active' : ''}`}
                      onClick={() => {
                        setCategory(item.id);
                        setAge('all');
                        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="toy-sidebar__icon" aria-hidden>
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                      <span className="toy-sidebar__copy">
                        <span className="toy-sidebar__label">{item.label}</span>
                        <span className="toy-sidebar__hint">{item.hint}</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 toy-sidebar__chev" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
            <a href="#shop" className="toy-sidebar__all">
              View All Categories
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </aside>

          <ToyHeroCarousel />
        </div>
      </section>

      <section id="services" className="toy-services" aria-label="Store benefits">
        <div className="toy-shell toy-services__row">
          {TOY_SERVICES.map((item) => {
            const Icon = SERVICE_ICONS[item.icon as keyof typeof SERVICE_ICONS];
            return (
              <article key={item.title} className="toy-service">
                <span className="toy-service__icon" aria-hidden>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="toy-service__title">{item.title}</p>
                  <p className="toy-service__desc">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="ages" className="toy-section toy-section--ages" aria-labelledby="toy-ages-heading">
        <div className="toy-shell">
          <div className="toy-section__head toy-section__head--row">
            <div className="toy-section__intro">
              <h2 id="toy-ages-heading" className="toy-section__title">
                Shop by Age
              </h2>
              <p className="toy-section__lede">Pick toys made for every stage of play.</p>
            </div>
            <a href="#shop" className="toy-section__link">
              View All
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <div className="toy-ages" role="group" aria-label="Filter by age">
            {TOY_AGES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`toy-age ${item.tone}${age === item.id ? ' is-active' : ''}`}
                aria-pressed={age === item.id}
                onClick={() => {
                  setAge(item.id);
                  setCategory('all');
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="toy-age__media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 42vw, (max-width: 1100px) 28vw, 160px"
                    className="toy-age__img"
                  />
                </span>
                <span className="toy-age__label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="toy-section" aria-labelledby="toy-shop-heading">
        <div className="toy-shell">
          <div className="toy-section__head toy-section__head--row">
            <h2 id="toy-shop-heading" className="toy-section__title">
              Best Sellers
            </h2>
            <a href="#shop" className="toy-section__link">
              View All
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          {products.length === 0 ? (
            <p className="toy-empty">No toys match this filter — try another age or category.</p>
          ) : (
            <div className="toy-grid">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="toy-card"
                  style={{ animationDelay: `${Math.min(index, 7) * 50}ms` }}
                >
                  <div className={`toy-card__media ${product.tone}`}>
                    {product.badge ? (
                      <span
                        className={`toy-card__badge${product.badgeTone ? ` toy-card__badge--${product.badgeTone}` : ''}`}
                      >
                        {product.badge}
                      </span>
                    ) : null}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 980px) 40vw, 220px"
                      className="toy-card__img"
                    />
                  </div>
                  <div className="toy-card__body">
                    <h3 className="toy-card__name">{product.name}</h3>
                    <div className="toy-card__price">
                      <strong>{formatToyInr(product.price)}</strong>
                      {product.listPrice > product.price ? (
                        <s>{formatToyInr(product.listPrice)}</s>
                      ) : null}
                    </div>
                    <div className="toy-card__foot">
                      <div className="toy-card__rating-row">
                        <StarRow rating={product.rating} />
                        <span className="toy-card__reviews">({product.reviews})</span>
                      </div>
                      <button
                        type="button"
                        className="toy-card__cart"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => addItem(product)}
                      >
                        <ShoppingCart className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="promos" className="toy-section" aria-label="Promotions">
        <div className="toy-shell toy-promos">
          {TOY_PROMOS.map((promo) => (
            <a key={promo.id} href={promo.href} className={`toy-promo ${promo.tone}`}>
              <div className="toy-promo__copy">
                <h3 className="toy-promo__title">{promo.title}</h3>
                <p className="toy-promo__desc">{promo.desc}</p>
                <span className="toy-promo__cta">
                  {promo.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <div className="toy-promo__media">
                <Image
                  src={promo.image}
                  alt={promo.imageAlt}
                  fill
                  sizes="(max-width: 860px) 40vw, 180px"
                  className="toy-promo__img"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="brands" className="toy-section toy-section--soft" aria-labelledby="toy-brands-heading">
        <div className="toy-shell">
          <div className="toy-section__head toy-section__head--row">
            <h2 id="toy-brands-heading" className="toy-section__title">
              Top Brands
            </h2>
            <a href="#shop" className="toy-section__link">
              View All
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <ToyBrandsSlider />
        </div>
      </section>

      <footer id="footer" className="toy-footer">
        <div className="toy-footer__glow" aria-hidden />
        <div className="toy-footer__stars" aria-hidden />
        <div className="toy-shell toy-footer__inner">
          <div className="toy-footer__grid">
            <div className="toy-footer__about">
              <div className="toy-footer__brand-row">
                <Image
                  src={TOY_BRAND.logo}
                  alt=""
                  width={42}
                  height={42}
                  className="toy-footer__logo"
                />
                <div>
                  <p className="toy-footer__news-title">Join our Toy World!</p>
                  <p className="toy-footer__brand-sub">{TOY_BRAND.tagline}</p>
                </div>
              </div>
              <p className="toy-footer__news-desc">
                Get latest updates on new arrivals, offers &amp; more.
              </p>
              <p className="toy-footer__pitch">
                Your one-stop shop for premium toys. Play. Learn. Grow.
              </p>
              <div className="toy-footer__social" aria-label="Social links">
                <a href="#footer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6l.4-3H14V9z"
                    />
                  </svg>
                </a>
                <a href="#footer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM17.5 7.2a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z"
                    />
                  </svg>
                </a>
                <a href="#footer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5z"
                    />
                  </svg>
                </a>
                <a href="#footer" aria-label="Pinterest">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6.2-.7 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.5 1.9 1.8 0 3.1-2.3 3.1-5 0-2.1-1.4-3.6-4-3.6-2.9 0-4.7 2.2-4.7 4.6 0 .9.3 1.8.7 2.3a.3.3 0 0 1 .1.3l-.2 1c0 .1-.2.2-.4.1-1.5-.6-2.2-2.3-2.2-4.2 0-3.1 2.6-6.9 7.7-6.9 4.1 0 6.8 3 6.8 6.2 0 4.2-2.3 7.3-5.8 7.3-1.2 0-2.2-.6-2.6-1.3l-.7 2.7c-.2.9-.9 2-1.3 2.7A9 9 0 1 0 12 3z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {TOY_FOOTER_COLS.map((col) => (
              <nav key={col.title} className="toy-footer__col" aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="toy-footer__contact">
              <h3>Contact Us</h3>
              <ul className="toy-footer__contact-list">
                <li>
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  <span>{TOY_BRAND.phoneDisplay}</span>
                </li>
                <li>
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  <span>{TOY_BRAND.email}</span>
                </li>
                <li>
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  <span>Ghaziabad, Uttar Pradesh, India</span>
                </li>
                <li>
                  <Clock3 className="h-3.5 w-3.5" aria-hidden />
                  <span>Mon - Sun: 10:00 AM - 7:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="toy-footer__accept">
              <h3>We Accept</h3>
              <div className="toy-footer__payments" aria-label="Accepted payments">
                <span className="toy-footer__pay toy-footer__pay--visa">VISA</span>
                <span className="toy-footer__pay toy-footer__pay--mc" aria-label="Mastercard">
                  <i />
                  <i />
                </span>
                <span className="toy-footer__pay toy-footer__pay--paytm">Paytm</span>
                <span className="toy-footer__pay toy-footer__pay--upi">UPI</span>
              </div>
              <p className="toy-footer__secure">
                <span className="toy-footer__secure-icon" aria-hidden>
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                100% Secure Payments
              </p>
            </div>
          </div>

          <div className="toy-footer__note">
            <div className="toy-footer__mascot" aria-hidden>
              <Image
                src="/portfolio/toy-showcase/decorative/toy-footer-dino.png"
                alt=""
                width={180}
                height={180}
                className="toy-footer__mascot-img"
              />
            </div>
            <p className="toy-footer__note-text">
              © {new Date().getFullYear()} {TOY_BRAND.name} · {TOY_BRAND.tagline} · Demo storefront ·
              Payments simulated for UX review
            </p>
          </div>
        </div>
      </footer>

      <aside className="toy-float" aria-label="Quick help">
        <a
          className="toy-float__btn toy-float__btn--wa"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="toy-float__tip">Chat with us</span>
          <span className="toy-float__orb" aria-hidden>
            <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="sr-only">WhatsApp chat</span>
        </a>
        <button type="button" className="toy-float__btn toy-float__btn--ai">
          <span className="toy-float__tip">Toy Helper</span>
          <span className="toy-float__orb" aria-hidden>
            <Sparkles className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="sr-only">AI toy helper</span>
        </button>
        <a href="#top" className="toy-float__btn toy-float__btn--top">
          <span className="toy-float__tip">Back to top</span>
          <span className="toy-float__orb" aria-hidden>
            <ChevronUp className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="sr-only">Back to top</span>
        </a>
      </aside>

      {toast ? (
        <div className="toy-toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </>
  );
}
