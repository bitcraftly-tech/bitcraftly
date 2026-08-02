import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/** Mark taller than type; text block bottom-aligns with mark (ref lockup). */
const LOGO_MARK_H = 52;

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  const markW = Math.round(LOGO_MARK_H * (377 / 255));

  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex max-w-full min-w-0 items-end gap-[12px]',
        'text-foreground no-underline hover:no-underline hover:text-foreground',
        'rounded-md transition-opacity duration-200 hover:opacity-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <span
        className="relative shrink-0 bg-transparent transition-transform duration-200 group-hover:scale-[1.03]"
        style={{ height: LOGO_MARK_H, width: markW }}
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          priority={priority}
          quality={80}
          unoptimized
          sizes={`${markW}px`}
          className="object-contain object-left"
        />
      </span>
      <span className="flex min-w-0 flex-col justify-end gap-[6px] pb-px">
        <span className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.03em] text-[#000726]">
          Bitcraftly
        </span>
        <span className="header-logo-tagline max-w-[260px] truncate font-sans text-[11px] font-medium leading-none tracking-[0.01em] text-[#346c84]">
          AI & Digital Engineering Partner
        </span>
      </span>
    </Link>
  );
}
