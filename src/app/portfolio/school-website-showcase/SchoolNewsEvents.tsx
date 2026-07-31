'use client';

import { ArrowRight } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { useSchoolDemo } from './SchoolDemoContext';
import { NEWS_ITEMS, UPCOMING_EVENTS } from './school-demo-data';
import { SchoolLazyImage } from './SchoolLazyImage';

export default function SchoolNewsEvents() {
  const { showToast } = useSchoolDemo();

  return (
    <section id="news-events" className={`${CONTAINER} scroll-mt-28 py-16`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="school-section-label">Stay Connected</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--school-navy)] sm:text-4xl">
          News & Events
        </h2>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--school-navy)]">Latest News</h3>
            <button
              type="button"
              onClick={() => showToast('All news · demo')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--school-orange)] hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <ul className="space-y-4">
            {NEWS_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => showToast(n.title)}
                  className="school-card-hover flex w-full gap-4 overflow-hidden rounded-2xl border school-border bg-white p-4 text-left shadow-sm"
                >
                  <SchoolLazyImage
                    src={n.image}
                    alt=""
                    wrapperClassName="h-20 w-24 shrink-0 rounded-xl"
                    className="h-full w-full object-cover"
                    fallbackSeed={n.id}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--school-orange)]">
                      {n.date}
                    </p>
                    <p className="mt-1 text-base font-bold leading-snug text-[var(--school-navy)]">
                      {n.title}
                    </p>
                    <p className="school-text-muted mt-1 line-clamp-2 text-sm">{n.snippet}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--school-navy)]">Upcoming Events</h3>
            <button
              type="button"
              onClick={() => showToast('Event calendar · demo')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--school-orange)] hover:underline"
            >
              Calendar <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          <ol className="relative space-y-0 border-l-2 border-[var(--school-orange)]/30 pl-8">
            {UPCOMING_EVENTS.map((e, i) => (
              <li key={e.id} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.35rem] top-1 flex h-10 w-10 flex-col items-center justify-center rounded-lg border-2 border-[var(--school-navy)] bg-white text-[var(--school-navy)] shadow-sm">
                  <span className="text-xs font-bold leading-none">{e.day}</span>
                  <span className="text-[7px] font-bold">{e.month}</span>
                </span>
                <button
                  type="button"
                  onClick={() => showToast(`${e.title} · ${e.time}`)}
                  className="school-card-hover w-full rounded-2xl border school-border bg-white p-4 text-left shadow-sm"
                >
                  <p className="font-bold text-[var(--school-navy)]">{e.title}</p>
                  <p className="school-text-muted mt-1 text-sm">{e.time}</p>
                  {i === 0 ? (
                    <span className="mt-2 inline-block rounded-full bg-[var(--school-accent-soft)] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[var(--school-orange)]">
                      Next up
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
