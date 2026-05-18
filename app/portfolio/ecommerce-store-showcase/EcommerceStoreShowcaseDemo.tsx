"use client";

import { CreditCard, RotateCcw, ShieldCheck, Star, Tag, Truck } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

import { ecCardClickProps } from "./ecommerce-clickable";
import { useEcommerceDemo } from "./EcommerceDemoContext";
import { formatIndianNumber } from "./ecommerce-demo-data";
import {
  CATEGORY_TILES,
  HERO_BANNER_IMAGE,
  SHOP_PRODUCTS,
  discountPct,
  formatInr,
  isDealProduct,
  type ShopProduct,
  type SortOption,
} from "./ecommerce-demo-data";
import { EcommerceProductImage, EcommerceShowcaseImage } from "./EcommerceProductImage";

function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-[#ffa41c]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < full ? "fill-[#ffa41c]" : "fill-[#e0e0e0] text-[#e0e0e0] dark:fill-[#4a5568] dark:text-[#4a5568]"}`}
            aria-hidden
          />
        ))}
      </div>
      <span className="ec-link text-xs">{formatIndianNumber(count)}</span>
    </div>
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  const { addToCart, setProductModal } = useEcommerceDemo();
  const pct = discountPct(product.price, product.list);

  return (
    <article className="ec-bg-surface flex h-full min-h-0 flex-col rounded border p-3 shadow-sm ec-border">
      <div {...ecCardClickProps(() => setProductModal(product))} className="cursor-pointer text-left">
        <EcommerceProductImage product={product} className="aspect-square w-full rounded-sm" />
        <p className="ec-text mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug hover:text-[var(--ec-link-hover)] hover:underline">
          {product.title}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mt-1">
          <StarRow rating={product.rating} count={product.count} />
        </div>
        <p className="ec-text mt-2 text-xl font-normal">{formatInr(product.price)}</p>
        <p className="ec-text-muted text-xs">
          M.R.P.: <span className="line-through">{formatInr(product.list)}</span>
          {pct > 0 ? <span className="ec-sale-text"> ({pct}% off)</span> : null}
        </p>
        <p className="ec-text-muted mt-1 line-clamp-2 min-h-[2rem] flex-1 text-xs leading-snug">{product.delivery}</p>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="ec-btn-cart mt-3 w-full shrink-0 rounded-lg py-2 text-xs shadow-sm"
      >
        Add to Cart
      </button>
    </article>
  );
}

const DEAL_SECTIONS = [
  { id: "deals", title: "Today's deals", filter: (p: ShopProduct) => isDealProduct(p) },
  {
    id: "catalog",
    title: "Popular · Home & Kitchen",
    filter: (p: ShopProduct) => p.department === "Home & Kitchen",
  },
] as const;

const SORT_LABELS: Record<SortOption, string> = {
  recommended: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Avg. Customer Review",
};

const BANK_OFFERS = [
  { bank: "HDFC Bank", offer: "10% instant discount", cap: "up to ₹500", code: "HDFC10" },
  { bank: "SBI Card", offer: "No-cost EMI", cap: "3 & 6 months", code: "SBINOCOST" },
  { bank: "ShopKart Pay", offer: "₹75 cashback", cap: "on first UPI order", code: "PAY75" },
] as const;

