import Link from "next/link";

import FounderAvatar from "@/components/landing/FounderAvatar";
import { CONTAINER, FOUNDER_LINKEDIN_URL, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND, FOUNDER, PROCESS_STEPS } from "@/lib/siteContent";

const pillars = [
  {
    title: "Own the outcome",
    body: "Founder-led delivery end to end — clear scope, timelines, and support after handoff.",
  },
  {
    title: "Ship with modern stack",
    body: "React.js, Next.js, and reusable patterns — fast launches without cutting corners.",
  },
  {
    title: "Plain-language updates",
    body: "English ya Hinglish — short, honest status at every milestone.",
  },
];

const stats = [
  { label: "Years in frontend & product", value: "18+" },
  { label: "Focus industries", value: "12+" },
  { label: "Typical first milestone", value: "48 hrs" },
];

export default function TeamContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-primary bg-gradient-to-b from-bg-card via-bg-primary to-bg-secondary dark:border-dark-border-primary dark:from-dark-bg-card dark:via-dark-bg-primary dark:to-dark-bg-secondary">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(43, 92, 230, 0.22), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(99, 102, 241, 0.12), transparent 50%)",
          }}
        />
        <div className={`${CONTAINER} relative py-8 md:py-12`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2B5CE6] dark:text-[#7ea0ff]">Founder-led studio</p>
          <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-text-primary md:text-5xl dark:text-dark-text-primary">
            One architect,{" "}
            <span className="bg-gradient-to-r from-[#2B5CE6] to-indigo-500 bg-clip-text text-transparent dark:from-[#7ea0ff] dark:to-indigo-300">
              direct delivery
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Bitcraftly is a founder-led frontend &amp; AI solutions studio — websites, React/Next.js builds, redesigns, and Smart
            Parking from {BRAND.location}. You work directly with {FOUNDER.name}, with trusted specialists brought in only when the
            scope needs it.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Client calls kabhi‑kabhi Hindi–English mix mein chal jaati hain; milestones, timelines, aur handoff docs clear rehte
            hain.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border-primary bg-bg-card/80 px-5 py-4 backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/80"
              >
                <p className="font-[var(--font-playfair)] text-3xl font-semibold text-text-primary dark:text-dark-text-primary">{item.value}</p>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-primary py-7 dark:border-dark-border-primary">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">How we work</h2>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">Three non‑negotiables on every engagement.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-border-primary bg-bg-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5 dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-black/25"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-[#2B5CE6] to-indigo-500 opacity-80 transition-opacity group-hover:opacity-100" />
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="scroll-mt-24 border-b border-border-primary py-7 dark:border-dark-border-primary">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">Founder</h2>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
            Delivery, architecture, and client communication — one thread, no vendor relay.
          </p>
          <article className="mt-10 flex w-full flex-col gap-6 rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:flex-row sm:items-start sm:p-8">
            <FounderAvatar size="md" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#2B5CE6] dark:text-[#7ea0ff]">{FOUNDER.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.story}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.authorityBio}</p>
              <h4 className="mt-6 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER.whyStartedTitle}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.whyStarted}</p>
              <p className="mt-3 text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{FOUNDER.bioHinglish}</p>
              <p className="mt-4 rounded-lg border border-border-primary bg-bg-secondary/50 p-3 text-xs leading-relaxed text-text-tertiary dark:border-dark-border-primary dark:bg-dark-bg-secondary/40 dark:text-dark-text-tertiary">
                <span className="font-semibold text-text-secondary dark:text-dark-text-secondary">LinkedIn summary: </span>
                {FOUNDER.linkedInSummary}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {FOUNDER_LINKEDIN_URL ? (
                  <a
                    href={FOUNDER_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    LinkedIn →
                  </a>
                ) : null}
                <a href={whatsappUrl(WHATSAPP_MESSAGES.founder)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  WhatsApp →
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-border-primary py-7 dark:border-dark-border-primary">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">Delivery process</h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{s.n}</span>
                <p className="mt-1 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{s.title}</p>
                <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border-primary bg-bg-secondary py-7 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
        <div className={`${CONTAINER} flex flex-col items-start justify-between gap-8 rounded-3xl border border-border-primary bg-bg-card px-8 py-5 md:flex-row md:items-center dark:border-dark-border-primary dark:bg-dark-bg-card`}>
          <div>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">{BRAND.ctaHeadline}</h2>
            <p className="mt-2 max-w-xl text-text-secondary dark:text-dark-text-secondary">
              New website, React/Next.js build, redesign, or Smart Parking pilot — free 15‑minute consult to align scope.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?intent=consultation&source=team"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Book consultation
            </Link>
            <Link
              href="/demo"
              className="inline-flex rounded-full border border-border-primary px-6 py-3 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
            >
              See portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
