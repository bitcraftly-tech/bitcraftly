'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';
import { usePathname } from 'next/navigation';

import { newTabProps } from '@/lib/newTabLink';
import { parseSectionHref, scrollToElementWithRetry } from '@/lib/scrollToMarketingSection';

type Props = ComponentProps<typeof Link>;

/** Showcase pages: in-page #sections scroll smoothly (no hash URL); routes open in a new tab when external. */
export default function ShowcaseLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const hrefStr = typeof href === 'string' ? href : '';
  const parsed = parseSectionHref(hrefStr);
  const isInPageSection = parsed && !parsed.path;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isInPageSection) {
      event.preventDefault();
      scrollToElementWithRetry(parsed.sectionId);
    }
    onClick?.(event);
  };

  if (isInPageSection) {
    return <a href={pathname} onClick={handleClick} {...props} />;
  }

  return <Link href={href} onClick={onClick} {...props} {...newTabProps(hrefStr)} />;
}
