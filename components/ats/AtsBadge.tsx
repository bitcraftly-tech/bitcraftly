type AtsBadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "purple" | "navy" | "remote" | "hybrid" | "success" | "muted";
  className?: string;
};

const variants: Record<NonNullable<AtsBadgeProps["variant"]>, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-dark-bg-secondary dark:text-dark-text-secondary",
  purple: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  navy: "bg-slate-800 text-white dark:bg-slate-700",
  remote: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  hybrid: "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  success: "bg-emerald-50 text-emerald-700",
  muted: "bg-[#f1f5f9] text-[#64748b] dark:bg-dark-bg-secondary dark:text-dark-text-tertiary",
};

export default function AtsBadge({ children, variant = "default", className = "" }: AtsBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
