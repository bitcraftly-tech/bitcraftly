'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

import { useGymDemo } from '@bitcraftly/showcase-gym-fitness/app/gym-fitness-showcase/GymDemoContext';
import { CONTAINER } from '@/lib/constants';

import GymCitySelect from './GymCitySelect';
import GymLogo from './GymLogo';

const NAV = [
  { label: 'Fitness', href: 'formats' },
  { label: 'Gyms', href: 'centers' },
  { label: 'Passes', href: 'passes' },
  { label: 'Tips', href: 'tips' },
  { label: 'FAQ', href: 'faq' },
] as const;

export default function GymNavbar() {
  const { city, setCity, setTrialOpen, scrollToSection } = useGymDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  const cityId = useId();
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="gym-header">
      <div className={`${CONTAINER} gym-header__bar`}>
        <button
          type="button"
          className="gym-header__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <GymLogo size="sm" />
          <span className="sr-only">FitRally home</span>
        </button>

        <nav className="gym-header__nav" aria-label="Main">
          <ul className="gym-header__links">
            {NAV.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="gym-header__link"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="gym-header__actions">
          <div className="gym-header__desktop-actions">
            <GymCitySelect id={cityId} value={city} onChange={setCity} />
            <button
              type="button"
              onClick={() => setTrialOpen(true)}
              className="gym-btn-primary gym-header__cta"
            >
              Get free trial
            </button>
          </div>

          <button
            type="button"
            className="gym-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="gym-header__menu-icon" aria-hidden />
            ) : (
              <Menu className="gym-header__menu-icon" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id={panelId} className="gym-header__panel md:hidden">
          <div className={`${CONTAINER} space-y-3`}>
            <ul className="grid gap-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="gym-header__link w-full justify-start"
                    onClick={() => {
                      scrollToSection(item.href);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <p className="mb-1.5 text-sm font-semibold" id={`${cityId}-mobile-label`}>
                City
              </p>
              <GymCitySelect
                id={`${cityId}-mobile`}
                variant="panel"
                value={city}
                onChange={(next) => {
                  setCity(next);
                  setMenuOpen(false);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setTrialOpen(true);
                setMenuOpen(false);
              }}
              className="gym-btn-primary gym-header__cta w-full"
            >
              Get free trial
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
