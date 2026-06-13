"use client";

import { ArrowUpRight, MousePointerClick, Eye } from "lucide-react";

import type { ServicePerformance } from "@/lib/analytics-dashboard/types";

type ServicePerformanceCardsProps = {
  services: ServicePerformance[];
};

export default function ServicePerformanceCards({ services }: ServicePerformanceCardsProps) {
  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">Service Performance</h3>
      <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
        Views, clicks, and conversions by package
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.name}
            className="group rounded-xl border border-border-primary p-4 transition-all duration-300 hover:border-[#2563EB]/40 hover:shadow-md dark:border-dark-border-primary"
          >
            <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{service.name}</h4>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-bg-secondary p-2.5 dark:bg-dark-bg-secondary">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-text-tertiary">
                  <Eye className="size-3" /> Views
                </p>
                <p className="mt-1 text-lg font-bold text-[#0F172A] dark:text-dark-text-primary">
                  {service.views.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-lg bg-bg-secondary p-2.5 dark:bg-dark-bg-secondary">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-text-tertiary">
                  <MousePointerClick className="size-3" /> Clicks
                </p>
                <p className="mt-1 text-lg font-bold text-[#2563EB]">{service.clicks.toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-lg bg-[#22C55E]/10 p-2.5">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-[#16A34A]">
                  <ArrowUpRight className="size-3" /> Conv.
                </p>
                <p className="mt-1 text-lg font-bold text-[#16A34A]">{service.conversions}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
