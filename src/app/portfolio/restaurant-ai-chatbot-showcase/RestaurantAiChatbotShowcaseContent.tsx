import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import ShowcaseLink from '@/components/portfolio/ShowcaseLink';
import {
  BarChart3,
  Bot,
  Calendar,
  Check,
  ChefHat,
  Globe,
  Headphones,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import RestaurantChatDemoPanel from './RestaurantChatDemoPanel';
import './restaurant-ai-showcase.css';

const FEATURE_STRIP = [
  {
    title: 'AI food recommendations',
    desc: 'Margin-aware upsells from live inventory and dietary tags.',
    icon: ChefHat,
  },
  {
    title: 'Table booking',
    desc: 'Natural-language slots synced to floor plans and waitlists.',
    icon: Calendar,
  },
  {
    title: 'WhatsApp integration',
    desc: 'Same brain on web widget and Business API threads.',
    icon: MessageCircle,
  },
  {
    title: 'Smart ordering',
    desc: 'Cart assembly, combo rules, and allergy guardrails.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Customer insights',
    desc: 'Repeat visits, sentiment spikes, and churn nudges.',
    icon: BarChart3,
  },
] as const;

const DEMO_HIGHLIGHTS = [
  {
    title: 'Food ordering suggestions',
    detail: 'Combos, spice calibration, and budget nudges inline.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Table booking assistant',
    detail: 'Party size, dietary notes, and deposit copy in-thread.',
    icon: Wine,
  },
  {
    title: 'Smart replies',
    detail: 'Grounded menu facts with graceful staff WhatsApp handoff.',
    icon: Bot,
  },
] as const;

const AI_FEATURES = [
  'Intent routing for menu, billing, and franchise escalation paths.',
  'Grounded replies from menu and kitchen docs with citation snippets.',
  'Handoff queues with human takeover and WhatsApp deep-links preserved.',
  'Safety filters for profanity, competitor bait, and nutrition disclaimers.',
  'Latency UX with streaming tokens and skeleton chips while models think.',
] as const;

const MENU_AUTO = [
  'Seasonal prix-fixe blocks injected into seasonal voice automatically.',
  "86'd items suppressed across web widget and WhatsApp threads.",
  'Photo-ready descriptions localized per outlet dialect.',
  'Pairing prompts that tune beverage attach rate per shift.',
] as const;

const RESERVATIONS = [
  'Hold deposits with Stripe / Razorpay intent stubs before confirm SMS.',
  'Walk-in bump rules and VIP override tokens for managers.',
  "Private dining upsell ladder — tasting vs chef's table narrative.",
  'Calendar sync exports and ICS handoff for concierge desks.',
] as const;

const SUPPORT = [
  'Tier-1 deflection for refunds, spice levels, and delivery ETA templates.',
  'Ticket mirror via Zendesk / Freshdesk webhook fan-out.',
  'SLA dashboards with first-response heatmaps per outlet.',
  'After-hours mode with empathy-first tone and callback scheduling.',
] as const;

const ANALYTICS = [
  { label: 'Sessions / week', pct: 85 },
  { label: 'Cart conversion', pct: 80 },
  { label: 'Booking conversion', pct: 71 },
  { label: 'CSAT score', pct: 94 },
] as const;

const LANGS = [
  'Hindi · English',
  'Bengali · Marathi',
  'Arabic · French · Urdu',
  'Hinglish · Roman Urdu',
  'Custom glossary per brand',
] as const;

const PROOF = [
  { label: 'WhatsApp-ready', icon: MessageCircle },
  { label: 'Menu-grounded', icon: ShieldCheck },
  { label: 'Human-handoff', icon: Headphones },
  { label: 'Multi-dialect', icon: Globe },
] as const;

/**
 * Tasting Desk AI — premium restaurant assistant showcase.
 */
export default function RestaurantAiChatbotShowcaseContent() {
  return (
    <div className="td-ai">
      <section className="td-ai-hero td-ai__section" aria-labelledby="td-ai-hero-heading">
        <div className={`${CONTAINER} td-ai__section-pad`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="td-ai__eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Official agentic framework
            </p>
            <h1 id="td-ai-hero-heading" className="td-ai__title td-ai-hero__title">
              AI Assistant for <span className="td-ai__title-mark">Restaurants</span>
            </h1>
            <p className="td-ai__lead td-ai-hero__lead mx-auto">
              Cloud-native conversational ordering that respects your menu, margins, and multilingual
              guests — from discovery to deposit-backed bookings.
            </p>
            <div className="td-ai-hero__actions justify-center">
              <ShowcaseAnchor href="#demo-chat" className="td-ai__btn td-ai__btn--primary">
                Try for free
              </ShowcaseAnchor>
              <ShowcaseAnchor href="#features" className="td-ai__btn td-ai__btn--ghost">
                See more features
              </ShowcaseAnchor>
            </div>
            <ul className="td-ai-hero__proof justify-center" aria-label="Delivery strengths">
              {PROOF.map(({ label, icon: Icon }) => (
                <li key={label} className="td-ai-hero__proof-item">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <ul className="td-ai-caps mt-12 lg:mt-14" aria-label="Product capabilities">
            {FEATURE_STRIP.map(({ title, desc, icon: Icon }) => (
              <li key={title} className="td-ai-cap">
                <div className="td-ai-cap__media">
                  <div className="td-ai-cap__media-visual">
                    <span className="td-ai-cap__icon" aria-hidden>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
                <div className="td-ai-cap__body">
                  <p className="td-ai-cap__title">{title}</p>
                  <p className="td-ai-cap__desc">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="demo" className="td-ai-demo td-ai__section scroll-mt-28">
        <div className={`${CONTAINER} td-ai__section-pad`}>
          <div className="td-ai-demo__grid">
            <RestaurantChatDemoPanel />
            <div>
              <p className="td-ai__eyebrow">Main capability</p>
              <h2 className="td-ai__title mt-3 text-3xl sm:text-[2.15rem]">
                Conversational ordering &amp; support shell
              </h2>
              <p className="td-ai__lead mt-4">
                A hospitality-grade chat surface with quick replies, streaming-safe bubbles, and
                POS-aware recommendation rails — ready for web widget or WhatsApp.
              </p>
              <ul className="td-ai-demo__side-list">
                {DEMO_HIGHLIGHTS.map(({ title, detail, icon: Icon }) => (
                  <li key={title} className="td-ai-demo__side-item">
                    <span className="td-ai-demo__side-icon" aria-hidden>
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span>
                      <strong>{title}</strong>
                      <span>{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="td-ai-band td-ai-band--soft td-ai__section scroll-mt-28"
        aria-labelledby="td-ai-features-heading"
      >
        <div className={`${CONTAINER} td-ai__section-pad`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="td-ai__eyebrow">AI capabilities</p>
            <h2 id="td-ai-features-heading" className="td-ai__title mt-3 text-3xl sm:text-4xl">
              Built like production AI
            </h2>
            <p className="td-ai__lead mx-auto mt-4">
              Guardrails, grounding, and handoff patterns that hold up on busy service nights.
            </p>
          </div>
          <ul className="td-ai-feature-grid mx-auto max-w-5xl">
            {AI_FEATURES.map((line) => (
              <li key={line} className="td-ai-feature-item">
                <span className="td-ai-feature-check" aria-hidden>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="td-ai-band td-ai__section" aria-labelledby="td-ai-ops-heading">
        <div className={`${CONTAINER} td-ai__section-pad`}>
          <h2 id="td-ai-ops-heading" className="sr-only">
            Voice automation and operational safety
          </h2>
          <div className="td-ai-split">
            <article className="td-ai-split__card">
              <p className="td-ai__eyebrow">Voice automation</p>
              <h3 className="td-ai__title mt-3 text-2xl sm:text-[1.75rem]">Always-current voice</h3>
              <ul className="td-ai-split__list">
                {MENU_AUTO.map((line) => (
                  <li key={line}>
                    <span className="td-ai-split__bullet" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
            <article className="td-ai-split__card">
              <p className="td-ai__eyebrow">Operational safety</p>
              <h3 className="td-ai__title mt-3 text-2xl sm:text-[1.75rem]">Floor-aware booking</h3>
              <ul className="td-ai-split__list">
                {RESERVATIONS.map((line) => (
                  <li key={line}>
                    <span className="td-ai-split__bullet" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="td-ai-band td-ai-band--soft td-ai__section">
        <div
          className={`${CONTAINER} grid gap-10 td-ai__section-pad lg:grid-cols-2 lg:items-center lg:gap-14`}
        >
          <div>
            <p className="td-ai__eyebrow">
              <Headphones className="h-3.5 w-3.5" aria-hidden />
              Human-agent handoff
            </p>
            <h2 className="td-ai__title mt-3 text-3xl">Escalate without losing context</h2>
            <ul className="mt-7 space-y-3.5">
              {SUPPORT.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--td-muted)]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--td-accent-deep)]"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <aside className="td-ai-panel">
            <div className="td-ai-panel__row">
              <span className="td-ai-panel__icon" aria-hidden>
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p>
                <strong>Human escalation ribbon</strong>
                <span>
                  Shift supervisor ping on WhatsApp · transcript hash preserved · SLA timer armed.
                </span>
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[color:var(--td-muted)]">
              Showcase card — production stacks wire Twilio / WhatsApp Cloud API plus your ticketing
              vendor of choice.
            </p>
            <ShowcaseLink
              href="/contact?intent=consultation&source=restaurant-ai-chatbot-showcase"
              className="td-ai__btn td-ai__btn--primary mt-5"
            >
              Talk to Bitcraftly
            </ShowcaseLink>
          </aside>
        </div>
      </section>

      <section
        id="outcomes"
        className="td-ai-band td-ai__section scroll-mt-28"
        aria-labelledby="td-ai-outcomes-heading"
      >
        <div className={`${CONTAINER} td-ai__section-pad`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="td-ai__eyebrow">Analytics dashboard</p>
            <h2 id="td-ai-outcomes-heading" className="td-ai__title mt-3 text-3xl sm:text-4xl">
              Outcome telemetry
            </h2>
            <p className="td-ai__lead mx-auto mt-4">
              Operator-ready KPI patterns you can embed in consoles or weekly investor emails.
            </p>
          </div>
          <div className="td-ai-metrics mx-auto max-w-4xl">
            {ANALYTICS.map((row) => (
              <div key={row.label} className="td-ai-metric">
                <div className="td-ai-metric__head">
                  <p className="td-ai-metric__label">{row.label}</p>
                  <span className="td-ai-metric__value">{row.pct}%</span>
                </div>
                <div
                  className="td-ai-metric__track"
                  role="meter"
                  aria-label={row.label}
                  aria-valuenow={row.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="td-ai-metric__fill" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="languages"
        className="td-ai-band td-ai-band--soft td-ai__section scroll-mt-28"
        aria-labelledby="td-ai-lang-heading"
      >
        <div className={`${CONTAINER} td-ai__section-pad pb-16 md:pb-20`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <p className="td-ai__eyebrow">
                <Globe className="h-3.5 w-3.5" aria-hidden />
                Multi-language support
              </p>
              <h2 id="td-ai-lang-heading" className="td-ai__title mt-3 text-3xl">
                Dialect switching without breaking tone
              </h2>
              <p className="td-ai__lead mt-4">
                Locale packs ship as overlays — transliteration toggles for Roman Hindi / Urdu,
                formal Arabic menus, and outlet-specific slang tables.
              </p>
            </div>
            <div className="td-ai-langs" aria-label="Supported languages">
              {LANGS.map((lang) => (
                <span key={lang} className="td-ai-lang">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <p className="td-ai-footnote">
            Tasting Desk AI is a fictional brand · this page is a UI specimen for Bitcraftly —
            conversation copy and metrics are illustrative only.
          </p>
        </div>
      </section>
    </div>
  );
}
