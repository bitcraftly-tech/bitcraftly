import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

const perks = [
  {
    title: "Ownership, not tickets",
    body: "Meaningful scope every project — you own features end to end, not only peripheral fixes.",
  },
  {
    title: "Remote-first + Ghaziabad",
    body: "Mostly async work with Delhi–NCR–friendly overlap when we sync live.",
  },
  {
    title: "Modern stack",
    body: "Next.js, TypeScript, Python/FastAPI, and whatever client work needs — continuous learning is the default.",
  },
];

type Role = {
  title: string;
  type: string;
  focus: string;
};

/** When roles go live, add entries here — the list below renders automatically. */
const openings: Role[] = [];

export default function CareersContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-primary bg-gradient-to-b from-bg-card via-bg-primary to-bg-secondary dark:border-dark-border-primary dark:from-dark-bg-card dark:via-dark-bg-primary dark:to-dark-bg-secondary">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(43, 92, 230, 0.2), transparent 55%), radial-gradient(ellipse 55% 45% at 0% 20%, rgba(16, 185, 129, 0.1), transparent 50%)",
          }}
        />
        <div className={`${CONTAINER} relative py-16 md:py-24`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2B5CE6] dark:text-[#7ea0ff]">Careers</p>
          <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-text-primary md:text-5xl dark:text-dark-text-primary">
            Small team,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-[#2B5CE6] bg-clip-text text-transparent dark:from-emerald-400 dark:to-[#7ea0ff]">
              long runway
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Bitcraftly ships digital products for SMBs — websites, apps, AI tooling, and Smart Parking. We're looking for
            builders who communicate clearly and ship with discipline.
          </p>
          <p className="mt-3 max-w-2xl text-sm italic text-text-tertiary dark:text-dark-text-tertiary">
            Interviews aur async updates English-first; agar tum Hinglish mein articulate ho — theek hai, clarity same
            rehni chahiye.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?intent=careers"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Apply — general candidature
            </Link>
            <Link
              href="/team"
              className="inline-flex rounded-full border border-border-primary px-6 py-3 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
            >
              Meet our team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border-primary py-14 dark:border-dark-border-primary">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">What you'll get</h2>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
            Honest perks, straight‑up bullets — flashy HR decks nahi.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card"
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
            {openings.length > 0 ? "Open roles" : "Open positions"}
          </h2>
          {openings.length > 0 ? (
            <>
              <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
                Profiles can overlap roles — mention the fit on the form and we'll loop back with shortlisted folks.
              </p>
              <ul className="mt-10 space-y-4">
                {openings.map((role) => (
                  <li
                    key={role.title}
                    className="rounded-2xl border border-border-primary bg-bg-card px-6 py-5 transition-shadow hover:shadow-lg hover:shadow-black/5 dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-black/20"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{role.title}</h3>
                        <p className="text-sm font-medium text-[#2B5CE6] dark:text-[#7ea0ff]">{role.type}</p>
                        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{role.focus}</p>
                      </div>
                      <Link
                        href={`/contact?intent=careers&role=${encodeURIComponent(role.title)}`}
                        className="inline-flex shrink-0 justify-center rounded-full border border-border-primary px-5 py-2.5 text-sm font-medium text-text-primary transition hover:border-[#2B5CE6] hover:text-[#2B5CE6] dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-[#7ea0ff] dark:hover:text-[#7ea0ff]"
                      >
                        Apply for this role
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
                We don't have an active hiring round for a specific vacancy right now — this section will update as soon as
                the next phase opens.
              </p>
              <div className="mt-8 rounded-2xl border border-dashed border-border-primary bg-bg-card px-6 py-8 md:px-8 dark:border-dark-border-primary dark:bg-dark-bg-card">
                <p className="inline-flex rounded-full border border-[#2B5CE6]/25 bg-[#2B5CE6]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2B5CE6] dark:border-[#7ea0ff]/30 dark:bg-[#2B5CE6]/10 dark:text-[#7ea0ff]">
                  No openings right now
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                  Strong builders stay on our radar. If Next.js / product / design / client delivery sounds like you, send a
                  general application; when a formal role opens, we look at this pool first.
                </p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <li>Attach portfolio / GitHub / Behance or your two strongest work links.</li>
                  <li>Remote-friendly roles still benefit from Ghaziabad / NCR timezone overlap for delivery.</li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact?intent=careers"
                    className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    General application
                  </Link>
                  <a
                    href="mailto:hello@bitcraftly.com?subject=Careers%20%E2%80%94%20General%20profile"
                    className="inline-flex rounded-full border border-border-primary px-5 py-2.5 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
                  >
                    Email profile
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="border-t border-border-primary bg-bg-secondary py-14 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
        <div className={`${CONTAINER} rounded-3xl border border-border-primary bg-bg-card px-8 py-10 dark:border-dark-border-primary dark:bg-dark-bg-card`}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">Hiring process</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", text: "Short form + portfolio / GitHub / behance link" },
              { step: "2", text: "30–45 min call — culture + problem solving" },
              { step: "3", text: "Paid trial task (where needed) → offer" },
            ].map((row) => (
              <li key={row.step} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-sm font-bold text-[#2B5CE6] dark:bg-dark-bg-secondary dark:text-[#7ea0ff]">
                  {row.step}
                </span>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{row.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3 border-t border-border-primary pt-8 dark:border-dark-border-primary">
            <Link
              href="/contact?intent=careers"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Send your profile
            </Link>
            <a
              href="mailto:hello@bitcraftly.com?subject=Careers%20at%20Bitcraftly"
              className="inline-flex rounded-full border border-border-primary px-6 py-3 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
            >
              Email hello@bitcraftly.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
