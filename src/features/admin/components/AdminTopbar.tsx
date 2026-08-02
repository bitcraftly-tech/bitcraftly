'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ADMIN_AUTH_PREVIEW, ADMIN_META } from '../admin.config';
import { ROUTES } from '@/constants/navigation';

interface AdminTopbarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function AdminTopbar({ onMenuToggle, menuOpen }: AdminTopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar__start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="admin-topbar__menu"
          aria-expanded={menuOpen}
          aria-controls="admin-sidebar"
          onClick={onMenuToggle}
        >
          <Icon name="menu" size="sm" aria-hidden />
          <span className="sr-only">{menuOpen ? 'Close navigation' : 'Open navigation'}</span>
          Menu
        </Button>
        <p className="admin-topbar__product">
          {ADMIN_META.productName}
          <span className="admin-topbar__version">{ADMIN_META.version}</span>
        </p>
      </div>

      <div className="admin-topbar__end">
        <span className="admin-topbar__role" title="Preview role">
          Role: {ADMIN_AUTH_PREVIEW.role}
        </span>
        <Link href={ROUTES.home} className="admin-topbar__site-link">
          View site
          <Icon name="arrow-up-right" size="sm" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
