import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const parkingFeatures = [
  {
    title: "Car Barcode Identity",
    desc: "Each vehicle gets a unique barcode sticker that stores owner and contact details securely.",
  },
  {
    title: "Scan and Call Owner",
    desc: "If parking causes a blockage, anyone can scan and call instantly without seeing full owner number.",
  },
  {
    title: "Privacy-safe Contact Flow",
    desc: "Barcode opens a secure relay page where owner number stays masked and call is routed safely.",
  },
  {
    title: "Society and Complex Management",
    desc: "Admins can monitor incidents, response times and parking complaints from one dashboard.",
  },
];

export default function FinalCTA() {
  return (
    <section id="smart-parking" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-12 dark:border-dark-border-primary lg:py-16`}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative md:order-2">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
            <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Car Sticker Demo</p>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-600">Live Preview</span>
              </div>
              <div className="rounded-lg border border-dashed border-emerald-500/40 bg-emerald-500/5 p-3">
                <div className="rounded-md border border-border-primary bg-white p-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
                    Bitcraftly Smart Parking
                  </p>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fbitcraftly-tech-v2.vercel.app%2Fparking%2Freport%2Fdemo"
                    alt="Scannable demo QR for parking report"
                    className="h-20 w-20 rounded border border-border-primary bg-white p-1 dark:border-dark-border-primary"
                  />
                </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-text-secondary dark:text-dark-text-secondary">
                    <span className="font-mono">SP-UP14-UP14ES0111</span>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-400">
                      Scan QR
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                  The sticker is placed on the front or rear windshield corner. After a scan, the owner's number appears
                  masked and opens a secure call relay.
                </p>
                <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">
                  Demo contact: <span className="font-semibold text-text-primary dark:text-dark-text-primary">+91 9667710954</span> (Call/WhatsApp)
                </p>
              </div>
              <Link
                href="/parking/report/demo"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Open Live Report Flow
              </Link>
              <p className="mt-2 text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
                Demo shows masked number + secure call relay.
              </p>
              <Link
                href="https://wa.me/919667710954"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Open WhatsApp Demo Contact →
              </Link>
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
            Built for drivers who want a barcode sticker on their vehicle. When parking goes wrong, a quick scan routes
            a call straight to the owner.
          </p>
          <p className="mt-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
            RWA / admin teams: rollout discuss karna ho to call ya WhatsApp par Hinglish mix mein baat ho sakti hai — SOPs
            English PDF mein mil jayenge.
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
              Launch Offer: <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹29/car/month</span> (first 3 months, min 100 cars) · Standard ₹49/car/month · 500+ cars ₹39/car/month · barcode sticker printing extra
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
