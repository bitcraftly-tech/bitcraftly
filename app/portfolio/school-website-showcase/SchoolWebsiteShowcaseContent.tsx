import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bus,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  MonitorPlay,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import { CONTAINER, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/constants";

const STATS = [
  { value: "28+", label: "Years of excellence" },
  { value: "4,800+", label: "Students enrolled" },
  { value: "140+", label: "Faculty members" },
  { value: "52", label: "National awards" },
] as const;

const FEATURES = [
  { title: "Experienced Faculty", desc: "Mentors with advanced credentials and classroom-tested pedagogy.", icon: Users },
  { title: "Smart Classes", desc: "Interactive panels, curated LMS modules, and blended learning flows.", icon: MonitorPlay },
  { title: "Sports Activities", desc: "Structured athletics, house leagues, and holistic fitness programs.", icon: Trophy },
  { title: "Secure Campus", desc: "Controlled access, CCTV coverage, and student safety protocols.", icon: Shield },
  { title: "Transport Facility", desc: "GPS-tracked routes with trained attendants across city zones.", icon: Bus },
] as const;

const PROGRAMS = [
  { name: "Foundation · Primary", grades: "Nursery – Grade V", tone: "from-violet-600/40 to-indigo-950/80" },
  { name: "Middle School", grades: "Grade VI – VIII", tone: "from-fuchsia-600/35 to-purple-950/80" },
  { name: "Senior Secondary", grades: "Grade IX – XII · CBSE", tone: "from-indigo-500/35 to-slate-950/90" },
  { name: "STEM & Innovation Lab", grades: "Robotics · Coding · Science fairs", tone: "from-emerald-600/30 to-violet-950/85" },
  { name: "Arts & Performing Arts", grades: "Music · Drama · Visual arts", tone: "from-rose-500/35 to-violet-950/85" },
  { name: "Leadership & Clubs", grades: "Debates · MUN · Community projects", tone: "from-amber-500/30 to-neutral-950/90" },
] as const;

const FACILITIES = [
  "Digital library & reading lounges",
  "Physics, Chemistry & Biology laboratories",
  "800-seat auditorium & AV studio",
  "Olympic-grade turf & indoor courts",
  "Counselling & wellness rooms",
  "STEM makerspace & 3D printing",
] as const;

const FACULTY = [
  { name: "Dr. Meera Khanna", role: "Principal · Academic Leadership", initials: "MK" },
  { name: "Arjun Desai", role: "Head of STEM · IIT Bombay", initials: "AD" },
  { name: "Sophie Laurent", role: "Director of Arts · Trinity Licentiate", initials: "SL" },
  { name: "Col. Vikram Rathore", role: "Sports Director · National Coach", initials: "VR" },
] as const;

const ACHIEVEMENTS = [
  { title: "National Science Olympiad · Gold cohort", year: "2025", detail: "12 students in top 1% nationally." },
  { title: "CBSE merit honors · Grade XII", year: "2025", detail: "94% first division · 38 distinctions." },
  { title: "Asia-Pacific Robotics · Finalist", year: "2024", detail: "Team Orion · autonomous rescue prototype." },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "The transition to smart classrooms gave our daughter confidence — she leads presentations now and actually enjoys STEM.",
    name: "Priya & Rahul Malhotra",
    role: "Parents · Grade VIII",
  },
  {
    quote:
      "Discipline without stiffness. Coaches and teachers collaborate — my son improved academically and on the field.",
    name: "Farhan Sheikh",
    role: "Parent · Grade XI",
  },
  {
    quote:
      "University counselling started early. Essays, SAT pathways, and scholarships were structured — not last-minute chaos.",
    name: "Ananya Bose",
    role: "Alumni · Class of 2025 · Ashoka University",
  },
] as const;

const ADMISSION_STEPS = [
  { step: "01", title: "Enquiry & campus tour", body: "Submit interest online or walk in — weekend tours available." },
  { step: "02", title: "Interaction & assessment", body: "Age-appropriate readiness conversation; transparent rubrics." },
  { step: "03", title: "Offer & documentation", body: "Seat confirmation with verified records and fee schedule." },
  { step: "04", title: "Orientation week", body: "Buddy program, uniform kit, and LMS onboarding for families." },
] as const;

const EVENTS = [
  { title: "Annual Innovation Expo", date: "March 14 · 2026", tag: "STEM", tone: "border-violet-500/40 bg-violet-500/10" },
  { title: "Inter-house athletics meet", date: "February 02 · 2026", tag: "Sports", tone: "border-fuchsia-500/35 bg-fuchsia-500/10" },
  { title: "Parent–teacher symposium", date: "January 18 · 2026", tag: "Community", tone: "border-indigo-500/35 bg-indigo-500/10" },
] as const;

const GALLERY = [
  "Science symposium",
  "Choir performance",
  "Robotics pit lane",
  "Football finals",
  "Art exhibition",
  "Kindergarten circle time",
] as const;

export default function SchoolWebsiteShowcaseContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-border-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.22),transparent_50%)]" />
        <div className={`${CONTAINER} relative grid gap-10 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20`}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-800/90">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden />
              UI showcase · fictional school
            </div>
            <h1 className="mt-6 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Shaping Future Leaders
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-text-secondary sm:text-lg">
              Smart education blends rigorous academics with digital-first classrooms — empowering learners with curiosity,
              collaboration, and character for a connected world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ShowcaseAnchor
                href="#admissions"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_14px_44px_-14px_rgba(124,58,237,0.65)] transition hover:brightness-110"
              >
                Admission Open
              </ShowcaseAnchor>
              <ShowcaseAnchor
                href="#campus"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dark-border-secondary bg-dark-bg-card px-6 py-2.5 text-sm font-semibold text-dark-text-primary transition hover:border-violet-500/45 hover:bg-dark-bg-secondary"
              >
                Explore Campus
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ShowcaseAnchor>
            </div>
          </div>

          <div id="campus" className="scroll-mt-28">
            <div className="relative overflow-hidden rounded-2xl border border-dark-border-secondary bg-gradient-to-br from-violet-50/50 via-dark-bg-card to-[#0b0714] shadow-[0_40px_90px_-40px_rgba(91,33,182,0.45)]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')]" />
              <div className="relative aspect-[4/3] p-6 sm:p-8 lg:p-10">
                <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/85">Smart campus</p>
                      <p className="mt-1 font-[var(--font-playfair)] text-xl font-semibold text-white">Green Valley Academy</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
                      Live sessions
                    </span>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="aspect-[4/5] rounded-lg bg-gradient-to-br from-white/15 via-violet-400/10 to-transparent ring-1 ring-white/10"
                      >
                        <div className="flex h-full flex-col justify-end p-2">
                          <div className="h-1 w-full rounded-full bg-white/20">
                            <div className="h-full w-[70%] rounded-full bg-violet-400/90" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[11px] leading-relaxed text-white/55">
                    Stylized classroom hero · fictional institution · no stock photography — gradient composition only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-dark-border-primary bg-dark-bg-secondary/35 py-10">
        <div className={`${CONTAINER}`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-[var(--font-playfair)] text-3xl font-semibold text-dark-text-primary sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-dark-text-tertiary">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Why families choose us</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Holistic excellence</h2>
          <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
            Premium school portals balance credibility with warmth — these pillars mirror how we structure education sites for
            clients.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 transition hover:border-violet-500/35"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-dark-text-primary">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">About school</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Learning rooted in values</h2>
            <p className="mt-5 text-sm leading-relaxed text-dark-text-secondary">
              Green Valley Academy is a fictional showcase campus — representing how we design admissions storytelling,
              leadership bios, and outcome metrics for real schools. Narratives stay authentic; layouts stay crisp on mobile.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-dark-text-secondary">
              <li className="flex gap-2">
                <span className="mt-1 text-emerald-400">✓</span>
                Values-forward curriculum mapped to national frameworks.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald-400">✓</span>
                Data-informed parent dashboards & weekly digests.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald-400">✓</span>
                Inclusion office · remedial support · counselling lattice.
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
              <GraduationCap className="h-8 w-8 text-violet-400" aria-hidden />
              <p className="mt-4 font-[var(--font-playfair)] text-2xl font-semibold text-dark-text-primary">CBSE aligned</p>
              <p className="mt-2 text-xs text-dark-text-tertiary">Predictable progression · transparent grading rubrics.</p>
            </div>
            <div className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6 sm:mt-8">
              <BookOpen className="h-8 w-8 text-fuchsia-400" aria-hidden />
              <p className="mt-4 font-[var(--font-playfair)] text-2xl font-semibold text-dark-text-primary">Reading culture</p>
              <p className="mt-2 text-xs text-dark-text-tertiary">Lexile-tracked programs · author immersions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Programs / courses</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Pathways for every learner</h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">Dense grids like this scale cleanly with CSS Grid — mobile stacks first.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <div
              key={p.name}
              className={`overflow-hidden rounded-xl border border-dark-border-primary bg-gradient-to-br shadow-lg ${p.tone} ring-1 ring-white/5`}
            >
              <div className="border-t border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm">
                <p className="font-semibold text-white">{p.name}</p>
                <p className="mt-2 text-xs text-white/70">{p.grades}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities + Smart classrooms */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/20 py-14 md:py-16">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Facilities</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary">Infrastructure that supports ambition</h2>
            <ul className="mt-8 space-y-3">
              {FACILITIES.map((line) => (
                <li key={line} className="flex items-start gap-3 rounded-lg border border-dark-border-primary bg-dark-bg-card px-4 py-3 text-sm text-dark-text-secondary">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Smart classrooms</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary">Connected teaching floors</h2>
            <div className="mt-8 space-y-4 rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
              <div className="flex gap-4">
                <MonitorPlay className="h-10 w-10 shrink-0 text-violet-400" aria-hidden />
                <div>
                  <p className="font-semibold text-dark-text-primary">Interactive panels & capture</p>
                  <p className="mt-1 text-xs leading-relaxed text-dark-text-secondary">
                    Lesson archives for revision · absentee catch-up playlists · parent visibility toggles.
                  </p>
                </div>
              </div>
              <div className="h-px bg-dark-border-primary" />
              <div className="flex gap-4">
                <BookOpen className="h-10 w-10 shrink-0 text-indigo-400" aria-hidden />
                <div>
                  <p className="font-semibold text-dark-text-primary">LMS & formative analytics</p>
                  <p className="mt-1 text-xs leading-relaxed text-dark-text-secondary">
                    Weekly mastery snapshots · intervention alerts · competency tagging per unit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Faculty</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Leaders who teach</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY.map((f) => (
            <div key={f.name} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-600/30 text-sm font-bold text-white">
                {f.initials}
              </div>
              <p className="mt-4 text-sm font-semibold text-dark-text-primary">{f.name}</p>
              <p className="mt-1 text-[11px] text-dark-text-tertiary">{f.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Student achievements</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Outcomes that travel</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6">
                <div className="flex items-center gap-2 text-violet-400">
                  <Award className="h-5 w-5" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-wide">{a.year}</span>
                </div>
                <p className="mt-4 text-sm font-semibold text-dark-text-primary">{a.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">School calendar</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Upcoming highlights</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {EVENTS.map((e) => (
            <div key={e.title} className={`rounded-xl border px-5 py-5 ${e.tone}`}>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-violet-800">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {e.tag}
              </div>
              <p className="mt-3 font-[var(--font-playfair)] text-lg font-semibold text-dark-text-primary">{e.title}</p>
              <p className="mt-2 text-xs text-dark-text-secondary">{e.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/20 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Testimonials</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Voices from our community</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6"
              >
                <Quote className="h-6 w-6 text-violet-500/60" aria-hidden />
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

      {/* Gallery */}
      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Gallery preview</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Campus in motion</h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">Masonry-style rhythm without heavy assets — gradients + captions.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {GALLERY.map((label, i) => (
            <div
              key={label}
              className={`overflow-hidden rounded-xl border border-dark-border-primary bg-gradient-to-br ${
                i % 3 === 0
                  ? "from-violet-600/30 to-slate-950 row-span-1 aspect-[4/3] md:aspect-auto md:row-span-2 md:min-h-[220px]"
                  : i % 3 === 1
                    ? "from-fuchsia-600/25 to-indigo-950 aspect-square"
                    : "from-indigo-600/25 to-neutral-950 aspect-[4/3]"
              }`}
            >
              <div className="flex h-full min-h-[120px] flex-col justify-end bg-black/30 p-4">
                <p className="text-xs font-medium text-white/90">{label}</p>
                <p className="text-[10px] text-white/50">Fictional caption</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admission */}
      <section id="admissions" className="scroll-mt-28 border-y border-dark-border-primary bg-dark-bg-secondary/25 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Admission process</p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-dark-text-primary sm:text-4xl">Transparent · predictable</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {ADMISSION_STEPS.map((s) => (
              <div key={s.step} className="relative rounded-xl border border-dark-border-primary bg-dark-bg-card p-5">
                <span className="font-[var(--font-playfair)] text-3xl font-semibold text-violet-400/80">{s.step}</span>
                <p className="mt-3 text-sm font-semibold text-dark-text-primary">{s.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${CONTAINER} py-14 md:pb-20`}>
        <div className="overflow-hidden rounded-2xl border border-dark-border-primary bg-dark-bg-card">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-dark-border-primary p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Contact</p>
              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">Visit admissions</h2>
              <p className="mt-4 text-sm leading-relaxed text-dark-text-secondary">
                Showcase contact strip — your live school site would wire maps, slots, and CRM handoffs here.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-dark-text-secondary">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-violet-400" aria-hidden />
                  <span>Knowledge Park, Sector 4 · Near downtown corridor · fictional address</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-violet-400" aria-hidden />
                  <ShowcaseAnchor href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-dark-text-primary">
                    {SUPPORT_PHONE_DISPLAY}
                  </ShowcaseAnchor>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-violet-400" aria-hidden />
                  <ShowcaseAnchor href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-dark-text-primary">
                    {SUPPORT_EMAIL}
                  </ShowcaseAnchor>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center bg-gradient-to-br from-violet-50/60 via-[#120818] to-dark-bg-primary p-8 lg:p-10">
              <p className="text-sm font-medium text-dark-text-secondary">Office hours</p>
              <p className="mt-2 text-lg font-semibold text-dark-text-primary">Mon – Sat · 9:00 AM – 5:00 PM IST</p>
              <p className="mt-4 text-xs leading-relaxed text-dark-text-tertiary">
                Want this experience on your domain? Bitcraftly ships bespoke school & institute websites with admissions UX,
                multilingual content, and secure forms.
              </p>
              <ShowcaseLink
                href="/contact?intent=consultation&source=school-showcase"
                className="mt-8 inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-950 transition hover:bg-violet-50"
              >
                Talk to Bitcraftly
              </ShowcaseLink>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-dark-text-tertiary">
          This page is a fictional education-portal UI specimen for Bitcraftly — not an operating school. Names, stats, and events
          are illustrative only.
        </p>
      </section>
    </>
  );
}
