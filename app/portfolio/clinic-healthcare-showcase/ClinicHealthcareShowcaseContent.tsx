import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  Activity,
  Ambulance,
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  FileText,
  HeartPulse,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";

import { CONTAINER, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

import ClinicAppointmentForm from "./ClinicAppointmentForm";

const FEATURES = [
  { title: "Expert doctors", desc: "Multi-specialty consultants with verified credentials & continuity-of-care lanes.", icon: Stethoscope },
  { title: "24×7 support", desc: "Triage desk · prescription refill desk · bilingual coordinators.", icon: Clock },
  { title: "Online reports", desc: "Secure portal PDFs · HL7-friendly export hooks on production stacks.", icon: FileText },
  { title: "Advanced equipment", desc: "Digital imaging suites calibrated to audit-ready maintenance logs.", icon: Activity },
  { title: "Emergency care", desc: "Rapid response bay · ambulance coordination · vitals telemetry handoff.", icon: Ambulance },
] as const;

const DOCTORS = [
  { name: "Dr. Ananya Mehta", spec: "Consultant physician · MBBS, MD", exp: "14 yrs · metabolic & preventive care", initials: "AM", tone: "from-teal-600/35 to-violet-950/80" },
  { name: "Dr. Rohan Kapadia", spec: "Pediatrician · NICU fellowship", exp: "11 yrs · vaccination & growth programs", initials: "RK", tone: "from-cyan-600/30 to-slate-950/90" },
  { name: "Dr. Vikram Salvi", spec: "Orthopedic surgeon · sports injuries", exp: "17 yrs · arthroscopy & rehab pathways", initials: "VS", tone: "from-violet-600/35 to-teal-950/70" },
  { name: "Dr. Sarah Fernandes", spec: "Dermatology · aesthetic dermatology", exp: "9 yrs · patch testing & laser protocols", initials: "SF", tone: "from-emerald-600/25 to-violet-950/85" },
] as const;

const SERVICES = [
  { name: "Outpatient consultations", detail: "Same-week slots · chronic disease ladders · referral letters digitized.", tone: "border-teal-500/30 bg-teal-500/8" },
  { name: "Diagnostics & imaging", detail: "MRI · CT · ultrasound · rapid-result labs with courier integration.", tone: "border-cyan-500/28 bg-cyan-500/8" },
  { name: "Physiotherapy & rehab", detail: "Post-op protocols · ergonomic assessments · home exercise QR kits.", tone: "border-violet-500/30 bg-violet-500/8" },
  { name: "Preventive health checks", detail: "Executive panels · women's health · cardiometabolic bundles.", tone: "border-indigo-500/28 bg-indigo-500/8" },
] as const;

const EMERGENCY = [
  { title: "Critical care bay", body: "Crash cart drills logged · ACLS roster always staffed.", icon: HeartPulse },
  { title: "Ambulance tie-ups", body: "GPS-linked fleet · bed confirmation handshake before dispatch.", icon: Ambulance },
  { title: "Poison / allergy pathway", body: "Antidote inventory audits · epinephrine stations mapped floor-wise.", icon: Shield },
] as const;

const ONLINE = [
  "Encrypted video rooms · consent capture before join.",
  "E-prescriptions synced to partner pharmacies · QR redemption.",
  "Queue transparency · estimated doctor-on-call minute ticker.",
  "Device checks · bandwidth fallback to audio-first mode.",
] as const;

const FACILITIES = [
  "Sterile OT suites · modular HVAC monitoring dashboards.",
  "Isolation rooms · negative pressure readiness drills.",
  "Pharmacy cold chain · batch traceability QR at dispense.",
  "Staff wellness lounge · fatigue sensing shift swaps (demo claim).",
  "Patient-family quiet pods · interpreter tablets on demand.",
  "Parking · wheelchair ramps · lift priority during peak OPD.",
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Reports landed in my vault before I reached the parking — neat summaries, not PDF chaos. Staff tone stayed calm during a fever spike weekend.",
    name: "Neha Talwar",
    role: "Patient · preventive panel",
  },
  {
    quote:
      "Post ACL surgery rehab felt coordinated — ortho and physio notes actually referenced each other instead of duplicate scans.",
    name: "Aditya Menon",
    role: "Athlete · sports ortho pathway",
  },
  {
    quote:
      "Teleconsult for my parents in tier-2 city worked better than expected — pharmacist followed up on taper schedule proactively.",
    name: "Ishita Rao",
    role: "Family caregiver · online consult",
  },
] as const;

