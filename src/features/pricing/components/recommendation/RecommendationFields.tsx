import { Icon } from '@/components/ui/icon';
import type { IconName } from '@/components/ui/icon';

interface RecommendationFieldProps {
  readonly label: string;
  readonly value: string;
  readonly icon: IconName;
  readonly emphasize?: boolean;
  readonly fullWidth?: boolean;
}

export function RecommendationField({
  label,
  value,
  icon,
  emphasize = false,
  fullWidth = false,
}: RecommendationFieldProps) {
  return (
    <div
      className={
        fullWidth ? 'ae-result-card__field ae-result-card__field--full' : 'ae-result-card__field'
      }
    >
      <p className="ae-result-card__label">
        <Icon name={icon} size="sm" aria-hidden className="h-[12px] w-[12px]" />
        {label}
      </p>
      <p
        className={
          emphasize ? 'ae-result-card__value ae-result-card__value--lg' : 'ae-result-card__value'
        }
      >
        {value}
      </p>
    </div>
  );
}

interface RecommendationChipsProps {
  readonly label: string;
  readonly icon: IconName;
  readonly items: readonly string[];
}

export function RecommendationChips({ label, icon, items }: RecommendationChipsProps) {
  return (
    <div className="ae-result-card__field ae-result-card__field--full">
      <p className="ae-result-card__label">
        <Icon name={icon} size="sm" aria-hidden className="h-[12px] w-[12px]" />
        {label}
      </p>
      <ul className="ae-result-card__chips">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
