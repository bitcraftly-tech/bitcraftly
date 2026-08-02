import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import ShowcaseLink from '@/components/portfolio/ShowcaseLink';
import {
  Activity,
  Apple,
  Clock,
  Dumbbell,
  Flame,
  Medal,
  Sparkles,
  Star,
  Trophy,
  Users,
} from 'lucide-react';

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

import GymBmiCalculator from './GymBmiCalculator';

const FEATURES = [
  {
    title: 'Expert trainers',
    desc: 'NSCA · ACSM lanes · injury-history onboarding dossiers.',
    icon: Users,
  },
  {
    title: 'Modern equipment',
    desc: 'Force plates · cable rigs calibrated quarterly.',
    icon: Dumbbell,
  },
  {
    title: 'Personalized plans',
    desc: 'Mesocycle PDF exports · wearable ingest hooks optional.',
    icon: Activity,
  },
  {
    title: 'Diet guidance',
    desc: 'Macro baselines · kitchen swaps aligned to regional staples.',
    icon: Apple,
  },
  { title: '24×7 access', desc: 'RFID + concierge CCTV escalation playbook nightly.', icon: Clock },
] as const;

const PROGRAMS = [
  {
    name: 'IronPulse Strength Lab',
    blurb: 'Compound lifts · RPE prescription · video upload checks weekly.',
    energy: 'from-violet-600/45 via-fuchsia-100/35 to-slate-100',
    badge: 'Most enrolled',
  },
  {
    name: 'Neon HIIT Circuit',
    blurb: '45-min tornado rigs · HR telemetry leaderboard nights Thu.',
    energy: 'from-fuchsia-600/40 via-orange-100/45 to-slate-100',
    badge: 'High calorie burn',
  },
  {
    name: 'Kinetic Mobility Yoga',
    blurb: 'Breath ladders · tension mapping · desk-athlete specialty cohort.',
    energy: 'from-emerald-600/28 via-violet-100/55 to-slate-100',
    badge: 'Recovery staple',
  },
  {
    name: 'Velocity Sports Prep',
    blurb: 'Acceleration cones · deceleration safety drills · match-week taper kits.',
    energy: 'from-orange-600/35 via-violet-100/45 to-slate-100',
    badge: 'Teams welcome',
  },
] as const;

const TRAINERS = [
  {
    name: 'Coach Malik Rao',
    role: 'Head of Strength · ex-national rugby',
    focus: 'Injury return-to-play · barbell literacy',
    initials: 'MR',
    tone: 'from-violet-600/35 to-slate-100',
  },
  {
    name: 'Ananya Seth',
    role: 'Performance nutrition liaison · RD advisory desk',
    focus: 'Body recomposition · peri-workout fuel timing',
    initials: 'AS',
    tone: 'from-fuchsia-600/30 to-slate-100',
  },
  {
    name: 'Jordan Reyes',
    role: 'HIIT programme director · CPT Level IV',
    focus: 'Metabolic conditioning · wearable pacing cues',
    initials: 'JR',
    tone: 'from-orange-500/28 to-slate-100',
  },
  {
    name: 'Dr. Kiara Bose',
    role: 'Sports physio · soft tissue diagnostics',
    focus: 'Manual therapy · ACL graft cohort protocols',
    initials: 'KB',
    tone: 'from-cyan-600/22 to-slate-100',
  },
] as const;

const PLANS = [
  {
    name: 'Starter forge',
    price: '₹2,499',
    cadence: 'month · off-peak slots',
    bullets: ['Floor access 8 slots / week', '1 onboarding PT session', 'App workout logs'],
    flash: false,
  },
  {
    name: 'Prime athlete',
    price: '₹4,899',
    cadence: 'month · unlimited floor',
    bullets: [
      'All programs · priority class booking',
      '2 PT credits monthly',
      'Nutrition macro audit quarterly',
    ],
    flash: true,
  },
  {
    name: 'Elite black card',
    price: '₹7,999',
    cadence: 'month · concierge lane',
    bullets: ['24×7 RFID · towel service included', 'Monthly InBody trace export', 'Guest pass ×2'],
    flash: false,
  },
] as const;

const NUTRITION = [
  'Baseline calorie audit · TDEE honesty banners before aggressive cuts.',
  'Pre/post workout snack packs curated from partner cloud kitchens.',
  'Hydration electrolyte ladder displayed beside cardio consoles.',
  'Vegetarian protein scaffold swaps · paneer ↔ soy ↔ lentil rotation.',
  'Cutting / gaining phases choreographed with mesocycle gym blocks.',
] as const;

