'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { IconName } from '@/components/ui/icon';
import { Icon } from '@/components/ui/icon';
import { IconBox } from '@/components/ui/icon-box';
import type { SiteNavLink } from '@/constants/navigation';
import {
  getSiteNavChildren,
  hasMegaMenu,
  isNavLinkActive,
  toNavChildLink,
} from '@/constants/navigation';
import { cn } from '@/lib/cn';

interface MobileNavAccordionProps {
  links: readonly SiteNavLink[];
  pathname: string;
  onNavigate: () => void;
}

function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function MobileNavAccordion({ links, pathname, onNavigate }: MobileNavAccordionProps) {
  const [openHref, setOpenHref] = useState<string | null>(null);

  return (
    <nav className="header-mobile-nav" aria-label="Primary">
      {links.map((link, index) => {
        const hasChildren = hasMegaMenu(link);
        const isActive = isNavLinkActive(pathname, link.href);
        const isOpen = openHref === link.href;
        const flatChildren = getSiteNavChildren(link);
        const indexLabel = padIndex(index);
        const childCount = hasChildren
          ? link.groups?.reduce((total, group) => total + group.items.length, 0) ||
            flatChildren.length
          : 0;

        if (!hasChildren) {
          return (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'header-mobile-nav__tile header-mobile-nav__tile--solo',
                isActive && 'is-active',
              )}
            >
              <span className="header-mobile-nav__tile-index" aria-hidden>
                {indexLabel}
              </span>
              <span className="header-mobile-nav__tile-body">
                <span className="header-mobile-nav__tile-title">{link.label}</span>
                {link.description ? (
                  <span className="header-mobile-nav__tile-desc">{link.description}</span>
                ) : null}
              </span>
              <span className="header-mobile-nav__tile-action" aria-hidden>
                <Icon name="arrow-up-right" size="sm" className="h-[15px] w-[15px]" />
              </span>
            </Link>
          );
        }

        const panelId = `mobile-accordion-${link.href.replace(/\W+/g, '-')}`;

        return (
          <div
            key={`${link.label}-${link.href}`}
            className={cn(
              'header-mobile-nav__section',
              isOpen && 'is-open',
              isActive && 'is-active',
            )}
          >
            <button
              type="button"
              className={cn('header-mobile-nav__tile', (isActive || isOpen) && 'is-active')}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenHref((current) => (current === link.href ? null : link.href))}
            >
              <span className="header-mobile-nav__tile-index" aria-hidden>
                {indexLabel}
              </span>
              <span className="header-mobile-nav__tile-body">
                <span className="header-mobile-nav__tile-title">{link.label}</span>
                {link.description ? (
                  <span className="header-mobile-nav__tile-desc">{link.description}</span>
                ) : null}
                <span className="header-mobile-nav__tile-meta">
                  {childCount > 0 ? `${childCount} destinations` : 'Browse section'}
                </span>
              </span>
              <span className="header-mobile-nav__tile-action" aria-hidden>
                <Icon
                  name="chevron-down"
                  size="sm"
                  className={cn(
                    'header-mobile-nav__chevron h-[16px] w-[16px]',
                    isOpen && 'is-open',
                  )}
                />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-label={`${link.label} links`}
              hidden={!isOpen}
              className="header-mobile-nav__panel"
            >
              {isOpen ? (
                <>
                  {link.groups?.length
                    ? link.groups.map((group) => (
                        <div key={group.id} className="header-mobile-nav__group">
                          <p className="header-mobile-nav__group-title">{group.title}</p>
                          {group.items.map((item) => {
                            const child = toNavChildLink(item, link.href);
                            return (
                              <MobileChildLink
                                key={child.href}
                                href={child.href}
                                label={child.label}
                                description={child.description}
                                icon={child.icon}
                                onNavigate={onNavigate}
                              />
                            );
                          })}
                        </div>
                      ))
                    : flatChildren.map((child) => (
                        <MobileChildLink
                          key={child.href}
                          href={child.href}
                          label={child.label}
                          description={child.description}
                          icon={child.icon}
                          onNavigate={onNavigate}
                        />
                      ))}

                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="header-mobile-nav__view-all"
                  >
                    <span>{link.viewAllLabel ?? `View all ${link.label.toLowerCase()}`}</span>
                    <Icon
                      name="arrow-up-right"
                      size="sm"
                      aria-hidden
                      className="h-[14px] w-[14px]"
                    />
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function MobileChildLink({
  href,
  label,
  description,
  icon,
  onNavigate,
}: {
  href: string;
  label: string;
  description: string;
  icon: IconName;
  onNavigate: () => void;
}) {
  return (
    <Link href={href} onClick={onNavigate} className="header-mobile-nav__child">
      <IconBox icon={icon} size="sm" variant="default" />
      <span className="min-w-0">
        <span className="header-mobile-nav__child-title">{label}</span>
        <span className="header-mobile-nav__child-desc">{description}</span>
      </span>
    </Link>
  );
}
