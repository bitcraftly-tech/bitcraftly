import { WIZARD_ANALYZING } from './wizard.content';

export function WizardAnalyzing() {
  return (
    <div className="pw-card pw-analyzing" aria-live="polite" aria-busy="true">
      <p className="pw-eyebrow">AI project consultant</p>
      <h2 className="pw-title">{WIZARD_ANALYZING.title}</h2>
      <div className="pw-analyzing__dots" aria-hidden>
        <span className="pw-analyzing__dot" />
        <span className="pw-analyzing__dot" />
        <span className="pw-analyzing__dot" />
      </div>
      <ul className="pw-analyzing__list">
        {WIZARD_ANALYZING.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
