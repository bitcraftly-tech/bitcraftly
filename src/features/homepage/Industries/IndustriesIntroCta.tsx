import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/navigation";

interface IndustriesIntroCtaProps {
  className?: string;
}

export function IndustriesIntroCta({ className }: IndustriesIntroCtaProps) {
  return (
    <Link
      href={ROUTES.industries}
      className={cn(
        "group inline-flex items-center gap-[6px] no-underline",
        "font-sans text-[15px] font-semibold text-primary",
        "rounded-sm transition-colors duration-[var(--duration-fast)]",
        "hover:text-primary-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      View Industries
      <Icon
        name="arrow-right"
        size="sm"
        aria-hidden
        className={cn(
          "h-[14px] w-[14px]",
          "transition-transform duration-[var(--duration-normal)]",
          "group-hover:translate-x-[3px]",
        )}
      />
    </Link>
  );
}
