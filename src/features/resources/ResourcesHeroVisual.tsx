/**
 * Decorative resources hero visual — library / playbook stack (CSS-only).
 */
export function ResourcesHeroVisual() {
  return (
    <div className="resources-hero-visual" aria-hidden>
      <div className="resources-hero-visual__glow" />
      <div className="resources-hero-visual__stack">
        <article className="resources-hero-visual__card resources-hero-visual__card--back">
          <span className="resources-hero-visual__chip">Docs</span>
          <span className="resources-hero-visual__line" />
          <span className="resources-hero-visual__line resources-hero-visual__line--short" />
        </article>
        <article className="resources-hero-visual__card resources-hero-visual__card--mid">
          <span className="resources-hero-visual__chip resources-hero-visual__chip--accent">
            Guides
          </span>
          <span className="resources-hero-visual__line" />
          <span className="resources-hero-visual__line resources-hero-visual__line--wide" />
          <span className="resources-hero-visual__line resources-hero-visual__line--short" />
        </article>
        <article className="resources-hero-visual__card resources-hero-visual__card--front">
          <span className="resources-hero-visual__chip resources-hero-visual__chip--success">
            FAQ
          </span>
          <span className="resources-hero-visual__title">Playbooks & notes</span>
          <span className="resources-hero-visual__line" />
          <span className="resources-hero-visual__line resources-hero-visual__line--short" />
          <div className="resources-hero-visual__meta">
            <span />
            <span />
            <span />
          </div>
        </article>
      </div>
    </div>
  );
}
