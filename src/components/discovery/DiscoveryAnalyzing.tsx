import { DISCOVERY_ANALYZING } from './discovery.content';

export function DiscoveryAnalyzing() {
  return (
    <div className="df-card df-analyzing" aria-live="polite" aria-busy="true">
      <p className="df-eyebrow">AI consultant</p>
      <h2 className="df-title">{DISCOVERY_ANALYZING.title}</h2>
      <div className="df-analyzing__dots" aria-hidden>
        <span className="df-analyzing__dot" />
        <span className="df-analyzing__dot" />
        <span className="df-analyzing__dot" />
      </div>
      <ul className="df-analyzing__list">
        {DISCOVERY_ANALYZING.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
