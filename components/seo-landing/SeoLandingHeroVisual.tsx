/** CSS-only abstract hero visual — browser layers, device frame, enquiry flow cues. No stock images or fake metrics. */
export default function SeoLandingHeroVisual() {
  return (
    <div className="seo-hero-visual" aria-hidden>
      <div className="seo-hero-visual__glow" />
      <div className="seo-hero-visual__grid" />

      {/* Back browser — code / structure */}
      <div className="seo-hero-visual__browser seo-hero-visual__browser--back">
        <div className="seo-hero-visual__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="seo-hero-visual__browser-body">
          <div className="seo-hero-visual__code-line seo-hero-visual__code-line--long" />
          <div className="seo-hero-visual__code-line seo-hero-visual__code-line--med" />
          <div className="seo-hero-visual__code-line seo-hero-visual__code-line--short" />
          <div className="seo-hero-visual__code-block">
            <div className="seo-hero-visual__code-line seo-hero-visual__code-line--med" />
            <div className="seo-hero-visual__code-line seo-hero-visual__code-line--long" />
          </div>
        </div>
      </div>

      {/* Front browser — interface / conversion */}
      <div className="seo-hero-visual__browser seo-hero-visual__browser--front">
        <div className="seo-hero-visual__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="seo-hero-visual__browser-body seo-hero-visual__browser-body--ui">
          <div className="seo-hero-visual__nav-bar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="seo-hero-visual__hero-block">
            <div className="seo-hero-visual__headline-bar" />
            <div className="seo-hero-visual__subline-bar" />
            <div className="seo-hero-visual__cta-row">
              <span className="seo-hero-visual__cta seo-hero-visual__cta--primary">Consult</span>
              <span className="seo-hero-visual__cta seo-hero-visual__cta--ghost">WhatsApp</span>
            </div>
          </div>
          <div className="seo-hero-visual__cards-row">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* Mobile device — enquiry path */}
      <div className="seo-hero-visual__phone">
        <div className="seo-hero-visual__phone-notch" />
        <div className="seo-hero-visual__phone-screen">
          <div className="seo-hero-visual__phone-line" />
          <div className="seo-hero-visual__phone-line seo-hero-visual__phone-line--short" />
          <div className="seo-hero-visual__phone-wa">
            <span className="seo-hero-visual__wa-dot" />
            Enquiry
          </div>
        </div>
      </div>

      {/* Flow cue */}
      <div className="seo-hero-visual__flow">
        <span className="seo-hero-visual__flow-dot" />
        <span className="seo-hero-visual__flow-line" />
        <span className="seo-hero-visual__flow-label">Lead path</span>
      </div>
    </div>
  );
}
