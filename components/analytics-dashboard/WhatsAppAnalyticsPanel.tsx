"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MessageCircle, Smartphone } from "lucide-react";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import { ANALYTICS_COLORS, CHART_PALETTE, chartAxisColor, chartGridColor, chartTooltipStyle } from "@/lib/analytics-dashboard/chartTheme";
import type { WhatsAppAnalytics } from "@/lib/analytics-dashboard/types";

type WhatsAppAnalyticsPanelProps = {
  data: WhatsAppAnalytics;
  isDark?: boolean;
};

export default function WhatsAppAnalyticsPanel({ data, isDark = false }: WhatsAppAnalyticsPanelProps) {
  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#22C55E]/15 text-[#16A34A]">
          <MessageCircle className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">WhatsApp Analytics</h3>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
            {data.totalClicks.toLocaleString("en-IN")} total clicks
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Top landing pages</p>
          <ul className="mt-2 space-y-2">
            {data.topPages.map((row) => (
              <li key={row.page} className="flex items-center justify-between rounded-lg bg-bg-secondary px-3 py-2 text-sm dark:bg-dark-bg-secondary">
                <span className="font-medium">{row.page}</span>
                <span className="font-semibold text-[#22C55E]">{row.clicks}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Click time distribution</p>
          <div className="mt-2 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.clickTimes} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid stroke={chartGridColor(isDark)} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: chartAxisColor(isDark) }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: chartAxisColor(isDark) }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltipStyle(isDark)} />
                <Bar dataKey="clicks" fill={ANALYTICS_COLORS.accent} radius={[4, 4, 0, 0]} animationDuration={600} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          <Smartphone className="size-3.5" /> Device type
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.devices.map((device, i) => (
            <span
              key={device.name}
              className="inline-flex items-center gap-2 rounded-full border border-border-primary px-3 py-1.5 text-xs font-medium dark:border-dark-border-primary"
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] }} />
              {device.name}: {device.value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
