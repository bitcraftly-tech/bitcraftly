import { BetaAnalyticsDataClient } from "@google-analytics/data";

import {
  dateRangeToDays,
  GA4_PROPERTY_ID,
  isGa4ApiConfigured,
  parseServiceAccountJson,
} from "@/lib/analytics-dashboard/config";
import {
  demoCharts,
  demoLeadMetrics,
  demoOverview,
  demoRealtime,
  demoVisitors,
} from "@/lib/analytics-dashboard/demo-data";
import type {
  DashboardCharts,
  DateRangeKey,
  LeadMetrics,
  OverviewMetrics,
  RealtimeMetrics,
  TrafficSourceRow,
  VisitorBreakdown,
} from "@/lib/analytics-dashboard/types";

function propertyName(): string {
  return `properties/${GA4_PROPERTY_ID}`;
}

function getClient(): BetaAnalyticsDataClient | null {
  const credentials = parseServiceAccountJson();
  if (!credentials) return null;
  return new BetaAnalyticsDataClient({ credentials });
}

function startDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export async function fetchGa4Overview(range: DateRangeKey): Promise<OverviewMetrics> {
  if (!isGa4ApiConfigured()) return demoOverview();

  const client = getClient();
  if (!client) return demoOverview();

  const days = dateRangeToDays(range);
  const [report] = await client.runReport({
    property: propertyName(),
    dateRanges: [{ startDate: startDate(days), endDate: "today" }],
    metrics: [
      { name: "totalUsers" },
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
      { name: "newUsers" },
    ],
  });

  const row = report.rows?.[0];
  const val = (i: number) => Number(row?.metricValues?.[i]?.value ?? 0);
  const totalUsers = val(0);
  const newUsers = val(6);

  return {
    totalVisitors: totalUsers,
    uniqueVisitors: val(1) || totalUsers,
    sessions: val(2),
    pageViews: val(3),
    bounceRate: Number((val(4) * 100).toFixed(1)),
    avgSessionDuration: Math.round(val(5)),
    newVisitors: newUsers,
    returningVisitors: Math.max(0, totalUsers - newUsers),
    dataSource: "ga4",
  };
}

export async function fetchGa4LeadMetrics(range: DateRangeKey): Promise<LeadMetrics> {
  if (!isGa4ApiConfigured()) return demoLeadMetrics();

  const client = getClient();
  if (!client) return demoLeadMetrics();

  const days = dateRangeToDays(range);
  const eventNames = [
    "contact_form_submit",
    "whatsapp_click",
    "call_click",
    "email_click",
    "quote_click",
  ];

  const [report] = await client.runReport({
    property: propertyName(),
    dateRanges: [{ startDate: startDate(days), endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: eventNames },
      },
    },
  });

  const counts = new Map<string, number>();
  for (const row of report.rows ?? []) {
    const name = row.dimensionValues?.[0]?.value ?? "";
    counts.set(name, Number(row.metricValues?.[0]?.value ?? 0));
  }

  const contactFormSubmissions = counts.get("contact_form_submit") ?? 0;
  const whatsappClicks = counts.get("whatsapp_click") ?? 0;
  const sessions = (await fetchGa4Overview(range)).sessions || 1;

  return {
    contactFormSubmissions,
    whatsappClicks,
    callClicks: counts.get("call_click") ?? 0,
    emailClicks: counts.get("email_click") ?? 0,
    quoteClicks: counts.get("quote_click") ?? 0,
    conversionRate: Number(((contactFormSubmissions / sessions) * 100).toFixed(2)),
    dataSource: "ga4",
  };
}

