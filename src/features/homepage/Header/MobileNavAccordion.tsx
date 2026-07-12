"use client";

import { useState } from "react";
import Link from "next/link";
import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Text } from "@/components/ui/typography";
import type { SiteNavLink } from "@/constants/navigation";
import {
  getSiteNavChildren,
  hasMegaMenu,
  isNavLinkActive,
  toNavChildLink,
} from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { NavigationLink } from "./NavigationLink";

interface MobileNavAccordionProps {
  links: readonly SiteNavLink[];
  pathname: string;
  onNavigate: () => void;
}

export function MobileNavAccordion({
  links,
  pathname,
  onNavigate,
}: MobileNavAccordionProps) {
  const [openHref, setOpenHref] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-[var(--space-1)]">
      {links.map((link) => {
        const hasChildren = hasMegaMenu(link);
        const isActive = isNavLinkActive(pathname, link.href);
        const isOpen = openHref === link.href;
        const flatChildren = getSiteNavChildren(link);

        if (!hasChildren) {
          return (
            <NavigationLink
              key={`${link.label}-${link.href}`}
              href={link.href}
              label={link.label}
              isActive={isActive}
              onClick={onNavigate}
              className="px-[var(--space-2)] py-[var(--space-2)] text-base after:hidden"
            />
          );
        }

        return (
          <div key={`${link.label}-${link.href}`} className="flex flex-col">
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-[var(--space-2)] py-[var(--space-2)]",
                "text-left text-base font-medium transition-colors duration-200",
                "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive || isOpen ? "text-primary" : "text-foreground",
              )}
              aria-expanded={isOpen}
              aria-controls={`mobile-accordion-${link.href}`}
              onClick={() =>
                setOpenHref((current) =>
                  current === link.href ? null : link.href,
                )
              }
            >
              <span>{link.label}</span>
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden
                className={cn(
                  "h-[16px] w-[16px] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {isOpen ? (
              <div
                id={`mobile-accordion-${link.href}`}
                role="region"
                aria-label={`${link.label} links`}
                className="mt-[4px] flex flex-col gap-[10px] border-l border-border pl-[12px]"
              >
                {link.groups?.length
                  ? link.groups.map((group) => (
                      <div key={group.id} className="flex flex-col gap-[4px]">
                        <p className="px-[10px] pt-[4px] font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {group.title}
                        </p>
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
                  className="px-[10px] py-[8px] text-[13px] font-semibold text-primary no-underline"
                >
                  {link.viewAllLabel ?? `View all ${link.label.toLowerCase()}`}
                </Link>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
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
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-start gap-[10px] rounded-[10px] p-[10px] no-underline",
        "transition-colors duration-200 hover:bg-surface",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      )}
    >
      <IconBox icon={icon} size="sm" variant="default" />
      <span className="min-w-0">
        <span className="block font-sans text-[length:var(--font-size-sm)] font-[var(--font-weight-semibold)] text-foreground">
          {label}
        </span>
        <Text
          as="span"
          size="sm"
          muted
          className="mt-[2px] block leading-snug"
        >
          {description}
        </Text>
      </span>
    </Link>
  );
}
