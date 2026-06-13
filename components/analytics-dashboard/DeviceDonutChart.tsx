"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import ChartCard from "@/components/analytics-dashboard/ChartCard";
import { CHART_PALETTE, chartTooltipStyle } from "@/lib/analytics-dashboard/chartTheme";

type DeviceDonutChartProps = {
  devices: Array<{ name: string; value: number }>;
  isDark?: boolean;
};

export default function DeviceDonutChart({ devices, isDark = false }: DeviceDonutChartProps) {
  const total = devices.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard title="Device Analytics" subtitle="Mobile, desktop, and tablet breakdown">
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={devices}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              animationDuration={700}
            >
              {devices.map((_, index) => (
                <Cell key={index} fill={CHART_PALETTE[index % CHART_PALETTE.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={chartTooltipStyle(isDark)}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString("en-IN")} (${Math.round((value / total) * 100)}%)`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-[#0F172A] dark:text-dark-text-primary">{total.toLocaleString("en-IN")}</p>
          <p className="text-[10px] uppercase tracking-wide text-text-tertiary">Total users</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {devices.map((device, i) => (
          <span key={device.name} className="inline-flex items-center gap-1.5 text-xs font-medium">
            <span className="size-2 rounded-full" style={{ backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] }} />
            {device.name}
          </span>
        ))}
      </div>
    </ChartCard>
  );
}
