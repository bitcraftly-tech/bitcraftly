import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

/** Set to `false` when you're ready to show real bios — blur and overlay will disappear. */
const BLUR_TEAM_CARD_GRID = true;

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
};

const pillars = [
  {
    title: "Own the outcome",
    body: "We take delivery end to end — clear scope and timelines — with support after handoff.",
  },
  {
    title: "Ship in days, not months",
    body: "Templates, reusable components, and automation save your team time.",
  },
  {
    title: "Plain-language updates",
    body: "Less jargon, more business impact — short, honest status at every milestone.",
  },
];

const members: TeamMember[] = [
  {
    name: "Raj Malhotra",
    role: "Founder & Strategy",
    bio: "SMB growth, partnerships, and product direction — pan-India delivery from Ghaziabad.",
    initials: "RM",
    accent: "from-[#2B5CE6] to-indigo-600",
  },
  {
    name: "Priya Sharma",
    role: "Technical Lead",
    bio: "Next.js, APIs, and infra — scalable apps that handle traffic and stay maintainable.",
    initials: "PS",
    accent: "from-violet-600 to-purple-700",
  },
  {
    name: "Arjun Verma",
    role: "Product & UX",
    bio: "Landing flows, dashboards, and design systems that keep your brand cohesive.",
    initials: "AV",
    accent: "from-teal-600 to-emerald-700",
  },
  {
    name: "Sneha Kapoor",
    role: "Client Success",
    bio: "Onboarding, training, and post-launch tweaks so teams get productive fast.",
    initials: "SK",
    accent: "from-rose-600 to-orange-600",
  },
];

const stats = [
  { label: "Core delivery squad", value: "4+" },
  { label: "Industries served", value: "12+" },
  { label: "Avg. first milestone", value: "48 hrs" },
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2B5CE6] dark:text-[#7ea0ff]">People</p>
          <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-text-primary md:text-5xl dark:text-dark-text-primary">
            Small team,{" "}
            <span className="bg-gradient-to-r from-[#2B5CE6] to-indigo-500 bg-clip-text text-transparent dark:from-[#7ea0ff] dark:to-indigo-300">
              direct impact
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Bitcraftly is a focused delivery squad for websites, apps, AI workflows, and Smart Parking — from design through
            deploy. These are the people who ship your work on the ground.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Client calls kabhi‑kabhi Hindi–English mix mein chal jaati hain; milestones, timelines, aur handoff docs English
            mein tidy rehte hain.
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

      <section className="py-7">
        <div className={CONTAINER}>
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">Core team</h2>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-dark-text-secondary">
            Delivery, product, and client success stay on one thread so you aren't relaying between vendors.
          </p>
          {BLUR_TEAM_CARD_GRID ? (
            <>
              <p className="sr-only">Team member profiles are preview-only and blurred for now. Full bios will publish soon.</p>
              <div className="relative mt-10">
                <div
                  className="grid gap-6 blur-2xl select-none sm:grid-cols-2 lg:grid-cols-4"
                  aria-hidden
                >
                  {members.map((m) => (
                    <article
                      key={m.name}
                      className="pointer-events-none flex flex-col rounded-2xl border border-border-primary bg-bg-card p-6 opacity-95 dark:border-dark-border-primary dark:bg-dark-bg-card"
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} text-sm font-bold text-white shadow-md shadow-black/10`}
                        aria-hidden
                      >
                        {m.initials}
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{m.name}</h3>
                      <p className="text-sm font-medium text-[#2B5CE6] dark:text-[#7ea0ff]">{m.role}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{m.bio}</p>
                    </article>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-bg-primary/35 dark:bg-dark-bg-primary/40" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <p className="rounded-full border border-border-primary bg-bg-card/95 px-6 py-2.5 text-sm font-semibold text-text-primary shadow-lg backdrop-blur-sm dark:border-dark-border-primary dark:bg-dark-bg-card/95 dark:text-dark-text-primary">
                    Profiles updating — coming soon
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m) => (
                <article
                  key={m.name}
                  className="flex flex-col rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} text-sm font-bold text-white shadow-md shadow-black/10`}
                    aria-hidden
                  >
                    {m.initials}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{m.name}</h3>
                  <p className="text-sm font-medium text-[#2B5CE6] dark:text-[#7ea0ff]">{m.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{m.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border-primary bg-bg-secondary py-7 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
        <div className={`${CONTAINER} flex flex-col items-start justify-between gap-8 rounded-3xl border border-border-primary bg-bg-card px-8 py-5 md:flex-row md:items-center dark:border-dark-border-primary dark:bg-dark-bg-card`}>
          <div>
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary">Build with us</h2>
            <p className="mt-2 max-w-xl text-text-secondary dark:text-dark-text-secondary">
              New product, redesign, or Smart Parking pilot — a free 15‑minute consult to align scope and next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
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
