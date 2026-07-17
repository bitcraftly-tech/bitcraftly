"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { ADMIN_NAV } from "../admin.nav";
import { ADMIN_ROUTES } from "../admin.routes";
import { cn } from "@/lib/cn";

interface AdminSidebarProps {
  open: boolean;
  onNavigate?: () => void;
}

function isActive(pathname: string, href: string): boolean {
  if (href === ADMIN_ROUTES.root) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ open, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id="admin-sidebar"
      className={cn("admin-sidebar", open && "admin-sidebar--open")}
      aria-label="Admin navigation"
    >
      <div className="admin-sidebar__brand">
        <Link
          href={ADMIN_ROUTES.root}
          className="admin-sidebar__brand-link"
          onClick={onNavigate}
        >
          <Icon name="layout-grid" size="sm" aria-hidden />
          <span>Bitcraftly Admin</span>
        </Link>
        <p className="admin-sidebar__env">UI architecture preview</p>
      </div>

      <nav aria-label="Admin sections">
        <ul className="admin-sidebar__nav">
          {ADMIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "admin-sidebar__link",
                    active && "admin-sidebar__link--active",
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                >
                  <Icon name={item.icon} size="sm" aria-hidden />
                  <span className="admin-sidebar__link-text">
                    <span className="admin-sidebar__link-label">{item.label}</span>
                    <span className="admin-sidebar__link-desc">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="admin-sidebar__footnote">
        Auth + API deferred. Robots disallow <code>/admin/</code>.
      </p>
    </aside>
  );
}
