import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavigationLinkProps } from "./header.types";

export function NavigationLink({
  href,
  label,
  isActive = false,
  onClick,
  className,
}: NavigationLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-lg px-[var(--space-2)] py-[var(--space-1)]",
        "text-sm font-medium text-muted-foreground transition-colors",
        "hover:bg-surface hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive && "bg-surface text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}
