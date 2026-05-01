"use client";

import { CONTAINER } from "@/lib/constants";

type StatItem = {
  label: string;
  value: string;
  delta: string;
};

type ClientItem = {
  initials: string;
  name: string;
  service: string;
  status: "Active" | "Setup";
};

const stats: StatItem[] = [
  { label: "Leads", value: "142", delta: "+18% this week" },
  { label: "Revenue", value: "₹2.1L", delta: "+11% this month" },
  { label: "Clients", value: "24", delta: "+6 this quarter" },
];

const clients: ClientItem[] = [
  { initials: "SK", name: "Sharma Kitchen", service: "Restaurant", status: "Active" },
  { initials: "GL", name: "Glow Lab", service: "Salon", status: "Active" },
  { initials: "CB", name: "Care Bridge", service: "Clinic", status: "Setup" },
];

export default function Hero() {
  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="about" className={`${CONTAINER} grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20`}>
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-border-secondary dark:bg-dark-border-secondary" />
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Multi-tenant SaaS Platform</p>
        </div>

        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-5xl">
          Aapka pehla online customer kal tak
        </h1>
        <p className="mt-4 max-w-xl text-base text-text-secondary dark:text-dark-text-secondary sm:text-lg">
          Website + WhatsApp system + lead pipeline — 48 hours mein live.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("pricing")}
            className="rounded-full bg-[#2B5CE6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2B5CE6]/90"
          >
            Start Free Trial
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="rounded-full border border-border-secondary px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
          >
            See Features
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1A6B3C]" />
          <p>Setup ₹3,000-₹5,000 · Monthly ₹999-₹2,999 · No hidden charges</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-xl border border-border-primary p-3 dark:border-dark-border-primary">
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-text-primary dark:text-dark-text-primary">{item.value}</p>
              <p className="mt-1 text-xs text-[#1A6B3C]">{item.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border-primary dark:border-dark-border-primary">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-between gap-3 border-b border-border-primary px-3 py-3 last:border-b-0 dark:border-dark-border-primary sm:px-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-secondary text-xs font-semibold text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                  {client.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{client.name}</p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">{client.service}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  client.status === "Active"
                    ? "bg-[#1A6B3C]/10 text-[#1A6B3C]"
                    : "bg-[#2B5CE6]/10 text-[#2B5CE6]"
                }`}
              >
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
