'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { CONTAINER } from '@/lib/constants';
import { useGymDemo } from '@/app/portfolio/gym-fitness-showcase/GymDemoContext';

import GymLogo from './GymLogo';

const NAV = [
  { label: 'Fitness', href: '#formats' },
  { label: 'Gyms', href: '#centers' },
  { label: 'Passes', href: '#passes' },
  { label: 'Transform', href: '#transform' },
] as const;

const CITIES = ['Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Kolkata'] as const;

export default function GymNavbar() {
  const { city, setCity, setTrialOpen, scrollToSection } = useGymDemo();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="gym-bg-card sticky top-0 z-50 border-b gym-border">
      <div className={`${CONTAINER} flex items-center justify-between gap-4 py-3`}>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left"
        >
          <GymLogo size="sm" />
        </button>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href.slice(1))}
              className="text-sm font-medium text-[var(--gym-text)] hover:gym-brand-text"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <label className="gym-text-muted hidden text-xs lg:block">
            City
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="gym-border ml-2 rounded-md border bg-[var(--gym-surface-elevated)] px-2 py-1 text-sm text-[var(--gym-text)]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setTrialOpen(true)}
            className="gym-btn-primary rounded-full px-5 py-2 text-sm"
          >
            Get free trial
          </button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="gym-border border-t px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  scrollToSection(item.href.slice(1));
                  setMenuOpen(false);
                }}
                className="text-left text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="gym-border rounded-md border bg-[var(--gym-surface-elevated)] px-3 py-2 text-sm text-[var(--gym-text)]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setTrialOpen(true)}
              className="gym-btn-primary rounded-full py-2.5 text-sm"
            >
              Get free trial
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
