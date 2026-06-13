"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import { CHART_PALETTE, chartTooltipStyle } from "@/lib/analytics-dashboard/chartTheme";
import type { TrafficSourceRow } from "@/lib/analytics-dashboard/types";

type TrafficSourcesChartProps = {
  sources: TrafficSourceRow[];
  isDark?: boolean;
};

export default function TrafficSourcesChart({ sources, isDark = false }: TrafficSourcesChartProps) {
  return (
    <ChartCard title="Traffic Sources" subtitle="Where your visitors come from">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sources}
            dataKey="sessions"
            nameKey="channel"
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={88}
            paddingAngle={3}
            animationDuration={700}
          >
            {sources.map((_, index) => (
              <Cell key={index} fill={CHART_PALETTE[index % CHART_PALETTE.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={chartTooltipStyle(isDark)}
            formatter={(value: number, _name, item) => [
              `${value.toLocaleString("en-IN")} sessions (${item.payload.percentage}%)`,
              item.payload.channel,
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
