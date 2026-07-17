import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-w-0 shrink-0 items-center gap-[12px]",
        "text-foreground no-underline hover:no-underline hover:text-foreground",
        "rounded-md transition-opacity duration-200 hover:opacity-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src="/brand/icon.webp"
        alt=""
        width={44}
        height={44}
        priority={priority}
        quality={75}
        className="h-[44px] w-[44px] shrink-0"
      />
      <span className="flex min-w-0 max-w-[200px] flex-col justify-center gap-[2px] xl:max-w-[240px]">
        <span className="truncate font-sans text-[18px] font-bold leading-none tracking-[-0.02em] text-foreground">
          Bitcraftly
        </span>
        <span className="truncate font-sans text-[13px] font-normal leading-tight text-muted-foreground">
          AI & Digital Engineering Partner
        </span>
      </span>
    </Link>
  );
}
