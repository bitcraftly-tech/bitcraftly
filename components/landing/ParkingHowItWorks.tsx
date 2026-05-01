import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

const steps = [
  {
    step: "01",
    title: "Setup and Installation",
    points: [
      "Car owner apni vehicle par unique barcode sticker install karta hai.",
      "Vehicle number aur owner contact secure mapping me store hota hai.",
      "Society admin aur guards ko scan access diya jata hai.",
    ],
  },
  {
    step: "02",
    title: "Daily Usage",
    points: [
      "Parking issue dikhe to barcode scan karo.",
      "System owner identify karta hai aur call option deta hai.",
      "Owner ko instant call ya WhatsApp alert bheja ja sakta hai.",
    ],
  },
  {
    step: "03",
    title: "Reports and Control",
    points: [
      "Admins parking incidents aur response time track karte hain.",
      "Frequent complaints dashboard par highlight hoti hain.",
      "Monthly summary reports management ke liye available rehti hain.",
    ],
  },
];

export default function ParkingHowItWorks() {
  return (
    <section id="how-parking-works" className="scroll-mt-24 border-t border-border-primary bg-bg-secondary py-12 dark:border-dark-border-primary dark:bg-dark-bg-secondary lg:py-16">
      <div className={CONTAINER}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">Smart Parking Flow</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Smart parking kaise kaam karta hai?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Simple 3-step process jisme barcode scan karke car owner se direct contact kiya ja sakta hai.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
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
                  <li key={point} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
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
