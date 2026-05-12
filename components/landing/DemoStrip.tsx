import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const mobileFeatures = [
  "Android & iOS from one codebase where it fits your roadmap",
  "UI tuned for real customers — clear flows, not cluttered admin screens",
  "Store-ready builds with clear handoff and documentation",
  "Payments, auth, and WhatsApp deep links when you need them",
  "Practical support window after launch",
];

export default function DemoStrip() {
  return (
    <section id="mobile-apps" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative md:order-2">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
          <div className="relative flex items-end justify-center gap-4">
            <div className="w-44 rounded-[2.2rem] border border-border-primary bg-bg-card p-2 shadow-lg dark:border-dark-border-primary dark:bg-dark-bg-card">
              <div className="h-80 rounded-[1.8rem] border border-border-primary bg-bg-secondary p-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                <div className="mx-auto h-5 w-24 rounded-full bg-black/80" />
                <div className="mt-8 flex h-[calc(100%-3rem)] items-center justify-center rounded-xl border border-border-primary text-sm text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
                  iOS App
                </div>
              </div>
            </div>
            <div className="-mb-5 w-44 rounded-[2rem] border border-border-primary bg-bg-card p-2 shadow-lg dark:border-dark-border-primary dark:bg-dark-bg-card">
              <div className="h-80 rounded-[1.6rem] border border-border-primary bg-bg-secondary p-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                <div className="mt-6 flex h-[calc(100%-2rem)] items-center justify-center rounded-xl border border-border-primary text-sm text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
                  Android App
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:order-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl">📱</span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-500">Mobile</span>
          </div>
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Mobile App Development
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary dark:text-dark-text-secondary">
            Android &amp; iOS app solutions for modern businesses — customer-first screens, stable releases, and a
            partner who explains tech without the buzzwords.
          </p>
          <p className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Bilingual or Hinglish in-app copy is fine; we align tone with your brand and reviewers.
          </p>

          <ul className="mt-6 space-y-3">
            {mobileFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span className="size-2 shrink-0 rounded-full bg-purple-500" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/contact?service=Mobile%20App&intent=quote&source=mobile-section" className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700">
              Get Free Consultation
            </Link>
            <Link href="/demo" className="text-sm font-semibold text-purple-500 hover:text-purple-400">
              View Portfolio →
            </Link>
          </div>

          <div className="mt-6 inline-flex rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Mobile app UI from <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹25,000</span> — full app scope quoted after discovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
