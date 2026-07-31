import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import ShowcaseLink from '@/components/portfolio/ShowcaseLink';
import {
  BadgeIndianRupee,
  Clock,
  Droplets,
  Headphones,
  MapPin,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Star,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

import LocalServicesBookingForm from './LocalServicesBookingForm';

const POPULAR = [
  {
    name: 'Plumbing',
    blurb: 'Leak fixes · overhead tanks · motor install · bathroom retrofits.',
    icon: Droplets,
    tone: 'from-cyan-600/25 to-violet-950/70 ring-emerald-500/15',
  },
  {
    name: 'Electrician',
    blurb: 'MCB upgrades · earthing audit · fixture installs · inverter wiring.',
    icon: Zap,
    tone: 'from-amber-500/20 to-violet-950/75 ring-violet-500/15',
  },
  {
    name: 'AC Repair',
    blurb: 'Gas refill · PCB faults · split & window · AMC hygiene visits.',
    icon: Wind,
    tone: 'from-sky-600/22 to-slate-950/85 ring-cyan-500/15',
  },
  {
    name: 'Cleaning',
    blurb: 'Deep clean · move-out sparkle · sofa shampoo · sanitisation fog.',
    icon: Sparkles,
    tone: 'from-emerald-600/22 to-violet-950/75 ring-emerald-500/15',
  },
  {
    name: 'Painting',
    blurb: 'Texture · waterproofing primer · wood polish liaison · site masking.',
    icon: Paintbrush,
    tone: 'from-fuchsia-600/22 to-neutral-950/90 ring-fuchsia-500/15',
  },
] as const;

const FEATURE_STRIP = [
  {
    title: 'Verified professionals',
    desc: 'ID checks · skill badges · repeat-job scoring.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast response',
    desc: 'Median dispatch under 90 mins · SLA badges per zone.',
    icon: Clock,
  },
  {
    title: 'Affordable pricing',
    desc: 'Written estimates before wrench touches bolt.',
    icon: BadgeIndianRupee,
  },
  {
    title: '24×7 support',
    desc: 'Night desk for emergencies · WhatsApp ticket IDs.',
    icon: Headphones,
  },
  {
    title: 'Guaranteed work',
    desc: '30‑day rework promise on labour · parts as per invoice.',
    icon: Wrench,
  },
] as const;

const WHY = [
  'Lead routing : missed calls become SMS + CRM rows automatically.',
  'Geo dispatch : nearest verified partner pinged first — transparent ETA.',
  'Quote discipline : no surprise line items after scope lock.',
  'Review flywheel : happy jobs auto-request rating — unhappy routes to QA lead.',
  'WhatsApp native : customers stay in chat they already trust.',
] as const;

const TESTIMONIALS = [
  {
    quote:
      'Quoted before they climbed the ladder — AC gas + PCB sorted same evening. Invoice matched the WhatsApp estimate.',
    name: 'Priyanka Das',
    role: 'Apartment owner · Bistupur',
  },
  {
    quote: 'Deep clean crew brought their own gear — deposit photos saved us landlord drama.',
    name: 'Arif Khan',
    role: 'Tenant move-out · Mango',
  },
  {
    quote:
      'Painting team masked floors obsessively. Site supervisor shared daily progress pics without me asking.',
    name: 'Vikash Singh',
    role: 'Row house · Adityapur',
  },
] as const;

const AREAS = [
  'Sakchi',
  'Bistupur',
  'Mango',
  'Kadma',
  'Sonari',
  'Adityapur',
  'Gamharia',
  'Nearby highways · SOS',
] as const;

const PLANS = [
  {
    name: 'Visit pass',
    price: '₹299',
    period: 'inspection · small fixes',
    bullets: ['30‑min diagnostic slot', 'Waived if book same‑day job', 'Parts quoted separately'],
    highlight: false,
  },
  {
    name: 'Half‑day crew',
    price: '₹1,899',
    period: 'up to 4 hrs · 1 expert',
    bullets: [
      'Ideal painting prep · deep clean burst',
      'Tools included · debris bag-out',
      'Add assistant +₹799',
    ],
    highlight: true,
  },
  {
    name: 'Comfort AMC',
    price: '₹4,499',
    period: 'quarterly · AC + electrical scan',
    bullets: ['2 preventive visits / quarter', 'Priority routing weekends', '10% off add‑on jobs'],
    highlight: false,
  },
] as const;

export default function LocalServicesLeadShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(52,211,153,0.14),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_60%,rgba(139,92,246,0.18),transparent_52%)]" />
        <div className={`${CONTAINER} relative py-14 lg:py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
              Showcase · fictional trades brand
            </span>
            <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
              Reliable Local Services
              <span className="block bg-gradient-to-r from-emerald-300 via-white to-violet-200 bg-clip-text text-transparent">
                at Your Doorstep
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-dark-text-secondary sm:text-lg">
              SnapFix Crew is a lead-gen landing specimen — quote-first flows, WhatsApp handoffs,
              and zone-aware dispatch messaging tailored for metro micro‑markets.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ShowcaseLink
                href="/contact?intent=quote&source=local-services-leads-showcase"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_14px_44px_-14px_rgba(52,211,153,0.55)] transition hover:brightness-110"
              >
                Get free quote
              </ShowcaseLink>
              <ShowcaseAnchor
                href="#booking"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 px-7 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/15"
              >
                Book service
              </ShowcaseAnchor>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 text-center text-[11px] text-dark-text-tertiary sm:text-xs">
              <div className="rounded-xl border border-dark-border-primary bg-dark-bg-card/80 py-3 backdrop-blur-sm">
                <p className="font-[var(--font-playfair)] text-xl font-semibold text-emerald-300">
                  4.9
                </p>
                <p className="mt-1">Avg rating · illustrative</p>
              </div>
              <div className="rounded-xl border border-dark-border-primary bg-dark-bg-card/80 py-3 backdrop-blur-sm">
                <p className="font-[var(--font-playfair)] text-xl font-semibold text-violet-300">
                  18 min
                </p>
                <p className="mt-1">Median callback · demo metric</p>
              </div>
              <div className="rounded-xl border border-dark-border-primary bg-dark-bg-card/80 py-3 backdrop-blur-sm">
                <p className="font-[var(--font-playfair)] text-xl font-semibold text-teal-300">
                  260+
                </p>
                <p className="mt-1">Jobs / month · fictional scale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/40 py-10 md:py-12">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURE_STRIP.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 transition hover:border-emerald-500/30 hover:shadow-[0_18px_46px_-38px_rgba(52,211,153,0.35)]"
              >
                <Icon className="h-5 w-5 text-emerald-400" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-dark-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section id="services" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              Popular services
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Book trusted crews
            </h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Category tiles tuned for thumb-scroll discovery — each expands into WhatsApp deep-links
            on production stacks.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {POPULAR.map(({ name, blurb, icon: Icon, tone }) => (
            <article
              key={name}
              className={`flex flex-col rounded-2xl border border-dark-border-primary bg-gradient-to-br p-5 ring-1 ${tone}`}
            >
              <Icon className="h-8 w-8 text-white/90" aria-hidden />
              <p className="mt-4 font-[var(--font-playfair)] text-lg font-semibold text-white">
                {name}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/70">{blurb}</p>
              <span className="mt-4 inline-flex text-[11px] font-semibold text-emerald-200">
                Tap-to-quote · mock
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
              Why choose us
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Built for conversion, not clutter
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
              Operators win when enquiry friction drops — these bullets mirror integrations we wire
              on real deployments (CRM, telephony, WhatsApp Cloud API).
            </p>
          </div>
          <ul className="space-y-3">
            {WHY.map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary"
              >
                <span className="mt-0.5 text-emerald-400">✓</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
            Testimonials
          </p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
            Neighbours who booked again
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6"
            >
              <div className="flex gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5 border-t border-dark-border-primary pt-4">
                <p className="text-sm font-semibold text-dark-text-primary">{t.name}</p>
                <p className="text-xs text-dark-text-tertiary">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/30 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
              Pricing plans
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Transparent starting points
            </h2>
            <p className="mt-4 text-sm text-dark-text-secondary">
              Fictional slabs — final quote after scope photos / site visit.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 ${
                  p.highlight
                    ? 'border-emerald-500/45 bg-gradient-to-b from-emerald-950/40 to-dark-bg-card shadow-[0_24px_60px_-35px_rgba(52,211,153,0.45)] ring-1 ring-emerald-400/20'
                    : 'border-dark-border-primary bg-dark-bg-card'
                }`}
              >
                {p.highlight ? (
                  <span className="inline-flex rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-100">
                    Popular
                  </span>
                ) : null}
                <p
                  className={`mt-3 font-[var(--font-playfair)] text-xl font-semibold text-dark-text-primary ${p.highlight ? 'mt-2' : ''}`}
                >
                  {p.name}
                </p>
                <p className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-emerald-300">
                  {p.price}
                </p>
                <p className="text-xs text-dark-text-tertiary">{p.period}</p>
                <ul className="mt-6 space-y-2 text-sm text-dark-text-secondary">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-violet-400">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <ShowcaseAnchor
                  href="#booking"
                  className={`mt-8 flex w-full cursor-pointer items-center justify-center rounded-full py-2.5 text-sm font-semibold transition ${
                    p.highlight
                      ? 'bg-gradient-to-r from-emerald-600 to-violet-600 text-white hover:brightness-110'
                      : 'border border-dark-border-secondary bg-dark-bg-secondary text-dark-text-primary hover:border-violet-500/35'
                  }`}
                >
                  Choose plan · mock
                </ShowcaseAnchor>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              <MapPin className="h-4 w-4" aria-hidden />
              Service areas
            </div>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Hyperlocal dispatch rings
            </h2>
            <p className="mt-4 max-w-xl text-sm text-dark-text-secondary">
              Named pockets boost SEO trust — swap pin drops dynamically when you launch city two.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {AREAS.map((a) => (
              <span
                key={a}
                className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section
        id="booking"
        className="scroll-mt-28 border-t border-dark-border-primary bg-dark-bg-secondary/35 py-14 md:pb-20"
      >
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
                Booking form
              </p>
              <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
                Tell us what broke
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-dark-text-secondary">
                Minimal fields for maximum completions — optional AI summarisation hooks on backend
                builds.
              </p>
            </div>
            <div className="mt-10 rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6 md:p-8">
              <LocalServicesBookingForm />
              <p className="mt-8 text-center text-sm text-dark-text-secondary">
                Prefer voice?{' '}
                <ShowcaseAnchor
                  href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}
                  className="font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {SUPPORT_PHONE_DISPLAY}
                </ShowcaseAnchor>
              </p>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
              SnapFix Crew is fictional · zones & pricing are illustrative · UI specimen by
              Bitcraftly only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
