"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  AnalyticsDashboardPayload,
  AnalyticsLead,
  DateRangeKey,
  LeadStatus,
  RealtimeMetrics,
} from "@/lib/analytics-dashboard/types";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function useAnalyticsOverviewQuery(range: DateRangeKey) {
  return useQuery({
    queryKey: ["analytics-overview", range],
    queryFn: () => fetchJson<AnalyticsDashboardPayload>(`/api/analytics/overview?range=${range}`),
    staleTime: 60_000,
  });
}

export function useAnalyticsRealtimeQuery() {
  return useQuery({
    queryKey: ["analytics-realtime"],
    queryFn: () => fetchJson<RealtimeMetrics>("/api/analytics/realtime"),
    refetchInterval: 30_000,
  });
}

export function useAnalyticsLeadsQuery() {
  return useQuery({
    queryKey: ["analytics-leads"],
    queryFn: () => fetchJson<{ leads: AnalyticsLead[] }>("/api/analytics/leads"),
    staleTime: 30_000,
  });
}

export function useAnalyticsLeadQuery(id: string) {
  return useQuery({
    queryKey: ["analytics-lead", id],
    queryFn: () => fetchJson<{ lead: AnalyticsLead }>(`/api/analytics/leads/${id}`),
    enabled: Boolean(id),
  });
}

export function useUpdateLeadStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      fetchJson<{ lead: AnalyticsLead }>(`/api/analytics/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["analytics-leads"] });
      void queryClient.invalidateQueries({ queryKey: ["analytics-lead"] });
    },
  });
}
