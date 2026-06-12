import { google } from "googleapis";

import {
  GSC_SITE_URL,
  isGscApiConfigured,
  parseServiceAccountJson,
  dateRangeToDays,
} from "@/lib/analytics-dashboard/config";
import { demoSearchConsole } from "@/lib/analytics-dashboard/demo-data";
import type { DateRangeKey, SearchConsoleMetrics } from "@/lib/analytics-dashboard/types";

function getAuth() {
  const credentials = parseServiceAccountJson();
  if (!credentials) return null;
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
}

function startDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export async function fetchSearchConsoleMetrics(range: DateRangeKey): Promise<SearchConsoleMetrics> {
  if (!isGscApiConfigured()) return demoSearchConsole();

  const auth = getAuth();
  if (!auth) return demoSearchConsole();

  const searchconsole = google.searchconsole({ version: "v1", auth });
  const days = dateRangeToDays(range);
  const body = {
    startDate: startDate(days),
    endDate: new Date().toISOString().slice(0, 10),
    rowLimit: 25,
  };

  try {
    const [summary, keywords, pages] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: { ...body, dimensions: [] },
      }),
      searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: { ...body, dimensions: ["query"] },
      }),
      searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: { ...body, dimensions: ["page"] },
      }),
    ]);

    const summaryRow = summary.data.rows?.[0];
    const totalClicks = summaryRow?.clicks ?? 0;
    const totalImpressions = summaryRow?.impressions ?? 0;
    const averageCtr = Number(((summaryRow?.ctr ?? 0) * 100).toFixed(2));
    const averagePosition = Number((summaryRow?.position ?? 0).toFixed(1));

    const topKeywords =
      keywords.data.rows?.slice(0, 8).map((row) => ({
        query: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: Number(((row.ctr ?? 0) * 100).toFixed(2)),
        position: Number((row.position ?? 0).toFixed(1)),
      })) ?? [];

    const topPages =
      pages.data.rows?.slice(0, 8).map((row) => ({
        page: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: Number(((row.ctr ?? 0) * 100).toFixed(2)),
        position: Number((row.position ?? 0).toFixed(1)),
      })) ?? [];

    return {
      totalClicks,
      totalImpressions,
      averageCtr,
      averagePosition,
      topKeywords,
      topPages,
      dataSource: "gsc",
    };
  } catch {
    return demoSearchConsole();
  }
}
