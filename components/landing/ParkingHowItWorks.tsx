import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const steps = [
  {
    step: "01",
    title: "Setup and Installation",
    points: [
      "The vehicle owner installs a unique barcode sticker on their vehicle.",
      "Vehicle registration and owner contact are stored in a secure mapping.",
      "Society admins and guards receive scan access.",
    ],
  },
  {
    step: "02",
    title: "Daily Usage",
    points: [
      "If there's a parking issue, anyone can scan the barcode.",
      "The system identifies the owner and offers a call option.",
      "The owner can get an instant call or WhatsApp alert.",
    ],
  },
  {
    step: "03",
    title: "Reports and Control",
    points: [
      "Admins track parking incidents and response times.",
      "Frequent complaints are highlighted on the dashboard.",
      "Monthly summary reports stay available for management.",
    ],
  },
];

export default function ParkingHowItWorks() {
  return (
    <section id="how-parking-works" className="scroll-mt-24 border-t border-border-primary bg-bg-secondary py-6 dark:border-dark-border-primary dark:bg-dark-bg-secondary lg:py-8">
      <div className={CONTAINER}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">Smart Parking Flow</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            How does smart parking work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary sm:text-base">
            A simple three-step flow: scan the barcode to reach the car owner directly when something goes wrong.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-text-tertiary dark:text-dark-text-tertiary sm:text-sm">
            Society admins ke liye: demo ya rollout discuss karna ho to WhatsApp par “Smart Parking demo” likh kar ping
            karo — reply mix English–Hinglish mein aa sakta hai.
          </p>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="group transform-gpu rounded-2xl border border-border-primary bg-bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_10px_20px_rgba(2,6,23,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-emerald-500/40 dark:hover:shadow-[0_12px_22px_rgba(2,6,23,0.3)]"
            >
              <p className="font-[var(--font-playfair)] text-5xl text-emerald-500/25">
                {item.step}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="relative py-0 pl-[1.125rem] text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
                  >
                    {/* Centre dot on first line: 0.5lh ≈ midpoint of caps / x-height row */}
                    <span
                      className="absolute left-0 top-[calc(0.5lh)] size-2 -translate-y-1/2 rounded-full bg-emerald-500"
                      aria-hidden
                    />
                    <span className="block min-w-0 text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/contact?service=Smart%20Parking&intent=demo&source=smart-parking-cta"
            className="inline-flex rounded-xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Book Free Parking Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
