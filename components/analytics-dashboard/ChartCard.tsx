import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <section
      className={`rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card ${className}`}
    >
      <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
      <div className="mt-4 h-64">{children}</div>
    </section>
  );
}
