'use client';

import { Check, ChevronDown, MapPin } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

import { GYM_CITIES, type GymCity } from '@/app/portfolio/gym-fitness-showcase/gym-demo-data';

type GymCitySelectProps = {
  value: string;
  onChange: (city: GymCity) => void;
  /** Compact header trigger vs full-width mobile panel */
  variant?: 'header' | 'panel';
  id?: string;
};

export default function GymCitySelect({
  value,
  onChange,
  variant = 'header',
  id,
}: GymCitySelectProps) {
  const autoId = useId();
  const listboxId = `${id ?? autoId}-listbox`;
  const triggerId = id ?? `${autoId}-trigger`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      GYM_CITIES.findIndex((c) => c === value),
    ),
  );

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const idx = GYM_CITIES.findIndex((c) => c === value);
    if (idx >= 0) setActiveIndex(idx);
  }, [value, open]);

  const selectCity = (city: GymCity) => {
    onChange(city);
    setOpen(false);
  };

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: ReactKeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % GYM_CITIES.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + GYM_CITIES.length) % GYM_CITIES.length);
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(GYM_CITIES.length - 1);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const city = GYM_CITIES[activeIndex];
      if (city) selectCity(city);
      return;
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`gym-city-select${variant === 'panel' ? ' gym-city-select--panel' : ''}${
        open ? ' gym-city-select--open' : ''
      }`}
    >
      <button
        type="button"
        id={triggerId}
        className="gym-city-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`City: ${value}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <MapPin className="gym-city-select__pin" aria-hidden />
        <span className="gym-city-select__value">{value}</span>
        <ChevronDown className="gym-city-select__chevron" aria-hidden />
      </button>

      {open ? (
        <ul
          id={listboxId}
          className="gym-city-select__menu"
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          ref={(node) => node?.focus()}
        >
          {GYM_CITIES.map((city, index) => {
            const selected = city === value;
            const active = index === activeIndex;
            return (
              <li key={city} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`gym-city-select__option${selected ? ' is-selected' : ''}${
                    active ? ' is-active' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectCity(city)}
                >
                  <span className="gym-city-select__option-label">{city}</span>
                  {selected ? <Check className="gym-city-select__check" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
