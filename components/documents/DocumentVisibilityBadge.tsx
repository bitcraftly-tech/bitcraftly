import type { DocumentVisibility } from "@/types/documents";

const STYLES: Record<DocumentVisibility, string> = {
  PUBLIC: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  INTERNAL: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-700",
  FUTURE_PUBLIC: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
};

const LABELS: Record<DocumentVisibility, string> = {
  PUBLIC: "Public",
  INTERNAL: "Internal",
  FUTURE_PUBLIC: "Future public",
};

type DocumentVisibilityBadgeProps = {
  visibility: DocumentVisibility;
  className?: string;
};

export default function DocumentVisibilityBadge({ visibility, className = "" }: DocumentVisibilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${STYLES[visibility]} ${className}`}
    >
      {LABELS[visibility]}
    </span>
  );
}