export default function ClinicHealthcareShowcaseContent() {
  return (
    <>
      {/* Hero — darker premium band */}
      <section className="relative overflow-hidden border-b border-dark-border-primary bg-gradient-to-b from-[#050a0c] via-dark-bg-primary to-dark-bg-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(45,212,191,0.14),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_80%,rgba(139,92,246,0.12),transparent_45%)]" />
        <div className={`${CONTAINER} relative grid gap-10 py-14 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14 lg:py-20`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/35 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-100">
              <Sparkles className="h-3.5 w-3.5 text-teal-300" aria-hidden />
              UI showcase · fictional clinic
            </span>
            <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.2rem] lg:leading-[1.06]">
              Your Health,
              <span className="block bg-gradient-to-r from-teal-200 via-white to-violet-200 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-text-secondary">
              Harmonia Polyclinic is a trust-forward healthcare landing specimen — appointments, departments, and emergency posture
              framed for clarity on every screen size.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ShowcaseAnchor
                href="#appointment"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:brightness-110"
              >
                Book appointment
              </ShowcaseAnchor>
              <ShowcaseAnchor
                href="#services"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dark-border-secondary bg-dark-bg-card px-6 py-2.5 text-sm font-semibold text-dark-text-primary transition hover:border-violet-500/40"
              >
                Our services
                <ArrowRight className="h-4 w-4 text-violet-400" aria-hidden />
              </ShowcaseAnchor>
            </div>
          </div>

          {/* Hero visual — doctor/clinic composition (gradient-only) */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-teal-500/25 bg-gradient-to-br from-teal-950/60 via-[#0c1218] to-violet-950/50 shadow-[0_40px_90px_-45px_rgba(45,212,191,0.35)] ring-1 ring-white/10">
              <div className="relative aspect-[5/4] p-6 sm:p-8 lg:aspect-[16/11]">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22 fill=%22rgba(255,255,255,0.06)%22/%3E%3C/svg%3E')] opacity-40" />
                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-black/30 p-5 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200/90">Care team online</p>
                      <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-white">Harmonia Polyclinic</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-100">OPD today · 42 slots</span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-white/12 via-teal-400/10 to-violet-500/15 ring-1 ring-white/10">
                        <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
                          <Stethoscope className={`h-8 w-8 ${i === 0 ? "text-teal-300" : i === 1 ? "text-violet-300" : "text-cyan-300"}`} aria-hidden />
                          <span className="text-[9px] font-medium uppercase tracking-wide text-white/45">Consult</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[10px] leading-relaxed text-white/40">
                    Stylized clinical hero · illustrative gradients only · no patient photography
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip — slightly lifted “light” panel on dark */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/45 py-12 md:py-14">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 shadow-sm transition hover:border-teal-500/30 hover:shadow-[0_18px_46px_-38px_rgba(45,212,191,0.35)]"
              >
                <Icon className="h-5 w-5 text-teal-400" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-dark-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Doctors team</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Physicians you stay with</h2>
          <p className="mt-4 text-sm text-dark-text-secondary">Credential-forward cards · continuity messaging common on premium clinic sites.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d) => (
            <article key={d.name} className={`overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br ring-1 ring-white/5 ${d.tone}`}>
              <div className="border-t border-slate-200/80 bg-white/85 p-6 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white ring-2 ring-teal-400/40">
                  {d.initials}
                </div>
                <p className="mt-4 text-center font-semibold text-white">{d.name}</p>
                <p className="mt-2 text-center text-[11px] text-teal-100/90">{d.spec}</p>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-white/65">{d.exp}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-primary py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-400/90">Healthcare services</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Care pathways</h2>
            </div>
            <p className="max-w-md text-sm text-dark-text-secondary">Service tiles mirror how we scope specialty clusters on client builds.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s) => (
              <div key={s.name} className={`rounded-xl border px-6 py-6 ${s.tone}`}>
                <p className="font-[var(--font-playfair)] text-lg font-semibold text-dark-text-primary">{s.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-dark-text-secondary">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/35 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-300/80">Emergency care</p>
              <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">When minutes matter</h2>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                High-trust emergency bands stay visually distinct — calm typography, high-contrast CTAs, and redundancy on phone entry points.
              </p>
              <ShowcaseAnchor
                href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-500/35 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:bg-red-500/15"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Emergency line · {SUPPORT_PHONE_DISPLAY}
              </ShowcaseAnchor>
            </div>
            <div className="space-y-4">
              {EMERGENCY.map(({ title, body, icon: Icon }) => (
                <div key={title} className="flex gap-4 rounded-xl border border-dark-border-primary bg-dark-bg-card p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-500/12 text-red-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-dark-text-primary">{title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Online consultation — hybrid lighter card */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="overflow-hidden rounded-2xl border border-dark-border-primary bg-gradient-to-br from-dark-bg-card via-dark-bg-secondary/40 to-teal-950/15">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-dark-border-primary p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">
                <Video className="h-4 w-4" aria-hidden />
                Online consultation
              </div>
              <h3 className="mt-3 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">Telehealth without friction</h3>
              <ul className="mt-6 space-y-3 text-sm text-dark-text-secondary">
                {ONLINE.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-teal-400">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center bg-black/20 p-8 lg:p-10">
              <div className="rounded-xl border border-slate-200/80 bg-white/[0.04] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-dark-text-tertiary">Next available</p>
                <p className="mt-2 font-[var(--font-playfair)] text-xl font-semibold text-dark-text-primary">Dr. Mehta · video · 18 min</p>
                <p className="mt-2 text-xs text-dark-text-secondary">Queue token HP‑VID‑908 · fictional scheduling widget.</p>
              </div>
              <ShowcaseLink
                href="/contact?intent=telehealth&source=clinic-healthcare-showcase"
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Start video consult · mock
              </ShowcaseLink>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-400/90">Clinic facilities</p>
              <h3 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Infrastructure patients feel</h3>
            </div>
            <Building2 className="hidden h-10 w-10 text-dark-text-tertiary opacity-40 md:block" aria-hidden />
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2">
            {FACILITIES.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Testimonials</p>
          <h3 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Trusted experiences</h3>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
              <p className="text-sm leading-relaxed text-dark-text-secondary">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 border-t border-dark-border-primary pt-4">
                <p className="text-sm font-semibold text-dark-text-primary">{t.name}</p>
                <p className="text-xs text-dark-text-tertiary">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Appointment */}
      <section id="appointment" className="scroll-mt-28 border-t border-dark-border-primary bg-dark-bg-secondary/35 py-14 md:pb-20">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-teal-400/90">
                <Calendar className="h-4 w-4" aria-hidden />
                Appointment form
              </div>
              <h3 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Book a slot</h3>
              <p className="mx-auto mt-4 max-w-xl text-sm text-dark-text-secondary">
                Structured capture pattern — departments, preferred dates, and triage notes feeding CRM or HIS connectors on live deployments.
              </p>
            </div>
            <div className="mt-10 rounded-2xl border border-dark-border-primary bg-dark-bg-card p-6 md:p-8">
              <ClinicAppointmentForm />
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-dark-border-primary pt-8 text-center text-sm text-dark-text-secondary">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-400" aria-hidden />
                  Front desk · {SUPPORT_PHONE_DISPLAY}
                </span>
                <span className="hidden text-dark-text-tertiary sm:inline">·</span>
                <ShowcaseAnchor href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-dark-text-primary">
                  {SUPPORT_EMAIL}
                </ShowcaseAnchor>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
              Harmonia Polyclinic is fictional · metrics & doctor bios are illustrative · UI specimen by Bitcraftly only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
