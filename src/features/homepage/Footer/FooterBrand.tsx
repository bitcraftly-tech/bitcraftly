import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOOTER_BRAND } from "./footer.constants";
import { FooterSocial } from "./FooterSocial";

export function FooterBrand({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[240px] min-w-0 flex-col gap-[var(--space-2)]",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Bitcraftly home"
        className={cn(
          "footer-focus-ring inline-flex w-fit items-center gap-[var(--space-1)] no-underline",
          "rounded-[var(--token-radius-md)]",
          "transition-opacity duration-[var(--duration-fast)] hover:opacity-90",
        )}
      >
        <Image
          src="/brand/icon.webp"
          alt=""
          width={36}
          height={36}
          loading="lazy"
          quality={75}
          className="h-[36px] w-[36px] shrink-0"
        />
        <span
          className={cn(
            "font-sans text-[22px] font-[var(--font-weight-bold)]",
            "leading-none tracking-[-0.02em] text-inverse-foreground",
          )}
        >
          Bitcraftly
        </span>
      </Link>

      <p
        className={cn(
          "footer-muted",
          "font-sans text-[13px] font-[var(--font-weight-normal)]",
          "leading-[var(--line-height-snug)]",
        )}
      >
        {FOOTER_BRAND.description}
      </p>

      <FooterSocial />
    </div>
  );
}
