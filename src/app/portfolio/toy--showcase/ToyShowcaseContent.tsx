'use client';

import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  TOY_AGES,
  TOY_BRAND,
  TOY_CATEGORIES,
  TOY_PRODUCTS,
  TOY_TRUST,
  TOY_WHY,
  formatToyInr,
  toyDiscountPct,
  type ToyAgeBand,
  type ToyCategory,
} from './toy-data';
import { useToyCart } from './ToyCartContext';

export function ToyShowcaseContent() {
  const { addItem, toast } = useToyCart();
  const [category, setCategory] = useState<ToyCategory | 'all'>('all');
  const [age, setAge] = useState<ToyAgeBand | 'all'>('all');

  const products = useMemo(() => {
    return TOY_PRODUCTS.filter((product) => {
      const categoryOk = category === 'all' || product.category === category;
      const ageOk = age === 'all' || product.age === age;
      return categoryOk && ageOk;
    });
  }, [age, category]);

  return (
    <>
      <section className="toy-hero" aria-labelledby="toy-hero-heading">
        <div className="toy-shell toy-hero__grid">
          <div className="toy-hero__copy">
            <p className="toy-hero__badge">
              <span className="toy-hero__badge-dot" aria-hidden />
              Premium toy ecommerce demo
            </p>
            <p className="toy-hero__brand">{TOY_BRAND.name}</p>
            <h1 id="toy-hero-heading" className="toy-hero__title">
              Toys that spark curiosity — without the clutter.
            </h1>
            <p className="toy-hero__desc">
              A parent-first storefront with age filters, safety signals, and a calm cart — built as
              a Bitcraftly portfolio showcase.
            </p>
            <div className="toy-hero__actions">
              <a href="#shop" className="toy-btn toy-btn--primary">
                Shop the nest
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#safety" className="toy-btn toy-btn--ghost">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Safety promise
              </a>
            </div>
          </div>

          <div className="toy-hero__stage" aria-hidden>
            <div className="toy-hero__orbit" />
            <div className="toy-hero__toy toy-hero__toy--a">🧲</div>
            <div className="toy-hero__toy toy-hero__toy--b">🐰</div>
            <div className="toy-hero__toy toy-hero__toy--c">🚲</div>
            <div className="toy-hero__toy toy-hero__toy--d">🎨</div>
            <div className="toy-hero__center">
              <strong>PlayNest</strong>
              <span>Curated · Safe · Joyful</span>
            </div>
          </div>
        </div>
      </section>

      <section id="ages" className="toy-section toy-section--soft" aria-labelledby="toy-ages-heading">
        <div className="toy-shell">
          <div className="toy-section__head">
            <p className="toy-section__eyebrow">Age guide</p>
            <h2 id="toy-ages-heading" className="toy-section__title">
              Find play that fits their stage.
            </h2>
            <p className="toy-section__desc">
              Honest age bands — tap one to filter the shop below.
            </p>
          </div>
          <div className="toy-ages" role="group" aria-label="Filter by age">
            {TOY_AGES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`toy-age${age === item.id ? ' is-active' : ''}`}
                aria-pressed={age === item.id}
                onClick={() => setAge(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="toy-section" aria-labelledby="toy-shop-heading">
        <div className="toy-shell">
          <div className="toy-section__head">
            <p className="toy-section__eyebrow">Shop</p>
            <h2 id="toy-shop-heading" className="toy-section__title">
              Featured toys in the nest.
            </h2>
            <p className="toy-section__desc">
              Add to cart, adjust quantities, and preview a demo checkout flow.
            </p>
          </div>

          <div className="toy-filters" role="group" aria-label="Filter by category">
            {TOY_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`toy-chip${category === item.id ? ' is-active' : ''}`}
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="toy-section__desc">No toys match this filter — try another age or category.</p>
          ) : (
            <div className="toy-grid">
              {products.map((product, index) => {
                const pct = toyDiscountPct(product.price, product.listPrice);
                return (
                  <article
                    key={product.id}
                    className="toy-card"
                    style={{ animationDelay: `${Math.min(index, 7) * 50}ms` }}
                  >
                    <div className={`toy-card__media ${product.tone}`}>
                      {product.badge ? (
                        <span className="toy-card__badge">{product.badge}</span>
                      ) : null}
                      <span aria-hidden>{product.emoji}</span>
                    </div>
                    <div className="toy-card__body">
                      <h3 className="toy-card__name">{product.name}</h3>
                      <p className="toy-card__blurb">{product.blurb}</p>
                      <div className="toy-card__meta">
                        <span>Ages {product.age}</span>
                        <span aria-hidden>·</span>
                        <span>
                          {product.rating.toFixed(1)} · {product.reviews} reviews
                        </span>
                      </div>
                      <div className="toy-card__price">
                        <strong>{formatToyInr(product.price)}</strong>
                        {pct > 0 ? <s>{formatToyInr(product.listPrice)}</s> : null}
                        {pct > 0 ? <span className="toy-card__meta">{pct}% off</span> : null}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="toy-card__cta"
                      onClick={() => addItem(product)}
                    >
                      Add to cart
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="safety" className="toy-section toy-section--soft" aria-labelledby="toy-safety-heading">
        <div className="toy-shell">
          <div className="toy-section__head">
            <p className="toy-section__eyebrow">Safety</p>
            <h2 id="toy-safety-heading" className="toy-section__title">
              Built for parent trust.
            </h2>
          </div>
          <div className="toy-trust">
            {TOY_TRUST.map((item) => (
              <article key={item.title} className="toy-panel">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="toy-section" aria-labelledby="toy-why-heading">
        <div className="toy-shell">
          <div className="toy-section__head">
            <p className="toy-section__eyebrow">Why PlayNest</p>
            <h2 id="toy-why-heading" className="toy-section__title">
              Ecommerce UX parents finish.
            </h2>
          </div>
          <div className="toy-why">
            {TOY_WHY.map((item) => (
              <article key={item.title} className="toy-panel">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="toy-footer">
        <div className="toy-shell toy-footer__grid">
          <div>
            <p className="toy-footer__brand">{TOY_BRAND.name}</p>
            <p>{TOY_BRAND.tagline}</p>
            <p style={{ marginTop: 10 }}>{TOY_BRAND.phoneDisplay}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="#shop">Shop</a>
              </li>
              <li>
                <a href="#ages">Ages</a>
              </li>
              <li>
                <a href="#safety">Safety</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Demo note</h3>
            <p>
              This is a Bitcraftly portfolio showcase — payments are simulated for UX review only.
            </p>
          </div>
        </div>
        <div className="toy-shell toy-footer__note">
          © {new Date().getFullYear()} PlayNest demo · Engineered by Bitcraftly
        </div>
      </footer>

      {toast ? (
        <div className="toy-toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </>
  );
}
