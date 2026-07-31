import DayalShowcaseLayout from '@/app/portfolio/dayal-builders-showcase/DayalShowcaseLayout';

const HERO_TRUST_ITEMS = 5;
const PROJECT_CARDS = 3;

function SkeletonLine({ className }: { className: string }) {
  return <div className={`dayal-skeleton dayal-skeleton--text ${className}`} />;
}

/** Facebook-style shimmer placeholder shown while the showcase route streams in. */
export default function DayalShowcaseLoading() {
  return (
    <DayalShowcaseLayout>
      <main>
        <div className="sr-only" role="status" aria-live="polite">
          Loading Dayal Builders showcase
        </div>

        <div aria-hidden>
          {/* Navbar */}
          <div className="border-b border-[#0b1633]/8 bg-white">
            <div className="dayal-container flex h-20 items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="dayal-skeleton h-10 w-14 rounded-lg" />
                <SkeletonLine className="h-4 w-32" />
              </div>
              <div className="hidden items-center gap-6 lg:flex">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonLine key={i} className="h-3 w-16" />
                ))}
              </div>
              <div className="dayal-skeleton h-10 w-32 rounded-md" />
            </div>
          </div>

          {/* Hero */}
          <section className="pt-20 pb-12 sm:pt-24 lg:pt-28">
            <div className="dayal-container grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SkeletonLine className="h-3 w-64" />
                <SkeletonLine className="mt-5 h-3 w-28" />
                <div className="dayal-skeleton mt-3 h-12 w-3/4 rounded-lg sm:h-14" />
                <SkeletonLine className="mt-5 h-8 w-52 rounded-full" />
                <div className="mt-5 space-y-2.5">
                  <SkeletonLine className="h-3 w-full" />
                  <SkeletonLine className="h-3 w-11/12" />
                  <SkeletonLine className="h-3 w-2/3" />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="dayal-skeleton h-11 w-40 rounded-md" />
                  <div className="dayal-skeleton h-11 w-44 rounded-md" />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="dayal-media-skeleton aspect-[5/4] rounded-[1.25rem] sm:aspect-[4/3]" />
              </div>
            </div>

            <div className="dayal-container mt-10 sm:mt-12">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#c8a46b]/28 sm:grid-cols-3 lg:grid-cols-5">
                {Array.from({ length: HERO_TRUST_ITEMS }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#fffdf9]/80 px-4 py-4">
                    <div className="dayal-skeleton dayal-skeleton--circle h-9 w-9" />
                    <SkeletonLine className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About card */}
          <section className="py-12">
            <div className="dayal-container">
              <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#0b1633]/8 ring-1 ring-[#0b1633]/5 lg:grid-cols-12">
                <div className="dayal-media-skeleton aspect-[5/6] w-full sm:aspect-[5/4] lg:col-span-4 lg:aspect-auto lg:min-h-[300px]" />
                <div className="p-5 sm:p-8 lg:col-span-8 lg:p-10">
                  <SkeletonLine className="h-3 w-40" />
                  <div className="dayal-skeleton mt-4 h-8 w-4/5 rounded-lg" />
                  <div className="dayal-skeleton mt-2 h-8 w-2/3 rounded-lg" />
                  <div className="mt-6 space-y-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <SkeletonLine key={i} className={i === 4 ? 'h-3 w-1/2' : 'h-3 w-full'} />
                    ))}
                  </div>
                  <div className="dayal-skeleton mt-8 h-11 w-36 rounded-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Trust bar */}
          <section className="bg-[#0b1633] py-12">
            <div className="dayal-container grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="dayal-skeleton dayal-skeleton--dark dayal-skeleton--circle h-12 w-12" />
                    <div className="dayal-skeleton dayal-skeleton--dark dayal-skeleton--text h-3 w-20" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="dayal-skeleton dayal-skeleton--dark h-7 w-4/5 rounded-lg" />
                <div className="dayal-skeleton dayal-skeleton--dark dayal-skeleton--text h-3 w-40" />
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="py-12">
            <div className="dayal-container">
              <SkeletonLine className="h-3 w-32" />
              <div className="dayal-skeleton mt-3 h-8 w-72 rounded-lg" />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: PROJECT_CARDS }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#0b1633]/5"
                  >
                    <div className="dayal-media-skeleton aspect-[4/3] w-full" />
                    <div className="space-y-3 p-5">
                      <SkeletonLine className="h-4 w-2/3" />
                      <SkeletonLine className="h-3 w-full" />
                      <SkeletonLine className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </DayalShowcaseLayout>
  );
}
