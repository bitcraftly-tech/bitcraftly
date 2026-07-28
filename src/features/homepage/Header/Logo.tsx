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
        width={42}
        height={42}
        priority={priority}
        quality={75}
        className="h-[38px] w-[38px] shrink-0 sm:h-[40px] sm:w-[40px] xl:h-[42px] xl:w-[42px]"
      />
      <span className="flex min-w-0 flex-col justify-center gap-[2px]">
        <span className="whitespace-nowrap font-sans text-[18px] font-bold leading-none tracking-[-0.02em] text-foreground sm:text-[18px] xl:text-[19px]">
          Bitcraftly
        </span>
        <span className="truncate font-sans text-[12px] font-normal leading-tight text-muted-foreground sm:text-[12px] xl:text-[13px]">
          AI & Digital Engineering Partner
        </span>
      </span>
    </Link>
  );
}
