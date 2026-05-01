import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const parkingFeatures = [
  {
    title: "Car Barcode Identity",
    desc: "Each vehicle gets a unique barcode sticker that stores owner and contact details securely.",
  },
  {
    title: "Scan and Call Owner",
    desc: "If parking causes a blockage, anyone can scan and call the owner instantly.",
  },
  {
    title: "Privacy-safe Contact Flow",
    desc: "Contact details are shared through controlled access so communication is quick and safer.",
  },
  {
    title: "Society and Complex Management",
    desc: "Admins can monitor incidents, response times and parking complaints from one dashboard.",
  },
];

export default function FinalCTA() {
  return (
    <section id="smart-parking" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-16 dark:border-dark-border-primary lg:py-24`}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative md:order-2">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Illegal Parking Report</p>
                <span className="rounded-full bg-red-500/15 px-2 py-1 text-xs font-semibold text-red-500">Unauthorized</span>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="flex gap-1.5">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <span key={idx} className="h-10 w-1 rounded-sm bg-emerald-400/60" />
                  ))}
                </div>
                <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">Scan parking barcode</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                  <span>Vehicle</span>
                  <span className="font-mono text-text-primary dark:text-dark-text-primary">DL 01 AB 1234</span>
                </div>
                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                  <span>Owner</span>
                  <span className="text-emerald-600 dark:text-emerald-400">+91 98765 43210</span>
                </div>
                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                  <span>Issue</span>
                  <span className="text-text-primary dark:text-dark-text-primary">Wrong parking / blocked exit</span>
                </div>
              </div>
              <button type="button" className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                Call Car Owner
              </button>
            </div>
          </div>
        </div>

        <div className="md:order-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xl">🚗</span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-500">Service 04</span>
          </div>
          <h2 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Smart Parking Solutions
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary dark:text-dark-text-secondary">
            Ye service un car owners ke liye hai jo apni car par barcode sticker install karna chahte hain. Parking
            issue hone par barcode scan karke owner ko turant call kiya ja sakta hai.
          </p>

          <div className="mt-6 space-y-4">
            {parkingFeatures.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
                <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{feature.title}</p>
                <p className="mt-1 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">{feature.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-text-secondary dark:text-dark-text-secondary">
            Perfect for: Residential societies, office complexes, shopping malls, hospitals and hotels.
          </div>

          <div className="mt-7 flex scroll-mt-24 flex-wrap items-center gap-3" id="contact-cta">
            <Link
              href="/contact?service=Smart%20Parking&intent=demo&source=smart-parking-cta"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Request Demo
            </Link>
            <Link href="/how-parking-works" className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
              How It Works →
            </Link>
          </div>

          <div className="mt-6 inline-flex rounded-xl border border-border-primary bg-bg-card px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Pricing <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹49/car/month</span> (platform only) · barcode sticker printing extra
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
