import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-5">
      <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{title}</h2>
      {description ? <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
