import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';

interface RecommendationAction {
  readonly label: string;
  readonly href: string;
  readonly primary?: boolean;
}

interface RecommendationActionsProps {
  readonly actions: readonly RecommendationAction[];
}

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  fullWidth: true,
  className: 'group h-[44px]',
});

const secondaryCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'md',
  fullWidth: true,
  className: 'h-[44px]',
});

export function RecommendationActions({ actions }: RecommendationActionsProps) {
  return (
    <div className="ae-result-card__actions">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={action.primary ? primaryCtaClassName : secondaryCtaClassName}
        >
          {action.primary ? (
            <>
              <span>{action.label}</span>
              <ButtonArrow className="text-[14px]" />
            </>
          ) : (
            action.label
          )}
        </Link>
      ))}
    </div>
  );
}
