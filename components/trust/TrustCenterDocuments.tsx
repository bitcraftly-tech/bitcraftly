import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ChevronRight,
  Download,
  FileCheck2,
  Lock,
  Package,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { TRUST_CENTER_CATEGORIES, TRUST_CENTER_ENTRIES } from "@/lib/documents/trustCenter";
import type { TrustCenterEntry } from "@/types/documents";

type CategoryKey = (typeof TRUST_CENTER_CATEGORIES)[number];

const CATEGORY_META: Record<
  CategoryKey,
  {
    icon: LucideIcon;
    accent: string;
    iconBg: string;
    glow: string;
    cardTint: string;
    ring: string;
    line: string;
  }
> = {
  Business: {
    icon: Briefcase,
    accent: "text-indigo-600 dark:text-indigo-300",
    iconBg: "bg-indigo-500/12 dark:bg-indigo-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(79,70,229,0.45)]",
    cardTint: "from-indigo-500/[0.04] via-transparent to-violet-500/[0.03]",
    ring: "ring-indigo-500/10 dark:ring-indigo-400/15",
    line: "from-indigo-500/60 to-violet-500/20",
  },
  Delivery: {
    icon: Package,
    accent: "text-sky-600 dark:text-sky-300",
    iconBg: "bg-sky-500/12 dark:bg-sky-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(14,165,233,0.4)]",
    cardTint: "from-sky-500/[0.05] via-transparent to-blue-500/[0.03]",
    ring: "ring-sky-500/10 dark:ring-sky-400/15",
    line: "from-sky-500/60 to-blue-500/20",
  },
  Quality: {
    icon: BadgeCheck,
    accent: "text-emerald-600 dark:text-emerald-300",
    iconBg: "bg-emerald-500/12 dark:bg-emerald-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(16,185,129,0.4)]",
    cardTint: "from-emerald-500/[0.05] via-transparent to-teal-500/[0.03]",
    ring: "ring-emerald-500/10 dark:ring-emerald-400/15",
    line: "from-emerald-500/60 to-teal-500/20",
  },
  Security: {
    icon: Shield,
    accent: "text-amber-700 dark:text-amber-300",
    iconBg: "bg-amber-500/12 dark:bg-amber-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(245,158,11,0.35)]",
    cardTint: "from-amber-500/[0.05] via-transparent to-orange-500/[0.03]",
    ring: "ring-amber-500/10 dark:ring-amber-400/15",
    line: "from-amber-500/60 to-orange-500/20",
  },
  Privacy: {
    icon: Lock,
    accent: "text-violet-600 dark:text-violet-300",
    iconBg: "bg-violet-500/12 dark:bg-violet-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(139,92,246,0.4)]",
    cardTint: "from-violet-500/[0.05] via-transparent to-purple-500/[0.03]",
    ring: "ring-violet-500/10 dark:ring-violet-400/15",
    line: "from-violet-500/60 to-purple-500/20",
  },
  "Responsible AI": {
    icon: Sparkles,
    accent: "text-cyan-600 dark:text-cyan-300",
    iconBg: "bg-cyan-500/12 dark:bg-cyan-400/15",
    glow: "group-hover:shadow-[0_20px_50px_-24px_rgba(6,182,212,0.4)]",
    cardTint: "from-cyan-500/[0.05] via-transparent to-teal-500/[0.03]",
    ring: "ring-cyan-500/10 dark:ring-cyan-400/15",
    line: "from-cyan-500/60 to-teal-500/20",
  },
};

