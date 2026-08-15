import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import {
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  Car,
  CreditCard,
  Dumbbell,
  FileText,
  Home,
  LayoutDashboard,
  Megaphone,
  Phone,
  PlusCircle,
  Shield,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { CONTAINER, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

import './society-showcase.css';

const NAV: readonly { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bills', label: 'Maintenance bills', icon: CreditCard },
  { id: 'visitors', label: 'Visitor management', icon: Car },
  { id: 'complaints', label: 'Complaints', icon: Wrench },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'emergency', label: 'Emergency', icon: Phone },
  { id: 'amenities', label: 'Amenities', icon: Building2 },
] as const;

const KPI = [
  {
    label: 'Total members',
    value: '452',
    hint: 'Across 6 towers · 186 flats',
    icon: Users,
  },
  {
    label: 'Pending bills',
    value: '₹14.2L',
    hint: '42 flats · due within 7 days',
    icon: CreditCard,
  },
  {
    label: 'Active visitors',
    value: '25',
    hint: 'On-premise · pre-approved',
    icon: Car,
  },
  {
    label: 'Monthly expenses',
    value: '₹38.6L',
    hint: 'Ops + civic · reconciled',
    icon: FileText,
  },
] as const;

const VISITORS = [
  {
    name: 'Rahul Mehta',
    flat: 'B-704',
    vendor: 'AC service · CoolTech',
    inAt: '10:42 AM',
    status: 'Checked-in',
    tone: 'ok' as const,
  },
  {
    name: 'Priya Sharma',
    flat: 'A-210',
    vendor: 'Guest · birthday party',
    inAt: 'Yesterday · 6 PM',
    status: 'Checked out',
    tone: 'muted' as const,
  },
  {
    name: 'BlueDart Courier',
    flat: 'Lobby desk',
    vendor: 'Shipment HH-88921',
    inAt: '9:15 AM',
    status: 'Awaiting pickup',
    tone: 'warn' as const,
  },
] as const;

const COMPLAINTS = [
  {
    id: 'CMP-2188',
    title: 'Parking slot blocked · Tower B P3',
    raised: 'Unit B-704 · 11 May',
    sla: 'Due · 18 hrs',
    status: 'In progress',
    tone: 'info' as const,
  },
  {
    id: 'CMP-2185',
    title: 'Water pressure fluctuation · 14th floor',
    raised: 'RWA steward desk · 9 May',
    sla: 'Due · 3 days',
    status: 'Vendor assigned',
    tone: 'warn' as const,
  },
  {
    id: 'CMP-2179',
    title: 'Lift lobby lighting flicker',
    raised: 'Security kiosk · 4 May',
    sla: 'Resolved',
    status: 'Closed',
    tone: 'muted' as const,
  },
] as const;

const NOTICES = [
  {
    title: 'STP maintenance shutdown · Sunday 6–10 AM',
    date: '12 May 2026',
    tag: 'Ops',
    pinned: true,
  },
  {
    title: 'AGM voting deadline extended · digital quorum rules',
    date: '10 May 2026',
    tag: 'Governance',
    pinned: false,
  },
  {
    title: 'Fire drill rehearsal · Tower C podium',
    date: '8 May 2026',
    tag: 'Safety',
    pinned: false,
  },
] as const;

const EVENTS = [
  {
    name: 'Monsoon terrace supper',
    when: 'Sat · 24 May · 7 PM',
    loc: 'Sky podium deck',
  },
  {
    name: 'Children’s science carnival',
    when: 'Sun · 1 Jun · 4 PM',
    loc: 'Amenity lawn',
  },
  {
    name: 'Yoga sunrise cohort',
    when: 'Daily · 6 AM',
    loc: 'Wellness studio',
  },
] as const;

const EMERGENCY = [
  { role: 'Estate manager', detail: 'Duty desk · 24×7', phone: SUPPORT_PHONE_DISPLAY },
  { role: 'Security control', detail: 'Gate & CCTV fusion', phone: SUPPORT_PHONE_DISPLAY },
  { role: 'Medical booth', detail: 'Clinic tie-up · 144', phone: SUPPORT_PHONE_DISPLAY },
  { role: 'Electrician standby', detail: 'Vendor HH-EL-02', phone: SUPPORT_PHONE_DISPLAY },
] as const;

const AMENITIES = [
  {
    name: 'Badminton court',
    slots: 'Sat 6–7 PM · open',
    fee: '₹400 / hr',
    bookable: true,
    icon: Dumbbell,
  },
  {
    name: 'Party hall',
    slots: 'Sun eve · waitlisted',
    fee: '₹12k · housekeeping',
    bookable: false,
    icon: Building2,
  },
  {
    name: 'Guest suite',
    slots: 'Thu–Sun · hygiene audit',
    fee: '₹2.8k / night',
    bookable: true,
    icon: Home,
  },
  {
    name: 'EV charging bay',
    slots: 'Bay 4 · idle grace',
    fee: 'Metered billing',
    bookable: true,
    icon: Zap,
  },
] as const;

const BILL_ROWS = [
  {
    bill: 'May 2026 · Maintenance',
    amount: '₹18,420',
    status: 'Due soon',
    tone: 'warn' as const,
  },
  {
    bill: 'Apr 2026 · Maintenance',
    amount: '₹17,980',
    status: 'Paid',
    tone: 'ok' as const,
  },
  {
    bill: 'Mar 2026 · Sinking fund',
    amount: '₹4,200',
    status: 'Paid',
    tone: 'ok' as const,
  },
] as const;

const PILL: Record<'ok' | 'warn' | 'info' | 'muted', string> = {
  ok: 'rs-portal__pill rs-portal__pill--ok',
  warn: 'rs-portal__pill rs-portal__pill--warn',
  info: 'rs-portal__pill rs-portal__pill--info',
  muted: 'rs-portal__pill rs-portal__pill--muted',
};

/**
 * Harmony Heights / Riverstone resident portal specimen.
 */
export default function SocietyManagementShowcaseContent() {
  return (
    <div className="rs-portal pb-16 pt-8 md:pb-20 md:pt-10">
      <section className={CONTAINER}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rs-portal__eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              UI showcase · fictional society
            </p>
            <h1 className="rs-portal__title mt-3 text-3xl sm:text-4xl md:text-[2.55rem]">
              Harmony Heights
              <span className="mt-1 block text-xl font-semibold text-[color:var(--rs-muted)] sm:text-2xl">
                Resident Portal
              </span>
            </h1>
            <p className="rs-portal__lead mt-3">
              Bills, visitors, grievances, and amenity bookings — a calm RMS canvas residents can
              actually navigate. Representative UI only.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ShowcaseAnchor href="#complaints" className="rs-portal__btn rs-portal__btn--primary">
              <PlusCircle className="h-4 w-4" aria-hidden />
              Raise complaint
            </ShowcaseAnchor>
            <ShowcaseAnchor href="#bills" className="rs-portal__btn rs-portal__btn--ghost">
              Pay maintenance
            </ShowcaseAnchor>
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} mt-8`} aria-label="Security alerts">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--rs-muted)]">
          <Shield className="h-4 w-4 text-[color:var(--rs-accent)]" aria-hidden />
          Live alerts
        </div>
        <div className="rs-portal__alerts">
          <div className="rs-portal__alert rs-portal__alert--warn">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p>
              <strong>Perimeter camera zone B4 offline</strong>
              <span>Failover armed · ticket RMS-SEC-441 dispatched · 07:12 IST</span>
            </p>
          </div>
          <div className="rs-portal__alert rs-portal__alert--info">
            <Bell className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p>
              <strong>Gate-3 QR spike acknowledged</strong>
              <span>Night patrol deviation logged · resident blast held pending audit</span>
            </p>
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} mt-10`}>
        <div className="rs-portal__shell">
          <aside className="rs-portal__nav" aria-label="Portal sections">
            <p className="rs-portal__nav-label">Navigate</p>
            <ul className="rs-portal__nav-list">
              {NAV.map(({ id, label, icon: Icon }, index) => (
                <li key={id}>
                  <ShowcaseAnchor
                    href={`#${id}`}
                    className="rs-portal__nav-link"
                    aria-current={index === 0 ? 'true' : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {label}
                  </ShowcaseAnchor>
                </li>
              ))}
            </ul>
            <ul className="rs-portal__nav-mobile">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <ShowcaseAnchor href={`#${id}`} className="rs-portal__nav-chip">
                    {label}
                  </ShowcaseAnchor>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rs-portal__main">
            <div id="dashboard" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <LayoutDashboard className="h-5 w-5" aria-hidden />
                  Resident dashboard
                </h2>
                <span className="rs-portal__meta">Snapshot · May 2026</span>
              </div>
              <div className="rs-portal__kpis">
                {KPI.map(({ label, value, hint, icon: Icon }) => (
                  <article key={label} className="rs-portal__kpi">
                    <span className="rs-portal__kpi-icon" aria-hidden>
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="rs-portal__kpi-label">{label}</p>
                    <p className="rs-portal__kpi-value">{value}</p>
                    <p className="rs-portal__kpi-hint">{hint}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rs-portal__split">
              <div className="rs-portal__announce">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[color:var(--rs-accent-deep)]">
                  <Megaphone className="h-4 w-4" aria-hidden />
                  Society announcements
                </div>
                <p className="mt-3 text-sm font-bold text-[color:var(--rs-ink)]">
                  Digital AGM quorum opens — cast votes before 28 May.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--rs-muted)]">
                  Audit annex is in the document vault · watermarked downloads · OTP-gated sharing
                  only. Biometric mismatch desk operates weekends.
                </p>
              </div>

              <div
                id="bills"
                className="rs-portal__card rs-portal__card-pad rs-portal__pay scroll-mt-28"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[color:var(--rs-muted)]">
                  <CreditCard className="h-4 w-4 text-[color:var(--rs-accent)]" aria-hidden />
                  Maintenance invoice
                </div>
                <p className="mt-3 text-sm text-[color:var(--rs-muted)]">
                  Unit <strong className="text-[color:var(--rs-ink)]">B-704</strong> ·{' '}
                  <span className="font-mono text-xs">HH-INV-88902</span>
                </p>
                <p className="rs-portal__pay-amount">₹18,420</p>
                <p className="mt-1 text-[11px] text-[color:var(--rs-muted)]">
                  Sinking contribution · water tariff · GST included
                </p>
                <ShowcaseLink
                  href="/contact?intent=payment&source=society-portal-showcase"
                  className="rs-portal__btn rs-portal__btn--primary mt-auto pt-5 w-full"
                >
                  View last invoice
                </ShowcaseLink>
              </div>
            </div>

            <div className="rs-portal__card rs-portal__card-pad">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <FileText className="h-5 w-5" aria-hidden />
                  Ledger
                </h2>
              </div>
              <div className="rs-portal__table-wrap">
                <table className="rs-portal__table">
                  <caption className="sr-only">Maintenance bill history for unit B-704</caption>
                  <thead>
                    <tr>
                      <th scope="col">Bill</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BILL_ROWS.map((row) => (
                      <tr key={row.bill}>
                        <td className="font-medium">{row.bill}</td>
                        <td className="font-mono text-xs">{row.amount}</td>
                        <td>
                          <span className={PILL[row.tone]}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="visitors" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Car className="h-5 w-5" aria-hidden />
                  Visitor management
                </h2>
                <span className="rs-portal__meta">Today</span>
              </div>
              <ul className="rs-portal__list">
                {VISITORS.map((v) => (
                  <li key={`${v.name}-${v.flat}`} className="rs-portal__row">
                    <div>
                      <p className="text-sm font-bold text-[color:var(--rs-ink)]">{v.name}</p>
                      <p className="mt-0.5 text-xs text-[color:var(--rs-muted)]">
                        {v.flat} · {v.vendor}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium text-[color:var(--rs-muted)]">
                        {v.inAt}
                      </span>
                      <span className={PILL[v.tone]}>{v.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div id="complaints" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Wrench className="h-5 w-5" aria-hidden />
                  Complaints &amp; requests
                </h2>
                <ShowcaseLink
                  href="/contact?intent=complaint&source=society-portal-showcase"
                  className="rs-portal__btn rs-portal__btn--soft"
                >
                  <PlusCircle className="h-4 w-4" aria-hidden />
                  Raise a new complaint
                </ShowcaseLink>
              </div>
              <ul className="rs-portal__list">
                {COMPLAINTS.map((c) => (
                  <li key={c.id} className="rs-portal__row">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-[color:var(--rs-muted)]">
                        {c.id}
                      </span>
                      <p className="mt-0.5 text-sm font-bold text-[color:var(--rs-ink)]">
                        {c.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[color:var(--rs-muted)]">
                        {c.raised} · {c.sla}
                      </p>
                    </div>
                    <span className={PILL[c.tone]}>{c.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="notices" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Bell className="h-5 w-5" aria-hidden />
                  Notices &amp; announcements
                </h2>
              </div>
              <ul className="rs-portal__list">
                {NOTICES.map((n) => (
                  <li key={n.title} className="rs-portal__row">
                    <div className="flex min-w-0 gap-3">
                      <span className="rs-portal__kpi-icon mt-0.5 shrink-0" aria-hidden>
                        <Calendar className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {n.pinned ? <span className={PILL.warn}>Pinned</span> : null}
                          <span className={PILL.muted}>{n.tag}</span>
                          <span className="text-[11px] text-[color:var(--rs-muted)]">{n.date}</span>
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-[color:var(--rs-ink)]">
                          {n.title}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div id="events" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Calendar className="h-5 w-5" aria-hidden />
                  Events &amp; celebrations
                </h2>
              </div>
              <div className="rs-portal__grid-3">
                {EVENTS.map((e) => (
                  <article key={e.name} className="rs-portal__event">
                    <p className="text-sm font-bold text-[color:var(--rs-ink)]">{e.name}</p>
                    <p className="mt-2 text-xs font-semibold text-[color:var(--rs-accent-deep)]">
                      {e.when}
                    </p>
                    <p className="mt-2 text-xs text-[color:var(--rs-muted)]">{e.loc}</p>
                  </article>
                ))}
              </div>
            </div>

            <div id="emergency" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Phone className="h-5 w-5" aria-hidden />
                  Emergency contacts
                </h2>
              </div>
              <div className="rs-portal__grid-2">
                {EMERGENCY.map((e) => (
                  <div key={e.role} className="rs-portal__row !items-start">
                    <div>
                      <p className="text-sm font-bold text-[color:var(--rs-ink)]">{e.role}</p>
                      <p className="mt-1 text-xs text-[color:var(--rs-muted)]">{e.detail}</p>
                      <ShowcaseAnchor
                        href={`tel:${e.phone.replace(/\s/g, '')}`}
                        className="mt-2 inline-flex text-sm font-semibold text-[color:var(--rs-accent-deep)] hover:underline"
                      >
                        {e.phone}
                      </ShowcaseAnchor>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="amenities" className="rs-portal__card rs-portal__card-pad scroll-mt-28">
              <div className="rs-portal__section-head">
                <h2 className="rs-portal__section-title">
                  <Building2 className="h-5 w-5" aria-hidden />
                  Amenities booking
                </h2>
              </div>
              <div className="rs-portal__grid-2">
                {AMENITIES.map((a) => {
                  const Icon = a.icon;
                  return (
                    <article key={a.name} className="rs-portal__amenity">
                      <span className="rs-portal__amenity-media" aria-hidden>
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <p className="text-sm font-bold text-[color:var(--rs-ink)]">{a.name}</p>
                      <p className="mt-1 text-xs text-[color:var(--rs-muted)]">{a.slots}</p>
                      <p className="mt-1 text-[11px] font-semibold text-[color:var(--rs-accent-deep)]">
                        {a.fee}
                      </p>
                      <button
                        type="button"
                        disabled
                        className={`rs-portal__btn mt-auto w-full cursor-not-allowed opacity-80 ${
                          a.bookable ? 'rs-portal__btn--soft' : 'rs-portal__btn--ghost'
                        }`}
                      >
                        {a.bookable ? 'Book slot · demo' : 'Fully booked · view status'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="rs-portal__footnote">
              <p className="text-sm text-[color:var(--rs-ink)]">
                Need this portal for your society?{' '}
                <ShowcaseLink
                  href="/contact?intent=consultation&source=society-portal-showcase"
                  className="font-bold text-[color:var(--rs-accent-deep)] hover:underline"
                >
                  Talk to Bitcraftly
                </ShowcaseLink>{' '}
                ·{' '}
                <ShowcaseAnchor href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline">
                  {SUPPORT_EMAIL}
                </ShowcaseAnchor>
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-[11px] leading-relaxed text-[color:var(--rs-muted)]">
                Fictional RMS specimen · Harmony Heights / Riverstone · metrics and tickets are
                placeholders only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
