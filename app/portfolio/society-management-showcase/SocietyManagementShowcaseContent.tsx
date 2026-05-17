import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  Car,
  CreditCard,
  FileText,
  Home,
  Megaphone,
  Phone,
  PlusCircle,
  Shield,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

import { CONTAINER, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

const KPI = [
  { label: "Total Residents", value: "482", hint: "Across 6 towers · 186 flats", icon: Users, accent: "from-violet-600/25 to-violet-950/40" },
  { label: "Pending Bills", value: "₹14.2L", hint: "42 flats · due within 7 days", icon: CreditCard, accent: "from-amber-500/15 to-violet-950/40" },
  { label: "Visitor Entries", value: "128", hint: "This month · pre-approved", icon: Car, accent: "from-emerald-600/15 to-violet-950/40" },
  { label: "Monthly Expenses", value: "₹38.6L", hint: "Ops + civic · reconciled", icon: FileText, accent: "from-fuchsia-600/15 to-violet-950/40" },
] as const;

const SIDEBAR = [
  "Resident Dashboard",
  "Maintenance Bills",
  "Visitor Management",
  "Complaints & Requests",
  "Notices & Announcements",
  "Events & Celebrations",
  "Emergency Contacts",
  "Amenities Booking",
] as const;

const VISITORS = [
  { name: "Rahul Mehta", flat: "B‑704", vendor: "AC service · CoolTech", inAt: "10:42 AM", status: "On‑premise", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  { name: "Priya Sharma", flat: "A‑210", vendor: "Guest · birthday party", inAt: "Yesterday · 6 PM", status: "Checked out", badge: "bg-dark-bg-secondary text-dark-text-tertiary border-dark-border-primary" },
  { name: "BlueDart Courier", flat: "Lobby desk", vendor: "Shipment HH‑88921", inAt: "9:15 AM", status: "Awaiting pickup", badge: "bg-amber-500/15 text-amber-200 border-amber-500/25" },
] as const;

const COMPLAINTS = [
  { id: "CMP‑2188", title: "Parking obstruction · Tower B P3", raised: "Block VP · Flat B‑704", sla: "Due · 18 hrs", status: "In progress", tone: "text-violet-300 bg-violet-500/15 border-violet-500/25" },
  { id: "CMP‑2185", title: "Water pressure fluctuation · 14th floor", raised: "RWA steward desk", sla: "Due · 3 days", status: "Vendor assigned", tone: "text-amber-200 bg-amber-500/12 border-amber-500/20" },
  { id: "CMP‑2179", title: "Lift lobby lighting flicker", raised: "Security kiosk scan", sla: "Resolved · archived", status: "Closed", tone: "text-dark-text-tertiary bg-dark-bg-secondary border-dark-border-primary" },
] as const;

const NOTICES = [
  { title: "STP maintenance shutdown · Sunday 6–10 AM", date: "12 May 2026", tag: "Ops", pinned: true },
  { title: "AGM voting deadline extended · Digital quorum rules", date: "10 May 2026", tag: "Governance", pinned: false },
  { title: "Fire drill rehearsal · Tower C podium", date: "8 May 2026", tag: "Safety", pinned: false },
] as const;

const EVENTS = [
  { name: "Monsoon terrace supper · curated stalls", when: "Sat · 24 May · 7 PM", loc: "Sky podium deck · RSVP gated", tone: "border-violet-500/30 bg-violet-500/10" },
  { name: "Children’s science carnival", when: "Sun · 1 Jun · 4 PM", loc: "Amenity lawn · wristbands issued", tone: "border-fuchsia-500/28 bg-fuchsia-500/8" },
  { name: "Yoga sunrise cohort · batch reopen", when: "Daily · 6 AM slot", loc: "Wellness studio · capacity 24", tone: "border-emerald-500/25 bg-emerald-500/8" },
] as const;

const EMERGENCY = [
  { role: "Estate manager · duty desk", ext: "9101 · 24×7", phone: SUPPORT_PHONE_DISPLAY },
  { role: "Security control tower", ext: "9009 · CCTV fusion room", phone: SUPPORT_PHONE_DISPLAY },
  { role: "Medical booth · tie‑up clinic", ext: "Dial 144 · escalation ladder", phone: SUPPORT_PHONE_DISPLAY },
  { role: "Electrician & sump standby", ext: "Vendor panel HH‑EL‑02", phone: SUPPORT_PHONE_DISPLAY },
] as const;

const AMENITIES = [
  { name: "Badminton court · Court A", slots: "Sat 6–7 PM · open", fee: "₹400 / hr · resident tier", bookable: true },
  { name: "Party hall · Level P2", slots: "Sun eve · waitlisted", fee: "₹12k · incl housekeeping", bookable: false },
  { name: "Guest suite · Tower D", slots: "Thu–Sun slots · hygiene audit", fee: "₹2.8k / night", bookable: true },
  { name: "EV charging bay · Podium", slots: "Bay 4 · free idle grace", fee: "Metered billing · wallet sync", bookable: true },
] as const;

const BILL_ROWS = [
  { flat: "B‑704", owner: "Mehta family", amount: "₹18,420", due: "22 May 2026", state: "Due soon", stateTone: "text-amber-200 bg-amber-500/12" },
  { flat: "C‑1102", owner: "Patel trust", amount: "₹21,050", due: "01 Jun 2026", state: "Scheduled", stateTone: "text-violet-800 bg-violet-500/12" },
  { flat: "A‑055", owner: "Khanna · leased", amount: "₹16,980", due: "Paid · receipt #88421", state: "Cleared", stateTone: "text-emerald-200 bg-emerald-500/12" },
] as const;

export default function SocietyManagementShowcaseContent() {
  return (
    <div className="pb-16 pt-8 md:pb-20 md:pt-10">
      {/* Portal header */}
      <section className={`${CONTAINER}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-800">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              UI showcase · fictional society
            </span>
            <h1 className="mt-4 font-[var(--font-playfair)] text-3xl font-semibold tracking-tight text-dark-text-primary sm:text-4xl md:text-[2.75rem]">
              Harmony Heights · Resident Portal
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dark-text-secondary">
              Dashboard-grade RMS surface — bills, visitors, grievances, and clubhouse workflows on one coherent canvas.
              Representative UI only; no live tenant data.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
            <ShowcaseLink
              href="/contact?intent=consultation&source=society-portal-showcase"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
            >
              <PlusCircle className="h-4 w-4" aria-hidden />
              Raise complaint
            </ShowcaseLink>
            <ShowcaseLink
              href="/contact?intent=billing&source=society-portal-showcase"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-dark-border-secondary bg-dark-bg-card px-5 py-2.5 text-sm font-semibold text-dark-text-primary transition hover:border-violet-500/40"
            >
              Maintenance payment
            </ShowcaseLink>
          </div>
        </div>
      </section>

      {/* Security alerts */}
      <section className={`${CONTAINER} mt-8 space-y-3`}>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-dark-text-tertiary">
          <Shield className="h-4 w-4 text-amber-400/90" aria-hidden />
          Security alerts
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-amber-500/35 bg-amber-500/8 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-dark-text-primary">Perimeter camera zone B4 offline · failover armed</p>
              <p className="mt-1 text-xs text-dark-text-secondary">Logged 07:12 IST · vendor ticket RMS‑SEC‑441 dispatched automatically.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-violet-500/30 bg-violet-500/8 px-4 py-3">
            <Bell className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-dark-text-primary">Night patrol deviation acknowledged · Gate‑3 QR spike</p>
              <p className="mt-1 text-xs text-dark-text-secondary">Supervisor sign‑off pending · resident blast suppressed until audit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard shell: sidebar + main */}
      <section className={`${CONTAINER} mt-10 flex flex-col gap-8 lg:flex-row lg:gap-10`}>
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-28 space-y-1 rounded-xl border border-dark-border-primary bg-dark-bg-card p-3">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-dark-text-tertiary">Navigate</p>
            {SIDEBAR.map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 text-sm ${
                  i === 0 ? "bg-violet-500/15 font-semibold text-violet-100" : "text-dark-text-secondary hover:bg-dark-bg-secondary"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-12">
          {/* KPI */}
          <div id="dashboard">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-[var(--font-playfair)] text-2xl text-dark-text-primary">Resident dashboard</h2>
              <span className="text-[11px] font-medium text-dark-text-tertiary">Snapshot · May 2026</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {KPI.map(({ label, value, hint, icon: Icon, accent }) => (
                <div
                  key={label}
                  className={`rounded-xl border border-dark-border-primary bg-gradient-to-br p-5 shadow-sm ring-1 ring-white/5 ${accent}`}
                >
                  <Icon className="h-5 w-5 text-violet-300/90" aria-hidden />
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">{label}</p>
                  <p className="mt-1 font-[var(--font-playfair)] text-2xl font-semibold text-dark-text-primary">{value}</p>
                  <p className="mt-2 text-xs text-dark-text-secondary">{hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements + payment */}
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-xl border border-violet-500/35 bg-violet-500/10 p-5 lg:col-span-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-800">
                <Megaphone className="h-4 w-4" aria-hidden />
                Society announcements
              </div>
              <p className="mt-3 text-sm font-semibold text-dark-text-primary">
                Digital AGM quorum opens · cast votes before 28 May · biometric mismatch desk operational weekends only.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">
                Audit annex uploaded to document vault · watermark trace enabled for downloads · OTP‑gated sharing only.
              </p>
            </div>
            <div id="bills" className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-dark-text-tertiary">
                <CreditCard className="h-4 w-4 text-violet-400" aria-hidden />
                Maintenance payment
              </div>
              <p className="mt-3 text-sm text-dark-text-secondary">
                Unit <span className="font-semibold text-dark-text-primary">B‑704</span> · invoice #
                <span className="font-mono text-xs text-violet-800"> HH‑INV‑88902</span>
              </p>
              <p className="mt-4 font-[var(--font-playfair)] text-3xl font-semibold text-dark-text-primary">₹18,420</p>
              <p className="mt-1 text-[11px] text-dark-text-tertiary">Includes sinking contribution · water tariff adjustment · GST included.</p>
              <ShowcaseLink
                href="/contact?intent=payment&source=society-portal-showcase"
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Pay now · mock gateway
              </ShowcaseLink>
            </div>
          </div>

          {/* Bills table */}
          <div>
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <FileText className="h-5 w-5 text-violet-400" aria-hidden />
              Maintenance bills · ledger view
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-dark-border-primary">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-dark-border-primary bg-dark-bg-secondary/80 text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">
                  <tr>
                    <th className="px-4 py-3">Flat</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Account</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="hidden px-4 py-3 md:table-cell">Due</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border-primary bg-dark-bg-card">
                  {BILL_ROWS.map((row) => (
                    <tr key={row.flat}>
                      <td className="px-4 py-3 font-medium text-dark-text-primary">{row.flat}</td>
                      <td className="hidden px-4 py-3 text-dark-text-secondary sm:table-cell">{row.owner}</td>
                      <td className="px-4 py-3 font-mono text-xs text-dark-text-primary">{row.amount}</td>
                      <td className="hidden px-4 py-3 text-xs text-dark-text-secondary md:table-cell">{row.due}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${row.stateTone}`}>{row.state}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visitors */}
          <div id="visitors">
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <Car className="h-5 w-5 text-violet-400" aria-hidden />
              Visitor management
            </h3>
            <div className="mt-4 space-y-3">
              {VISITORS.map((v) => (
                <div key={v.name + v.flat} className="flex flex-col gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-dark-text-primary">{v.name}</p>
                    <p className="mt-1 text-xs text-dark-text-secondary">
                      {v.flat} · {v.vendor}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-dark-text-tertiary">{v.inAt}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${v.badge}`}>{v.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complaints */}
          <div id="complaints">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
                <Wrench className="h-5 w-5 text-violet-400" aria-hidden />
                Complaints & requests
              </h3>
              <ShowcaseLink
                href="/contact?intent=complaint&source=society-portal-showcase"
                className="inline-flex w-fit cursor-pointer items-center gap-1 rounded-full border border-violet-500/40 px-4 py-2 text-xs font-semibold text-violet-800 transition hover:bg-violet-500/15"
              >
                New ticket · wizard mock
              </ShowcaseLink>
            </div>
            <div className="mt-4 space-y-3">
              {COMPLAINTS.map((c) => (
                <div key={c.id} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] text-dark-text-tertiary">{c.id}</span>
                      <p className="mt-1 font-medium text-dark-text-primary">{c.title}</p>
                      <p className="mt-1 text-xs text-dark-text-secondary">{c.raised}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${c.tone}`}>{c.status}</span>
                  </div>
                  <p className="mt-3 text-[11px] font-medium text-dark-text-tertiary">{c.sla}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notices */}
          <div id="notices">
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <Bell className="h-5 w-5 text-violet-400" aria-hidden />
              Notices & announcements
            </h3>
            <ul className="mt-4 space-y-3">
              {NOTICES.map((n) => (
                <li key={n.title} className="flex gap-4 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-4">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-violet-400/80" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {n.pinned ? (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                          Pinned
                        </span>
                      ) : null}
                      <span className="rounded-full border border-dark-border-secondary px-2 py-0.5 text-[10px] font-semibold text-dark-text-tertiary">
                        {n.tag}
                      </span>
                      <span className="text-[11px] text-dark-text-tertiary">{n.date}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-dark-text-primary">{n.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div id="events">
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <Calendar className="h-5 w-5 text-violet-400" aria-hidden />
              Events & celebrations
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {EVENTS.map((e) => (
                <article key={e.name} className={`rounded-xl border px-5 py-5 ${e.tone}`}>
                  <p className="font-semibold text-dark-text-primary">{e.name}</p>
                  <p className="mt-2 text-xs text-dark-text-secondary">{e.when}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-dark-text-tertiary">{e.loc}</p>
                  <span className="mt-4 inline-flex text-[11px] font-semibold text-violet-300">RSVP gated · mock</span>
                </article>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div id="emergency">
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <Phone className="h-5 w-5 text-violet-400" aria-hidden />
              Emergency contacts
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {EMERGENCY.map((e) => (
                <div key={e.role} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-4">
                  <p className="text-sm font-semibold text-dark-text-primary">{e.role}</p>
                  <p className="mt-2 font-mono text-xs text-violet-800">{e.ext}</p>
                  <ShowcaseAnchor href={`tel:${e.phone.replace(/\s/g, "")}`} className="mt-2 inline-flex text-xs font-medium text-dark-text-secondary hover:text-dark-text-primary">
                    {e.phone}
                  </ShowcaseAnchor>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div id="amenities">
            <h3 className="flex items-center gap-2 font-[var(--font-playfair)] text-xl text-dark-text-primary">
              <Building2 className="h-5 w-5 text-violet-400" aria-hidden />
              Amenities booking
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {AMENITIES.map((a) => (
                <div key={a.name} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-dark-text-primary">{a.name}</p>
                    <Home className="h-5 w-5 shrink-0 text-dark-text-tertiary opacity-60" aria-hidden />
                  </div>
                  <p className="mt-2 text-xs text-dark-text-secondary">{a.slots}</p>
                  <p className="mt-2 text-[11px] font-medium text-dark-text-tertiary">{a.fee}</p>
                  <button
                    type="button"
                    disabled
                    className={`mt-4 w-full cursor-not-allowed rounded-full py-2 text-xs font-semibold ${
                      a.bookable ? "bg-violet-600/40 text-white/70" : "border border-dark-border-secondary bg-dark-bg-secondary text-dark-text-tertiary"
                    }`}
                  >
                    {a.bookable ? "Request slot · showcase disabled" : "Waitlisted · showcase"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="rounded-xl border border-dark-border-primary bg-dark-bg-secondary/40 px-5 py-6 text-center">
            <p className="text-sm text-dark-text-secondary">
              Need this portal on your society domain?{" "}
              <ShowcaseLink href="/contact?intent=consultation&source=society-portal-showcase" className="font-semibold text-violet-400 hover:text-violet-300">
                Talk to Bitcraftly
              </ShowcaseLink>{" "}
              · <ShowcaseAnchor href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-dark-text-primary">{SUPPORT_EMAIL}</ShowcaseAnchor>
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-relaxed text-dark-text-tertiary">
              Entire interface is fictional · Harmony Heights RMS is a UI specimen only · metrics & tickets are placeholders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