function DocumentCard({ entry, category }: { entry: TrustCenterEntry; category: CategoryKey }) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  const hasDownload = Boolean(entry.publicDownloadUrl);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-primary/60 bg-bg-card/90 p-[1px] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-border-primary dark:border-dark-border-primary/60 dark:bg-dark-bg-card/90 dark:shadow-[0_8px_32px_-16px_rgba(0,0,0,0.55)] ${meta.glow}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.cardTint} opacity-80 transition duration-500 group-hover:opacity-100`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/40 blur-2xl transition duration-500 group-hover:scale-110 dark:bg-white/[0.03]"
        aria-hidden
      />

      <div className="relative flex h-full flex-col rounded-[calc(1rem-1px)] bg-bg-card/80 p-5 dark:bg-dark-bg-card/80 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${meta.iconBg} ring-1 ${meta.ring} shadow-sm transition duration-300 group-hover:scale-105`}
          >
            <Icon className={`size-[19px] ${meta.accent}`} aria-hidden strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-text-primary dark:text-dark-text-primary sm:text-base">
              {entry.title}
            </h3>
            <p className="mt-2.5 text-sm leading-[1.65] text-text-secondary dark:text-dark-text-secondary">
              {entry.summary}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-border-primary/50 pt-5 dark:border-dark-border-primary/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {entry.documentId ? (
              <span className="rounded-lg border border-border-primary/70 bg-bg-secondary/80 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-text-tertiary dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/80 dark:text-dark-text-tertiary">
                {entry.documentId}
              </span>
            ) : null}
            {hasDownload ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/15 dark:text-emerald-300">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                </span>
                Approved PDF
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-secondary/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-tertiary dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary/60 dark:text-dark-text-tertiary">
                <span className="size-1.5 rounded-full bg-slate-400/70 dark:bg-slate-500" aria-hidden />
                Summary in preparation
              </span>
            )}
          </div>

          {hasDownload ? (
            <a
              href={entry.publicDownloadUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_4px_14px_-4px_rgba(79,70,229,0.55)] transition duration-300 hover:shadow-[0_8px_24px_-6px_rgba(79,70,229,0.55)] sm:w-auto"
            >
              <Download className="size-3.5" aria-hidden strokeWidth={2} />
              Download PDF
            </a>
          ) : entry.category === "Privacy" ? (
            <Link
              href="/privacy"
              className="inline-flex w-full items-center justify-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              View privacy policy
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-text-primary dark:text-dark-text-primary">{value}</p>
    </div>
  );
}

export default function TrustCenterDocuments() {
  const publicCount = TRUST_CENTER_ENTRIES.filter((e) => e.publicDownloadUrl).length;

  return (
    <div className="mt-2">
      {/* Stats banner */}
      <div
        id="trust-standards"
        className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-slate-50 via-white to-indigo-50/80 p-[1px] shadow-[0_8px_40px_-20px_rgba(79,70,229,0.25)] dark:border-indigo-400/10 dark:from-dark-bg-secondary/80 dark:via-dark-bg-card dark:to-indigo-950/30"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(99,102,241,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(139,92,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(99,102,241,0.15),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(139,92,246,0.1),transparent_50%)]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 rounded-[calc(1.5rem-1px)] bg-white/60 px-5 py-6 backdrop-blur-sm dark:bg-dark-bg-card/70 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <FileCheck2 className="size-3" aria-hidden />
              Documented standards
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Governed areas with public summaries where approved. Full operational library stays behind authenticated
              dashboard access.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <StatPill label="Governed areas" value={String(TRUST_CENTER_ENTRIES.length)} />
            <StatPill
              label="Public PDFs"
              value={`${publicCount} approved`}
            />
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div className="mt-14 space-y-16">
        {TRUST_CENTER_CATEGORIES.map((category) => {
          const entries = TRUST_CENTER_ENTRIES.filter((entry) => entry.category === category);
          if (!entries.length) return null;

          const meta = CATEGORY_META[category];
          const Icon = meta.icon;

          return (
            <section key={category}>
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${meta.iconBg} ring-1 ${meta.ring}`}
                >
                  <Icon className={`size-[18px] ${meta.accent}`} aria-hidden strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-text-primary dark:text-dark-text-primary">
                      {category}
                    </h2>
                    <span className="text-xs font-medium text-text-tertiary dark:text-dark-text-tertiary">
                      {entries.length} {entries.length === 1 ? "standard" : "standards"}
                    </span>
                  </div>
                  <div
                    className={`mt-2 h-px max-w-[120px] bg-gradient-to-r ${meta.line}`}
                    aria-hidden
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {entries.map((entry) => (
                  <DocumentCard key={`${entry.category}-${entry.title}`} entry={entry} category={category} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Team CTA */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-border-primary/60 bg-gradient-to-r from-bg-secondary/80 via-bg-card to-indigo-500/[0.03] p-[1px] dark:border-dark-border-primary/60 dark:from-dark-bg-secondary/50 dark:via-dark-bg-card dark:to-indigo-500/[0.05]">
        <div className="flex flex-col items-start justify-between gap-4 rounded-[calc(1rem-1px)] bg-bg-card/90 px-5 py-5 sm:flex-row sm:items-center sm:px-6 dark:bg-dark-bg-card/90">
          <div>
            <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">Team member access</p>
            <p className="mt-1 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
              Internal BDS documents, previews, and downloads are available in the dashboard library.
            </p>
          </div>
          <Link
            href="/dashboard/documents"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/8 px-4 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-500/12 dark:border-indigo-400/25 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/15"
          >
            Open document library
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
