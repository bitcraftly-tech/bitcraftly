import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const websiteFeatures = [
  "Custom design tailored to your brand",
  "Mobile-responsive and fast loading experience",
  "Contact forms with WhatsApp integration",
  "Google Analytics and SEO setup",
  "Free SSL certificate with hosting guidance",
];

export default function Features() {
  return (
    <section id="websites" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-12 dark:border-dark-border-primary lg:py-16`}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xl">🌐</span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-500">Service 01</span>
          </div>
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Website Development
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary dark:text-dark-text-secondary">
            Aapki business ke liye professional website with lead capture, WhatsApp integration aur SEO-ready
            architecture. Fast turnaround with premium quality.
          </p>

          <ul className="mt-6 space-y-3">
            {websiteFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span className="size-2 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
              Get Website Quote
            </Link>
            <Link href="/demo" className="text-sm font-semibold text-indigo-500 hover:text-indigo-400">
              View Portfolio →
            </Link>
          </div>

          <div className="mt-6 inline-flex rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Starting from <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹15,000</span> one-time
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <div className="overflow-hidden rounded-xl border border-border-primary dark:border-dark-border-primary">
              <div className="flex items-center gap-2 border-b border-border-primary bg-bg-secondary px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 rounded-md bg-bg-card px-2 py-1 text-xs text-text-tertiary dark:bg-dark-bg-card dark:text-dark-text-tertiary">
                  yourwebsite.com
                </span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-5">
                <div className="h-full rounded-lg border border-indigo-500/20 bg-bg-card/70 p-4 dark:bg-dark-bg-card/60">
                  <div className="h-3 w-1/3 rounded bg-indigo-400/40" />
                  <div className="mt-3 h-2 w-2/3 rounded bg-border-secondary dark:bg-dark-border-secondary" />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="h-20 rounded border border-border-primary dark:border-dark-border-primary" />
                    <div className="h-20 rounded border border-border-primary dark:border-dark-border-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
