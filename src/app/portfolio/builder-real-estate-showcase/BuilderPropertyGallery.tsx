'use client';

import { useState } from 'react';

const FILTERS = ['All', 'Towers', 'Villas', 'Skyline'] as const;

const TILES: Record<(typeof FILTERS)[number], { label: string; tone: string }[]> = {
  All: [
    { label: 'Twilight towers · dusk', tone: 'from-violet-900/60 via-slate-900 to-slate-100' },
    { label: 'Marina villas · pool deck', tone: 'from-amber-900/40 via-violet-100 to-slate-100' },
    { label: 'Sky lounge · amenity deck', tone: 'from-indigo-900/50 via-purple-100 to-slate-100' },
    {
      label: 'Grand lobby · arrival court',
      tone: 'from-neutral-800 via-amber-950/50 to-slate-100',
    },
    { label: 'Landscape podium · gardens', tone: 'from-emerald-900/30 via-slate-900 to-slate-100' },
    {
      label: 'Penthouse terrace · city grid',
      tone: 'from-fuchsia-900/40 via-violet-100 to-slate-100',
    },
  ],
  Towers: [
    { label: 'Tower A · curtain wall', tone: 'from-violet-800/50 to-slate-100' },
    { label: 'Tower B · corner suites', tone: 'from-indigo-900/55 to-slate-100' },
    { label: 'Sky bridge · amenity link', tone: 'from-purple-900/45 to-slate-100' },
  ],
  Villas: [
    { label: 'Courtyard villa · Type V4', tone: 'from-amber-800/35 to-slate-100' },
    { label: 'Garden villa · private deck', tone: 'from-orange-900/30 to-slate-100' },
    { label: 'Lake-facing villa', tone: 'from-teal-900/25 to-slate-100' },
  ],
  Skyline: [
    { label: 'North vista · night grid', tone: 'from-slate-800 to-violet-950' },
    { label: 'Helipad · crown lighting', tone: 'from-zinc-900 to-amber-950/40' },
  ],
};

export default function BuilderPropertyGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              filter === f
                ? 'border-amber-400/50 bg-amber-500/15 text-amber-100'
                : 'border-dark-border-secondary bg-dark-bg-card text-dark-text-secondary hover:border-violet-500/35'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {TILES[filter].map((t) => (
          <button
            key={t.label}
            type="button"
            className={`group relative overflow-hidden rounded-xl border border-dark-border-primary bg-gradient-to-br text-left ring-1 ring-amber-500/5 transition hover:ring-amber-400/25 ${t.tone}`}
          >
            <span className="absolute inset-0 bg-white/80 transition group-hover:bg-white/70" />
            <span className="relative flex min-h-[140px] flex-col justify-end p-4 md:min-h-[160px]">
              <span className="text-[11px] font-medium text-white/90">{t.label}</span>
              <span className="text-[10px] text-white/45">Fictional render · gradient mock</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
