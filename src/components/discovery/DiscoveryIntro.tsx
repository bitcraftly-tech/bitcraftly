import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { DISCOVERY_INTRO } from './discovery.content';

const startClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] min-w-[180px] px-[22px]',
});

interface DiscoveryIntroProps {
  readonly onStart: () => void;
}

export function DiscoveryIntro({ onStart }: DiscoveryIntroProps) {
  return (
    <div className="df-card">
      <p className="df-eyebrow">{DISCOVERY_INTRO.eyebrow}</p>
      <h2 className="df-title">{DISCOVERY_INTRO.title}</h2>
      <p className="df-desc">{DISCOVERY_INTRO.description}</p>

      <div className="df-actions">
        <button type="button" className={startClassName} onClick={onStart}>
          <span>{DISCOVERY_INTRO.startLabel}</span>
          <ButtonArrow className="text-[15px]" />
        </button>
      </div>

      <ul className="df-trust">
        {DISCOVERY_INTRO.trustItems.map((item) => (
          <li key={item}>
            <Icon name="check" size="sm" aria-hidden className="h-[14px] w-[14px]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
