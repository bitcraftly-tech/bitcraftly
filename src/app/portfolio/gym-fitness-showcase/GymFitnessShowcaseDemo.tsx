'use client';

import { useCallback, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  MapPin,
  Play,
  Smartphone,
  Star,
  Zap,
} from 'lucide-react';

import GymReveal from '@/components/portfolio/gym/GymReveal';
import { CONTAINER } from '@/lib/constants';

import { useGymDemo } from './GymDemoContext';
import GymBmiCalculator from './GymBmiCalculator';
import GymHealthFaqSection from './GymHealthFaqSection';
import GymHeroBackground from './GymHeroBackground';
import {
  GYM_CENTERS,
  MEMBERSHIP_PASSES,
  TRAINERS,
  TRANSFORM_STORIES,
  WORKOUT_FORMATS,
  getPrimaryCenterForCity,
} from './gym-demo-data';
import { GymLazyImage } from './GymLazyImage';

const APP_FEATURES = [
  { icon: Flame, text: '1,200+ on-demand workouts' },
  { icon: Play, text: 'Live HRX & group classes' },
  { icon: Zap, text: 'Energy meter & leaderboards' },
] as const;

export default function GymFitnessShowcaseDemo() {
  const {
    city,
    setPassModal,
    setClassModal,
    setCenterModal,
    setReelOpen,
    scrollToSection,
  } = useGymDemo();

  const formatsRailRef = useRef<HTMLDivElement>(null);

  const scrollFormatsRail = useCallback((direction: -1 | 1) => {
    const rail = formatsRailRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>('.gym-format-card');
    const step = card ? card.offsetWidth + 18 : Math.max(rail.clientWidth * 0.7, 240);
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  const centersInCity = GYM_CENTERS.filter((c) => c.city === city);
  const centersToShow = centersInCity.length > 0 ? centersInCity : GYM_CENTERS;
  const heroCenter = getPrimaryCenterForCity(city);

  return (
    <div>
      {/* Hero */}
      <section className="gym-hero" aria-labelledby="gym-hero-title">
        <GymReveal className="gym-hero__canvas" direction="up">
          <div className="gym-hero__visual">
            <GymHeroBackground city={city} centerName={heroCenter.name} />
            <div className="gym-hero__scrim" aria-hidden />
            <p className="gym-hero__mark" aria-hidden>
              FitRally
            </p>
            <div className="gym-hero__spine" aria-hidden>
              <span>rallypass</span>
              <span>hrx</span>
              <span>s&amp;c</span>
            </div>
          </div>

          <div className={`${CONTAINER} gym-hero__content`}>
            <div className="gym-hero__dock">
              <p className="gym-hero__brand-line">
                <Flame className="gym-hero__brand-icon" aria-hidden />
                FitRally
                <span className="gym-hero__brand-sep" aria-hidden />
                {city} fitness demo
              </p>
              <h1 id="gym-hero-title" className="gym-hero__title">
                Move more.
                <span className="gym-hero__title-accent">Pay once.</span>
              </h1>
              <p className="gym-hero__copy">
                One rallypass for classes, gym floors, sports &amp; home — crafted for a premium
                fitness brand showcase.
              </p>
              <div className="gym-hero__actions">
                <button
                  type="button"
                  onClick={() => scrollToSection('passes')}
                  className="gym-btn-primary gym-hero__btn"
                >
                  Buy FitRally pass
                  <ArrowRight className="gym-hero__btn-icon" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('formats')}
                  className="gym-hero__link"
                >
                  Explore formats
                  <ArrowRight className="gym-hero__link-icon" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="gym-hero__rail">
            <div className={`${CONTAINER} gym-hero__rail-inner`}>
              <div className="gym-hero__rail-live">
                <span className="gym-hero__live-dot" aria-hidden />
                <div>
                  <p className="gym-hero__rail-kicker">Live now</p>
                  <p className="gym-hero__rail-title">
                    HRX · {heroCenter.name.replace('FitRally ', '')}
                  </p>
                </div>
              </div>
              <p className="gym-hero__rail-meta">7:00 PM · 12 spots left</p>
              <p className="gym-hero__rail-city">
                <MapPin className="gym-hero__meta-icon" aria-hidden />
                {city}
              </p>
            </div>
          </div>
        </GymReveal>
      </section>

      {/* Formats */}
      <section id="formats" className="gym-formats gym-section scroll-mt-24" aria-labelledby="gym-formats-title">
        <GymReveal className={CONTAINER}>
          <div className="gym-formats__head">
            <div className="gym-formats__intro">
              <p className="gym-section__eyebrow">Group formats</p>
              <h2 id="gym-formats-title" className="gym-section__title">
                Pick your workout
              </h2>
              <p className="gym-section__subtitle">
                Book a class near you — HRX, yoga, boxing & more.
              </p>
            </div>
            <div className="gym-formats__tools">
              <button
                type="button"
                onClick={() => scrollToSection('passes')}
                className="gym-formats__passes-link"
              >
                View passes
                <ChevronRight className="gym-formats__passes-icon" aria-hidden />
              </button>
              <div className="gym-formats__controls" role="group" aria-label="Scroll workouts">
                <button
                  type="button"
                  className="gym-formats__nav-btn"
                  aria-label="Previous workouts"
                  onClick={() => scrollFormatsRail(-1)}
                >
                  <ChevronLeft className="gym-formats__nav-icon" aria-hidden />
                </button>
                <button
                  type="button"
                  className="gym-formats__nav-btn"
                  aria-label="Next workouts"
                  onClick={() => scrollFormatsRail(1)}
                >
                  <ChevronRight className="gym-formats__nav-icon" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={formatsRailRef}
            className="gym-rail gym-formats__rail"
            role="list"
            tabIndex={0}
            aria-label="Workout formats"
          >
            {WORKOUT_FORMATS.map((format) => (
              <article key={format.id} className="gym-format-card" role="listitem">
                <GymLazyImage
                  src={format.image}
                  alt={`${format.name} class`}
                  wrapperClassName="gym-format-card__media"
                  fallbackSeed={format.id}
                />
                <div className="gym-format-card__body">
                  <div className="gym-format-card__top">
                    <div className="gym-format-card__copy">
                      <h3 className="gym-format-card__title">{format.name}</h3>
                      <p className="gym-format-card__tagline">{format.tagline}</p>
                    </div>
                    <span className="gym-format-card__badge">{format.duration}</span>
                  </div>
                  <p className="gym-format-card__calories">{format.calories}</p>
                  <button
                    type="button"
                    onClick={() => setClassModal(format)}
                    className="gym-btn-primary gym-format-card__cta"
                  >
                    Book class
                  </button>
                </div>
              </article>
            ))}
          </div>
        </GymReveal>
      </section>

      {/* Passes */}
      <section
        id="passes"
        className="gym-passes gym-section scroll-mt-24"
        aria-labelledby="gym-passes-title"
      >
        <GymReveal className={CONTAINER}>
          <div className="gym-passes__intro">
            <p className="gym-section__eyebrow">Membership</p>
            <h2 id="gym-passes-title" className="gym-section__title">
              rallypass · choose your lane
            </h2>
            <p className="gym-section__subtitle">
              Illustrative pricing · Razorpay-ready on production builds.
            </p>
          </div>

          <div className="gym-passes__grid">
            {MEMBERSHIP_PASSES.map((pass, i) => (
              <GymReveal
                key={pass.id}
                as="article"
                className={`gym-pass-card${pass.featured ? ' gym-pass-card--featured' : ''}`}
                delay={i * 0.08}
              >
                {pass.featured ? (
                  <span className="gym-pass-card__badge">Most popular</span>
                ) : null}
                <h3 className="gym-pass-card__name">{pass.name}</h3>
                <p className="gym-pass-card__price">
                  {pass.price}
                  <span className="gym-pass-card__period">{pass.period}</span>
                </p>
                <p className="gym-pass-card__highlight">{pass.highlight}</p>
                <ul className="gym-pass-card__perks">
                  {pass.perks.map((perk) => (
                    <li key={perk} className="gym-pass-card__perk">
                      <span className="gym-pass-card__check" aria-hidden>
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setPassModal(pass)}
                  className={`gym-pass-card__cta ${pass.featured ? 'gym-btn-primary' : 'gym-btn-outline'}`}
                >
                  Buy now
                </button>
              </GymReveal>
            ))}
          </div>
        </GymReveal>
      </section>

      {/* Centers */}
      <section
        id="centers"
        className="gym-centers gym-section scroll-mt-24"
        aria-labelledby="gym-centers-title"
      >
        <GymReveal className={CONTAINER}>
          <div className="gym-centers__intro">
            <p className="gym-section__eyebrow">Locations</p>
            <h2 id="gym-centers-title" className="gym-section__title">
              Centers near you
            </h2>
            <p className="gym-section__subtitle">
              {centersInCity.length > 0
                ? `Showing FitRally centers in ${city}`
                : 'All demo centers · pick your city in the header'}
            </p>
          </div>

          <div className="gym-centers__grid">
            {centersToShow.map((center, i) => (
              <GymReveal key={center.id} as="article" className="gym-center-card" delay={i * 0.06}>
                <GymLazyImage
                  src={center.image}
                  alt={`${center.name} interior`}
                  wrapperClassName="gym-center-card__media"
                  fallbackSeed={center.id}
                />
                <div className="gym-center-card__body">
                  <h3 className="gym-center-card__name">{center.name}</h3>
                  <p className="gym-center-card__meta">
                    <MapPin className="gym-center-card__pin" aria-hidden />
                    <span>
                      {center.area}
                      <span className="gym-center-card__dot" aria-hidden>
                        ·
                      </span>
                      {center.distance}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setCenterModal(center)}
                    className="gym-center-card__cta"
                  >
                    Book tour
                    <ChevronRight className="gym-center-card__cta-icon" aria-hidden />
                  </button>
                </div>
              </GymReveal>
            ))}
          </div>
        </GymReveal>
      </section>

      {/* Trainers */}
      <section className="gym-coaches gym-section" aria-labelledby="gym-coaches-title">
        <GymReveal className={CONTAINER}>
          <div className="gym-coaches__intro">
            <p className="gym-section__eyebrow">Coaching</p>
            <h2 id="gym-coaches-title" className="gym-section__title">
              Expert coaches
            </h2>
            <p className="gym-section__subtitle">
              Certified trainers for strength, boxing, yoga & more.
            </p>
          </div>

          <div className="gym-coaches__grid">
            {TRAINERS.map((t, i) => (
              <GymReveal key={t.id} as="article" className="gym-coach-card" delay={i * 0.08}>
                <GymLazyImage
                  src={t.image}
                  alt={`${t.name}, ${t.specialty} coach`}
                  className=""
                  wrapperClassName="gym-coach-card__media"
                  fallbackSeed={t.id}
                />
                <div className="gym-coach-card__body">
                  <h3 className="gym-coach-card__name">{t.name}</h3>
                  <p className="gym-coach-card__specialty">{t.specialty}</p>
                  <p className="gym-coach-card__exp">{t.experience}</p>
                </div>
              </GymReveal>
            ))}
          </div>
        </GymReveal>
      </section>

      {/* Transform */}
      <section
        id="transform"
        className="gym-stories gym-section scroll-mt-24"
        aria-labelledby="gym-stories-title"
      >
        <GymReveal className={CONTAINER}>
          <div className="gym-stories__intro">
            <p className="gym-section__eyebrow">Members</p>
            <h2 id="gym-stories-title" className="gym-section__title">
              Real transformations
            </h2>
            <p className="gym-section__subtitle">
              Demo member stories — results vary; not medical claims.
            </p>
          </div>

          <div className="gym-stories__grid">
            {TRANSFORM_STORIES.map((story, i) => (
              <GymReveal key={story.name} as="article" className="gym-story-card" delay={i * 0.08}>
                <div className="gym-story-card__stars" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="gym-story-card__star" aria-hidden />
                  ))}
                </div>
                <p className="gym-story-card__result">{story.result}</p>
                <p className="gym-story-card__name">{story.name}</p>
                <p className="gym-story-card__program">{story.program}</p>
              </GymReveal>
            ))}
          </div>
        </GymReveal>
      </section>

      <GymHealthFaqSection />

      {/* App + BMI */}
      <section className="gym-tools gym-section" aria-label="App and wellness tools">
        <GymReveal className={`${CONTAINER} gym-tools__grid`}>
          <article className="gym-app-card">
            <div className="gym-app-card__glow" aria-hidden />
            <p className="gym-app-card__eyebrow">Mobile app</p>
            <Smartphone className="gym-app-card__phone" aria-hidden />
            <h2 className="gym-app-card__title">Train anywhere with the FitRally app</h2>
            <p className="gym-app-card__copy">
              Full app experience on production builds — sync workouts, book classes, track
              progress.
            </p>
            <ul className="gym-app-card__features">
              {APP_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="gym-app-card__feature">
                  <span className="gym-app-card__feature-icon">
                    <Icon className="gym-app-card__feature-svg" aria-hidden />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="gym-btn-primary gym-app-card__cta"
            >
              <Play className="gym-app-card__cta-icon" aria-hidden />
              Watch demo video
            </button>
          </article>
          <GymBmiCalculator />
        </GymReveal>
      </section>
    </div>
  );
}
