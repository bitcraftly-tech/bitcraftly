import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

export default function PricingHomeTeaser() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 -mt-2 pb-2 md:-mt-4 md:pb-4`}>
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-[0_16px_40px_rgba(79,70,229,0.25)] sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-28 w-28 rounded-full bg-violet-300/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-100">Most asked question</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold leading-tight sm:text-3xl">
              Website kitne mein banegi?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-indigo-50/95 sm:text-base">
              2 minute mein step-by-step estimate lo — project type, features, hosting. Packages from{" "}
              <span className="font-semibold text-white">₹8,999</span>. Written quote before payment.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/pricing#project-cost-calculator"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Calculate cost →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              View all packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