const TRANSFORMATIONS = [
  {
    label: '12-week recomposition · pilot cohort',
    delta: '−6.4 kg fat · +2.1 kg lean · illustrative',
    tone: 'from-violet-700/40 to-slate-100',
    weeks: 'Week 0 → 12',
  },
  {
    label: 'Half-marathon return · ACL-safe build',
    delta: 'Vo₂ markers ↑18% · fictional lab export',
    tone: 'from-fuchsia-700/35 to-slate-100',
    weeks: 'Month 1 → 5',
  },
  {
    label: 'Desk-athlete mobility sprint',
    delta: 'Pain score ladder · posture AI screenshots weekly',
    tone: 'from-orange-600/30 to-slate-100',
    weeks: '21-day burst',
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      'Floor culture stays aggressive but respectful — coaches yell cues, not egos. Nutrition PDF finally matched what I actually eat at home.',
    name: 'Vivaan Khurana',
    role: 'Prime athlete member · 14 months',
  },
  {
    quote:
      'HIIT leaderboard nights became my accountability trap — wrist strap sync meant no lying about effort zones.',
    name: 'Tanya Menon',
    role: 'Neon HIIT regular',
  },
  {
    quote:
      'Physio desk caught knee tracking drift before it blew into a paid month off — worth the black card bump.',
    name: 'Imran Shaikh',
    role: 'Velocity sports prep · football',
  },
] as const;

