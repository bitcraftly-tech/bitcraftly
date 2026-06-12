export type DateRangeKey = "7d" | "30d" | "90d";

export type LeadStatus = "new" | "contacted" | "proposal_sent" | "won" | "lost";

export type LeadType =
  | "contact_form"
  | "whatsapp"
  | "call"
  | "email"
  | "quote"
  | "other";

export type AnalyticsLead = {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  message?: string;
  source?: string;
  pagePath?: string;
  service?: string;
  intent?: string;
  createdAt: string;
  updatedAt: string;
};

export type AnalyticsEventName =
  | "page_view"
  | "form_submit"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "quote_click"
  | "pricing_page_visit"
  | "services_page_visit"
  | "portfolio_view"
  | "blog_view"
  | "contact_form_start"
  | "generate_lead";

export type AnalyticsEvent = {
  id: string;
  eventName: AnalyticsEventName | string;
  source?: string;
  pagePath?: string;
  sessionId?: string;
  payload?: Record<string, string | number | boolean | undefined>;
  createdAt: string;
};

export type OverviewMetrics = {
  totalVisitors: number;
  uniqueVisitors: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  returningVisitors: number;
  newVisitors: number;
  dataSource: "ga4" | "demo";
};

export type LeadMetrics = {
  contactFormSubmissions: number;
  whatsappClicks: number;
  callClicks: number;
  emailClicks: number;
  quoteClicks: number;
  conversionRate: number;
  dataSource: "ga4" | "firestore" | "demo";
};

export type TrafficSourceRow = {
  channel: string;
  sessions: number;
  percentage: number;
};

export type SearchConsoleMetrics = {
  totalClicks: number;
  totalImpressions: number;
  averageCtr: number;
  averagePosition: number;
  topKeywords: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>;
  dataSource: "gsc" | "demo";
};

export type VisitorBreakdown = {
  countries: Array<{ name: string; users: number }>;
  cities: Array<{ name: string; users: number }>;
  devices: Array<{ name: string; value: number }>;
  browsers: Array<{ name: string; value: number }>;
  operatingSystems: Array<{ name: string; value: number }>;
  dataSource: "ga4" | "demo";
};

export type PerformanceMetrics = {
  lcp: number;
  cls: number;
  fcp: number;
  pageSpeedScore: number;
  dataSource: "pagespeed" | "demo";
};

export type RealtimeMetrics = {
  activeUsers: number;
  topPages: Array<{ path: string; activeUsers: number }>;
  topSources: Array<{ source: string; activeUsers: number }>;
  dataSource: "ga4" | "demo";
};

export type TimeSeriesPoint = { date: string; value: number };

export type DashboardCharts = {
  dailyVisitors: TimeSeriesPoint[];
  monthlyVisitors: TimeSeriesPoint[];
  conversions: TimeSeriesPoint[];
  trafficSources: TrafficSourceRow[];
  deviceUsage: Array<{ name: string; value: number }>;
  dataSource: "ga4" | "demo";
};

export type AnalyticsDashboardPayload = {
  range: DateRangeKey;
  overview: OverviewMetrics;
  leads: LeadMetrics;
  traffic: TrafficSourceRow[];
  searchConsole: SearchConsoleMetrics;
  visitors: VisitorBreakdown;
  performance: PerformanceMetrics;
  realtime: RealtimeMetrics;
  charts: DashboardCharts;
  configured: {
    ga4: boolean;
    gsc: boolean;
    firebase: boolean;
  };
};
