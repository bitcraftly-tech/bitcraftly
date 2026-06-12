import type { AnalyticsEventName } from "@/lib/analytics-dashboard/types";

type LogServerEventInput = {
  eventName: AnalyticsEventName | string;
  source?: string;
  pagePath?: string;
  payload?: Record<string, string | number | boolean | undefined>;
};

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;
  if (typeof window === "undefined") return "server";
  sessionId =
    window.sessionStorage.getItem("bc_analytics_session") ??
    `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  window.sessionStorage.setItem("bc_analytics_session", sessionId);
  return sessionId;
}

/** First-party event log for dashboard + Firestore (alongside GA4) */
export function logServerEvent({ eventName, source, pagePath, payload }: LogServerEventInput): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    eventName,
    source,
    pagePath: pagePath ?? window.location.pathname,
    sessionId: getSessionId(),
    payload,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/events", blob);
    return;
  }

  void fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}
