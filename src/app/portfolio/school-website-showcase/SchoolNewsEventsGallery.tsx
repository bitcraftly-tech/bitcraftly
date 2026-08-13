'use client';

import { CONTAINER } from '@/lib/constants';

import { schoolCardClickProps } from './school-clickable';
import { useSchoolDemo } from './SchoolDemoContext';
import { GALLERY, NEWS_ITEMS, UPCOMING_EVENTS } from './school-demo-data';
import { SchoolLazyImage } from './SchoolLazyImage';

export default function SchoolNewsEventsGallery() {
  const { setGalleryIndex, setLightbox, setModalType, showToast, scrollToSection } =
    useSchoolDemo();

  return (
    <section
      id="news-events"
      className="school-section-band scroll-mt-28 border-y school-border py-16 lg:py-20"
    >
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="school-section-label">Stay connected</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--school-navy)]">
            News, Events &amp; Campus Moments
          </h2>
          <p className="school-text-muted mt-3 text-sm leading-relaxed">
            Circulars, calendar highlights and a glimpse of life on campus — updated for parents and
            visitors.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="school-hub-panel">
            <div className="school-hub-panel__head">
              <h3 className="text-base font-bold text-[var(--school-navy)]">
                Latest News &amp; Updates
              </h3>
              <button
                type="button"
                onClick={() => setModalType('circular')}
                className="shrink-0 text-xs font-semibold text-[var(--school-orange)] hover:underline"
              >
                View All
              </button>
            </div>
            <ul className="space-y-3">
              {NEWS_ITEMS.map((n) => (
                <li key={n.id}>
                  <div
                    {...schoolCardClickProps(() =>
                      setLightbox({ src: n.image, title: n.title, alt: n.title }),
                    )}
                    className="group flex w-full cursor-pointer gap-3 rounded-xl border school-border bg-[var(--school-surface)] p-3 text-left transition hover:border-[var(--school-orange)]/40 hover:bg-white hover:shadow-md"
                  >
                    <div className="school-media h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <div className="school-media__visual h-full">
                        <SchoolLazyImage
                          src={n.image}
                          alt=""
                          wrapperClassName="h-full w-full"
                          className="h-full w-full object-cover"
                          fallbackSeed={n.id}
                          eager
                        />
                      </div>
                    </div>
                    <span className="block min-w-0">
                      <span className="block text-[10px] font-medium uppercase tracking-wide text-[var(--school-muted)]">
                        {n.date}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold leading-snug text-[var(--school-navy)]">
                        {n.title}
                      </span>
                      <span className="school-text-muted mt-0.5 block line-clamp-2 text-xs">
                        {n.snippet}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="school-hub-panel">
            <div className="school-hub-panel__head">
              <h3 className="text-base font-bold text-[var(--school-navy)]">Upcoming Events</h3>
              <button
                type="button"
                onClick={() => {
                  scrollToSection('news-events');
                  showToast('Academic calendar · May–Jun events listed');
                }}
                className="shrink-0 text-xs font-semibold text-[var(--school-orange)] hover:underline"
              >
                View Calendar
              </button>
            </div>
            <ul className="space-y-3">
              {UPCOMING_EVENTS.map((e) => (
                <li key={e.id}>
                  <div
                    {...schoolCardClickProps(() => showToast(`${e.title} · ${e.time}`))}
                    className="flex w-full cursor-pointer gap-3 rounded-xl border school-border bg-[var(--school-surface)] p-3 text-left transition hover:border-[var(--school-orange)]/40 hover:bg-white hover:shadow-md"
                  >
                    <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--school-navy)] text-white">
                      <span className="text-lg font-bold leading-none">{e.day}</span>
                      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--school-orange)]">
                        {e.month}
                      </span>
                    </span>
                    <span className="block pt-0.5">
                      <span className="block text-sm font-semibold text-[var(--school-navy)]">
                        {e.title}
                      </span>
                      <span className="school-text-muted mt-1 block text-xs">{e.time}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="gallery" className="school-hub-panel scroll-mt-28">
            <div className="school-hub-panel__head">
              <h3 className="text-base font-bold text-[var(--school-navy)]">Campus Gallery</h3>
              <button
                type="button"
                onClick={() => setGalleryIndex(0)}
                className="shrink-0 text-xs font-semibold text-[var(--school-orange)] hover:underline"
              >
                View Gallery
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {GALLERY.map((g, i) => (
                <div
                  key={g.id}
                  {...schoolCardClickProps(() => setGalleryIndex(i))}
                  className="group school-media cursor-pointer overflow-hidden rounded-lg border school-border"
                >
                  <div className="school-media__visual">
                    <SchoolLazyImage
                      src={g.image}
                      alt={g.title}
                      wrapperClassName="aspect-square w-full"
                      className="h-full w-full object-cover"
                      fallbackSeed={g.id}
                      eager
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
