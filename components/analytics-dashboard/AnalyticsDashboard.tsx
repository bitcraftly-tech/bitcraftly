"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, RefreshCw } from "lucide-react";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import MetricCard from "@/components/analytics-dashboard/MetricCard";
import {
  useAnalyticsLeadsQuery,
  useAnalyticsOverviewQuery,
  useAnalyticsRealtimeQuery,
  useUpdateLeadStatusMutation,
} from "@/hooks/useAnalyticsDashboard";
import type { DateRangeKey, LeadStatus } from "@/lib/analytics-dashboard/types";

const PIE_COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "proposal_sent", "won", "lost"];

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<DateRangeKey>("30d");
  const { data, isLoading, isError, error, refetch, isFetching } = useAnalyticsOverviewQuery(range);
  const { data: realtime } = useAnalyticsRealtimeQuery();
  const { data: leadsData } = useAnalyticsLeadsQuery();
  const updateStatus = useUpdateLeadStatusMutation();

  const demoBanner = useMemo(() => {
    if (!data) return false;
    return !data.configured.ga4 && !data.configured.gsc;
  }, [data]);

  if (isLoading) {
    return <p className="mt-6 text-sm text-text-secondary dark:text-dark-text-secondary">Loading analytics…</p>;
  }

  if (isError || !data) {
    return (
      <div className="mt-6 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-900 dark:bg-red-950/20 dark:text-red-200">
        <p className="font-semibold">Could not load analytics</p>
        <p className="mt-1">
          {error instanceof Error ? error.message : "Please sign in as admin and try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["7d", "30d", "90d"] as DateRangeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                range === key
                  ? "bg-indigo-600 text-white"
                  : "border border-border-primary text-text-secondary dark:border-dark-border-primary dark:text-dark-text-secondary"
              }`}
            >
              {key === "7d" ? "7 days" : key === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary px-3 py-1.5 text-xs font-semibold dark:border-dark-border-primary"
          >
            <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="/api/analytics/leads/export"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Download className="size-3.5" />
            Export leads CSV
          </a>
        </div>
      </div>

      {demoBanner ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
          Showing demo data. Set <code className="font-mono text-xs">GA4_PROPERTY_ID</code>,{" "}
          <code className="font-mono text-xs">GOOGLE_SERVICE_ACCOUNT_JSON</code>, and Firebase env vars in Vercel to load
          live metrics.
        </div>
      ) : null}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
          Overview
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total visitors" value={data.overview.totalVisitors} dataSource={data.overview.dataSource} />
          <MetricCard label="Unique visitors" value={data.overview.uniqueVisitors} />
          <MetricCard label="Sessions" value={data.overview.sessions} />
          <MetricCard label="Page views" value={data.overview.pageViews} />
          <MetricCard label="Bounce rate" value={`${data.overview.bounceRate}%`} />
          <MetricCard label="Avg. session" value={formatDuration(data.overview.avgSessionDuration)} />
          <MetricCard label="Returning visitors" value={data.overview.returningVisitors} />
          <MetricCard label="New visitors" value={data.overview.newVisitors} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
          Lead tracking
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard label="Contact forms" value={data.leads.contactFormSubmissions} />
          <MetricCard label="WhatsApp clicks" value={data.leads.whatsappClicks} />
          <MetricCard label="Call clicks" value={data.leads.callClicks} />
          <MetricCard label="Email clicks" value={data.leads.emailClicks} />
          <MetricCard label="Quote clicks" value={data.leads.quoteClicks} />
          <MetricCard label="Conversion rate" value={`${data.leads.conversionRate}%`} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Daily visitors">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.charts.dailyVisitors}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Conversions">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.charts.conversions}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Traffic sources">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.charts.trafficSources} dataKey="sessions" nameKey="channel" outerRadius={90} label>
                {data.charts.trafficSources.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Device usage">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.charts.deviceUsage} dataKey="value" nameKey="name" outerRadius={90} label>
                {data.charts.deviceUsage.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Search Console</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Clicks" value={data.searchConsole.totalClicks} dataSource={data.searchConsole.dataSource} />
            <MetricCard label="Impressions" value={data.searchConsole.totalImpressions} />
            <MetricCard label="Avg. CTR" value={`${data.searchConsole.averageCtr}%`} />
            <MetricCard label="Avg. position" value={data.searchConsole.averagePosition} />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="text-text-tertiary dark:text-dark-text-tertiary">
                  <th className="py-2 pr-3">Keyword</th>
                  <th className="py-2 pr-3">Clicks</th>
                  <th className="py-2">Position</th>
                </tr>
              </thead>
              <tbody>
                {data.searchConsole.topKeywords.map((row) => (
                  <tr key={row.query} className="border-t border-border-primary dark:border-dark-border-primary">
                    <td className="py-2 pr-3">{row.query}</td>
                    <td className="py-2 pr-3">{row.clicks}</td>
                    <td className="py-2">{row.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Realtime</h2>
          <p className="mt-3 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {realtime?.activeUsers ?? data.realtime.activeUsers} active
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Top pages</p>
              <ul className="mt-2 space-y-1 text-xs">
                {(realtime?.topPages ?? data.realtime.topPages).map((row) => (
                  <li key={row.path}>
                    {row.path} · {row.activeUsers}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Traffic source</p>
              <ul className="mt-2 space-y-1 text-xs">
                {(realtime?.topSources ?? data.realtime.topSources).map((row) => (
                  <li key={row.source}>
                    {row.source} · {row.activeUsers}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Visitor breakdown</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-text-tertiary">Countries</p>
              <ul className="mt-2 space-y-1 text-xs">
                {data.visitors.countries.map((row) => (
                  <li key={row.name}>
                    {row.name} · {row.users}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-text-tertiary">Cities</p>
              <ul className="mt-2 space-y-1 text-xs">
                {data.visitors.cities.map((row) => (
                  <li key={row.name}>
                    {row.name} · {row.users}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Core Web Vitals</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MetricCard label="LCP" value={`${data.performance.lcp}s`} dataSource={data.performance.dataSource} />
            <MetricCard label="CLS" value={data.performance.cls} />
            <MetricCard label="FCP" value={`${data.performance.fcp}s`} />
            <MetricCard label="PageSpeed score" value={data.performance.pageSpeedScore} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Lead management</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
                <th className="py-2 pr-3">Lead</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Source</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(leadsData?.leads ?? []).map((lead) => (
                <tr key={lead.id} className="border-t border-border-primary dark:border-dark-border-primary">
                  <td className="py-3 pr-3">
                    <Link href={`/dashboard/analytics/leads/${lead.id}`} className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {lead.name ?? lead.phone ?? lead.id}
                    </Link>
                    <p className="text-xs text-text-tertiary">{lead.businessName}</p>
                  </td>
                  <td className="py-3 pr-3">{lead.type}</td>
                  <td className="py-3 pr-3">{lead.source ?? "—"}</td>
                  <td className="py-3 pr-3">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })
                      }
                      className="rounded border border-border-primary bg-transparent px-2 py-1 text-xs dark:border-dark-border-primary"
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 text-xs text-text-tertiary">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
