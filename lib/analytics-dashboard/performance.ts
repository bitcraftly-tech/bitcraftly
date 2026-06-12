import { isPageSpeedConfigured, PAGESPEED_API_KEY } from "@/lib/analytics-dashboard/config";
import { demoPerformance } from "@/lib/analytics-dashboard/demo-data";
import type { PerformanceMetrics } from "@/lib/analytics-dashboard/types";

type PageSpeedAudit = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } };
    audits?: Record<string, { numericValue?: number; displayValue?: string }>;
  };
};

export async function fetchPerformanceMetrics(url = "https://bitcraftly.com"): Promise<PerformanceMetrics> {
  if (!isPageSpeedConfigured()) return demoPerformance();

  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("key", PAGESPEED_API_KEY);
    endpoint.searchParams.set("strategy", "mobile");
    endpoint.searchParams.set("category", "performance");

    const response = await fetch(endpoint.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) return demoPerformance();

    const data = (await response.json()) as PageSpeedAudit;
    const audits = data.lighthouseResult?.audits ?? {};
    const score = Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100);

    return {
      lcp: Number(((audits["largest-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(2)),
      cls: Number((audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3)),
      fcp: Number(((audits["first-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(2)),
      pageSpeedScore: score,
      dataSource: "pagespeed",
    };
  } catch {
    return demoPerformance();
  }
}
