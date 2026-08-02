'use client';

import {
  ArrowRight,
  Check,
  CreditCard,
  RotateCcw,
  ShieldCheck,
  Star,
  Tag,
  Truck,
} from 'lucide-react';
import { useState } from 'react';

import { EC_CONTAINER } from '@/components/portfolio/ecommerce/ecommerce-layout';

import { ecCardClickProps } from './ecommerce-clickable';
import { useEcommerceDemo } from './EcommerceDemoContext';
import { formatIndianNumber } from './ecommerce-demo-data';
import {
  CATEGORY_TILES,
  HERO_BANNER_IMAGE,
  SHOP_PRODUCTS,
  discountPct,
  formatInr,
  isDealProduct,
  type MinRating,
  type PriceBand,
  type ShopDepartment,
  type ShopProduct,
  type SortOption,
} from './ecommerce-demo-data';
import { EcommerceProductImage, EcommerceShowcaseImage } from './EcommerceProductImage';
import { EcLazySection, ProductGridSkeleton, useEcInfiniteProducts } from './EcommerceLazyFeed';

function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-[#ffa41c]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < full ? 'fill-[#ffa41c]' : 'fill-[#e0e0e0] text-[#e0e0e0] dark:fill-[#4a5568] dark:text-[#4a5568]'}`}
            aria-hidden
          />
        ))}
      </div>
      <span className="ec-link text-xs">{formatIndianNumber(count)}</span>
    </div>
  );
}

function ProductCard({ product, index = 0 }: { product: ShopProduct; index?: number }) {
  const { addToCart, setProductModal } = useEcommerceDemo();
  const pct = discountPct(product.price, product.list);

  return (
    <article className="ec-product-card" style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
      <div
        {...ecCardClickProps(() => setProductModal(product))}
        className="ec-product-card__media-wrap cursor-pointer text-left"
      >
        <div className="ec-product-card__thumb">
          <EcommerceProductImage
            product={product}
            className="ec-product-card__img aspect-square w-full"
          />
        </div>
        {pct > 0 ? <span className="ec-product-card__badge">-{pct}%</span> : null}
        <p className="ec-product-card__title line-clamp-2">{product.title}</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mt-2">
          <StarRow rating={product.rating} count={product.count} />
        </div>
        <p className="ec-product-card__price">{formatInr(product.price)}</p>
        <p className="ec-product-card__mrp">
          M.R.P.: <span className="line-through">{formatInr(product.list)}</span>
          {pct > 0 ? <span className="ec-sale-text"> ({pct}% off)</span> : null}
        </p>
        <p className="ec-product-card__delivery line-clamp-2 flex-1">{product.delivery}</p>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="ec-btn-cart ec-product-card__cta py-2 text-xs"
      >
        Add to Cart
      </button>
    </article>
  );
}

const DEAL_SECTIONS = [
  { id: 'deals', title: "Today's deals", filter: (p: ShopProduct) => isDealProduct(p) },
  {
    id: 'catalog',
    title: 'Popular · Home & Kitchen',
    filter: (p: ShopProduct) => p.department === 'Home & Kitchen',
  },
] as const;

const SORT_LABELS: Record<SortOption, string> = {
  recommended: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Avg. Customer Review',
};

const FILTER_DEPARTMENTS: ShopDepartment[] = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Deals',
];

const PRICE_BANDS: { id: PriceBand; label: string }[] = [
  { id: 'all', label: 'Any price' },
  { id: 'under-1000', label: 'Under ₹1,000' },
  { id: '1000-5000', label: '₹1,000 – ₹5,000' },
  { id: '5000-plus', label: '₹5,000 & above' },
];

const RATING_OPTIONS: { id: MinRating; label: string }[] = [
  { id: 0, label: 'Any rating' },
  { id: 4, label: '4★ & up' },
  { id: 3, label: '3★ & up' },
];

const BANK_OFFERS = [
  { bank: 'HDFC Bank', offer: '10% instant discount', cap: 'up to ₹500', code: 'HDFC10' },
  { bank: 'SBI Card', offer: 'No-cost EMI', cap: '3 & 6 months', code: 'SBINOCOST' },
  { bank: 'Ecommerce Store Pay', offer: '₹75 cashback', cap: 'on first UPI order', code: 'PAY75' },
] as const;

