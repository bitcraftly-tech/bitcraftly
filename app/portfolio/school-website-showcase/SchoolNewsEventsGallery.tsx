"use client";

import { CONTAINER } from "@/lib/constants";

import { schoolCardClickProps } from "./school-clickable";
import { useSchoolDemo } from "./SchoolDemoContext";
import { GALLERY, NEWS_ITEMS, UPCOMING_EVENTS } from "./school-demo-data";
import { SchoolLazyImage } from "./SchoolLazyImage";

export default function SchoolNewsEventsGallery() {
  const { setGalleryIndex, setLightbox, setModalType, showToast, scrollToSection } = useSchoolDemo();

  return (
    <section id="news-events" className={`${CONTAINER} scroll-mt-28 py-14 lg:py-16`}>
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center justify-between border-b school-border pb-2">
            <h2 className="text-base font-bold text-[var(--school-navy)]">Latest News & Updates</h2>
            <button
              type="button"
              onClick={() => setModalType("circular")}
              className="text-xs font-semibold text-[var(--school-orange)] hover:underline"
            >
              View All
            </button>
          </div>
          <ul className="space-y-3">
            {NEWS_ITEMS.map((n) => (
              <li key={n.id}>
                <div
                  {...schoolCardClickProps(() => setLightbox({ src: n.image, title: n.title, alt: n.title }))}
                  className="flex w-full cursor-pointer gap-3 rounded-lg border school-border bg-white p-3 text-left shadow-sm transition hover:shadow-md"
                >
                  <SchoolLazyImage
                    src={n.image}
                    alt=""
                    wrapperClassName="h-14 w-14 shrink-0 rounded-md"
                    className="h-full w-full object-cover"
                    fallbackSeed={n.id}
                    eager
                  />
                  <span className="block min-w-0">
                    <span className="block text-[10px] text-[var(--school-muted)]">{n.date}</span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug text-[var(--school-navy)]">{n.title}</span>
                    <span className="school-text-muted mt-0.5 block line-clamp-2 text-xs">{n.snippet}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between border-b school-border pb-2">
            <h2 className="text-base font-bold text-[var(--school-navy)]">Upcoming Events</h2>
            <button
              type="button"
              onClick={() => {
                scrollToSection("news-events");
                showToast("Academic calendar · May–Jun events listed");
              }}
              className="text-xs font-semibold text-[var(--school-orange)] hover:underline"
            >
              View Calendar
            </button>
          </div>
          <ul className="space-y-3">
            {UPCOMING_EVENTS.map((e) => (
              <li key={e.id}>
                <div
                  {...schoolCardClickProps(() => showToast(`${e.title} · ${e.time}`))}
                  className="flex w-full cursor-pointer gap-3 rounded-lg border school-border bg-white p-3 text-left shadow-sm transition hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md border-2 border-[var(--school-navy)] bg-white text-[var(--school-navy)]">
                    <span className="text-sm font-bold leading-none">{e.day}</span>
                    <span className="text-[8px] font-bold">{e.month}</span>
                  </span>
                  <span className="block">
                    <span className="block text-sm font-semibold text-[var(--school-navy)]">{e.title}</span>
                    <span className="school-text-muted mt-0.5 block text-xs">{e.time}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="gallery">
          <div className="mb-4 flex items-center justify-between border-b school-border pb-2">
            <h2 className="text-base font-bold text-[var(--school-navy)]">Campus Gallery</h2>
            <button type="button" onClick={() => setGalleryIndex(0)} className="text-xs font-semibold text-[var(--school-orange)] hover:underline">
              View Gallery
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {GALLERY.map((g, i) => (
              <div
                key={g.id}
                {...schoolCardClickProps(() => setGalleryIndex(i))}
                className="cursor-pointer overflow-hidden rounded-md border school-border transition hover:opacity-90"
              >
                <SchoolLazyImage src={g.image} alt={g.title} wrapperClassName="aspect-square w-full" fallbackSeed={g.id} eager />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
