/**
 * Layered atmosphere — aurora, soft grid, grain.
 */
export function HeroBackground() {
  return (
    <div className="hp-hero-bg" aria-hidden="true">
      <div className="hp-hero-bg__base" />
      <div className="hp-hero-bg__aurora" />
      <div className="hp-hero-bg__orb hp-hero-bg__orb--a" />
      <div className="hp-hero-bg__orb hp-hero-bg__orb--b" />
      <div className="hp-hero-bg__orb hp-hero-bg__orb--c" />
      <div className="hp-hero-bg__grid" />
      <div className="hp-hero-bg__vignette" />
      <div className="hp-hero-bg__grain" />
    </div>
  );
}
