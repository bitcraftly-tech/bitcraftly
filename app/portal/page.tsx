import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";

const cards = [
  {
    title: "Website Development",
    description: "Track delivery milestones, review links, and support requests for your website project.",
    cta: "Request Website Update",
  },
  {
    title: "Mobile App Development",
    description: "Get app build status and testing support updates from the project team.",
    cta: "Request App Status",
  },
  {
    title: "Maintenance & SEO",
    description: "Request content updates, security checks, or help improving visibility online.",
    cta: "Request Care Task",
  },
  {
    title: "Smart Parking",
    description: "For active deployments, request onboarding help and monthly report assistance.",
    cta: "Request Parking Support",
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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <div>
              <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
                Home
              </Link>
              <span className="px-2">/</span>
              <span aria-current="page">Service portal</span>
            </div>
          </div>
        </section>

        <div className="bg-bg-primary px-6 py-8 dark:bg-dark-bg-primary">
          <div className={`${CONTAINER} mx-auto max-w-5xl space-y-6`}>
            <div className="rounded-2xl border border-border-primary bg-bg-card p-8 dark:border-dark-border-primary dark:bg-dark-bg-card">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary dark:text-dark-text-tertiary">
                Customer Portal
              </p>
              <h1 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">
                Welcome, {session.user?.name || "Customer"}
              </h1>
              <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                Request updates and support for your projects. Your profile lives under{" "}
                <Link href="/account" className="font-semibold text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                  My account
                </Link>
                .
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card"
                >
                  <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{card.title}</h2>
                  <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{card.description}</p>
                  <Link
                    href={`/contact?source=portal&service=${encodeURIComponent(card.title)}`}
                    className="mt-4 inline-flex rounded-full border border-border-primary px-4 py-2 text-xs font-semibold text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
                  >
                    {card.cta}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Contact Support
              </Link>
              <Link
                href="/account"
                className="rounded-full border border-border-primary px-5 py-2 text-sm font-semibold text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
              >
                My account
              </Link>
              <Link
                href="/"
                className="rounded-full border border-border-primary px-5 py-2 text-sm font-semibold text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
