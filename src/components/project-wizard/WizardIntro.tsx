import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { WIZARD_INTRO } from './wizard.content';

const startClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] min-w-[180px] px-[22px]',
});

interface WizardIntroProps {
  readonly onStart: () => void;
}

export function WizardIntro({ onStart }: WizardIntroProps) {
  return (
    <div className="pw-card">
      <p className="pw-eyebrow">{WIZARD_INTRO.eyebrow}</p>
      <h2 className="pw-title">{WIZARD_INTRO.title}</h2>
      <p className="pw-desc">{WIZARD_INTRO.description}</p>

      <div className="pw-actions">
        <button type="button" className={startClassName} onClick={onStart}>
          <span>{WIZARD_INTRO.startLabel}</span>
          <ButtonArrow className="text-[15px]" />
        </button>
      </div>

      <ul className="pw-trust">
        {WIZARD_INTRO.trustItems.map((item) => (
          <li key={item}>
            <Icon name="check" size="sm" aria-hidden className="h-[14px] w-[14px]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
