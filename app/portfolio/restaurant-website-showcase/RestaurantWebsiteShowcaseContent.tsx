import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  Armchair,
  Bike,
  ChefHat,
  Clock,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

import RestaurantReservationForm from "./RestaurantReservationForm";

const FEATURES = [
  { title: "Fresh ingredients", desc: "Morning mandi pickups · traceable poultry · seasonal garnish rotations.", icon: Leaf },
  { title: "Expert chefs", desc: "Open‑flame tandoors · continental brigades · pastry counter artistry.", icon: ChefHat },
  { title: "Hygienic kitchen", desc: "Temperature logs · FSSAI playbook overlays · glove‑colour zoning cues.", icon: ShieldCheck },
  { title: "Fast delivery", desc: "Thermal‑lined runners · ETA honesty banners · spill‑proof packaging lab.", icon: Bike },
  { title: "Cozy ambience", desc: "Acoustic dampened bays · amber sconces · vinyl‑quiet playlists nightly.", icon: Armchair },
] as const;

const FEATURED = [
  {
    name: "Ember charcoal jumbo prawns",
    note: "Citrus butter foam · smoked paprika dust · edible nasturtium",
    price: "₹980",
    tone: "from-orange-600/45 via-rose-900/40 to-violet-950",
    badge: "Chef spotlight",
  },
  {
    name: "Midnight truffle kulcha pocket",
    note: "Taleggio melt · wild mushroom duxelles · purple tulsi drizzle",
    price: "₹620",
    tone: "from-violet-600/40 via-orange-900/35 to-slate-100",
    badge: "New seasonal",
  },
  {
    name: "Slow‑braised lamb shoulder",
    note: "Anaar jus · heirloom carrot puree · crispy pearl onions",
    price: "₹1,280",
    tone: "from-amber-700/40 via-orange-100/50 to-slate-100",
    badge: "Slow roast · limited",
  },
] as const;

const MENU_POPULAR = [
  { dish: "Zaika butter chicken bowl", detail: "Basmati pilaf · laccha onion · naan shard", price: "₹420" },
  { dish: "Harissa paneer tikka", detail: "Hung yogurt marinade · mint chutney lattice", price: "₹340" },
  { dish: "Charred corn ribs · lime kosho", detail: "Vegan · sticky glaze · sesame crunch", price: "₹280" },
  { dish: "Ocean broth ramen bowl", detail: "Bonito dashi · nori crackle · jammy egg swap optional", price: "₹460" },
  { dish: "Bittersweet chocolate dome", detail: "Orange zest crémeux · hazelnut soil", price: "₹320" },
] as const;

const CHEF_SPECIALS = [
  {
    title: "Chef’s tasting · five chapters",
    desc: "Counter‑side narration · wine flight pairing slots Fri/Sat.",
    meta: "₹4,200 per guest · prepaid hold",
    tone: "border-orange-500/35 bg-gradient-to-br from-orange-950/50 to-slate-100",
  },
  {
    title: "Sunday heritage thali",
    desc: "Regional rotation · brass serveware · filter kaapi finish.",
    meta: "₹680 · seatings 12–4 PM",
    tone: "border-violet-500/35 bg-gradient-to-br from-violet-50/45 to-slate-100",
  },
  {
    title: "Late supper tasting flights",
    desc: "Small plates · low‑ABV cocktails · vinyl‑only soundtrack.",
    meta: "Post 10 PM · lounge annex",
    tone: "border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-50/35 to-slate-100",
  },
] as const;

