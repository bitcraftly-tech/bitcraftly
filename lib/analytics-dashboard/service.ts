import {
  isFirebaseConfigured,
  isGa4ApiConfigured,
  isGscApiConfigured,
} from "@/lib/analytics-dashboard/config";
import { demoDashboardPayload } from "@/lib/analytics-dashboard/demo-data";
import {
  fetchGa4Charts,
  fetchGa4LeadMetrics,
  fetchGa4Overview,
  fetchGa4Realtime,
  fetchGa4Traffic,
  fetchGa4Visitors,
} from "@/lib/analytics-dashboard/ga4";
import { fetchSearchConsoleMetrics } from "@/lib/analytics-dashboard/gsc";
import { fetchPerformanceMetrics } from "@/lib/analytics-dashboard/performance";
import type { AnalyticsDashboardPayload, DateRangeKey } from "@/lib/analytics-dashboard/types";

export async function getAnalyticsDashboard(range: DateRangeKey = "30d"): Promise<AnalyticsDashboardPayload> {
  const configured = {
    ga4: isGa4ApiConfigured(),
    gsc: isGscApiConfigured(),
    firebase: isFirebaseConfigured(),
  };

  if (!configured.ga4 && !configured.gsc) {
    return { ...demoDashboardPayload(range), configured };
  }

  const [overview, leads, traffic, searchConsole, visitors, performance, realtime, charts] =
    await Promise.all([
      fetchGa4Overview(range),
      fetchGa4LeadMetrics(range),
      fetchGa4Traffic(range),
      fetchSearchConsoleMetrics(range),
      fetchGa4Visitors(range),
      fetchPerformanceMetrics(),
      fetchGa4Realtime(),
      fetchGa4Charts(range),
    ]);

  return {
    range,
    overview,
    leads,
    traffic,
    searchConsole,
    visitors,
    performance,
    realtime,
    charts,
    configured,
  };
}
