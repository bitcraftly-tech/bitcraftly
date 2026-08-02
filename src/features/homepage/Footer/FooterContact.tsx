import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { FOOTER_CONTACT_ITEMS } from './footer.constants';
import { FooterHeading } from './FooterHeading';
import { FooterLink } from './FooterLink';
import type { FooterContactItem } from './footer.types';

export function FooterContact({ className }: { className?: string }) {
  const headingId = 'footer-contact-heading';

  return (
    <section aria-labelledby={headingId} className={cn('min-w-0', className)}>
      <FooterHeading id={headingId}>Contact Us</FooterHeading>
      <ul className="flex flex-col gap-[var(--space-0-5)]">
        {FOOTER_CONTACT_ITEMS.map((item) => (
          <li key={item.id}>
            <ContactItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactItem({ item }: { item: FooterContactItem }) {
  return (
    <FooterLink href={item.href} external={item.external} className="gap-[var(--space-0-5)]">
      <Icon
        name={item.icon}
        size="sm"
        aria-hidden
        className="mt-[1px] h-[13px] w-[13px] shrink-0 text-inverse-foreground"
      />
      <span>{item.label}</span>
    </FooterLink>
  );
}