export default function GymFitnessShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(192,38,211,0.2),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(139,92,246,0.22),transparent_48%)]" />
        <div className={`${CONTAINER} relative py-14 lg:py-20`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/35 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-fuchsia-100">
                <Flame className="h-3.5 w-3.5 text-fuchsia-300" aria-hidden />
                Showcase · Apex Forge Athletic Club (fictional)
              </span>
              <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
                Build Your
                <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-200 to-white bg-clip-text text-transparent">
                  Best Version
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-text-secondary sm:text-lg">
                Neon-premium gym landing specimen — programming grids, trainer credibility rails,
                and measurable wins framed for members who crave intensity with adult supervision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ShowcaseLink
                  href="/contact?intent=membership&source=gym-fitness-showcase"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-700 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_16px_52px_-14px_rgba(192,38,211,0.55)] transition hover:brightness-110"
                >
                  Join now
                </ShowcaseLink>
                <ShowcaseAnchor
                  href="#programs"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-violet-500/45 bg-violet-500/10 px-7 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/15"
                >
                  Explore programs
                </ShowcaseAnchor>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-xs text-dark-text-tertiary">
                <span className="inline-flex items-center gap-2">
                  <Medal className="h-4 w-4 text-fuchsia-400" aria-hidden />
                  ISO-inspired ops cues · demo badges only
                </span>
                <span className="inline-flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-violet-400" aria-hidden />
                  City leagues partner wall · illustrative
                </span>
              </div>
            </div>

            {/* Cinematic fitness visual — gradient silhouette */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-50 via-[#0d0814] to-slate-100 shadow-[0_45px_110px_-48px_rgba(192,38,211,0.55)] ring-1 ring-violet-400/15">
                <div className="relative aspect-[4/5] max-h-[520px] sm:aspect-[16/13] lg:aspect-square lg:max-h-none">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M0 30h60M30 0v60%22 stroke=%22rgba(255,255,255,0.04)%22/%3E%3C/svg%3E')] opacity-60" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(192,38,211,0.25),transparent_55%)]" />
                  <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                    <div className="flex justify-between gap-3">
                      <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-fuchsia-100">
                        Coach cam preview · mock
                      </span>
                      <Dumbbell className="h-7 w-7 text-violet-300/80" aria-hidden />
                    </div>
                    <div className="mx-auto flex flex-1 flex-col items-center justify-center">
                      <div className="relative h-56 w-36 rounded-full bg-gradient-to-b from-fuchsia-500/35 via-violet-600/25 to-transparent blur-[1px] ring-4 ring-fuchsia-400/25 sm:h-64 sm:w-40">
                        <div className="absolute inset-x-4 top-8 h-16 rounded-full bg-gradient-to-b from-white/18 to-transparent" />
                      </div>
                      <p className="mt-6 text-center font-[var(--font-playfair)] text-lg font-semibold text-white">
                        Athlete silhouette · cinematic rim light
                      </p>
                      <p className="mt-2 max-w-xs text-center text-[11px] leading-relaxed text-white/45">
                        Gradient-only hero · no photography · neon fitness branding aligned with
                        Bitcraftly dark UI
                      </p>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-white/35">
                      <span>Fuchsia key</span>
                      <span>Violet fill</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/45 py-11 md:py-13">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 transition hover:border-fuchsia-500/35 hover:shadow-[0_18px_46px_-38px_rgba(192,38,211,0.35)]"
              >
                <Icon className="h-5 w-5 text-fuchsia-400" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-dark-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className={`${CONTAINER} scroll-mt-28 py-14 md:py-16`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fuchsia-400/90">
              Fitness programs
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Train with intent
            </h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Program tiles tuned for thumb-scroll energy — swap footage loops when you ship marketing
            renders.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <article
              key={p.name}
              className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br shadow-lg ring-1 ring-fuchsia-500/10 ${p.energy}`}
            >
              <div className="flex min-h-[200px] flex-col justify-end border-t border-slate-200/80 bg-white/85 p-6 backdrop-blur-md">
                <span className="inline-flex w-fit rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fuchsia-100">
                  {p.badge}
                </span>
                <p className="mt-4 font-[var(--font-playfair)] text-xl font-semibold text-white">
                  {p.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{p.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              Trainers
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Coaching bench depth
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRAINERS.map((t) => (
              <div
                key={t.name}
                className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br ring-1 ring-white/5 ${t.tone}`}
              >
                <div className="border-t border-slate-200/80 bg-white/90 p-6 backdrop-blur-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-2 ring-fuchsia-400/40">
                    {t.initials}
                  </div>
                  <p className="mt-4 text-center font-semibold text-white">{t.name}</p>
                  <p className="mt-1 text-center text-[11px] text-fuchsia-100/85">{t.role}</p>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-white/60">
                    {t.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fuchsia-400/85">
            Membership plans
          </p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
            Pick your commitment lane
          </h2>
          <p className="mt-4 text-sm text-dark-text-secondary">
            Illustrative pricing — production stacks integrate Razorpay mandates & freeze rules.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 ${
                plan.flash
                  ? 'border-fuchsia-500/45 bg-gradient-to-b from-fuchsia-50/45 to-dark-bg-card shadow-[0_26px_70px_-38px_rgba(192,38,211,0.5)] ring-1 ring-fuchsia-400/25'
                  : 'border-dark-border-primary bg-dark-bg-card'
              }`}
            >
              {plan.flash ? (
                <span className="inline-flex rounded-full bg-violet-600/25 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-100">
                  Floor favourite
                </span>
              ) : null}
              <p
                className={`mt-3 font-[var(--font-playfair)] text-xl font-semibold text-dark-text-primary ${plan.flash ? '' : 'mt-0'}`}
              >
                {plan.name}
              </p>
              <p className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-fuchsia-300">
                {plan.price}
              </p>
              <p className="text-xs text-dark-text-tertiary">{plan.cadence}</p>
              <ul className="mt-6 space-y-2 text-sm text-dark-text-secondary">
                {plan.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <ShowcaseLink
                href="/contact?intent=membership&source=gym-fitness-showcase-plan"
                className={`mt-8 flex w-full cursor-pointer items-center justify-center rounded-full py-2.5 text-sm font-semibold transition ${
                  plan.flash
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-110'
                    : 'border border-dark-border-secondary bg-dark-bg-secondary text-dark-text-primary hover:border-fuchsia-500/35'
                }`}
              >
                Select plan · mock
              </ShowcaseLink>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition */}
      <section className="border-y border-dark-border-primary bg-dark-bg-primary py-14 md:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:items-start`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              Nutrition plans
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Fuel matches workload
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
              Nutrition storytelling sells retention — these bullets mirror nutritionist
              collaboration workflows we wire on production builds.
            </p>
          </div>
          <ul className="space-y-3">
            {NUTRITION.map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary"
              >
                <Apple className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Transformations */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fuchsia-400/85">
              Client transformations
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Measurable momentum
            </h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Before/after storytelling without stock imagery — dual-tone gradient strips evoke scan
            overlays.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TRANSFORMATIONS.map((t) => (
            <div
              key={t.label}
              className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br ${t.tone}`}
            >
              <div className="grid grid-cols-2 gap-px bg-white/88">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-800 to-slate-100">
                  <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white/70">
                    Before · mock
                  </span>
                </div>
                <div className="relative aspect-[3/4] bg-gradient-to-br from-fuchsia-600/25 to-violet-900/40">
                  <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                    After · mock
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-200/80 bg-white/92 p-5 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-fuchsia-800">
                  {t.weeks}
                </p>
                <p className="mt-2 font-semibold text-white">{t.label}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-white/65">{t.delta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials + BMI */}
      <section className="border-t border-dark-border-primary bg-dark-bg-secondary/35 py-14 md:pb-20">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
              Testimonials
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">
              Members who stayed loud
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6"
              >
                <div className="flex gap-0.5 text-fuchsia-400">
                  {[1, 2, 3, 4, 5].map((x) => (
                    <Star key={x} className="h-4 w-4 fill-current" aria-hidden />
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

          <div id="bmi" className="scroll-mt-28 mx-auto mt-14 max-w-2xl">
            <GymBmiCalculator />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-dark-text-secondary">
            Ready to ship your gym brand?{' '}
            <ShowcaseAnchor
              href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}
              className="font-semibold text-fuchsia-400 hover:text-fuchsia-300"
            >
              {SUPPORT_PHONE_DISPLAY}
            </ShowcaseAnchor>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
            Apex Forge Athletic Club is fictional · metrics & pricing illustrative · UI specimen by
            Bitcraftly only.
          </p>
        </div>
      </section>
    </>
  );
}