export async function fetchGa4Traffic(range: DateRangeKey): Promise<TrafficSourceRow[]> {
  if (!isGa4ApiConfigured()) return demoCharts(range).trafficSources;

  const client = getClient();
  if (!client) return demoCharts(range).trafficSources;

  const days = dateRangeToDays(range);
  const [report] = await client.runReport({
    property: propertyName(),
    dateRanges: [{ startDate: startDate(days), endDate: "today" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 8,
  });

  const rows =
    report.rows?.map((row) => ({
      channel: row.dimensionValues?.[0]?.value ?? "Other",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
      percentage: 0,
    })) ?? [];

  const total = rows.reduce((sum, row) => sum + row.sessions, 0) || 1;
  return rows.map((row) => ({
    ...row,
    percentage: Number(((row.sessions / total) * 100).toFixed(1)),
  }));
}

export async function fetchGa4Visitors(range: DateRangeKey): Promise<VisitorBreakdown> {
  if (!isGa4ApiConfigured()) return demoVisitors();

  const client = getClient();
  if (!client) return demoVisitors();

  const days = dateRangeToDays(range);
  const dateRanges = [{ startDate: startDate(days), endDate: "today" }];

  const [countryReport, cityReport, deviceReport, browserReport, osReport] = await Promise.all([
    client.runReport({
      property: propertyName(),
      dateRanges,
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property: propertyName(),
      dateRanges,
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property: propertyName(),
      dateRanges,
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    }),
    client.runReport({
      property: propertyName(),
      dateRanges,
      dimensions: [{ name: "browser" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 5,
    }),
    client.runReport({
      property: propertyName(),
      dateRanges,
      dimensions: [{ name: "operatingSystem" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 5,
    }),
  ]);

  function parseGa4Rows(report: typeof countryReport, labelIndex = 0) {
    const rows = report[0]?.rows ?? [];
    return rows.map((row) => ({
      name: row.dimensionValues?.[labelIndex]?.value ?? "Unknown",
      users: Number(row.metricValues?.[0]?.value ?? 0),
      value: Number(row.metricValues?.[0]?.value ?? 0),
    }));
  }

  return {
    countries: parseGa4Rows(countryReport).map(({ name, users }) => ({ name, users })),
    cities: parseGa4Rows(cityReport).map(({ name, users }) => ({ name, users })),
    devices: parseGa4Rows(deviceReport).map(({ name, value }) => ({ name, value })),
    browsers: parseGa4Rows(browserReport).map(({ name, value }) => ({ name, value })),
    operatingSystems: parseGa4Rows(osReport).map(({ name, value }) => ({ name, value })),
    dataSource: "ga4",
  };
}

export async function fetchGa4Charts(range: DateRangeKey): Promise<DashboardCharts> {
  if (!isGa4ApiConfigured()) return demoCharts(range);

  const client = getClient();
  if (!client) return demoCharts(range);

  const days = dateRangeToDays(range);
  const [dailyReport, monthlyReport, conversionReport, traffic, visitors] = await Promise.all([
    client.runReport({
      property: propertyName(),
      dateRanges: [{ startDate: startDate(days), endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    client.runReport({
      property: propertyName(),
      dateRanges: [{ startDate: startDate(150), endDate: "today" }],
      dimensions: [{ name: "yearMonth" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
      limit: 6,
    }),
    client.runReport({
      property: propertyName(),
      dateRanges: [{ startDate: startDate(days), endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "conversions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    fetchGa4Traffic(range),
    fetchGa4Visitors(range),
  ]);

  const dailyVisitors =
    dailyReport[0].rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "",
      value: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  const monthlyVisitors =
    monthlyReport[0].rows?.map((row) => {
      const ym = row.dimensionValues?.[0]?.value ?? "";
      const formatted = ym.length === 6 ? `${ym.slice(0, 4)}-${ym.slice(4, 6)}` : ym;
      return { date: formatted, value: Number(row.metricValues?.[0]?.value ?? 0) };
    }) ?? [];

  const conversions =
    conversionReport[0].rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "",
      value: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  return {
    dailyVisitors,
    monthlyVisitors,
    conversions,
    trafficSources: traffic,
    deviceUsage: visitors.devices,
    dataSource: "ga4",
  };
}

export async function fetchGa4Realtime(): Promise<RealtimeMetrics> {
  if (!isGa4ApiConfigured()) return demoRealtime();

  const client = getClient();
  if (!client) return demoRealtime();

  const [report] = await client.runRealtimeReport({
    property: propertyName(),
    metrics: [{ name: "activeUsers" }],
    dimensions: [{ name: "unifiedScreenName" }, { name: "sessionSource" }],
    limit: 10,
  });

  const pageMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();
  let activeUsers = 0;

  for (const row of report.rows ?? []) {
    const users = Number(row.metricValues?.[0]?.value ?? 0);
    activeUsers += users;
    const page = row.dimensionValues?.[0]?.value ?? "/";
    const source = row.dimensionValues?.[1]?.value ?? "(direct)";
    pageMap.set(page, (pageMap.get(page) ?? 0) + users);
    sourceMap.set(source, (sourceMap.get(source) ?? 0) + users);
  }

  return {
    activeUsers: activeUsers || Number(report.totals?.[0]?.metricValues?.[0]?.value ?? 0),
    topPages: [...pageMap.entries()]
      .map(([path, count]) => ({ path, activeUsers: count }))
      .sort((a, b) => b.activeUsers - a.activeUsers)
      .slice(0, 5),
    topSources: [...sourceMap.entries()]
      .map(([source, count]) => ({ source, activeUsers: count }))
      .sort((a, b) => b.activeUsers - a.activeUsers)
      .slice(0, 5),
    dataSource: "ga4",
  };
}

/** All-time unique users from GA4 (requires GA4_PROPERTY_ID + service account). */
export async function fetchGa4AllTimeUsers(): Promise<number | null> {
  if (!isGa4ApiConfigured()) return null;

  const client = getClient();
  if (!client) return null;

  try {
    const [report] = await client.runReport({
      property: propertyName(),
      dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
      metrics: [{ name: "totalUsers" }],
    });
    const raw = Number(report.rows?.[0]?.metricValues?.[0]?.value ?? NaN);
    if (!Number.isFinite(raw)) return null;
    return Math.max(0, Math.floor(raw));
  } catch {
    return null;
  }
}
