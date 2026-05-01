import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const mobileFeatures = [
  "React Native single codebase for iOS + Android",
  "Reusable component architecture with scalable project setup",
  "App Store and Play Store submission included",
  "Push notifications, auth, payments and API integrations",
  "Optional native modules for advanced device capabilities",
  "6 months free maintenance and bug fixes",
];

export default function DemoStrip() {
  return (
    <section id="mobile-apps" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-16 dark:border-dark-border-primary lg:py-24`}>
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
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-500">Service 02</span>
          </div>
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Mobile App Development
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary dark:text-dark-text-secondary">
            React Native ke saath iOS aur Android dono ke liye single codebase app build karte hain. Faster delivery,
            lower maintenance cost, aur production-ready performance for modern business workflows.
          </p>

          <ul className="mt-6 space-y-3">
            {mobileFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-purple-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700">
              Get App Quote
            </Link>
            <Link href="/demo" className="text-sm font-semibold text-purple-500 hover:text-purple-400">
              React Native Consultation →
            </Link>
          </div>

          <div className="mt-6 inline-flex rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Starting from <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹59,000</span> (iOS + Android single codebase)
            </p>
          </div>
          <p className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">Launch offer: First 10 clients</p>
        </div>
      </div>
    </section>
  );
}