const TRUST_STRIPS = [
  { icon: Truck, label: 'Fast delivery', detail: 'Pincode-based ETA in header' },
  { icon: ShieldCheck, label: 'Secure checkout', detail: 'Demo cart & Razorpay-ready flow' },
  { icon: RotateCcw, label: 'Easy returns', detail: 'Returns panel in account area' },
  { icon: CreditCard, label: 'COD & UPI', detail: 'Multiple payment rails on launch' },
] as const;

export default function EcommerceStoreShowcaseDemo() {
  const {
    activeSearch,
    runSearch,
    department,
    setDepartment,
    sort,
    setSort,
    freeDeliveryOnly,
    setFreeDeliveryOnly,
    minRating,
    setMinRating,
    priceBand,
    setPriceBand,
    clearFilters,
    filteredProducts,
    scrollToSection,
    showToast,
    setCartOpen,
  } = useEcommerceDemo();

  const displayQuery = activeSearch.trim() || 'wireless headphones';
  const {
    visibleProducts,
    loading: feedLoading,
    hasMore: feedHasMore,
    sentinelRef,
  } = useEcInfiniteProducts(filteredProducts, 4);

  const filtersActive =
    department !== 'All' || freeDeliveryOnly || minRating > 0 || priceBand !== 'all';

  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  return (
    <div>
      <section className="ec-hero-bleed" aria-labelledby="ecommerce-store-hero-heading">
        <div className={`${EC_CONTAINER} relative z-[1] py-4 md:py-5`}>
          <div className="ec-hero2">
            <div className="ec-hero2__banner">
              <EcommerceShowcaseImage
                src={HERO_BANNER_IMAGE}
                alt="Ecommerce Store festival shopping highlights"
                fallbackSeed="hero-banner"
                eager
                wrapperClassName="ec-hero2__banner-media"
                className="h-full w-full object-cover object-[center_30%]"
              />
              <div className="ec-hero2__scrim" aria-hidden />

              <div className="ec-hero2__copy">
                <span className="ec-hero2__chip">
                  <span className="ec-hero2__chip-dot" aria-hidden />
                  Festival week
                </span>

                <h1 id="ecommerce-store-hero-heading" className="ec-hero2__title">
                  Fresh finds.
                  <span>Smarter prices.</span>
                </h1>
                <p className="ec-hero2__lead">
                  Search departments, grab bank offers, and checkout in a polished marketplace flow.
                </p>

                <div className="ec-hero2__actions">
                  <button
                    type="button"
                    className="ec-hero2__cta"
                    onClick={() => {
                      setDepartment('Deals');
                      scrollToSection('deals');
                    }}
                  >
                    Grab festival deals
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="ec-hero2__ghost"
                    onClick={() => scrollToSection('search-results')}
                  >
                    Browse catalog
                  </button>
                </div>

                <ul className="ec-hero2__perks">
                  <li>
                    <Tag className="h-3.5 w-3.5" aria-hidden />
                    Up to 60% off
                  </li>
                  <li>
                    <Truck className="h-3.5 w-3.5" aria-hidden />
                    Same-day delivery
                  </li>
                  <li>
                    <CreditCard className="h-3.5 w-3.5" aria-hidden />
                    UPI · COD
                  </li>
                </ul>
              </div>

              <div className="ec-hero2__sticker" aria-hidden>
                <span>Save</span>
                <strong>60%</strong>
              </div>

              <button
                type="button"
                className="ec-hero2__picks"
                onClick={() => {
                  setDepartment('Deals');
                  scrollToSection('deals');
                }}
              >
                Today&apos;s picks
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>

            <ul className="ec-hero2__rail" aria-label="Shop by category">
              {CATEGORY_TILES.map((t, index) => (
                <li key={t.label}>
                  <button
                    type="button"
                    className="ec-hero2__cat"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                    onClick={() => {
                      setDepartment(t.department);
                      scrollToSection('search-results');
                    }}
                  >
                    <span className="ec-hero2__cat-img">
                      <EcommerceShowcaseImage
                        src={t.image}
                        alt=""
                        fallbackSeed={`category-${t.department}`}
                        wrapperClassName="absolute inset-0 min-h-full min-w-full"
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span className="ec-hero2__cat-text">
                      <span className="ec-hero2__cat-label">{t.label}</span>
                      <span className="ec-hero2__cat-blurb">{t.blurb}</span>
                    </span>
                    <ArrowRight className="ec-hero2__cat-arrow h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {DEAL_SECTIONS.map((row) => {
        const products = SHOP_PRODUCTS.filter(row.filter).slice(0, 4);
        return (
          <section key={row.title} id={row.id} className={`${EC_CONTAINER} scroll-mt-36 pb-5`}>
            <div className="ec-section-panel">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="ec-section-title">{row.title}</h2>
                <button
                  type="button"
                  onClick={() => scrollToSection('search-results')}
                  className="ec-link text-sm font-medium hover:underline"
                >
                  See more
                </button>
              </div>
              <EcLazySection skeleton={<ProductGridSkeleton count={4} />}>
                <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4 md:gap-5">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </EcLazySection>
            </div>
          </section>
        );
      })}

      <section id="search-results" className={`${EC_CONTAINER} scroll-mt-36 pb-8`}>
        <div className="ec-results-layout">
          <aside className="ec-filter-panel" aria-label="Product filters">
            <div className="ec-filter-panel__head">
              <h2 className="ec-filter-panel__title">Filters</h2>
              {filtersActive ? (
                <button type="button" className="ec-filter-panel__clear" onClick={clearFilters}>
                  Clear all
                </button>
              ) : null}
            </div>

            <fieldset className="ec-filter-group">
              <legend className="ec-filter-group__legend">Department</legend>
              <div className="ec-filter-group__options" role="radiogroup" aria-label="Department">
                {FILTER_DEPARTMENTS.map((d) => (
                  <label key={d} className="ec-filter-option">
                    <input
                      type="radio"
                      name="ec-filter-department"
                      checked={department === d}
                      onChange={() => setDepartment(d)}
                    />
                    <span>{d === 'All' ? 'All departments' : d}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="ec-filter-group">
              <legend className="ec-filter-group__legend">Price</legend>
              <div className="ec-filter-group__options" role="radiogroup" aria-label="Price">
                {PRICE_BANDS.map((band) => (
                  <label key={band.id} className="ec-filter-option">
                    <input
                      type="radio"
                      name="ec-filter-price"
                      checked={priceBand === band.id}
                      onChange={() => setPriceBand(band.id)}
                    />
                    <span>{band.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="ec-filter-group">
              <legend className="ec-filter-group__legend">Customer rating</legend>
              <div
                className="ec-filter-group__options"
                role="radiogroup"
                aria-label="Customer rating"
              >
                {RATING_OPTIONS.map((opt) => (
                  <label key={opt.id} className="ec-filter-option">
                    <input
                      type="radio"
                      name="ec-filter-rating"
                      checked={minRating === opt.id}
                      onChange={() => setMinRating(opt.id)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="ec-filter-group ec-filter-group--last">
              <legend className="ec-filter-group__legend">Delivery</legend>
              <label className="ec-filter-option">
                <input
                  type="checkbox"
                  checked={freeDeliveryOnly}
                  onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                />
                <span>Free delivery</span>
              </label>
            </fieldset>
          </aside>

          <div className="ec-section-panel ec-results-main">
            <div className="ec-border-soft flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="ec-type-body ec-text-muted">
                {filteredProducts.length === 0 ? (
                  'No results'
                ) : (
                  <>
                    {filteredProducts.length === 1
                      ? '1 result'
                      : `${filteredProducts.length} results`}
                    {displayQuery ? (
                      <>
                        {' '}
                        for <span className="ec-query-highlight">{displayQuery}</span>
                      </>
                    ) : null}
                    {department !== 'All' ? (
                      <span>
                        {' '}
                        in <span className="ec-text font-bold">{department}</span>
                      </span>
                    ) : null}
                    {freeDeliveryOnly ? <span className="ec-text"> · Free delivery</span> : null}
                    {minRating > 0 ? <span className="ec-text"> · {minRating}★+</span> : null}
                    {priceBand !== 'all' ? (
                      <span className="ec-text">
                        {' '}
                        · {PRICE_BANDS.find((b) => b.id === priceBand)?.label}
                      </span>
                    ) : null}
                    {sort !== 'recommended' ? (
                      <span className="ec-text"> · {SORT_LABELS[sort]}</span>
                    ) : null}
                  </>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="ec-text-muted text-xs">
                  Sort by{' '}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="ec-input ec-border ec-text ml-1 rounded-md border px-2 py-1.5"
                  >
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                      <option key={k} value={k}>
                        {SORT_LABELS[k]}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={runSearch}
                  className="ec-link text-xs font-medium hover:underline"
                >
                  Refresh results
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="ec-text-muted mt-6 text-sm">
                Try another search term, clear filters, or browse{' '}
                <button type="button" onClick={clearFilters} className="ec-link hover:underline">
                  all departments
                </button>
                .
              </p>
            ) : (
              <>
                <div className="mt-5 grid grid-cols-2 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
                  {visibleProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i % 8} />
                  ))}
                </div>

                {feedLoading ? (
                  <div className="mt-4" aria-live="polite" aria-busy="true">
                    <p className="ec-feed-loading-label">Loading more products…</p>
                    <ProductGridSkeleton count={3} />
                  </div>
                ) : null}

                {feedHasMore ? (
                  <div ref={sentinelRef} className="ec-feed-sentinel" aria-hidden />
                ) : visibleProducts.length > 0 ? (
                  <p className="ec-feed-end">You&apos;re all caught up</p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <section className={`${EC_CONTAINER} space-y-5 pb-10`}>
        <EcLazySection
          skeleton={
            <div className="ec-section-panel" aria-hidden>
              <div className="ec-feed-skel ec-feed-skel--heading mb-4" />
              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`bank-skel-${i}`} className="ec-feed-offer-skeleton" />
                ))}
              </div>
            </div>
          }
        >
          <div className="ec-section-panel">
            <div className="mb-5 flex items-center gap-2">
              <Tag className="ec-brand-accent h-5 w-5" aria-hidden />
              <h2 className="ec-section-title">Bank offers &amp; coupons</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {BANK_OFFERS.map((o, i) => {
                const selected = selectedCoupon === o.code;
                return (
                  <button
                    key={o.code}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedCoupon(o.code);
                      showToast(`Coupon ${o.code} applied · demo only`, 'success');
                    }}
                    className={`ec-offer-card ec-bg-surface-soft ec-border rounded-[var(--ec-radius-md)] border p-4 text-left${
                      selected ? ' ec-offer-card--selected' : ''
                    }`}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {selected ? (
                      <span className="ec-offer-card__tick" aria-hidden>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    ) : null}
                    <p className="ec-link text-xs font-bold uppercase tracking-wide">{o.bank}</p>
                    <p className="ec-text mt-1 text-sm font-semibold">{o.offer}</p>
                    <p className="ec-type-caption mt-1">{o.cap}</p>
                    <p className="ec-btn-secondary mt-3 inline-block rounded-md px-2.5 py-1 text-[11px]">
                      {o.code}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </EcLazySection>

        <EcLazySection
          skeleton={
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`trust-skel-${i}`} className="ec-feed-trust-skeleton" />
              ))}
            </div>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_STRIPS.map(({ icon: Icon, label, detail }, i) => (
              <div
                key={label}
                className="ec-trust-card ec-bg-surface ec-border flex gap-3 rounded-[var(--ec-radius-md)] border p-4 shadow-sm"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="ec-trust-card__icon ec-header-bar flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="ec-text text-sm font-bold">{label}</p>
                  <p className="ec-type-caption mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </EcLazySection>

        <div className="ec-tip-bar flex flex-wrap items-center justify-center gap-3 rounded-[var(--ec-radius-md)] border border-dashed px-4 py-3.5">
          <p className="ec-type-caption">Demo tip:</p>
          <button
            type="button"
            onClick={() => {
              setDepartment('Deals');
              scrollToSection('deals');
            }}
            className="ec-link text-xs font-medium hover:underline"
          >
            Browse deals
          </button>
          <span className="ec-text-muted">·</span>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="ec-link text-xs font-medium hover:underline"
          >
            Open cart
          </button>
          <span className="ec-text-muted">·</span>
          <button
            type="button"
            onClick={() => {
              setSort('rating');
              scrollToSection('search-results');
            }}
            className="ec-link text-xs font-medium hover:underline"
          >
            Top-rated picks
          </button>
        </div>
      </section>
    </div>
  );
}
