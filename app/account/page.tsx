import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LayoutGrid, Mail, MessageCircle } from "lucide-react";

import { createAuthOptions } from "@/auth";
import SiteFooter from "@/components/layout/SiteFooter";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { formatRoleLabel, roleBadgeClass } from "@/lib/roleDisplay";
import { userInitials } from "@/lib/userDisplay";

export const metadata: Metadata = {
  title: "My account | Bitcraftly",
  description: "Your Bitcraftly account — profile and links to service requests and support.",
};

export default async function AccountPage() {
  const session = await getServerSession(createAuthOptions());

  if (!session) {
    redirect("/login?callbackUrl=/account");
  }

  const role = `${session.role ?? ""}`.toLowerCase();
  const isPrivileged = role === "admin" || role === "staff" || role === "manager";
  if (isPrivileged) {
    redirect("/dashboard/profile");
  }

  const name = session.user?.name?.trim() || "Account";
  const email = session.user?.email ?? "";
  const initials = userInitials(session.user?.name ?? "", email);

  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={`${PAGE_MAIN} overflow-x-hidden`}>
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <nav
            aria-label="Breadcrumb"
            className={`${CONTAINER} flex flex-wrap items-center justify-between gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary`}
          >
            <div>
              <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
                Home
              </Link>
              <span className="px-2">/</span>
              <span aria-current="page">Profile</span>
            </div>
          </nav>
        </section>

        <div className="bg-bg-primary pb-10 pt-5 md:pb-14 md:pt-7 dark:bg-dark-bg-primary">
          <div className={CONTAINER}>
            <h1 className="font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary md:text-4xl">
              My account
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Manage how you appear and jump to service requests or support. Billing and admin tools stay in the team
              dashboard — this page is for your client profile.
            </p>

            <div className="mt-8 rounded-2xl border border-border-primary bg-bg-card p-6 shadow-[0_12px_40px_rgba(26,25,22,0.06)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center self-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-semibold text-white shadow-lg ring-4 ring-violet-500/10 dark:ring-black/30 sm:self-start"
                  aria-hidden
                >
                  {initials}
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{name}</h2>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary sm:justify-start">
                    <Mail className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    <span className="truncate">{email}</span>
                  </div>
                  <span
                    className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${roleBadgeClass(role)}`}
                  >
                    {formatRoleLabel(role)}
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-border-primary pt-8 dark:border-dark-border-primary">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
                  Quick links
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/portal"
                    className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary/60 px-4 py-3 text-sm font-medium text-text-primary transition hover:border-violet-500/40 hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary/60 dark:text-dark-text-primary dark:hover:border-violet-500/50 dark:hover:bg-dark-bg-secondary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-card dark:bg-dark-bg-card">
                      <LayoutGrid className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">Service portal</span>
                      <span className="block text-xs font-normal text-text-secondary dark:text-dark-text-secondary">
                        Request updates, status, and project help
                      </span>
                    </span>
                  </Link>
                  <Link
                    href="/contact?intent=support&source=account"
                    className="flex items-center gap-3 rounded-xl border border-border-primary px-4 py-3 text-sm font-medium text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary">
                      <MessageCircle className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">Contact support</span>
                      <span className="block text-xs font-normal text-text-secondary dark:text-dark-text-secondary">
                        Message the team about your project
                      </span>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex rounded-full border border-border-primary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
