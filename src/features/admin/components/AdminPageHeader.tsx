import { Button } from '@/components/ui/button';

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionDisabledReason?: string;
}

export function AdminPageHeader({
  title,
  description,
  actionLabel = 'Create new',
  actionDisabledReason = 'Mutations require backend wiring',
}: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header__copy">
        <h1 className="admin-page-header__title">{title}</h1>
        <p className="admin-page-header__description">{description}</p>
      </div>
      <div className="admin-page-header__actions">
        <Button
          type="button"
          variant="primary"
          size="md"
          disabled
          title={actionDisabledReason}
          aria-disabled="true"
        >
          {actionLabel}
        </Button>
        <p className="admin-page-header__hint">{actionDisabledReason}</p>
      </div>
    </header>
  );
}
