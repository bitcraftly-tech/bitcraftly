'use client';

import { FacebookIcon, InstagramIcon } from '@/components/dayal/DayalSocialIcons';
import { DAYAL } from '@/lib/dayal/data';

const SOCIAL = [
  {
    name: 'Facebook',
    href: DAYAL.facebook,
    Icon: FacebookIcon,
    className: 'dayal-social-pill dayal-social-pill--facebook',
  },
  {
    name: 'Instagram',
    href: DAYAL.instagram,
    Icon: InstagramIcon,
    className: 'dayal-social-pill dayal-social-pill--instagram',
  },
] as const;

function SocialIconRow() {
  return (
    <div className="dayal-social-pills" role="group" aria-label="Social media">
      {SOCIAL.map((item) => {
        const Icon = item.Icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={item.className}
            aria-label={`Follow Dayal Builders on ${item.name}`}
            title={item.name}
          >
            <Icon className="dayal-social-pill__icon" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}

type Props = {
  /** Compact row layout for footer brand column */
  compact?: boolean;
};

export default function DayalFollowUs({ compact = false }: Props) {
  if (compact) {
    return (
      <div className="dayal-footer__social">
        <p className="dayal-footer__social-label">Follow us</p>
        <SocialIconRow />
      </div>
    );
  }

  return (
    <div>
      <p className="dayal-eyebrow tracking-[0.22em]">Follow Us</p>
      <p className="mt-3 text-sm leading-relaxed text-[#5c6478]">
        Join our community for project updates &amp; virtual tours.
      </p>
      <div className="mt-4">
        <SocialIconRow />
      </div>
    </div>
  );
}
