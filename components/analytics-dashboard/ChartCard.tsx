import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  height?: string;
};

export default function ChartCard({
  title,
  subtitle,
  children,
  className = "",
  action,
  height = "h-72",
}: ChartCardProps) {
  return (
    <section
      className={`rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">{title}</h3>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className={`mt-4 ${height}`}>{children}</div>
    </section>
  );
}
