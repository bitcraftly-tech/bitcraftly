import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import {
  BadgeCheck,
  BadgeIndianRupee,
  Check,
  Clock,
  Droplets,
  Hammer,
  Headphones,
  HeartHandshake,
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
import './local-services-showcase.css';

const FEATURE_STRIP = [
  {
    title: 'Verified professionals',
    desc: 'ID checks, skill badges, and repeat-job scoring before every dispatch.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast response',
    desc: 'Median callback under 15 minutes · SLA badges per neighbourhood.',
    icon: Clock,
  },
  {
    title: 'Affordable pricing',
    desc: 'Written estimates before any wrench touches a bolt.',
    icon: BadgeIndianRupee,
  },
  {
    title: 'Satisfaction first',
    desc: '30-day rework promise on labour · parts billed as invoiced.',
    icon: HeartHandshake,
  },
  {
    title: 'Customer care',
    desc: 'Night desk for emergencies · WhatsApp ticket IDs you can track.',
    icon: Headphones,
  },
  {
    title: 'Quality assurance',
    desc: 'Photo logs, supervisor spot-checks, and rating flywheels after every job.',
    icon: BadgeCheck,
  },
] as const;

const POPULAR = [
  {
    name: 'Plumbing',
    blurb: 'Leak fixes · overhead tanks · motor install · bathroom retrofits.',
    icon: Droplets,
  },
  {
    name: 'Electrician',
    blurb: 'MCB upgrades · earthing audit · fixture installs · inverter wiring.',
    icon: Zap,
  },
  {
    name: 'AC repair',
    blurb: 'Gas refill · PCB faults · split & window · AMC hygiene visits.',
    icon: Wind,
  },
  {
    name: 'Deep cleaning',
    blurb: 'Move-out sparkle · sofa shampoo · kitchen degrease · sanitisation.',
    icon: Sparkles,
  },
  {
    name: 'Painting',
    blurb: 'Texture · waterproofing primer · wood polish · careful site masking.',
    icon: Paintbrush,
  },
  {
    name: 'Carpentry',
    blurb: 'Door alignment · modular fixes · furniture assembly · hinge swaps.',
    icon: Hammer,
  },
] as const;

const WHY = [
  'Missed calls become SMS + CRM rows automatically — no lead left hanging.',
  'Nearest verified partner is pinged first with a transparent ETA.',
  'Scope locks before work starts — no surprise line items later.',
  'Happy jobs auto-request ratings; unhappy ones route to a QA lead.',
  'Customers stay on WhatsApp — the chat they already trust.',
] as const;

const TESTIMONIALS = [
  {
    quote:
      'Quoted before they climbed the ladder — AC gas + PCB sorted same evening. Invoice matched the WhatsApp estimate.',
    name: 'Priyanka Das',
    role: 'Apartment owner · Bistupur',
  },
  {
    quote:
      'Deep clean crew brought their own gear — deposit photos saved us landlord drama on move-out day.',
    name: 'Arif Khan',
    role: 'Tenant · Mango',
  },
  {
    quote:
      'Painting team masked floors obsessively. Supervisor shared daily progress pics without me asking.',
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
    period: 'Inspection · small fixes',
    bullets: ['30-min diagnostic slot', 'Waived if you book same-day', 'Parts quoted separately'],
    highlight: false,
  },
  {
    name: 'Half-day crew',
    price: '₹1,899',
    period: 'Up to 4 hrs · 1 expert',
    bullets: [
      'Ideal for painting prep or deep-clean burst',
      'Tools included · debris bag-out',
      'Add assistant +₹799',
    ],
    highlight: true,
  },
  {
    name: 'Comfort AMC',
    price: '₹4,499',
    period: 'Quarterly · AC + electrical scan',
    bullets: ['2 preventive visits / quarter', 'Priority weekend routing', '10% off add-on jobs'],
    highlight: false,
  },
] as const;

/**
 * Steel City Home Pros — hyperlocal home services lead funnel specimen.
 */
export default function LocalServicesLeadShowcaseContent() {
  return (
    <div className="sc-home">
      <section className="sc-home-hero" aria-labelledby="sc-home-hero-heading">
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="sc-home__eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Jamshedpur · verified home crews
            </p>
            <h1
              id="sc-home-hero-heading"
              className="sc-home__title mt-4 text-4xl sm:text-5xl lg:text-[3.2rem]"
            >
              Reliable local services <span className="sc-home__title-mark">at your doorstep</span>
            </h1>
            <p className="sc-home__lead mx-auto mt-5">
              Steel City Home Pros connects you with verified plumbers, electricians, AC techs, and
              cleaners — quote-first, WhatsApp-native, and zone-aware for Jamshedpur neighbourhoods.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ShowcaseAnchor href="#booking" className="sc-home__btn sc-home__btn--primary">
                Get free quote
              </ShowcaseAnchor>
              <ShowcaseAnchor href="#services" className="sc-home__btn sc-home__btn--ghost">
                Book service
              </ShowcaseAnchor>
            </div>

            <div className="sc-home-hero__stats" aria-label="Trust metrics">
              <div className="sc-home-hero__stat">
                <strong>4.8</strong>
                <span>Average rating</span>
              </div>
              <div className="sc-home-hero__stat">
                <strong>15 min</strong>
                <span>Response time</span>
              </div>
              <div className="sc-home-hero__stat">
                <strong>260+</strong>
                <span>Projects delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sc-home-band sc-home-band--soft" aria-label="Why book with us">
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <ul className="sc-home-features">
            {FEATURE_STRIP.map(({ title, desc, icon: Icon }) => (
              <li key={title} className="sc-home-feature">
                <span className="sc-home-feature__icon" aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="sc-home-feature__title">{title}</p>
                <p className="sc-home-feature__desc">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="sc-home-band scroll-mt-28">
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="sc-home__eyebrow">Popular services</p>
            <h2 className="sc-home__title mt-3 text-3xl sm:text-4xl">Book trusted crews</h2>
            <p className="sc-home__lead mx-auto mt-3">
              Pick a category to start a quote — production stacks deep-link each tile into WhatsApp
              with service context.
            </p>
          </div>
          <ul className="sc-home-services mt-10">
            {POPULAR.map(({ name, blurb, icon: Icon }) => (
              <li key={name}>
                <article className="sc-home-service">
                  <div className="sc-home-service__media">
                    <div className="sc-home-service__media-visual">
                      <span className="sc-home-service__icon" aria-hidden>
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                    </div>
                  </div>
                  <div className="sc-home-service__body">
                    <h3 className="sc-home-service__title">{name}</h3>
                    <p className="sc-home-service__desc">{blurb}</p>
                    <ShowcaseAnchor href="#booking" className="sc-home-service__cta">
                      See popular work →
                    </ShowcaseAnchor>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sc-home-band sc-home-band--soft">
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="sc-home-why">
            <div>
              <p className="sc-home__eyebrow">Why choose us</p>
              <h2 className="sc-home__title mt-3 text-3xl sm:text-4xl">
                Built for conversion, not clutter
              </h2>
              <p className="sc-home__lead mt-4">
                Operators win when enquiry friction drops — these patterns mirror CRM, telephony,
                and WhatsApp Cloud API wiring on real deployments.
              </p>
            </div>
            <ul className="sc-home-why__list">
              {WHY.map((line) => (
                <li key={line} className="sc-home-why__item">
                  <span className="sc-home-why__check" aria-hidden>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sc-home-band" aria-labelledby="sc-home-reviews-heading">
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="sc-home__eyebrow">Testimonials</p>
            <h2 id="sc-home-reviews-heading" className="sc-home__title mt-3 text-3xl sm:text-4xl">
              Neighbours who booked again
            </h2>
          </div>
          <div className="sc-home-quotes mt-10">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="sc-home-quote">
                <div className="sc-home-quote__stars" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="sc-home-band sc-home-band--soft scroll-mt-28"
        aria-labelledby="sc-home-pricing-heading"
      >
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="sc-home__eyebrow">Pricing plans</p>
            <h2 id="sc-home-pricing-heading" className="sc-home__title mt-3 text-3xl sm:text-4xl">
              Transparent starting points
            </h2>
            <p className="sc-home__lead mx-auto mt-3">
              Illustrative slabs — final quote after scope photos or a short site visit.
            </p>
          </div>
          <div className="sc-home-plans mt-10">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className={`sc-home-plan${p.highlight ? ' sc-home-plan--featured' : ''}`}
              >
                {p.highlight ? <span className="sc-home-plan__badge">Most booked</span> : null}
                <h3 className="sc-home-plan__name">{p.name}</h3>
                <p className="sc-home-plan__price">{p.price}</p>
                <p className="sc-home-plan__period">{p.period}</p>
                <ul className="sc-home-plan__list">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ShowcaseAnchor
                  href="#booking"
                  className={`sc-home__btn mt-6 w-full ${
                    p.highlight ? 'sc-home__btn--primary' : 'sc-home__btn--ghost'
                  }`}
                >
                  Choose plan
                </ShowcaseAnchor>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="zones"
        className="sc-home-band scroll-mt-28"
        aria-labelledby="sc-home-zones-heading"
      >
        <div className={`${CONTAINER} sc-home__section-pad`}>
          <div className="sc-home-zones">
            <div>
              <p className="sc-home__eyebrow">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Service areas
              </p>
              <h2 id="sc-home-zones-heading" className="sc-home__title mt-3 text-3xl sm:text-4xl">
                Hyperlocal dispatch rings
              </h2>
              <p className="sc-home__lead mt-4">
                Named pockets build SEO trust and set clear ETAs — swap rings when you launch the
                next city.
              </p>
            </div>
            <div className="sc-home-zones__map">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--sc-accent-deep)]">
                Active coverage · Jamshedpur
              </p>
              <div className="sc-home-zones__pills mt-4" aria-label="Service localities">
                {AREAS.map((a) => (
                  <span key={a} className="sc-home-zone">
                    <span className="sc-home-zone__dot" aria-hidden />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="sc-home-band sc-home-band--soft scroll-mt-28">
        <div className={`${CONTAINER} sc-home__section-pad pb-16 md:pb-20`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="sc-home__eyebrow">
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              Booking request
            </p>
            <h2 className="sc-home__title mt-3 text-3xl sm:text-4xl">Request a free visit</h2>
            <p className="sc-home__lead mx-auto mt-3">
              Share a few details — we route the right crew and send a written estimate on WhatsApp.
            </p>
          </div>
          <div className="sc-home-form mt-10">
            <LocalServicesBookingForm />
            <p className="mt-6 text-center text-sm text-[color:var(--sc-muted)]">
              Prefer voice?{' '}
              <ShowcaseAnchor
                href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}
                className="font-bold text-[color:var(--sc-accent-deep)] hover:underline"
              >
                {SUPPORT_PHONE_DISPLAY}
              </ShowcaseAnchor>
            </p>
          </div>
          <p className="sc-home-footnote">
            Steel City Home Pros is a fictional brand · zones and pricing are illustrative · UI
            specimen by Bitcraftly.
          </p>
          <div className="mt-6 text-center">
            <ShowcaseLink
              href="/contact?intent=consultation&source=local-services-leads-showcase"
              className="sc-home__btn sc-home__btn--soft"
            >
              Talk to Bitcraftly about this funnel
            </ShowcaseLink>
          </div>
        </div>
      </section>
    </div>
  );
}
