import Link from "next/link";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/#hero"
      className={cn(
        "inline-flex min-w-0 shrink-0 items-center gap-[var(--space-2)]",
        "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          "header-brand-gradient text-base font-bold text-primary-foreground shadow-md",
        )}
      >
        B
      </span>
      <Text as="span" size="lg" className="truncate font-bold tracking-tight">
        Bitcraftly
      </Text>
    </Link>
  );
}
