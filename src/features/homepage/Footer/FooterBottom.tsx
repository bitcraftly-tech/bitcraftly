import { cn } from "@/lib/cn";
import { FOOTER_COPYRIGHT } from "./footer.constants";

export function FooterBottom({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center text-center", className)}>
      <p
        className={cn(
          "footer-muted",
          "font-sans text-[12px] font-[var(--font-weight-normal)]",
          "leading-[var(--line-height-normal)]",
        )}
      >
        {FOOTER_COPYRIGHT}
      </p>
    </div>
  );
}
