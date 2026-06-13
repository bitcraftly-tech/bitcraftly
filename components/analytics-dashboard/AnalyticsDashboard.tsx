"use client";

import { useMemo, useState } from "react";
import {
  DollarSign,
  MessageCircle,
  Percent,
  Target,
  UserCheck,
  Users,
} from "lucide-react";

import AiInsightsPanel from "@/components/analytics-dashboard/AiInsightsPanel";
import DashboardHeader from "@/components/analytics-dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/analytics-dashboard/DashboardSkeleton";
import DeviceDonutChart from "@/components/analytics-dashboard/DeviceDonutChart";
import GeographicAnalytics from "@/components/analytics-dashboard/GeographicAnalytics";
import KpiCard from "@/components/analytics-dashboard/KpiCard";
import LeadFunnel from "@/components/analytics-dashboard/LeadFunnel";
import RecentLeadsTable from "@/components/analytics-dashboard/RecentLeadsTable";
import ServicePerformanceCards from "@/components/analytics-dashboard/ServicePerformanceCards";
import TopPagesTable from "@/components/analytics-dashboard/TopPagesTable";
import TrafficOverviewChart from "@/components/analytics-dashboard/TrafficOverviewChart";
import TrafficSourcesChart from "@/components/analytics-dashboard/TrafficSourcesChart";
import WhatsAppAnalyticsPanel from "@/components/analytics-dashboard/WhatsAppAnalyticsPanel";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  useAnalyticsLeadsQuery,
  useAnalyticsOverviewQuery,
  useUpdateLeadStatusMutation,
} from "@/hooks/useAnalyticsDashboard";
import {
  buildFunnel,
  buildGeography,
  buildInsights,
  buildServicePerformance,
  buildTopPages,
  buildWhatsAppAnalytics,
  normalizeTrafficSources,
  revenuePotential,
} from "@/lib/analytics-dashboard/derive";
import type { DateRangeKey, LeadStatus, TrafficViewMode } from "@/lib/analytics-dashboard/types";

function exportReport(payload: ReturnType<typeof useAnalyticsOverviewQuery>["data"]) {
  if (!payload) return;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bitcraftly-analytics-${payload.range}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<DateRangeKey>("30d");
  const [trafficView, setTrafficView] = useState<TrafficViewMode>("daily");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { data, isLoading, isError, error, refetch, isFetching } = useAnalyticsOverviewQuery(range);
  const { data: leadsData } = useAnalyticsLeadsQuery();
  const updateStatus = useUpdateLeadStatusMutation();

  const derived = useMemo(() => {
    if (!data) return null;
    return {
      funnel: buildFunnel(data),
      topPages: buildTopPages(data),
      services: buildServicePerformance(data),
      whatsapp: buildWhatsAppAnalytics(data),
      geography: buildGeography(data),
      insights: buildInsights(data),
      sources: normalizeTrafficSources(data),
      revenue: revenuePotential(data),
    };
  }, [data]);

  const demoBanner = data && !data.configured.ga4 && !data.configured.gsc;

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !data || !derived) {
    return (
      <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-50 px-5 py-4 text-sm text-red-900 dark:bg-red-950/20 dark:text-red-200">
        <p className="font-semibold">Could not load analytics</p>
        <p className="mt-1">
          {error instanceof Error ? error.message : "Please sign in as admin and try again."}
        </p>
      </div>
    );
  }

  const trendMap = { "7d": 8.2, "30d": 14.6, "90d": 22.1 } as const;

  return (
    <div className="space-y-6">
      <DashboardHeader
        range={range}
        onRangeChange={setRange}
        onRefresh={() => refetch()}
        onExport={() => exportReport(data)}
        isRefreshing={isFetching}
        isDemo={demoBanner ?? false}
      />

      {demoBanner ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
          Showing demo data. Configure <code className="font-mono text-xs">GA4_PROPERTY_ID</code>,{" "}
          <code className="font-mono text-xs">GOOGLE_SERVICE_ACCOUNT_JSON</code>, and Firebase env vars in Vercel for
          live metrics.
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          label="Total Visitors"
          value={data.overview.totalVisitors}
          trend={trendMap[range]}
          icon={<Users className="size-5" />}
          accent="primary"
        />
        <KpiCard
          label="Unique Visitors"
          value={data.overview.uniqueVisitors}
          trend={trendMap[range] - 2}
          icon={<UserCheck className="size-5" />}
        />
        <KpiCard
          label="Leads Generated"
          value={
            data.leads.contactFormSubmissions +
            Math.round(data.leads.whatsappClicks * 0.4)
          }
          trend={18.4}
          icon={<Target className="size-5" />}
          accent="accent"
        />
        <KpiCard
          label="Conversion Rate"
          value={data.leads.conversionRate}
          format="percent"
          trend={2.1}
          icon={<Percent className="size-5" />}
        />
        <KpiCard
          label="WhatsApp Clicks"
          value={data.leads.whatsappClicks}
          trend={24.8}
          icon={<MessageCircle className="size-5" />}
          accent="accent"
        />
        <KpiCard
          label="Revenue Potential"
          value={derived.revenue}
          format="currency"
          trend={11.3}
          icon={<DollarSign className="size-5" />}
          accent="primary"
        />
      </section>

      <TrafficOverviewChart
        payload={data}
        viewMode={trafficView}
        onViewModeChange={setTrafficView}
        isDark={isDark}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <LeadFunnel steps={derived.funnel} />
        <TrafficSourcesChart sources={derived.sources} isDark={isDark} />
      </div>

      <ServicePerformanceCards services={derived.services} />

      <div className="grid gap-6 xl:grid-cols-2">
        <TopPagesTable pages={derived.topPages} />
        <DeviceDonutChart devices={data.visitors.devices} isDark={isDark} />
      </div>

      <WhatsAppAnalyticsPanel data={derived.whatsapp} isDark={isDark} />

      <GeographicAnalytics data={derived.geography} />

      <AiInsightsPanel insights={derived.insights} />

      <RecentLeadsTable
        leads={leadsData?.leads ?? []}
        onStatusChange={(id, status) => updateStatus.mutate({ id, status: status as LeadStatus })}
        isUpdating={updateStatus.isPending}
      />
    </div>
  );
}
