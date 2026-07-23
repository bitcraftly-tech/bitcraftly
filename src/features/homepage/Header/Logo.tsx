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
        "inline-flex max-w-full min-w-0 items-center gap-[8px] sm:gap-[10px]",
        "text-foreground no-underline hover:no-underline hover:text-foreground",
        "rounded-md transition-opacity duration-200 hover:opacity-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src="/brand/icon.webp"
        alt=""
        width={40}
        height={40}
        priority={priority}
        quality={75}
        className="h-[32px] w-[32px] shrink-0 sm:h-[36px] sm:w-[36px] xl:h-[40px] xl:w-[40px]"
      />
      <span className="flex min-w-0 flex-col justify-center gap-[2px]">
        <span className="whitespace-nowrap font-sans text-[16px] font-bold leading-none tracking-[-0.02em] text-foreground sm:text-[17px] xl:text-[18px]">
          Bitcraftly
        </span>
        <span className="truncate font-sans text-[11px] font-normal leading-tight text-muted-foreground sm:text-[12px] xl:text-[13px]">
          AI & Digital Engineering Partner
        </span>
      </span>
    </Link>
  );
}
