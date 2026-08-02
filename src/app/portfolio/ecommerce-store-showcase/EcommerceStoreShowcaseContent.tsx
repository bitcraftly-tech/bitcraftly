import { Star } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import ShowcaseLink from '@/components/portfolio/ShowcaseLink';
import { CONTAINER } from '@/lib/constants';

import { formatIndianNumber, formatInr } from './ecommerce-demo-data';

const CATEGORY_TILES = [
  { label: 'Revamp your home', href: '#catalog', tone: 'from-sky-100 to-blue-50' },
  { label: 'Top deals in electronics', href: '#deals', tone: 'from-slate-100 to-zinc-50' },
  { label: 'Fashion for you', href: '#catalog', tone: 'from-rose-50 to-pink-50' },
  { label: 'Upgrade your kitchen', href: '#catalog', tone: 'from-amber-50 to-orange-50' },
] as const;

const DEAL_ROWS = [
  {
    title: 'Top deals',
    products: [
      {
        title: 'Smart speaker with voice assistant',
        price: 4999,
        list: 7999,
        rating: 4.4,
        count: 12453,
        prime: true,
        delivery: 'FREE delivery Wed',
        tone: 'bg-gradient-to-br from-slate-200 to-slate-100',
      },
      {
        title: 'Samsung Galaxy M34 5G · 8GB RAM · 128GB',
        price: 15999,
        list: 24999,
        rating: 4.2,
        count: 8921,
        prime: true,
        delivery: 'FREE delivery Tomorrow',
        tone: 'bg-gradient-to-br from-indigo-100 to-violet-50',
      },
      {
        title: 'Prestige Iris 750W Mixer Grinder · 3 jars',
        price: 3299,
        list: 5495,
        rating: 4.3,
        count: 5620,
        prime: true,
        delivery: 'FREE delivery Thu',
        tone: 'bg-gradient-to-br from-orange-50 to-amber-50',
      },
      {
        title: "Symbol Men's Solid Casual Shirt · Slim fit",
        price: 699,
        list: 1999,
        rating: 4.1,
        count: 2104,
        prime: false,
        delivery: 'Delivery ₹40 · 29 May',
        tone: 'bg-gradient-to-br from-cyan-50 to-sky-50',
      },
    ],
  },
  {
    title: 'Best Sellers in Home & Kitchen',
    products: [
      {
        title: 'Milton Thermosteel Flip Lid Flask · 1 litre',
        price: 899,
        list: 1549,
        rating: 4.5,
        count: 34102,
        prime: true,
        delivery: 'FREE delivery Wed',
        tone: 'bg-gradient-to-br from-teal-50 to-emerald-50',
      },
      {
        title: 'Wakefit Orthopedic Memory Foam Mattress',
        price: 8999,
        list: 14999,
        rating: 4.4,
        count: 7821,
        prime: true,
        delivery: 'FREE scheduled delivery',
        tone: 'bg-gradient-to-br from-stone-100 to-neutral-50',
      },
      {
        title: 'Hawkins Contura Hard Anodised Pressure Cooker · 3L',
        price: 2199,
        list: 3299,
        rating: 4.6,
        count: 15670,
        prime: true,
        delivery: 'FREE delivery Tomorrow',
        tone: 'bg-gradient-to-br from-red-50 to-orange-50',
      },
      {
        title: 'Ecommerce Store Basics Microfiber Bed Sheet Set · Queen',
        price: 1299,
        list: 2499,
        rating: 4.2,
        count: 4521,
        prime: true,
        delivery: 'FREE delivery Thu',
        tone: 'bg-gradient-to-br from-violet-50 to-purple-50',
      },
    ],
  },
] as const;

function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-[#ffa41c]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < full ? 'fill-[#ffa41c]' : 'fill-[#e0e0e0] text-[#e0e0e0]'}`}
            aria-hidden
          />
        ))}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline">
        {formatIndianNumber(count)}
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof DEAL_ROWS)[number]['products'][number] }) {
  const pct = Math.round(((product.list - product.price) / product.list) * 100);
  return (
    <article className="flex h-full min-w-[200px] max-w-[240px] shrink-0 flex-col rounded border border-[#ddd] bg-white p-3 shadow-sm sm:min-w-[220px]">
      <div className={`aspect-square w-full rounded-sm ${product.tone}`} />
      <h3 className="mt-3 line-clamp-2 text-sm text-[#0f1111] hover:text-[#c7511f] hover:underline">
        {product.title}
      </h3>
      <div className="mt-1">
        <StarRow rating={product.rating} count={product.count} />
      </div>
      <p className="mt-2 text-xl font-normal text-[#0f1111]">{formatInr(product.price)}</p>
      <p className="text-xs text-[#565959]">
        M.R.P.: <span className="line-through">{formatInr(product.list)}</span>
        {pct > 0 ? <span className="text-[#cc0c39]"> ({pct}% off)</span> : null}
      </p>
      {product.prime ? (
        <p className="mt-1 text-xs font-bold text-[#007185]">
          <span className="rounded bg-[#00a8e1] px-1 py-0.5 text-[10px] font-bold text-white">
            plus
          </span>
        </p>
      ) : null}
      <p className="mt-1 text-xs text-[#565959]">{product.delivery}</p>
    </article>
  );
}

