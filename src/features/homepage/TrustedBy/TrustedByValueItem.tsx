import { cn } from "@/lib/cn";
import { TrustedByIcon } from "./trusted-by-icons";
import type { TrustedByValue } from "./trusted-by.types";

interface TrustedByValueItemProps {
  value: TrustedByValue;
  className?: string;
}

export function TrustedByValueItem({
  value,
  className,
}: TrustedByValueItemProps) {
  return (
    <div
      className={cn(
        "trusted-by-item flex items-center gap-[14px]",
        className,
      )}
    >
      <TrustedByIcon id={value.icon} className="text-primary" />
      <span
        className={cn(
          "font-sans text-[13px] font-semibold leading-[1.3]",
          "tracking-[-0.01em] text-foreground",
          "sm:text-[14px]",
        )}
      >
        <span className="block whitespace-nowrap">{value.line1}</span>
        <span className="block whitespace-nowrap">{value.line2}</span>
      </span>
    </div>
  );
}
