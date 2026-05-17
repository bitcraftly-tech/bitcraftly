"use client";

import { CONTAINER } from "@/lib/constants";

import { useSchoolDemo } from "./SchoolDemoContext";
import { GALLERY } from "./school-demo-data";
import { SchoolLazyImage } from "./SchoolLazyImage";

export default function SchoolGallery() {
  const { setGalleryIndex } = useSchoolDemo();

  return (
    <section id="gallery" className="school-bg-surface scroll-mt-28 py-16">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="school-section-label">Gallery</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--school-navy)] sm:text-4xl">Life at Elevate</h2>
          <p className="school-text-muted mt-3 text-sm">Moments from classrooms, sports, arts and celebrations.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGalleryIndex(i)}
              className="school-card-hover group overflow-hidden rounded-2xl border school-border bg-white shadow-sm"
            >
              <SchoolLazyImage
                src={g.image}
                alt={g.title}
                wrapperClassName="aspect-square w-full"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                fallbackSeed={g.id}
              />
              <p className="truncate px-2 py-2 text-xs font-semibold text-[var(--school-navy)]">{g.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
