import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { FOOTER_SOCIAL_LINKS } from './footer.constants';
import type { FooterSocialLink } from './footer.types';

export function FooterSocial({ className }: { className?: string }) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-[var(--space-1)]', className)}
      aria-label="Social media"
    >
      {FOOTER_SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <SocialIconLink link={link} />
        </li>
      ))}
    </ul>
  );
}

function SocialIconLink({ link }: { link: FooterSocialLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn(
        'footer-social-link footer-focus-ring',
        'inline-flex size-[30px] items-center justify-center',
        'rounded-full',
      )}
    >
      <Icon name={link.icon} size="sm" aria-hidden className="h-[16px] w-[16px]" />
    </a>
  );
}