const GALLERY = [
  { caption: "Char station · live flames", tone: "from-orange-500/35 to-neutral-950 aspect-[4/3]" },
  { caption: "Chef plating finale", tone: "from-violet-600/30 to-slate-100 aspect-square" },
  { caption: "Private booth lighting rig", tone: "from-amber-600/25 to-violet-950 aspect-[3/4]" },
  { caption: "Dessert mirror glaze pour", tone: "from-rose-600/30 to-slate-100 aspect-square" },
  { caption: "Wine wall vignette", tone: "from-purple-700/28 to-slate-100 aspect-[4/3]" },
  { caption: "Courtyard alfresco night", tone: "from-teal-700/20 to-orange-950/40 aspect-[5/4]" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Lighting stayed flattering through dessert — rare for dark dining rooms. Butter chicken bowl tasted consistent visit three.",
    name: "Meera & Karthik",
    role: "Anniversary dinner · chef counter",
  },
  {
    quote:
      "Corporate booking for twelve felt effortless — printed dietary matrix arrived before we asked. AV for pitch deck seamless.",
    name: "Ananya Bose",
    role: "Product launch supper · private bay",
  },
  {
    quote:
      "Delivery packaging survived monsoon stairs — kulcha pocket still crisp. ETA matched WhatsApp bot minute‑for‑minute.",
    name: "Fardeen Ali",
    role: "Rainy night order · Sakchi radius",
  },
] as const;

