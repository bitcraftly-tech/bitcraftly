import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  ArrowRight,
  Building2,
  Car,
  Cpu,
  Download,
  Home,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";

import { CONTAINER, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

import BuilderEnquiryForm from "./BuilderEnquiryForm";
import BuilderPropertyGallery from "./BuilderPropertyGallery";

const STATS = [
  { value: "₹2,400 Cr+", label: "Delivered portfolio value" },
  { value: "14", label: "Landmark developments" },
  { value: "6,200+", label: "Homes handed over" },
  { value: "38 acres", label: "Podium landscapes" },
] as const;

const FEATURES = [
  { title: "Prime Location", desc: "Transit-linked corridors with curated retail & hospitality pockets.", icon: MapPin },
  { title: "Modern Architecture", desc: "Glass-forward envelopes tuned for daylight, breeze stacks & skyline rhythm.", icon: Building2 },
  { title: "Smart Homes", desc: "Scene-aware automation, leak sensing & concierge-linked resident apps.", icon: Cpu },
  { title: "24×7 Security", desc: "Multi-tier access control with CCTV analytics & patrol choreography.", icon: Shield },
  { title: "Clubhouse", desc: "Executive lounges, spa suites & skyline banquet decks.", icon: Waves },
  { title: "Parking", desc: "Triple-stack bays · EV-ready feeders · valet-ready loops.", icon: Car },
] as const;

const FEATURED = [
  {
    name: "Skyvue Meridian",
    loc: "Waterfront district · Tower ensemble",
    status: "Ready to move · Phase IV",
    from: "4.85 Cr",
    tone: "from-violet-800/40 via-slate-900 to-slate-100",
    badge: "Featured",
  },
  {
    name: "Obsidian Heights",
    loc: "Central Ridge · Signature skylounge",
    status: "Limited inventory · Furnished shells",
    from: "6.20 Cr",
    tone: "from-amber-900/35 via-neutral-900 to-slate-100",
    badge: "Featured",
  },
  {
    name: "Aurora Commons",
    loc: "Tech corridor · Low-density podium",
    status: "Pre-launch · Founder pricing",
    from: "3.55 Cr",
    tone: "from-indigo-800/45 via-violet-100 to-slate-100",
    badge: "New drop",
  },
] as const;

const ONGOING = [
  { name: "Helios Wharf · Wing B", eta: "Handover Q4 2027", units: "186 residences · marina podium", tone: "from-blue-900/35 to-slate-100" },
  { name: "Nimbus Arcade · Retail spine", eta: "Shell-ready Q2 2026", units: "Double-height storefronts · anchor bays", tone: "from-purple-900/35 to-slate-100" },
  { name: "Cascade Villas · Phase II", eta: "Finishes underway", units: "34 courtyard villas · private plunge pools", tone: "from-teal-900/25 to-slate-100" },
] as const;

const VILLAS = [
  { type: "Signature courtyard villa · V8", area: "5,850 sq.ft · triple-height foyer", plot: "Corner podium parcel · lake hinge", tone: "from-amber-800/30 via-violet-100 to-slate-100" },
  { type: "Garden pavilion villa · V6", area: "4,920 sq.ft · wrap terraces", plot: "Internal landscaped spine", tone: "from-orange-900/28 to-slate-100" },
  { type: "Sky villa duplex · SV3", area: "6,400 sq.ft · private elevator lobby", plot: "Crown plate · dual aspect glass", tone: "from-fuchsia-900/28 to-slate-100" },
] as const;

const APARTMENTS = [
  { cfg: "Sky Junior · 3 BHK", carpet: "1,980 sq.ft · dual balconies", deck: "East–west breeze stack · acoustic glazing", tone: "from-violet-900/40 to-slate-100" },
  { cfg: "Executive aerie · 4 BHK + study", carpet: "2,640 sq.ft · corner bay windows", deck: "Sky lounge access · private foyer airlock", tone: "from-indigo-900/45 to-slate-100" },
  { cfg: "Penthouse observatory", carpet: "4,100 sq.ft · wrap terrace + plunge", deck: "Helipad-ready crown · wine gallery", tone: "from-amber-950/40 to-slate-100" },
] as const;

const AMENITIES = [
  "Temperature-controlled lap pool & vitality spa",
  "Sky observatory deck · constellation lounge",
  "Executive business centre · boardrooms on demand",
  "Kids discovery lab · sensory climbing landscape",
  "Indoor–outdoor banquet lawns · chef studio",
  "EV-ready podium grid · automated wash bays",
] as const;

const FLOOR_PLANS = [
  { name: "Typical · 3 BHK Sky Junior", sq: "1,980 sq.ft carpet", note: "Split bedroom privacy · service core isolation", ratio: "18 : 82 · living-to-private" },
  { name: "Corner · 4 BHK Executive", sq: "2,640 sq.ft carpet", note: "Dual aspect bay · pantry ducted extract", ratio: "Wide deck · cross ventilation" },
  { name: "Sky duplex · Observatory", sq: "4,100 sq.ft carpet + terrace", note: "Private lift vestibule · staff quarters module", ratio: "Terrace-first entertaining" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Walkthrough felt like a hospitality preview — lighting sequences, material palettes, and ceiling heights read luxury without shouting.",
    name: "Karan & Dia Trehan",
    role: "Residents · Skyvue Meridian",
  },
  {
    quote:
      "Our villa handover checklist was obsessively documented — snag teams fixed micro-details before we moved heirloom furniture.",
    name: "The Rahman family",
    role: "Cascade Villas · Phase I",
  },
  {
    quote:
      "Investor reporting was institutional-grade — escrow milestones, photographic audits, and quarterly drone flyovers.",
    name: "Lattice Capital Partners",
    role: "Limited partner · Obsidian Heights",
  },
] as const;

function PropertyCard({
  name,
  loc,
  status,
  from,
  tone,
  badge,
}: {
  name: string;
  loc: string;
  status: string;
  from: string;
  tone: string;
  badge: string;
}) {
  return (
    <article className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br shadow-xl ring-1 ring-amber-500/10 ${tone}`}>
      <div className="relative min-h-[200px] border-b border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm">
        <span className="inline-flex rounded-full border border-amber-400/35 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100">
          {badge}
        </span>
        <h3 className="mt-4 font-[var(--font-playfair)] text-xl font-semibold text-white">{name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/65">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-300/80" aria-hidden />
          {loc}
        </p>
        <p className="mt-3 text-[11px] text-white/55">{status}</p>
      </div>
      <div className="flex items-center justify-between bg-white/90 px-6 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Starting from</p>
          <p className="font-[var(--font-playfair)] text-lg font-semibold text-amber-100">{from}</p>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/80">Schedule tour</span>
      </div>
    </article>
  );
}

export default function BuilderRealEstateShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(245,158,11,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(139,92,246,0.18),transparent_50%)]" />
        <div className={`${CONTAINER} relative pb-14 pt-10 lg:pb-20 lg:pt-14`}>
          <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#141018] via-violet-100/40 to-slate-100 shadow-[0_40px_100px_-45px_rgba(180,83,9,0.35)]">
            <div className="relative grid lg:grid-cols-[1fr_1.05fr]">
              <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-14">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" aria-hidden />
                  Showcase · fictional developer
                </div>
                <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
                  Building Spaces,
                  <span className="block bg-gradient-to-r from-violet-200 via-white to-amber-200 bg-clip-text text-transparent">
                    Creating Dreams
                  </span>
                </h1>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-dark-text-secondary sm:text-base">
                  Orion Crest Estates is a luxury UI specimen — towers, villas, and podium landscapes rendered through gradient
                  compositions only. Use it as a benchmark for how Bitcraftly articulates premium real-estate brands online.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ShowcaseAnchor
                    href="#featured-projects"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_14px_44px_-14px_rgba(124,58,237,0.55)] transition hover:brightness-110"
                  >
                    View Projects
                  </ShowcaseAnchor>
                  <ShowcaseLink
                    href="/contact?intent=brochure&source=builder-real-estate-showcase"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-amber-400/35 bg-amber-500/10 px-6 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-500/15"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download Brochure
                  </ShowcaseLink>
                </div>
              </div>

              <div className="relative min-h-[280px] lg:min-h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:bg-gradient-to-l" />
                <div className="absolute inset-2 rounded-2xl bg-[linear-gradient(145deg,rgba(167,139,250,0.15)_0%,transparent_40%),linear-gradient(225deg,rgba(245,158,11,0.12)_0%,transparent_45%)] ring-1 ring-white/10 lg:inset-4" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 lg:left-auto lg:right-8 lg:top-8 lg:w-56 lg:flex-col">
                  <div className="rounded-xl border border-white/15 bg-white/88 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">Tower crown</p>
                    <p className="mt-1 text-sm font-medium text-white">Helipad-ready plate lighting</p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/88 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-800/90">Glass envelope</p>
                    <p className="mt-1 text-sm font-medium text-white">Low-e acoustic glazing kit</p>
                  </div>
                </div>
                <p className="absolute bottom-4 right-4 max-w-[14rem] text-right text-[10px] leading-relaxed text-white/40 lg:bottom-8 lg:right-10">
                  Luxury residential banner mock · no photography · illustrative gradients only
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/40 py-10">
        <div className={`${CONTAINER}`}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-[var(--font-playfair)] text-2xl font-semibold text-amber-100 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-dark-text-tertiary">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">Signature promises</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Designed for legacy buyers</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6 transition hover:border-amber-500/25 hover:shadow-[0_20px_50px_-35px_rgba(245,158,11,0.25)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/30 to-amber-600/20 text-amber-100 ring-1 ring-amber-400/20">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-dark-text-primary">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="featured-projects" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Featured projects</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Signature inventory</h2>
            </div>
            <p className="max-w-md text-sm text-dark-text-secondary">High-trust property cards with pricing bands & availability cues.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {FEATURED.map((p) => (
              <PropertyCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing */}
      <section id="ongoing" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">Ongoing projects</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Construction in motion</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ONGOING.map((p) => (
            <div key={p.name} className={`overflow-hidden rounded-xl border border-dark-border-primary bg-gradient-to-br ${p.tone}`}>
              <div className="border-t border-slate-200/80 bg-white/85 p-5 backdrop-blur-sm">
                <p className="font-semibold text-white">{p.name}</p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-amber-200/90">{p.eta}</p>
                <p className="mt-3 text-xs text-white/65">{p.units}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Villas */}
      <section id="villas" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/20 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">Luxury villas</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Low-rise sovereignty</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {VILLAS.map((v) => (
              <div key={v.type} className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br ring-1 ring-amber-500/10 ${v.tone}`}>
                <div className="flex min-h-[160px] flex-col justify-end border-t border-slate-200/80 bg-white/90 p-6 backdrop-blur-sm">
                  <p className="font-[var(--font-playfair)] text-lg font-semibold text-white">{v.type}</p>
                  <p className="mt-2 text-xs text-white/70">{v.area}</p>
                  <p className="mt-2 text-[11px] text-amber-100/80">{v.plot}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments */}
      <section id="apartments" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Apartments</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Sky residences</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {APARTMENTS.map((a) => (
            <div key={a.cfg} className={`rounded-2xl border border-dark-border-primary bg-gradient-to-br p-6 ${a.tone}`}>
              <Home className="h-8 w-8 text-amber-200/90" aria-hidden />
              <p className="mt-4 font-semibold text-white">{a.cfg}</p>
              <p className="mt-2 text-xs text-white/75">{a.carpet}</p>
              <p className="mt-3 text-[11px] leading-relaxed text-white/55">{a.deck}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/30 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">Property amenities</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Life beyond the foyer</h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {AMENITIES.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Floor plans */}
      <section id="floor-plans" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Floor plans</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Spatial clarity</h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">Blueprint silhouettes as luxury UI — vector grids instead of flat uploads.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FLOOR_PLANS.map((fp) => (
            <div key={fp.name} className="rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-amber-500/15 bg-gradient-to-br from-violet-50/80 to-slate-100">
                <div className="absolute inset-4 rounded border border-dashed border-white/20 opacity-60" />
                <div className="absolute inset-8 rounded-sm border border-white/25 bg-white/5" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[9px] font-medium uppercase tracking-wider text-white/40">
                  <span>Living</span>
                  <span>Suites</span>
                  <span>Deck</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-dark-text-primary">{fp.name}</p>
              <p className="mt-1 text-xs text-dark-text-tertiary">{fp.sq}</p>
              <p className="mt-3 text-xs leading-relaxed text-dark-text-secondary">{fp.note}</p>
              <p className="mt-2 text-[11px] font-medium text-amber-200/80">{fp.ratio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive gallery */}
      <section id="gallery" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">Interactive gallery</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Filter the skyline story</h2>
            </div>
            <p className="max-w-md text-sm text-dark-text-secondary">Tap filters — curated gradient tiles respond instantly.</p>
          </div>
          <div className="mt-10">
            <BuilderPropertyGallery />
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className={`${CONTAINER} scroll-mt-28 pb-14 md:pb-16`}>
        <div className="overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-r from-violet-50/80 via-[#140c18] to-amber-950/40 p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-200/90">Private walkthrough</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-white md:text-3xl">Book a sunrise tour · chauffeured</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              CRM-ready booking strip — slots, sales partner routing, and WhatsApp confirmation hooks ship on real builds.
            </p>
          </div>
          <div className="mt-6 flex shrink-0 flex-col gap-3 md:mt-0 md:items-end">
            <ShowcaseLink
              href="/contact?intent=site_visit&source=builder-real-estate-showcase"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-violet-950 transition hover:bg-amber-50"
            >
              Reserve slot
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ShowcaseLink>
            <ShowcaseAnchor href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-xs font-medium text-amber-100/90 hover:text-white">
              Or call {SUPPORT_PHONE_DISPLAY}
            </ShowcaseAnchor>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/20 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Testimonials</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Proof over promises</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
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
        </div>
      </section>

      {/* About */}
      <section id="about" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/85">About builder</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Orion Crest Estates</h2>
            <p className="mt-5 text-sm leading-relaxed text-dark-text-secondary">
              A fictional master developer conceived for this UI showcase — representing how we choreograph luxury launches:
              phased renders, investor annexes, NRIs-ready PDF vaults, and bilingual microcopy tuned for trust.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
              Bitcraftly builds similar surfaces for real promoters — inventory APIs, floor-plan annotators, and mortgage partner
              rails optional.
            </p>
          </div>
          <div className="rounded-2xl border border-dark-border-primary bg-dark-bg-card p-8">
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-dark-border-primary pb-4">
                <dt className="text-dark-text-tertiary">Founded</dt>
                <dd className="font-semibold text-dark-text-primary">1998 · illustrative</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dark-border-primary pb-4">
                <dt className="text-dark-text-tertiary">HQ</dt>
                <dd className="font-semibold text-dark-text-primary">Metro bay · fictional HQ tower</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dark-border-primary pb-4">
                <dt className="text-dark-text-tertiary">ISO cues</dt>
                <dd className="font-semibold text-dark-text-primary">Design-system badges · demo only</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-dark-text-tertiary">CSR pillar</dt>
                <dd className="font-semibold text-dark-text-primary">Scholarship corpus · urban forestry</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact-enquiry" className="scroll-mt-28 border-t border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:pb-20">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Contact inquiry</p>
              <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Brief our sales studio</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-dark-text-secondary">
                Structured enquiry capture — mirrors CRM-ready fields we deploy on production builds.
              </p>
            </div>
            <div className="mt-10 rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6 md:p-8">
              <BuilderEnquiryForm />
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-dark-border-primary pt-8 text-sm text-dark-text-secondary">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-400/90" aria-hidden />
                  <ShowcaseAnchor href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-dark-text-primary">
                    {SUPPORT_PHONE_DISPLAY}
                  </ShowcaseAnchor>
                </span>
                <span className="hidden text-dark-text-tertiary sm:inline">·</span>
                <ShowcaseAnchor href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-dark-text-primary">
                  {SUPPORT_EMAIL}
                </ShowcaseAnchor>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
              Entire experience is a fictional luxury developer UI specimen for Bitcraftly — pricing, projects, and timelines are
              illustrative only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
