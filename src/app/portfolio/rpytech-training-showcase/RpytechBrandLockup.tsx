import { RPYTECH } from '@/lib/rpytechShowcaseData';

import RpytechLogo from './RpytechLogo';

type RpytechBrandLockupProps = {
  footer?: boolean;
};

export default function RpytechBrandLockup({ footer = false }: RpytechBrandLockupProps) {
  return (
    <div className={`rpytech-logo${footer ? ' rpytech-logo--footer' : ''}`}>
      <RpytechLogo variant={footer ? 'footer' : 'nav'} priority={!footer} />
      <div className="rpytech-logo-text">
        <span className="rpytech-logo-title">
          <span className="rpytech-logo-mark">RPY</span>
          <span className="rpytech-logo-tech">Tech</span>
        </span>
        {footer ? (
          <span className="rpytech-logo-subtitle rpytech-logo-subtitle--stacked">
            {RPYTECH.trustNameLines.map((line) => (
              <span key={line} className="rpytech-logo-subtitle-line">
                {line}
              </span>
            ))}
          </span>
        ) : (
          <span
            className="rpytech-logo-subtitle rpytech-logo-subtitle--compact"
            title={RPYTECH.trustName}
          >
            {RPYTECH.trustTagline}
          </span>
        )}
      </div>
    </div>
  );
}
