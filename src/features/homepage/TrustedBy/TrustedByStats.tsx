import { cn } from "@/lib/cn";
import { TRUSTED_BY_STATS } from "./trusted-by.constants";

export function TrustedByStats({ className }: { className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-[var(--space-3)] gap-y-[var(--space-3)]",
        "sm:grid-cols-4 sm:gap-x-[var(--space-4)]",
        className,
      )}
    >
      {TRUSTED_BY_STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt
            className={cn(
              "font-sans text-[1.75rem] font-bold leading-none tracking-tight text-foreground",
              "sm:text-[2rem]",
            )}
          >
            {stat.value}
          </dt>
          <dd
            className={cn(
              "mt-[var(--space-1)] font-sans text-[length:var(--font-size-sm)]",
              "font-[var(--font-weight-normal)] text-muted-foreground",
            )}
          >
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
