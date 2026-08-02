import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { FOOTER_BRAND } from './footer.constants';
import { FooterSocial } from './FooterSocial';

const LOGO_MARK_H = 44;
const LOGO_MARK_W = Math.round(LOGO_MARK_H * (377 / 255));

export function FooterBrand({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex w-full max-w-[280px] min-w-0 flex-col gap-[var(--space-2)]', className)}
    >
      <Link
        href="/"
        aria-label="Bitcraftly home"
        className={cn(
          'footer-focus-ring group inline-flex w-fit max-w-full items-end gap-[10px] no-underline',
          'rounded-[var(--token-radius-md)]',
          'transition-opacity duration-[var(--duration-fast)] hover:opacity-90',
        )}
      >
        <span
          className="relative shrink-0 bg-transparent"
          style={{ height: LOGO_MARK_H, width: LOGO_MARK_W }}
        >
          <Image
            src="/logo.png"
            alt=""
            fill
            loading="lazy"
            quality={80}
            unoptimized
            sizes={`${LOGO_MARK_W}px`}
            className="object-contain object-left"
          />
        </span>
        <span className="flex min-w-0 flex-col justify-end gap-[5px] pb-px">
          <span className="whitespace-nowrap font-sans text-[18px] font-bold leading-none tracking-[-0.03em] text-white">
            Bitcraftly
          </span>
          <span className="max-w-[200px] truncate font-sans text-[10px] font-medium leading-none tracking-[0.01em] text-[#8eabc0]">
            AI & Digital Engineering Partner
          </span>
        </span>
      </Link>

      <p
        className={cn(
          'footer-muted',
          'font-sans text-[13px] font-[var(--font-weight-normal)]',
          'leading-[var(--line-height-snug)]',
        )}
      >
        {FOOTER_BRAND.description}
      </p>

      <FooterSocial />
    </div>
  );
}