const TRUST_STRIPS = [
  { icon: Truck, label: "Fast delivery", detail: "Pincode-based ETA in header" },
  { icon: ShieldCheck, label: "Secure checkout", detail: "Demo cart & Razorpay-ready flow" },
  { icon: RotateCcw, label: "Easy returns", detail: "Returns panel in account area" },
  { icon: CreditCard, label: "COD & UPI", detail: "Multiple payment rails on launch" },
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
    filteredProducts,
    scrollToSection,
    showToast,
    setCartOpen,
  } = useEcommerceDemo();

  const displayQuery = activeSearch.trim() || "wireless headphones";

  return (
    <div>
      <section className={`${CONTAINER} py-4 md:py-5`}>
        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div
            {...ecCardClickProps(() => {
              setDepartment("Deals");
              scrollToSection("deals");
            })}
            className="ec-border group relative flex min-h-[220px] cursor-pointer overflow-hidden rounded-lg border text-left shadow-sm md:min-h-[260px]"
          >
            <EcommerceShowcaseImage
              src={HERO_BANNER_IMAGE}
              alt="ShopKart storefront banner"
              fallbackSeed="hero-banner"
              eager
              wrapperClassName="absolute inset-0 z-0 min-h-full min-w-full"
              className="h-full min-h-[220px] w-full object-cover object-center transition duration-300 group-hover:scale-[1.02] md:min-h-[260px]"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-slate-900/15"
              aria-hidden
            />
            <div className="relative z-[2] flex h-full flex-col justify-center p-6 md:p-8">
              <p className="text-sm font-medium text-white/80">ShopKart · demo storefront</p>
              <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                Simple shopping — search, cart &amp; checkout
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85">
                Browse departments, filter results, apply coupons, and manage your cart.
              </p>
              <span className="ec-btn-primary mt-5 inline-flex w-fit rounded-md px-5 py-2.5 text-sm font-semibold">
                Browse deals
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_TILES.map((t) => (
              <div
                key={t.label}
                {...ecCardClickProps(() => {
                  setDepartment(t.department);
                  scrollToSection("search-results");
                })}
                className="ec-category-tile flex min-h-[120px] cursor-pointer flex-col rounded-lg p-3 text-left shadow-sm transition md:min-h-[125px]"
              >
                <EcommerceShowcaseImage
                  src={t.image}
                  alt={t.label}
                  fallbackSeed={`category-${t.department}`}
                  wrapperClassName="ec-category-thumb aspect-[4/3] w-full rounded-md"
                  className="h-full w-full object-cover object-center"
                />
                <p className="mt-2 text-sm font-semibold leading-snug">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {DEAL_SECTIONS.map((row) => {
        const products = SHOP_PRODUCTS.filter(row.filter).slice(0, 4);
        return (
          <section key={row.title} id={row.id} className={`${CONTAINER} scroll-mt-36 pb-4`}>
            <div className="ec-bg-surface rounded-sm p-4 shadow-sm md:p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="ec-text text-xl font-bold">{row.title}</h2>
                <button
                  type="button"
                  onClick={() => scrollToSection("search-results")}
                  className="ec-link text-sm hover:underline"
                >
                  See more
                </button>
              </div>
              <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="search-results" className={`${CONTAINER} scroll-mt-36 pb-8`}>
        <div className="ec-bg-surface rounded-sm p-4 shadow-sm md:p-5">
          <div className="ec-border-soft flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="ec-text-muted text-sm">
              {filteredProducts.length === 0 ? (
                "No results"
              ) : (
                <>
                  {filteredProducts.length === 1 ? "1 result" : `${filteredProducts.length} results`}
                  {displayQuery ? (
                    <>
                      {" "}
                      for <span className="ec-query-highlight">{displayQuery}</span>
                    </>
                  ) : null}
                  {department !== "All" ? (
                    <span>
                      {" "}
                      in <span className="ec-text font-bold">{department}</span>
                    </span>
                  ) : null}
                  {freeDeliveryOnly ? <span className="ec-text"> · Free delivery</span> : null}
                  {sort !== "recommended" ? (
                    <span className="ec-text">
                      {" "}
                      · {SORT_LABELS[sort]}
                    </span>
                  ) : null}
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="ec-text flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={freeDeliveryOnly}
                  onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                  className="ec-border rounded"
                />
                Free delivery
              </label>
              <label className="ec-text-muted text-xs">
                Sort by{" "}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="ec-input ec-border ec-text ml-1 rounded-sm border px-2 py-1"
                >
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                    <option key={k} value={k}>
                      {SORT_LABELS[k]}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={runSearch} className="ec-link text-xs hover:underline">
                Refresh results
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="ec-text-muted mt-6 text-sm">
              Try another search term, clear filters, or browse{" "}
              <button type="button" onClick={() => setDepartment("All")} className="ec-link hover:underline">
                all departments
              </button>
              .
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={`${CONTAINER} space-y-4 pb-8`}>
        <div className="ec-bg-surface rounded-sm p-4 shadow-sm md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="ec-brand-accent h-5 w-5" aria-hidden />
            <h2 className="ec-text text-lg font-bold">Bank offers &amp; coupons</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {BANK_OFFERS.map((o) => (
              <button
                key={o.code}
                type="button"
                onClick={() => showToast(`Coupon ${o.code} applied · demo only`)}
                className="ec-bg-surface-soft ec-border rounded-sm border p-4 text-left transition hover:border-[#e77600] hover:shadow-sm"
              >
                <p className="ec-link text-xs font-bold uppercase tracking-wide">{o.bank}</p>
                <p className="ec-text mt-1 text-sm font-semibold">{o.offer}</p>
                <p className="ec-text-muted mt-0.5 text-xs">{o.cap}</p>
                <p className="ec-btn-secondary mt-2 inline-block rounded px-2 py-0.5 text-[11px]">
                  {o.code}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STRIPS.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="ec-bg-surface ec-border flex gap-3 rounded-sm border p-4 shadow-sm">
              <div className="ec-header-bar flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="ec-text text-sm font-bold">{label}</p>
                <p className="ec-text-muted mt-0.5 text-xs">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ec-tip-bar flex flex-wrap items-center justify-center gap-3 rounded-sm border border-dashed px-4 py-3">
          <p className="ec-text-muted text-xs">Demo tip:</p>
          <button
            type="button"
            onClick={() => {
              setDepartment("Deals");
              scrollToSection("deals");
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
              setSort("rating");
              scrollToSection("search-results");
            }}
            className="ec-link text-xs font-medium hover:underline"
          >
            Top-rated picks
          </button>
        </div>
      </section>

      <p className={`${CONTAINER} ec-text-muted pb-6 text-center text-[11px]`}>
        ShopKart is a fictional demo store · Designed &amp; developed by Bitcraftly
      </p>
    </div>
  );
}