export default function RestaurantWebsiteShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,146,60,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(139,92,246,0.2),transparent_50%)]" />
        <div className={`${CONTAINER} relative py-14 lg:py-20`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-100">
                <Sparkles className="h-3.5 w-3.5 text-orange-300" aria-hidden />
                Showcase · Ember & Vine dining (fictional)
              </span>
              <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
                Good Food,
                <span className="block bg-gradient-to-r from-orange-300 via-amber-100 to-violet-200 bg-clip-text text-transparent">
                  Great Mood
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-text-secondary sm:text-lg">
                A cinematic dining landing specimen — menu storytelling, reservation friction drops, and delivery urgency strips tuned for conversion without breaking brand warmth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ShowcaseAnchor
                  href="#menu"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_16px_48px_-14px_rgba(249,115,22,0.55)] transition hover:brightness-110"
                >
                  Explore menu
                </ShowcaseAnchor>
                <ShowcaseAnchor
                  href="#reservation"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 px-7 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/15"
                >
                  Book table
                </ShowcaseAnchor>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-dark-text-tertiary">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-orange-400" aria-hidden />
                  Lunch 12–4 · Dinner 7–11:30 · illustrative hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-violet-400" aria-hidden />
                  Waterfront promenade · fictional pin
                </span>
              </div>
            </div>

            {/* Cinematic plate composition — gradient-only “photography” */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-orange-500/25 bg-gradient-to-br from-[#1a0a06] via-[#120818] to-violet-950/80 shadow-[0_40px_100px_-45px_rgba(249,115,22,0.45)] ring-1 ring-white/10">
                <div className="relative aspect-[5/4] p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/%3E%3C/svg%3E')] opacity-50" />
                  <div className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm">
                    <div className="flex justify-between gap-3">
                      <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-100">
                        Tonight’s mise‑en‑place
                      </span>
                      <UtensilsCrossed className="h-6 w-6 text-orange-800/70" aria-hidden />
                    </div>
                    <div className="mx-auto flex max-w-[85%] flex-col items-center">
                      <div className="h-40 w-40 rounded-full bg-[conic-gradient(at_50%_50%,rgba(251,146,60,0.55),rgba(167,139,250,0.35),rgba(251,146,60,0.35))] blur-[2px] ring-[12px] ring-orange-500/20 sm:h-48 sm:w-48" />
                      <p className="mt-4 text-center font-[var(--font-playfair)] text-lg font-semibold text-white sm:text-xl">Heritage spice dome · hero dish</p>
                      <p className="mt-2 text-center text-[11px] leading-relaxed text-white/55">
                        Stylized plate glow · illustrative gradients only · no stock imagery
                      </p>
                    </div>
                    <div className="flex justify-between text-[10px] font-medium uppercase tracking-wide text-white/35">
                      <span>Amber rim light</span>
                      <span>Violet bounce fill</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/40 py-12 md:py-14">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 transition hover:border-orange-500/30 hover:shadow-[0_18px_46px_-38px_rgba(249,115,22,0.35)]"
              >
                <Icon className="h-5 w-5 text-orange-400" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-dark-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400/90">Featured dishes</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Plate stories worth scrolling</h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Large-format tiles mimic editorial menu UX — macro gradients evoke hero photography without licensing friction.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FEATURED.map((f) => (
            <article key={f.name} className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br shadow-xl ring-1 ring-orange-500/10 ${f.tone}`}>
              <div className="flex min-h-[220px] flex-col justify-end border-t border-slate-200/80 bg-white/80 p-6 backdrop-blur-md">
                <span className="inline-flex w-fit rounded-full border border-orange-400/35 bg-orange-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-100">
                  {f.badge}
                </span>
                <p className="mt-4 font-[var(--font-playfair)] text-xl font-semibold text-white">{f.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{f.note}</p>
                <p className="mt-4 font-mono text-sm font-semibold text-orange-100">{f.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Popular menu */}
      <section id="menu" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Popular menu</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Crowd favourites</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-dark-border-primary rounded-2xl border border-dark-border-primary bg-dark-bg-card overflow-hidden">
            {MENU_POPULAR.map((row) => (
              <div key={row.dish} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-dark-text-primary">{row.dish}</p>
                  <p className="mt-1 text-xs text-dark-text-secondary">{row.detail}</p>
                </div>
                <p className="font-mono text-sm font-semibold text-orange-300">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef specials */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400/85">Chef specials</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Limited timelines</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CHEF_SPECIALS.map((s) => (
            <div key={s.title} className={`rounded-2xl border px-6 py-6 ${s.tone}`}>
              <ChefHat className="h-8 w-8 text-orange-800/90" aria-hidden />
              <p className="mt-4 font-[var(--font-playfair)] text-lg font-semibold text-white">{s.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{s.desc}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-violet-800">{s.meta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="border-y border-dark-border-primary bg-dark-bg-primary py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400/85">Gallery</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Moodboard slices</h2>
            </div>
            <p className="max-w-md text-sm text-dark-text-secondary">
              Masonry rhythm · captions whisper luxury · visuals remain illustrative gradients only.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={g.caption}
                className={`relative overflow-hidden rounded-xl border border-dark-border-primary bg-gradient-to-br ${g.tone} ${
                  i === 2 ? "row-span-2 min-h-[200px] md:min-h-[280px]" : "min-h-[140px]"
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] font-medium text-white">{g.caption}</p>
                  <p className="text-[10px] text-white/45">Gradient mock · not a photograph</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Testimonials</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Guests who returned hungry</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
              <div className="flex gap-0.5 text-orange-400">
                {[1, 2, 3, 4, 5].map((x) => (
                  <Star key={x} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 border-t border-dark-border-primary pt-4">
                <p className="text-sm font-semibold text-dark-text-primary">{t.name}</p>
                <p className="text-xs text-dark-text-tertiary">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Reservation */}
      <section id="reservation" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/35 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Online reservation</p>
              <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Hold your table</h2>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                Deposit flows & WhatsApp confirmations wire up on production builds — this canvas captures premium visual hierarchy only.
              </p>
              <div className="mt-8 rounded-xl border border-dark-border-primary bg-dark-bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Concierge desk</p>
                <ShowcaseAnchor href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="mt-2 block text-lg font-semibold text-orange-300 hover:text-orange-800">
                  {SUPPORT_PHONE_DISPLAY}
                </ShowcaseAnchor>
                <p className="mt-2 text-xs text-dark-text-secondary">Callbacks within opening hours · fictional SLA.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6 md:p-8">
              <RestaurantReservationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery banner */}
      <section className={`${CONTAINER} pb-16 md:pb-20`}>
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-gradient-to-r from-orange-950/90 via-[#140818] to-violet-950 px-8 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-orange-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-800/90">Food delivery</p>
              <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl">Thermal‑lined runners · 35‑minute honesty ETA</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-orange-100/75">
                Banner strip mirrors conversion-heavy delivery pushes — swap aggregator badges & promo timers when you go live.
              </p>
            </div>
            <ShowcaseLink
              href="/contact?intent=consultation&source=restaurant-website-showcase-delivery"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-orange-950 shadow-lg transition hover:bg-orange-50"
            >
              Partner with Bitcraftly
            </ShowcaseLink>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
          Ember & Vine / Zaika Kitchen naming cues are fictional UI specimens only · menu pricing illustrative · crafted by Bitcraftly.
        </p>
      </section>
    </>
  );
}
