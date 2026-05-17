"use client";

import ShowcaseAnchor from "@/components/portfolio/ShowcaseAnchor";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import { useState } from "react";
import {
  Grid3x3,
  Layers,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

import { CONTAINER } from "@/lib/constants";

function GitHubMarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const HIGHLIGHTS = ["Seamless Streaming", "Custom Controls", "Responsive Design", "Component Based Architecture"] as const;

const TRENDING = [
  { title: "Neon Meridian", meta: "Original · 4K HDR", gradient: "from-violet-600 via-purple-700 to-indigo-950" },
  { title: "Glass Harbour", meta: "Thriller · 2026", gradient: "from-fuchsia-600 via-purple-800 to-slate-950" },
  { title: "Quiet Signals", meta: "Limited series", gradient: "from-indigo-500 via-violet-700 to-zinc-950" },
  { title: "Solar Drift", meta: "Sci‑Fi", gradient: "from-amber-500/90 via-orange-700 to-purple-950" },
  { title: "Velvet Circuit", meta: "Crime drama", gradient: "from-rose-600 via-purple-800 to-neutral-950" },
  { title: "Echo Basin", meta: "Documentary", gradient: "from-teal-600 via-blue-800 to-violet-950" },
] as const;

const CONTINUE = [
  { title: "Crimson Line · Ep 4", pct: 72, gradient: "from-red-900/80 via-purple-900 to-slate-100" },
  { title: "Midtown Nights · Ep 2", pct: 38, gradient: "from-slate-700 via-violet-900 to-slate-100" },
  { title: "Atlas Rising · 58%", pct: 58, gradient: "from-blue-900/70 via-indigo-900 to-slate-100" },
] as const;

const TECH = [
  {
    name: "React.js",
    blurb: "Composable UI, hooks, playback orchestration.",
    initials: "Re",
    cardClass: "border-violet-500/35 bg-gradient-to-br from-[#61dafb]/12 to-violet-600/10",
    badgeClass: "border-violet-400/40 bg-gradient-to-br from-[#61dafb]/35 to-violet-600/40",
  },
  {
    name: "HLS.js",
    blurb: "Adaptive bitrate streams without fragile hacks.",
    initials: "HLS",
    cardClass: "border-orange-400/30 bg-gradient-to-br from-orange-500/12 to-violet-600/8",
    badgeClass: "border-orange-400/35 bg-gradient-to-br from-orange-400/30 to-violet-700/25",
  },
  {
    name: "Video.js",
    blurb: "Battle-tested primitives beneath custom chrome.",
    initials: "V.js",
    cardClass: "border-emerald-400/30 bg-gradient-to-br from-emerald-500/12 to-violet-600/8",
    badgeClass: "border-emerald-400/35 bg-gradient-to-br from-emerald-400/25 to-indigo-800/30",
  },
  {
    name: "CSS Grid",
    blurb: "Layouts that scale from hero to dense galleries.",
    initials: "Grid",
    cardClass: "border-pink-400/25 bg-gradient-to-br from-pink-500/10 to-indigo-600/10",
    badgeClass: "border-pink-400/35 bg-gradient-to-br from-pink-500/25 to-indigo-700/35",
  },
  {
    name: "SCSS",
    blurb: "Tokens, mixins, and maintainable theme layers.",
    initials: "SCSS",
    cardClass: "border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 to-purple-700/12",
    badgeClass: "border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/28 to-purple-800/35",
  },
] as const;

const FEATURES = [
  {
    title: "Adaptive streaming UX",
    body: "Startup logic, quality ladders, and graceful fallbacks tuned for real-world networks.",
  },
  {
    title: "Design-system controls",
    body: "Keyboard-friendly transport bar, focus rings, and WCAG-minded contrast on dark canvases.",
  },
  {
    title: "Shelf-ready modules",
    body: "Continue watching, trending rails, and editorial grids composed from shared primitives.",
  },
] as const;

function Poster({ title, meta, gradient }: { title: string; meta: string; gradient: string }) {
  return (
    <div className="group cursor-default overflow-hidden rounded-lg border border-dark-border-primary bg-dark-bg-secondary shadow-lg transition hover:border-violet-500/45 hover:shadow-violet-500/10">
      <div className={`relative aspect-[2/3] bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">{meta}</p>
          <p className="mt-0.5 font-[var(--font-playfair)] text-sm font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}

function OttPreviewMock() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const progress = 47;

  return (
    <div
      id="demo-preview"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-dark-border-secondary bg-[#07070c] shadow-[0_40px_120px_-40px_rgba(124,58,237,0.35)]"
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
        <span className="ml-2 text-[10px] font-medium tracking-wide text-white/35">stream.bitstudio.preview — fictional UI</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
        <div className="relative min-h-[220px] bg-gradient-to-br from-violet-50 via-[#0c0718] to-slate-100 sm:min-h-[280px] lg:min-h-[340px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(167,139,250,0.28),transparent_55%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/%3E%3C/svg%3E')] opacity-40" />

          <div className="relative flex h-full flex-col justify-end p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">Featured · Original preview</p>
              <h3 className="font-[var(--font-playfair)] text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Neon Meridian
              </h3>
              <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
                Fictional title · Demonstrates layered gradients, typography hierarchy, and in-player branding zones —
                no third‑party artwork.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200/80 bg-white/90 p-3 backdrop-blur-md sm:p-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 hover:bg-violet-100"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current pl-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/85 transition hover:bg-white/10"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-medium tabular-nums text-white/55">
                    <span>12:06</span>
                    <span>46:12</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="border-t border-white/5 bg-[#0b0b12] lg:border-l lg:border-t-0">
          <div className="border-b border-white/5 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/85">Continue watching</p>
          </div>
          <div className="space-y-3 p-3">
            {CONTINUE.map((row) => (
              <div key={row.title} className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.03]">
                <div className={`relative aspect-video bg-gradient-to-br ${row.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white/35" strokeWidth={1.25} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/88">
                    <div className="h-full bg-violet-400/90" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
                <p className="px-2 py-2 text-[11px] font-medium leading-snug text-white/80">{row.title}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="border-t border-white/5 px-4 py-3">
        <p className="text-[10px] text-white/35">
          Mock player only · Posters and titles are fictional showcase assets · Not affiliated with any streaming brand.
        </p>
      </div>
    </div>
  );
}

export default function ReactVideoDemoContent() {
  return (
    <>
      <section className={`${CONTAINER} py-12 md:py-16 lg:py-20`}>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-800/90">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden />
              Portfolio demo
            </div>
            <h1 className="mt-5 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-dark-text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              React Video Portfolio Demo
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-text-secondary sm:text-lg">
              Production-grade streaming shell mock —{" "}
              <span className="font-medium text-dark-text-primary">React.js</span>,{" "}
              <span className="font-medium text-dark-text-primary">HLS.js</span>,{" "}
              <span className="font-medium text-dark-text-primary">Video.js</span>, and{" "}
              <span className="font-medium text-dark-text-primary">CSS Grid</span> — structured like a real product
              engineering deliverable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ShowcaseAnchor
                href="#demo-preview"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_rgba(124,58,237,0.65)] transition hover:brightness-110"
              >
                Live Demo
              </ShowcaseAnchor>
              <ShowcaseAnchor
                href="https://github.com/bitcraftly-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dark-border-secondary bg-dark-bg-card px-6 py-2.5 text-sm font-semibold text-dark-text-primary transition hover:border-violet-500/45 hover:bg-dark-bg-secondary"
              >
                <GitHubMarkIcon className="h-4 w-4" aria-hidden />
                View on GitHub
              </ShowcaseAnchor>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {HIGHLIGHTS.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-dark-border-secondary bg-dark-bg-secondary/80 px-3 py-1.5 text-[11px] font-medium text-dark-text-secondary"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-dark-border-primary bg-gradient-to-br from-violet-50/40 via-dark-bg-card to-dark-bg-secondary p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="rounded-[15px] border border-white/5 bg-dark-bg-primary/80 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/80">Snapshot</p>
              <p className="mt-3 text-sm leading-relaxed text-dark-text-secondary">
                Rails, hero spotlight, and sidebar recall patterns common to premium OTT surfaces — implemented as a lean
                React surface so motion, accessibility, and layout stay maintainable.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {TRENDING.slice(0, 3).map((m) => (
                  <div key={m.title} className="overflow-hidden rounded-md border border-slate-200/80">
                    <div className={`aspect-[3/4] bg-gradient-to-br ${m.gradient}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className={`${CONTAINER} scroll-mt-28 pb-14 md:pb-16`}>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Main preview</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
              OTT-style streaming UI
            </h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Custom chrome over familiar metaphors — transport controls, progress scrubbing lane, and editorial rails.
          </p>
        </div>
        <OttPreviewMock />
      </section>

      <section className="border-y border-dark-border-primary bg-dark-bg-secondary/40 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Trending now</p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
                Editorial grids
              </h2>
            </div>
            <p className="max-w-md text-sm text-dark-text-secondary">Fictional originals — gradient-only art direction.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {TRENDING.map((m) => (
              <Poster key={m.title} {...m} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Continue watching</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
              Session-aware shelves
            </h2>
          </div>
          <p className="max-w-md text-sm text-dark-text-secondary">
            Row composition mirrors resume UX — progress chrome without noisy chrome.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CONTINUE.map((row) => (
            <div
              key={row.title}
              className="overflow-hidden rounded-xl border border-dark-border-primary bg-dark-bg-card shadow-[0_20px_50px_-28px_rgba(0,0,0,0.75)]"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${row.gradient}`}>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),transparent)]" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-violet-400" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-dark-text-primary">{row.title}</p>
                <p className="mt-1 text-xs text-dark-text-tertiary">Resume playback strip · fictional titles</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-dark-border-primary bg-dark-bg-secondary/30 py-14 md:py-16">
        <div className={`${CONTAINER}`}>
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Tech stack</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
              Built like a shipping frontend
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dark-text-secondary">
              Cards mirror how we talk about real engagements — integration boundaries, layout discipline, and theming.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TECH.map((t, i) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-xl border bg-dark-bg-card p-4 shadow-sm ${t.cardClass}`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border text-[10px] font-bold tracking-tight text-white shadow-inner ${t.badgeClass}`}
                >
                  {t.initials}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-violet-400/80" aria-hidden />
                  <p className="text-sm font-semibold text-dark-text-primary">{t.name}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-dark-text-secondary">{t.blurb}</p>
                {i === 3 ? (
                  <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-dark-text-tertiary">
                    <Grid3x3 className="h-3 w-3" aria-hidden />
                    Layout engine
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-14 md:py-16`}>
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">Key features</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
            Why teams mirror this pattern
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-dark-border-primary bg-dark-bg-card p-6 transition hover:border-violet-500/35"
            >
              <h3 className="text-base font-semibold text-dark-text-primary">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-text-secondary">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${CONTAINER} pb-14 md:pb-20`}>
        <div className="rounded-2xl border border-dark-border-primary bg-dark-bg-card p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400/90">About this project</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-dark-text-primary sm:text-3xl">
            Fictional showcase — real engineering posture
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-dark-text-secondary md:text-base">
            This page is a UI specimen for Bitcraftly visitors: it demonstrates how we structure dense media layouts,
            streaming-adjacent UX, and branded dark interfaces without relying on third‑party key art. Stack labels reflect
            typical tooling we compose on client engagements — React for UI, HLS where manifests matter, Video.js when we
            want proven player primitives, CSS Grid for responsive rails, and SCSS when tokenized themes need to scale.
          </p>
        </div>
      </section>

      <section id="plans" className={`${CONTAINER} scroll-mt-28 pb-16 md:pb-24`}>
        <div className="relative overflow-hidden rounded-2xl border border-violet-300 bg-gradient-to-r from-violet-100 via-fuchsia-50 to-indigo-100 px-8 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl">Want Similar Solution?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-violet-100/80">
                Share playback goals, audience devices, and release milestones — we&apos;ll map architecture and UI debt before a
                single sprint burns.
              </p>
            </div>
            <ShowcaseLink
              href="/contact?intent=consultation&source=react-video-demo"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-violet-950 shadow-lg transition hover:bg-violet-50"
            >
              Talk to Bitcraftly
            </ShowcaseLink>
          </div>
        </div>
      </section>
    </>
  );
}