export default function EcommerceStoreShowcaseContent() {
  return (
    <div className="bg-[#eaeded] text-[#0f1111]">
      {/* Hero grid */}
      <section className={`${CONTAINER} py-4 md:py-5`}>
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <ShowcaseAnchor
            href="#deals"
            className="flex min-h-[220px] flex-col justify-end rounded-sm bg-gradient-to-br from-[#232f3e] via-[#37475a] to-[#485769] p-6 text-white shadow md:min-h-[280px]"
          >
            <p className="text-sm font-medium text-[#febd69]">Great Indian Festival · preview</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Up to 60% off | Deals on electronics
            </h2>
            <span className="mt-4 inline-flex w-fit rounded-sm bg-[#ffd814] px-4 py-2 text-sm font-medium text-[#0f1111] hover:bg-[#f7ca00]">
              Shop deals
            </span>
          </ShowcaseAnchor>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORY_TILES.map((t) => (
              <ShowcaseAnchor
                key={t.label}
                href={t.href}
                className={`flex min-h-[130px] flex-col justify-between rounded-sm border border-[#ddd] bg-gradient-to-br p-4 shadow-sm ${t.tone}`}
              >
                <div className="aspect-[4/3] rounded-sm bg-white/60" />
                <p className="mt-2 text-sm font-bold text-[#0f1111]">{t.label}</p>
              </ShowcaseAnchor>
            ))}
          </div>
        </div>
      </section>

      {/* Deal carousels */}
      {DEAL_ROWS.map((row) => (
        <section
          key={row.title}
          id={row.title === 'Top deals' ? 'deals' : 'catalog'}
          className={`${CONTAINER} scroll-mt-36 pb-4`}
        >
          <div className="rounded-sm bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[#0f1111]">{row.title}</h2>
              <ShowcaseAnchor
                href="#catalog"
                className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
              >
                See more
              </ShowcaseAnchor>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {row.products.map((p) => (
                <ProductCard key={p.title} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Search results style PLP snippet */}
      <section className={`${CONTAINER} scroll-mt-36 pb-8`}>
        <div className="rounded-sm bg-white p-4 shadow-sm md:p-5">
          <p className="text-sm text-[#565959]">
            1–16 of over 10,000 results for{' '}
            <span className="font-bold text-[#c7511f]">wireless headphones</span>
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEAL_ROWS[0].products.map((p) => (
              <article
                key={`plp-${p.title}`}
                className="flex flex-col border border-[#ddd] bg-white p-3"
              >
                <div className={`aspect-square rounded-sm ${p.tone}`} />
                <h3 className="mt-3 line-clamp-2 text-sm hover:text-[#c7511f] hover:underline">
                  {p.title}
                </h3>
                <StarRow rating={p.rating} count={p.count} />
                <p className="mt-2 text-lg font-medium">{formatInr(p.price)}</p>
                <p className="text-xs text-[#007185]">{p.delivery}</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full border border-[#fcd200] bg-[#ffd814] py-1.5 text-xs font-medium shadow hover:bg-[#f7ca00]"
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} pb-8`}>
        <div className="flex flex-col items-center justify-between gap-4 rounded-sm bg-gradient-to-r from-[#1a98ff] to-[#232f3e] px-6 py-8 text-white md:flex-row">
          <div>
            <p className="text-lg font-bold">Try Ecommerce Store Plus</p>
            <p className="mt-1 max-w-lg text-sm text-[#ddd]">
              Fast, FREE delivery · exclusive deals · streaming preview strip — membership UX like
              leading marketplaces.
            </p>
          </div>
          <ShowcaseLink
            href="/contact?intent=ecommerce&source=ecommerce-store-showcase"
            className="shrink-0 rounded-sm bg-[#ffd814] px-6 py-2.5 text-sm font-medium text-[#0f1111] hover:bg-[#f7ca00]"
          >
            Build my marketplace
          </ShowcaseLink>
        </div>
      </section>

      <p className={`${CONTAINER} pb-6 text-center text-[11px] text-[#565959]`}>
        Ecommerce Store is fictional · marketplace UI specimen · not affiliated with any retailer · by
        Bitcraftly
      </p>
    </div>
  );
}
