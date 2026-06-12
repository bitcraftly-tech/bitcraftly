import type {
  AnalyticsDashboardPayload,
  AnalyticsLead,
  DateRangeKey,
  DashboardCharts,
  LeadMetrics,
  OverviewMetrics,
  PerformanceMetrics,
  RealtimeMetrics,
  SearchConsoleMetrics,
  TrafficSourceRow,
  VisitorBreakdown,
} from "@/lib/analytics-dashboard/types";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function series(days: number, base: number, variance = 0.2): { date: string; value: number }[] {
  return Array.from({ length: days }, (_, i) => {
    const day = days - i;
    const noise = 1 + (Math.sin(i * 1.7) * variance);
    return { date: daysAgo(day), value: Math.max(0, Math.round(base * noise)) };
  });
}

export function demoOverview(): OverviewMetrics {
  return {
    totalVisitors: 2847,
    uniqueVisitors: 2214,
    sessions: 3120,
    pageViews: 6894,
    bounceRate: 42.3,
    avgSessionDuration: 154,
    returningVisitors: 612,
    newVisitors: 1602,
    dataSource: "demo",
  };
}

export function demoLeadMetrics(): LeadMetrics {
  return {
    contactFormSubmissions: 38,
    whatsappClicks: 126,
    callClicks: 44,
    emailClicks: 19,
    quoteClicks: 57,
    conversionRate: 4.8,
    dataSource: "demo",
  };
}

export function demoTraffic(): TrafficSourceRow[] {
  return [
    { channel: "Organic Search", sessions: 1180, percentage: 37.8 },
    { channel: "Direct", sessions: 890, percentage: 28.5 },
    { channel: "Social", sessions: 520, percentage: 16.7 },
    { channel: "Referral", sessions: 340, percentage: 10.9 },
    { channel: "Paid", sessions: 190, percentage: 6.1 },
  ];
}

export function demoSearchConsole(): SearchConsoleMetrics {
  return {
    totalClicks: 842,
    totalImpressions: 18420,
    averageCtr: 4.57,
    averagePosition: 18.4,
    topKeywords: [
      { query: "website development ghaziabad", clicks: 96, impressions: 1420, ctr: 6.8, position: 12.1 },
      { query: "next.js developer india", clicks: 74, impressions: 980, ctr: 7.5, position: 15.3 },
      { query: "bitcraftly", clicks: 68, impressions: 210, ctr: 32.4, position: 1.2 },
      { query: "react website development", clicks: 51, impressions: 1180, ctr: 4.3, position: 21.0 },
      { query: "business website cost india", clicks: 39, impressions: 860, ctr: 4.5, position: 24.6 },
    ],
    topPages: [
      { page: "https://bitcraftly.com/", clicks: 312, impressions: 5200, ctr: 6.0, position: 14.2 },
      { page: "https://bitcraftly.com/pricing", clicks: 198, impressions: 3100, ctr: 6.4, position: 16.8 },
      { page: "https://bitcraftly.com/services", clicks: 142, impressions: 2800, ctr: 5.1, position: 19.1 },
      { page: "https://bitcraftly.com/contact", clicks: 118, impressions: 1900, ctr: 6.2, position: 11.4 },
      { page: "https://bitcraftly.com/portfolio", clicks: 72, impressions: 1420, ctr: 5.1, position: 22.3 },
    ],
    dataSource: "demo",
  };
}

export function demoVisitors(): VisitorBreakdown {
  return {
    countries: [
      { name: "India", users: 2480 },
      { name: "United States", users: 112 },
      { name: "United Arab Emirates", users: 68 },
      { name: "United Kingdom", users: 44 },
    ],
    cities: [
      { name: "Ghaziabad", users: 420 },
      { name: "Delhi", users: 380 },
      { name: "Noida", users: 290 },
      { name: "Gurugram", users: 210 },
    ],
    devices: [
      { name: "Mobile", value: 1980 },
      { name: "Desktop", value: 980 },
      { name: "Tablet", value: 160 },
    ],
    browsers: [
      { name: "Chrome", value: 2140 },
      { name: "Safari", value: 420 },
      { name: "Edge", value: 280 },
      { name: "Firefox", value: 120 },
    ],
    operatingSystems: [
      { name: "Android", value: 1420 },
      { name: "Windows", value: 760 },
      { name: "iOS", value: 520 },
      { name: "macOS", value: 147 },
    ],
    dataSource: "demo",
  };
}

export function demoPerformance(): PerformanceMetrics {
  return {
    lcp: 2.1,
    cls: 0.04,
    fcp: 1.3,
    pageSpeedScore: 88,
    dataSource: "demo",
  };
}

export function demoRealtime(): RealtimeMetrics {
  return {
    activeUsers: 7,
    topPages: [
      { path: "/", activeUsers: 3 },
      { path: "/pricing", activeUsers: 2 },
      { path: "/contact", activeUsers: 1 },
    ],
    topSources: [
      { source: "google", activeUsers: 4 },
      { source: "(direct)", activeUsers: 2 },
      { source: "instagram", activeUsers: 1 },
    ],
    dataSource: "demo",
  };
}

export function demoCharts(range: DateRangeKey): DashboardCharts {
  const days = range === "90d" ? 90 : range === "30d" ? 30 : 7;
  return {
    dailyVisitors: series(days, 95),
    monthlyVisitors: [
      { date: "2026-01", value: 1820 },
      { date: "2026-02", value: 2140 },
      { date: "2026-03", value: 2480 },
      { date: "2026-04", value: 2760 },
      { date: "2026-05", value: 2847 },
    ],
    conversions: series(days, 4, 0.35),
    trafficSources: demoTraffic(),
    deviceUsage: demoVisitors().devices,
    dataSource: "demo",
  };
}

export function demoDashboardPayload(range: DateRangeKey = "30d"): AnalyticsDashboardPayload {
  return {
    range,
    overview: demoOverview(),
    leads: demoLeadMetrics(),
    traffic: demoTraffic(),
    searchConsole: demoSearchConsole(),
    visitors: demoVisitors(),
    performance: demoPerformance(),
    realtime: demoRealtime(),
    charts: demoCharts(range),
    configured: {
      ga4: false,
      gsc: false,
      firebase: false,
    },
  };
}

export function demoLeads(): AnalyticsLead[] {
  const now = new Date().toISOString();
  return [
    {
      id: "demo-1",
      type: "contact_form",
      status: "new",
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      businessName: "FitZone Gym",
      businessType: "Gym",
      source: "Google",
      pagePath: "/contact",
      service: "Gym Website Package",
      intent: "quote",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "demo-2",
      type: "whatsapp",
      status: "contacted",
      name: "WhatsApp lead",
      phone: "+91 98100 11223",
      source: "hero-whatsapp",
      pagePath: "/",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
