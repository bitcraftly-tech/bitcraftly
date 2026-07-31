'use client';

import { ArrowRight, ChevronRight, Flame, MapPin, Play, Smartphone, Star, Zap } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { useGymDemo } from './GymDemoContext';
import GymBmiCalculator from './GymBmiCalculator';
import {
  GYM_CENTERS,
  MEMBERSHIP_PASSES,
  TRAINERS,
  TRANSFORM_STORIES,
  WORKOUT_FORMATS,
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
    setTrialOpen,
    setPassModal,
    setClassModal,
    setCenterModal,
    setReelOpen,
    scrollToSection,
  } = useGymDemo();

  const centersInCity = GYM_CENTERS.filter((c) => c.city === city);
  const centersToShow = centersInCity.length > 0 ? centersInCity : GYM_CENTERS;

  return (
    <div>
      {/* Hero */}
      <section className="gym-bg-page border-b gym-border overflow-hidden">
        <div className={`${CONTAINER} grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16`}>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gym-brand-soft)] px-3 py-1 text-xs font-semibold gym-brand-text">
              <Flame className="h-3.5 w-3.5" aria-hidden />
              India&apos;s fitness platform · demo
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--gym-text)] sm:text-5xl lg:text-[3.25rem]">
              One membership.
              <span className="block gym-brand-text">Many ways to train.</span>
            </h1>
            <p className="gym-text-muted mt-5 max-w-lg text-base leading-relaxed sm:text-lg">
              Group classes, gyms, sports & at-home workouts — built for your next fitness brand
              demo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setTrialOpen(true)}
                className="gym-btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm"
              >
                Get free trial
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('formats')}
                className="gym-btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm"
              >
                Explore formats
              </button>
            </div>
            <p className="gym-text-muted mt-6 flex items-center gap-2 text-xs">
              <MapPin className="h-4 w-4" aria-hidden />
              Showing centers near{' '}
              <span className="font-semibold text-[var(--gym-text)]">{city}</span>
            </p>
          </div>
          <div className="relative">
            <GymLazyImage
              src={WORKOUT_FORMATS[0].image}
              alt="Fitness training"
              wrapperClassName="aspect-[4/3] w-full rounded-2xl shadow-xl"
              fallbackSeed="hero"
              eager
            />
            <div className="gym-bg-card absolute bottom-4 left-4 right-4 rounded-xl border gym-border p-4 shadow-lg sm:left-auto sm:right-4 sm:w-56">
              <p className="text-xs font-semibold uppercase tracking-wide gym-brand-text">
                Live now
              </p>
              <p className="mt-1 font-bold">
                HRX · {centersInCity[0]?.name.replace('FitRally ', '') ?? 'Connaught Place'}
              </p>
              <p className="gym-text-muted text-xs">7:00 PM · 12 spots left</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formats — horizontal scroll */}
      <section id="formats" className={`${CONTAINER} scroll-mt-24 py-14`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest gym-brand-text">
              Group formats
            </p>
            <h2 className="mt-2 text-3xl font-bold">Pick your workout</h2>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('passes')}
            className="hidden items-center gap-1 text-sm font-semibold gym-brand-text sm:inline-flex"
          >
            View passes <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {WORKOUT_FORMATS.map((format) => (
            <article
              key={format.id}
              className="gym-bg-card w-[min(280px,78vw)] shrink-0 overflow-hidden rounded-2xl border gym-border shadow-sm transition hover:shadow-md"
            >
              <GymLazyImage
                src={format.image}
                alt={format.name}
                wrapperClassName="aspect-[4/3] w-full"
                fallbackSeed={format.id}
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{format.name}</h3>
                    <p className="gym-text-muted text-sm">{format.tagline}</p>
                  </div>
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-[10px] font-semibold">
                    {format.duration}
                  </span>
                </div>
                <p className="gym-text-muted mt-2 text-xs">{format.calories}</p>
                <button
                  type="button"
                  onClick={() => setClassModal(format)}
                  className="gym-btn-primary mt-4 w-full rounded-full py-2 text-sm"
                >
                  Book class
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Passes */}
      <section id="passes" className="gym-bg-surface scroll-mt-24 py-14">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest gym-brand-text">Membership</p>
            <h2 className="mt-2 text-3xl font-bold">rallypass · choose your lane</h2>
            <p className="gym-text-muted mt-3 text-sm">
              Illustrative pricing · Razorpay-ready on production builds.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-6 pt-3 lg:grid-cols-3">
            {MEMBERSHIP_PASSES.map((pass) => (
              <div
                key={pass.id}
                className={`gym-bg-card relative flex h-full flex-col rounded-2xl border p-6 ${pass.featured ? 'gym-pass-featured border-2' : 'gym-border'}`}
              >
                {pass.featured ? (
                  <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-[var(--gym-brand)] bg-[var(--gym-surface-elevated)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide gym-brand-text shadow-sm">
                    Most popular
                  </span>
                ) : null}
                <h3 className="font-bold">{pass.name}</h3>
                <p className="mt-3 text-3xl font-extrabold">
                  {pass.price}
                  <span className="gym-text-muted text-sm font-normal">{pass.period}</span>
                </p>
                <p className="mt-2 text-sm font-medium gym-brand-text">{pass.highlight}</p>
                <ul className="gym-text-muted mt-5 flex-1 space-y-2 text-sm">
                  {pass.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className="gym-brand-text">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setPassModal(pass)}
                  className={`mt-6 w-full shrink-0 rounded-full py-2.5 text-sm font-semibold ${pass.featured ? 'gym-btn-primary' : 'gym-btn-outline'}`}
                >
                  Buy now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centers */}
      <section id="centers" className={`${CONTAINER} scroll-mt-24 py-14`}>
        <h2 className="text-3xl font-bold">Centers near you</h2>
        <p className="gym-text-muted mt-2 text-sm">
          {centersInCity.length > 0 ? `In ${city}` : `All demo centers · pick your city in header`}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {centersToShow.map((center) => (
            <article
              key={center.id}
              className="gym-bg-card flex overflow-hidden rounded-2xl border gym-border"
            >
              <GymLazyImage
                src={center.image}
                alt={center.name}
                wrapperClassName="aspect-[4/3] w-36 shrink-0 sm:w-44"
                fallbackSeed={center.id}
              />
              <div className="flex flex-1 flex-col justify-center p-4">
                <h3 className="font-bold">{center.name}</h3>
                <p className="gym-text-muted mt-1 text-sm">
                  {center.area} · {center.distance}
                </p>
                <button
                  type="button"
                  onClick={() => setCenterModal(center)}
                  className="gym-btn-outline mt-3 w-fit rounded-full px-4 py-1.5 text-xs font-semibold"
                >
                  Book tour
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="gym-bg-surface py-14">
        <div className={CONTAINER}>
          <h2 className="text-3xl font-bold">Expert coaches</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {TRAINERS.map((t) => (
              <div
                key={t.id}
                className="gym-bg-card overflow-hidden rounded-2xl border gym-border text-center"
              >
                <GymLazyImage
                  src={t.image}
                  alt={t.name}
                  wrapperClassName="aspect-square w-full"
                  fallbackSeed={t.id}
                />
                <div className="p-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="mt-1 text-sm gym-brand-text">{t.specialty}</p>
                  <p className="gym-text-muted mt-1 text-xs">{t.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transform */}
      <section id="transform" className={`${CONTAINER} scroll-mt-24 py-14`}>
        <h2 className="text-3xl font-bold">Real transformations</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TRANSFORM_STORIES.map((story) => (
            <div key={story.name} className="gym-bg-card rounded-2xl border gym-border p-5">
              <div className="flex gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-3 text-lg font-bold gym-brand-text">{story.result}</p>
              <p className="mt-2 font-semibold">{story.name}</p>
              <p className="gym-text-muted text-sm">{story.program}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App + BMI */}
      <section className="gym-bg-surface border-t gym-border py-14">
        <div className={`${CONTAINER} grid gap-6 lg:grid-cols-2 lg:items-stretch`}>
          <article className="gym-bg-card relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border gym-border p-6 md:p-8">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--gym-brand-soft)] opacity-50"
              aria-hidden
            />
            <p className="relative text-xs font-bold uppercase tracking-widest gym-brand-text">
              Mobile app
            </p>
            <Smartphone className="relative mt-4 h-10 w-10 gym-brand-text" aria-hidden />
            <h2 className="relative mt-3 text-2xl font-bold leading-tight">
              Train anywhere with the FitRally app
            </h2>
            <p className="gym-text-muted relative mt-2 text-sm leading-relaxed">
              Full app experience on production builds — sync workouts, book classes, track
              progress.
            </p>
            <ul className="relative mt-6 flex flex-1 flex-col justify-center gap-3">
              {APP_FEATURES.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl border gym-border bg-[var(--gym-surface)] px-4 py-3 text-sm font-medium"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--gym-brand-soft)] gym-brand-text">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="gym-btn-primary relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm sm:w-auto"
            >
              <Play className="h-4 w-4" aria-hidden />
              Watch demo reel
            </button>
          </article>
          <GymBmiCalculator className="h-full" />
        </div>
      </section>
    </div>
  );
}
