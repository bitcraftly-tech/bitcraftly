'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { navigateToMarketingSection } from '@/lib/scrollToMarketingSection';

const CLINIC_HOME = '/portfolio/clinic-healthcare-showcase';

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
};

/** Hash section links that work from clinic homepage and /ai demo routes. */
export default function ClinicSectionAnchor({ href, onClick, children, ...props }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const sectionId = href.startsWith('#') ? href.slice(1) : href;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith('#')) {
      event.preventDefault();
      navigateToMarketingSection({
        path: CLINIC_HOME,
        sectionId,
        pathname,
        push: (url, options) => {
          void router.push(url, options);
        },
      });
    }
    onClick?.(event);
  }

  return (
    <a
      href={href.startsWith('#') ? `${CLINIC_HOME}${href}` : href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
