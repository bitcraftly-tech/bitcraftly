import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BarChart3, LayoutDashboard, Mail, Shield, User } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import { createAuthOptions } from "@/auth";
import { formatRoleLabel, isPrivilegedRole, roleBadgeClass } from "@/lib/roleDisplay";
import { userInitials } from "@/lib/userDisplay";

export default async function DashboardProfilePage() {
  const session = await getServerSession(createAuthOptions());

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/profile");
  }

  if (!isPrivilegedRole(session.role)) {
    redirect("/account");
  }

  const name = session.user?.name?.trim() || "Account";
  const email = session.user?.email ?? "";
  const initials = userInitials(session.user?.name ?? "", email);
  const role = `${session.role ?? "user"}`.toLowerCase();
  const roleLabel = formatRoleLabel(role);

  return (
    <div>
      <PageHeader
        title="Profile"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]}
      />

      <div className="mt-8 rounded-2xl border border-border-primary bg-bg-card p-6 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card md:p-8">
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

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${roleBadgeClass(role)}`}
              >
                <Shield className="size-3.5" aria-hidden />
                {roleLabel}
              </span>
              <span className="inline-flex rounded-full border border-border-primary bg-bg-secondary px-3 py-1 text-xs font-medium text-text-tertiary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-tertiary">
                Role: <strong className="ml-1 font-semibold text-text-primary dark:text-dark-text-primary">{role}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border-primary pt-8 dark:border-dark-border-primary">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
            Account access
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary/60 px-4 py-3 text-sm font-medium text-text-primary transition hover:border-violet-500/40 hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary/60 dark:text-dark-text-primary dark:hover:border-violet-500/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-card dark:bg-dark-bg-card">
                <LayoutDashboard className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">Dashboard</span>
                <span className="block text-xs font-normal text-text-secondary dark:text-dark-text-secondary">
                  Projects, billing, and workspace tools
                </span>
              </span>
            </Link>
            {role === "admin" ? (
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 rounded-xl border border-border-primary px-4 py-3 text-sm font-medium text-text-primary transition hover:border-[#2563EB]/40 dark:border-dark-border-primary dark:text-dark-text-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <BarChart3 className="h-5 w-5 text-[#2563EB]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Website analytics</span>
                  <span className="block text-xs font-normal text-text-secondary dark:text-dark-text-secondary">
                    Admin-only reports and lead insights
                  </span>
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border-primary px-4 py-3 text-sm text-text-secondary dark:border-dark-border-primary dark:text-dark-text-secondary">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary">
                  <User className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs leading-relaxed">
                  Analytics is available for <strong>admin</strong> accounts only.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
