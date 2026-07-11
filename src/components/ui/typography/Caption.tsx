import { cn } from "@/lib/cn";
import type { CaptionProps } from "./types";

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <span
      className={cn(
        "font-sans text-xs leading-normal text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
