"use client";

import { useSession } from "next-auth/react";
import { Calendar, Download, RefreshCw } from "lucide-react";

import type { DateRangeKey } from "@/lib/analytics-dashboard/types";

type DashboardHeaderProps = {
  range: DateRangeKey;
  onRangeChange: (range: DateRangeKey) => void;
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing?: boolean;
  isDemo?: boolean;
};

const RANGES: { key: DateRangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

export default function DashboardHeader({
  range,
  onRangeChange,
  onRefresh,
  onExport,
  isRefreshing,
  isDemo,
}: DashboardHeaderProps) {
  const { data: session } = useSession();
  const initials = (session?.user?.name ?? session?.user?.email ?? "A")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">Bitcraftly</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-dark-text-primary sm:text-3xl">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
            Website performance, leads, and conversion insights
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-1 rounded-xl border border-border-primary bg-bg-secondary p-1 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
            <Calendar className="ml-2 size-4 text-text-tertiary" />
            {RANGES.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => onRangeChange(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  range === key
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border-primary px-3 py-2 text-xs font-semibold transition-colors hover:bg-bg-secondary dark:border-dark-border-primary dark:hover:bg-dark-bg-secondary"
          >
            <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8]"
          >
            <Download className="size-3.5" />
            Export Report
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-border-primary px-3 py-2 dark:border-dark-border-primary">
            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-xs font-bold text-white">
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                {session?.user?.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-text-tertiary dark:text-dark-text-tertiary">
                {isDemo ? "Demo data" : "Live analytics"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
