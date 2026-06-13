"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import { chartAxisColor, chartGridColor, chartTooltipStyle, ANALYTICS_COLORS } from "@/lib/analytics-dashboard/chartTheme";
import { trafficSeries } from "@/lib/analytics-dashboard/derive";
import type { AnalyticsDashboardPayload, TrafficViewMode } from "@/lib/analytics-dashboard/types";

type TrafficOverviewChartProps = {
  payload: AnalyticsDashboardPayload;
  viewMode: TrafficViewMode;
  onViewModeChange: (mode: TrafficViewMode) => void;
  isDark?: boolean;
};

const MODES: { key: TrafficViewMode; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export default function TrafficOverviewChart({
  payload,
  viewMode,
  onViewModeChange,
  isDark = false,
}: TrafficOverviewChartProps) {
  const data = useMemo(() => {
    const { visitors, leads } = trafficSeries(payload, viewMode);
    return visitors.map((row, i) => ({
      date: row.date,
      visitors: row.value,
      leads: leads[i]?.value ?? 0,
    }));
  }, [payload, viewMode]);

  return (
    <ChartCard
      title="Traffic Overview"
      subtitle="Visitors vs leads over time"
      height="h-80"
      action={
        <div className="inline-flex rounded-lg border border-border-primary p-0.5 dark:border-dark-border-primary">
          {MODES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onViewModeChange(key)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                viewMode === key
                  ? "bg-[#2563EB] text-white"
                  : "text-text-secondary dark:text-dark-text-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke={chartGridColor(isDark)} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: chartAxisColor(isDark) }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => (viewMode === "monthly" ? v : v.slice(5))}
          />
          <YAxis tick={{ fontSize: 10, fill: chartAxisColor(isDark) }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={chartTooltipStyle(isDark)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="visitors"
            name="Visitors"
            stroke={ANALYTICS_COLORS.primary}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            animationDuration={600}
          />
          <Line
            type="monotone"
            dataKey="leads"
            name="Leads"
            stroke={ANALYTICS_COLORS.accent}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
