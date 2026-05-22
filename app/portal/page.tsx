import Link from "next/link";
import { ArrowRight, CarFront, Globe, Search, Smartphone, type LucideIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";
import { BRAND } from "@/lib/siteContent";

type PortalCard = {
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
};

const cards: PortalCard[] = [
  {
    title: "Website Development",
    description: "Track delivery milestones, review links, and support requests for your website project.",
    cta: "Request Website Update",
    Icon: Globe,
  },
  {
    title: "Mobile App Development",
    description: "Get app build status and testing support updates from the project team.",
    cta: "Request App Status",
    Icon: Smartphone,
  },
  {
    title: "Maintenance & SEO",
    description: "Request content updates, security checks, or help improving visibility online.",
    cta: "Request Care Task",
    Icon: Search,
  },
  {
    title: "Smart Parking",
    description: "For active deployments, request onboarding help and monthly report assistance.",
    cta: "Request Parking Support",
    Icon: CarFront,
  },
];

export default async function CustomerPortalPage() {
  const session = await getServerSession(createAuthOptions());
  const role = `${session?.role ?? ""}`.toLowerCase();

  if (!session) {
    redirect("/login");
  }
  if (role === "admin" || role === "staff" || role === "manager") {
    redirect("/dashboard");
  }

  const firstName = session.user?.name?.trim().split(/\s+/)[0] || "Customer";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 min-w-0 w-full overflow-x-hidden">
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <div>
              <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
                Home
              </Link>
              <span className="px-2">/</span>
              <span aria-current="page">Portal</span>
            </div>
          </div>
        </section>

        <div className="bg-bg-primary pb-10 pt-5 md:pb-14 md:pt-7 dark:bg-dark-bg-primary">
          <div className={`${CONTAINER} space-y-10`}>
            <header className="border-b border-border-primary pb-8 dark:border-dark-border-primary">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary dark:text-dark-text-tertiary">
                Client workspace
              </p>
              <h1 className="mt-3 font-[var(--font-playfair)] text-3xl tracking-tight text-text-primary dark:text-dark-text-primary md:text-4xl">
                Welcome back, {firstName} 👋
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary md:text-[15px]">
                Manage your websites, projects and digital solutions from one place — request updates and reach our team
                whenever you need help.
              </p>
              <p className="mt-3 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">
                Your profile lives under{" "}
                <Link
                  href="/account"
                  className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
                >
                  My account
                </Link>
                .
              </p>
            </header>

            <section aria-labelledby="portal-services-heading" className="space-y-5">
              <div>
                <h2 id="portal-services-heading" className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                  Services &amp; support
                </h2>
                <p className="mt-1 max-w-xl text-sm text-text-secondary dark:text-dark-text-secondary">
                  Pick a category — we route your message with the right context (websites, apps &amp; digital solutions).
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 sm:items-stretch">
                {cards.map(({ title, description, cta, Icon }) => (
                  <li key={title} className="flex min-h-0">
                    <Link
                      href={`/contact?source=portal&service=${encodeURIComponent(title)}`}
                      className="group flex h-full min-h-0 w-full gap-4 rounded-xl border border-border-primary bg-bg-card p-4 transition hover:border-violet-400/60 hover:bg-bg-secondary/40 dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-violet-500/35 dark:hover:bg-dark-bg-secondary/30 md:p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-lg bg-bg-secondary text-violet-600 dark:bg-dark-bg-secondary dark:text-violet-400">
                        <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                      </span>
                      <span className="flex min-h-0 flex-1 flex-col">
                        <span className="font-semibold text-text-primary dark:text-dark-text-primary">{title}</span>
                        <span className="mt-1 flex-1 text-sm leading-snug text-text-secondary dark:text-dark-text-secondary">
                          {description}
                        </span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary dark:text-dark-text-primary">
                          {cta}
                          <ArrowRight className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-col gap-4 border-t border-border-primary pt-8 dark:border-dark-border-primary sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Something else or not sure where to start?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Contact Support
                </Link>
                <Link
                  href="/account"
                  className="inline-flex rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                >
                  My account
                </Link>
                <Link
                  href="/"
                  className="inline-flex rounded-lg px-4 py-2 text-sm font-semibold text-text-secondary transition hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="border-t border-border-primary bg-bg-primary py-6 dark:border-dark-border-primary dark:bg-dark-bg-primary">
        <div className={`${CONTAINER} text-center`}>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Built by Bitcraftly — {BRAND.headerTagline}
          </p>
          <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Websites, apps &amp; digital projects — one simple client hub.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
