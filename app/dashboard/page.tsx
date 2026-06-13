"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  CreditCard,
  FolderKanban,
  Globe,
  Headphones,
  MessageCircle,
} from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import StatCard from "@/components/dashboard/StatCard";
import {
  useLeadsQuery,
  useQrContactsQuery,
  useTemplatesQuery,
} from "@/hooks/useDashboardQueries";
import { useNotificationsQuery } from "@/hooks/useNotifications";

function formatActivityTime(timestamp: string) {
  const deltaSeconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (deltaSeconds < 60) return "Just now";
  const minutes = Math.floor(deltaSeconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

const quickActions = [
  {
    title: "Create New Project",
    description: "Log a new website or app enquiry for the team.",
    href: "/dashboard/leads",
    Icon: FolderKanban,
  },
  {
    title: "Request Support",
    description: "Tell us what you need — we reply on email or WhatsApp.",
    href: "/contact?intent=support&source=dashboard-quick",
    Icon: Headphones,
  },
  {
    title: "View Invoices",
    description: "Review billing, deposits and payment status.",
    href: "/dashboard/billing",
    Icon: CreditCard,
  },
  {
    title: "Manage Websites",
    description: "Templates, links and messaging for your live sites.",
    href: "/dashboard/templates",
    Icon: Globe,
  },
] as const;

export default function DashboardOverviewPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] ?? "there";

  const leadsQuery = useLeadsQuery();
  const qrQuery = useQrContactsQuery();
  const templatesQuery = useTemplatesQuery();
  const notificationsQuery = useNotificationsQuery();

  const leads = leadsQuery.data ?? [];
  const qrContacts = qrQuery.data ?? [];
  const templates = templatesQuery.data ?? [];
  const loading = leadsQuery.isLoading || qrQuery.isLoading || templatesQuery.isLoading;

  const leadsCount = loading ? "..." : leads.length;
  const qrCount = loading ? "..." : qrContacts.length;
  const templatesCount = loading ? "..." : templates.length;

  const hasProjects = !loading && leads.length > 0;
  const workflowStages = [
    { label: "Website Design", pct: hasProjects ? 100 : 0 },
    { label: "Development", pct: hasProjects ? 68 : 0 },
    { label: "Testing", pct: hasProjects ? 42 : 0 },
    { label: "Deployment", pct: hasProjects ? 18 : 0 },
  ];

  const activityItems = (notificationsQuery.data?.items ?? []).slice(0, 6);

  return (
    <div className="min-w-0">
      <PageHeader
        title={`Welcome back, ${firstName} 👋`}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Overview" }]}
        action={{ label: "Create New Project", href: "/dashboard/leads" }}
      />

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Manage your websites, projects and digital solutions from one place.
      </p>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
        A modern client workspace for websites, apps and digital projects — simple, fast and built for real businesses.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(({ title, description, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex min-h-[140px] flex-col rounded-xl border border-border-primary bg-bg-card p-4 transition hover:border-border-secondary hover:bg-bg-secondary/30 dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:border-dark-border-secondary dark:hover:bg-dark-bg-secondary/25"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary">
              <Icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
            </span>
            <span className="mt-3 font-semibold text-text-primary dark:text-dark-text-primary">{title}</span>
            <span className="mt-1 flex-1 text-xs leading-snug text-text-secondary dark:text-dark-text-secondary">{description}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-text-primary dark:text-dark-text-primary">
              Open
              <ArrowRight className="h-3.5 w-3.5 opacity-70 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          label="Active projects"
          value={leadsCount}
          emptyHint="No active projects yet. Start your next website or app project with Bitcraftly."
        />
        <StatCard
          label="Website touchpoints"
          value={qrCount}
          emptyHint="No live touchpoints yet — add QR and web links when your site goes live."
        />
        <StatCard
          label="WhatsApp templates"
          value={templatesCount}
          emptyHint="No templates yet. Create WhatsApp templates when you are ready to send updates."
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Project workflow"
          description="Design → development → testing → deployment. Progress reflects active enquiries and ongoing work."
        >
          <ul className="space-y-4">
            {workflowStages.map((stage) => (
              <li key={stage.label}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">{stage.label}</span>
                  <span className="tabular-nums text-xs text-text-tertiary dark:text-dark-text-tertiary">{stage.pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bg-secondary dark:bg-dark-bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-[width] dark:from-indigo-500 dark:to-violet-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {!hasProjects && !loading ? (
            <p className="mt-4 rounded-lg border border-dashed border-border-primary px-3 py-2 text-xs text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
              No active projects yet — stages fill in once we&apos;re moving your build forward together.
            </p>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Recent activity"
          description="Updates from billing, your sites and support — also available in the bell menu."
        >
          {notificationsQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
              <div className="h-10 animate-pulse rounded-lg bg-border-primary dark:bg-dark-border-primary" />
            </div>
          ) : activityItems.length ? (
            <ul className="space-y-3">
              {activityItems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-border-primary bg-bg-secondary/30 px-3 py-2.5 dark:border-dark-border-primary dark:bg-dark-bg-secondary/25"
                >
                  <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{item.title}</p>
                  <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">{formatActivityTime(item.created_at)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border-primary px-4 py-6 text-center dark:border-dark-border-primary">
              <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Nothing new yet</p>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                When your homepage is updated, an invoice is issued, or support closes a ticket, it will show up here.
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      <section className="mt-6 rounded-xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Need help with your project?</p>
          <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
            Chat with Bitcraftly support on WhatsApp — fast replies during business hours.
          </p>
        </div>
        <a
          href="https://wa.me/919667710954"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a] sm:mt-0"
        >
          <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={2} />
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}
