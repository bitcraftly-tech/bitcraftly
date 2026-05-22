"use client";

import { Fragment } from "react";

import { FacebookIcon, InstagramIcon } from "@/components/dayal/DayalSocialIcons";
import { DAYAL } from "@/lib/dayal/data";

const SOCIAL = [
  {
    name: "Facebook",
    href: DAYAL.facebook,
    Icon: FacebookIcon,
    className: "dayal-social-group__link dayal-social-group__link--facebook",
  },
  {
    name: "Instagram",
    href: DAYAL.instagram,
    Icon: InstagramIcon,
    className: "dayal-social-group__link dayal-social-group__link--instagram",
  },
] as const;

function SocialIconRow() {
  return (
    <div className="dayal-social-group" role="group" aria-label="Social media">
      {SOCIAL.map((item, index) => {
        const Icon = item.Icon;
        return (
          <Fragment key={item.name}>
            {index > 0 ? <span className="dayal-social-group__divider" aria-hidden /> : null}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={item.className}
              aria-label={`Follow Dayal Builders on ${item.name}`}
              title={item.name}
            >
              <Icon className="dayal-social-group__icon" aria-hidden />
            </a>
          </Fragment>
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
      <div className="mt-2 border-t border-[#0b1633]/8 pt-3">
        <p className="dayal-eyebrow tracking-[0.22em]">Follow Us</p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c6478]">
          Join our community for project updates &amp; virtual tours.
        </p>
        <div className="mt-3">
          <SocialIconRow />
        </div>
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
