import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  BarChart3,
  Bot,
  Calendar,
  ChefHat,
  Globe,
  Headphones,
  MessageCircle,
  Phone,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import { CONTAINER } from "@/lib/constants";

import RestaurantChatDemoPanel from "./RestaurantChatDemoPanel";

const FEATURE_STRIP = [
  { title: "AI food recommendations", desc: "Margin-aware upsells from live inventory & dietary tags.", icon: ChefHat },
  { title: "Table booking", desc: "Natural language slots synced to floor plans & waitlists.", icon: Calendar },
  { title: "WhatsApp integration", desc: "Same brain on web widget + Business API threads.", icon: MessageCircle },
  { title: "Smart ordering", desc: "Cart assembly, combo rules, and allergy guardrails.", icon: UtensilsCrossed },
  { title: "Customer insights", desc: "Repeat visits, sentiment spikes, and churn nudges.", icon: BarChart3 },
] as const;

const AI_FEATURES = [
  "Intent routing : menu vs billing vs franchise escalation paths.",
  "Grounded replies : menu PDF & kitchen PDF ingest with citation snippets.",
  "Handoff queues : human takeover + WhatsApp deep-link preserved.",
  "Safety filters : profanity, competitor bait, and medical nutrition disclaimers.",
  "Latency UX : streaming tokens + skeleton chips while models think.",
] as const;

const MENU_AUTO = [
  "Seasonal prix-fixe blocks injected from sheet → LLM seasonal voice.",
  "86'd items suppressed automatically across channels.",
  "Photo-ready descriptions localized per outlet dialect.",
  "Pairing prompts : beverage attach rate tuning per shift.",
] as const;

const RESERVATIONS = [
  "Hold deposits · Stripe / Razorpay intent stubs before confirm SMS.",
  "Walk-in bump rules & VIP override tokens for managers.",
  "Private dining upsell ladder : tasting vs chef's table narrative.",
  "Calendar sync exports · ICS handoff for concierge desks.",
] as const;

const SUPPORT = [
  "Tier-1 deflection : refunds, spice levels, delivery ETA templates.",
  "Ticket mirror : Zendesk / Freshdesk webhook fan-out optional.",
  "SLA dashboards : first-response heatmaps per outlet.",
  "After-hours mode : empathy-first tone + callback scheduling.",
] as const;

const ANALYTICS = [
  { label: "Sessions / week", pct: 82 },
  { label: "Cart attach rate", pct: 64 },
  { label: "Booking conversion", pct: 71 },
  { label: "CSAT proxy", pct: 89 },
] as const;

const LANGS = ["English", "Hindi · Hinglish", "Bengali · Marathi", "Arabic · Roman Urdu", "Custom glossary per brand"] as const;

export default function RestaurantAiChatbotShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.22),transparent_55%)]" />
        <div className={`${CONTAINER} relative py-14 lg:py-20`}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-800">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Showcase · fictional restaurant brand
            </span>
            <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
              AI Assistant for Restaurants
            </h1>
            <p className="mt-5 text-base leading-relaxed text-dark-text-secondary sm:text-lg">
              Automate food discovery, basket guidance, and reservation flows — one conversational surface that respects your menu,
              margins, and multilingual guests.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ShowcaseAnchor
                href="#demo-chat"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-violet-700 to-fuchsia-600 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_16px_48px_-14px_rgba(139,92,246,0.65)] transition hover:brightness-110"
              >
                Try demo
              </ShowcaseAnchor>
              <ShowcaseLink
                href="/contact?intent=consultation&source=restaurant-ai-chatbot-showcase"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-dark-border-secondary bg-dark-bg-card px-7 py-2.5 text-sm font-semibold text-dark-text-primary transition hover:border-violet-500/45"
              >
                Book consultation
              </ShowcaseLink>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURE_STRIP.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-4 transition hover:border-violet-500/35 hover:shadow-[0_20px_50px_-38px_rgba(139,92,246,0.45)]"
              >
                <Icon className="h-5 w-5 text-violet-400" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-dark-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat + highlights */}
      <section id="demo" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <RestaurantChatDemoPanel />
          <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Main chatbot UI</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
                Conversational ordering & support shell
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                Neon-accent panels echo SaaS-grade chat products while staying on-brand for hospitality — quick replies, streaming-safe
                bubbles, and POS-aware recommendation rails.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-dark-text-secondary">
              <li className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3">
                <UtensilsCrossed className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-400/90" aria-hidden />
                <span>
                  <strong className="text-dark-text-primary">Food ordering suggestions</strong> — combos, spice calibration, and budget nudges inline.
                </span>
              </li>
              <li className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3">
                <Wine className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" aria-hidden />
                <span>
                  <strong className="text-dark-text-primary">Table booking assistant</strong> — party size, dietary notes, deposit copy baked into thread.
                </span>
              </li>
              <li className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3">
                <Bot className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400/90" aria-hidden />
                <span>
                  <strong className="text-dark-text-primary">Smart replies</strong> — grounded menu facts + graceful fallback to staff WhatsApp.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="features" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">AI features</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Built like production AI</h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {AI_FEATURES.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Menu + Reservations */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fuchsia-400/85">Menu automation</p>
            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary">Always-current voice</h3>
            <ul className="mt-6 space-y-3 text-sm text-dark-text-secondary">
              {MENU_AUTO.map((line) => (
                <li key={line} className="border-l-2 border-violet-500/40 pl-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Reservation system</p>
            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary">Floor-aware booking</h3>
            <ul className="mt-6 space-y-3 text-sm text-dark-text-secondary">
              {RESERVATIONS.map((line) => (
                <li key={line} className="border-l-2 border-fuchsia-500/35 pl-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Customer support */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/20 py-14 md:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              <Headphones className="h-4 w-4" aria-hidden />
              Customer support
            </div>
            <h3 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary">Deflect without sounding robotic</h3>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-dark-text-secondary">
              {SUPPORT.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/[0.04] p-4">
              <Phone className="h-8 w-8 text-violet-400" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-dark-text-primary">Human escalation ribbon</p>
                <p className="mt-1 text-xs text-dark-text-secondary">Shift supervisor ping · preserve transcript hash · SLA timer armed.</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-dark-text-tertiary">
              Showcase card — production stacks wire Twilio / WhatsApp Cloud API + your ticketing vendor of choice.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Analytics dashboard</p>
          <h3 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Outcome telemetry</h3>
          <p className="mt-4 text-sm text-dark-text-secondary">
            Mini KPI visualization pattern — embed inside operator consoles or weekly investor emails.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {ANALYTICS.map((row) => (
            <div key={row.label} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-dark-text-primary">{row.label}</p>
                <span className="font-mono text-xs font-semibold text-violet-300">{row.pct}%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-dark-bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-language */}
      <section className="border-t border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:pb-20">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
                <Globe className="h-4 w-4" aria-hidden />
                Multi-language support
              </div>
              <h3 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary">Dialect switching without breaking tone</h3>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                Locale packs ship as YAML overlays — transliteration toggles for Roman Hindi / Urdu, formal Arabic menus, and outlet-specific slang tables.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGS.map((l) => (
                <span key={l} className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-100">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
            Zaika Kitchen is fictional · this page is a UI specimen for Bitcraftly — conversation copy & metrics are illustrative only.
          </p>
        </div>
      </section>
    </>
  );
}
