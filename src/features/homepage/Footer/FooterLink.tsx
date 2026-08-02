import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

const footerLinkClassName = cn(
  'footer-link footer-focus-ring inline-flex items-start',
  'no-underline rounded-[var(--token-radius-sm)]',
);

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export function FooterLink({ href, children, className, external = false }: FooterLinkProps) {
  if (external || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={cn(footerLinkClassName, className)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(footerLinkClassName, className)}>
      {children}
    </Link>
  );
}
