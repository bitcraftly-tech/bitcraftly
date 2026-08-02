import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { DesktopNavSlot } from './DesktopNavSlot';
import { HEADER_CTA_PRIMARY, HEADER_CTA_SECONDARY } from './header.constants';
import { HeaderElement } from './HeaderElement';
import { Logo } from './Logo';
import { MobileNavSlot } from './MobileNavSlot';

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  className: 'group header-cta-primary h-[44px] shrink-0 px-[16px] text-[13px]',
});

const secondaryCtaClassName = bcButtonClassName({
  variant: 'ghost',
  size: 'md',
  className: 'header-cta-secondary h-[44px] shrink-0 px-[12px] text-[13px]',
});

/**
 * Marketing header — full desktop chrome when the header container is wide enough.
 */
export function HeaderSection() {
  return (
    <HeaderElement>
      <div className="header-bar">
        <div className="header-bar__brand">
          <Logo priority />
        </div>

        <div className="header-bar__nav">
          <DesktopNavSlot />
        </div>

        <div className="header-bar__actions">
          <div className="header-bar__ctas">
            <Link href={HEADER_CTA_SECONDARY.href} className={secondaryCtaClassName}>
              {HEADER_CTA_SECONDARY.label}
            </Link>
            <Link href={HEADER_CTA_PRIMARY.href} className={primaryCtaClassName}>
              <span>{HEADER_CTA_PRIMARY.label}</span>
              <ButtonArrow className="text-[14px]" />
            </Link>
          </div>

          <div className="header-bar__mobile">
            <MobileNavSlot />
          </div>
        </div>
      </div>
    </HeaderElement>
  );
}
