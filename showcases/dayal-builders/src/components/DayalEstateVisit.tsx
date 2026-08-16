'use client';

import { CalendarCheck, Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { useId, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { DAYAL } from '@bitcraftly/showcase-dayal-builders/lib/data';
import {
  ESTATE_LISTINGS,
  VISIT_MODES,
  VISIT_SLOTS,
  formatPriceRange,
} from '@bitcraftly/showcase-dayal-builders/lib/estate';

const STEPS = [
  {
    title: 'Pick a project and slot',
    detail: 'Choose the site, the day and a time that works for you.',
  },
  {
    title: 'Walk the site with an engineer',
    detail: 'See the current construction stage and finishing quality first-hand.',
  },
  {
    title: 'Get pricing and loan help',
    detail: 'Configuration-wise price sheet, plus a home-loan eligibility check.',
  },
] as const;

const BOOKABLE = ESTATE_LISTINGS.filter((listing) => listing.status !== 'Completed');
const DEFAULT_LISTING = BOOKABLE[0] ?? ESTATE_LISTINGS[0];

function formatVisitDate(value: string): string | null {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function DayalEstateVisit() {
  const fieldId = useId();
  const [listingId, setListingId] = useState<string>(DEFAULT_LISTING.id);
  const [mode, setMode] = useState<string>(VISIT_MODES[0]);
  const [slot, setSlot] = useState<string>(VISIT_SLOTS[1]);
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const listing = useMemo(
    () => ESTATE_LISTINGS.find((item) => item.id === listingId) ?? DEFAULT_LISTING,
    [listingId],
  );

  const readableDate = formatVisitDate(date);

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    `Hi Dayal Builders, I would like to book a ${mode.toLowerCase()} for ${listing.name}.`,
  )}`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="dayal-visit dre-anchor dayal-on-dark"
      aria-labelledby={`${fieldId}-heading`}
    >
      <div className="dayal-visit__grid-lines" aria-hidden />
      <div className="dayal-visit__glow" aria-hidden />

      <div className="dayal-container relative">
        <div className="dayal-visit__layout">
          <DayalReveal className="dayal-visit__intro">
            <p className="dre-eyebrow">Site visits</p>
            <h2 id={`${fieldId}-heading`} className="dre-title dre-title--light mt-3">
              Book a walkthrough this week
            </h2>
            <p className="dayal-visit__lead">
              Pick a project, choose a slot, and our team confirms on call within a few hours.
              Weekend slots fill fastest.
            </p>

            <ol className="dayal-visit__steps">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden>{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <small>{step.detail}</small>
                  </div>
                </li>
              ))}
            </ol>

            <div className="dayal-visit__desk">
              <p className="dayal-visit__desk-item">
                <Clock aria-hidden />
                <span>
                  <strong>Visit hours</strong>
                  Mon – Sat, 10:00 AM – 6:00 PM · Sunday by appointment
                </span>
              </p>
              <DayalSectionLink
                href="#location"
                className="dayal-visit__desk-item dayal-visit__desk-link"
              >
                <MapPin aria-hidden />
                <span>
                  <strong>Need directions?</strong>
                  See office &amp; site on the map
                </span>
              </DayalSectionLink>
            </div>

            <ul className="dayal-visit__channels">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-visit__channel dayal-visit__channel--wa"
                >
                  <MessageCircle aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${DAYAL.phones[0].tel}`} className="dayal-visit__channel">
                  <Phone aria-hidden />
                  {DAYAL.phones[0].display}
                </a>
              </li>
              <li>
                <a href={`mailto:${DAYAL.email}`} className="dayal-visit__channel">
                  <Mail aria-hidden />
                  Email us
                </a>
              </li>
            </ul>

            <figure className="dayal-visit__figure">
              <Image
                src={listing.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
              <figcaption>
                <span>Now showing</span>
                <strong>
                  {listing.name} · {listing.location}
                </strong>
              </figcaption>
            </figure>
          </DayalReveal>

          <DayalReveal delay={0.08} className="dayal-visit__panel">
            <div className="dayal-visit__preview">
              <div className="dayal-visit__preview-media">
                <Image src={listing.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="dayal-visit__preview-body">
                <p className="dayal-visit__preview-name">{listing.name}</p>
                <p className="dayal-visit__preview-meta">
                  <MapPin aria-hidden />
                  <span>{listing.location}</span>
                </p>
                <p className="dayal-visit__preview-price">
                  {formatPriceRange(listing)}
                  <small>Indicative</small>
                </p>
              </div>
              <span className="dayal-visit__preview-status">{listing.status}</span>
            </div>

            {submitted ? (
              <div className="dayal-visit__success" role="status" aria-live="polite">
                <span className="dayal-visit__success-icon" aria-hidden>
                  <Check />
                </span>
                <h3 className="dre-subtitle mt-4">Visit request received</h3>
                <p className="dayal-visit__success-copy">
                  Our team will call you shortly to confirm this walkthrough.
                </p>

                <dl className="dayal-visit__recap">
                  <div>
                    <dt>Project</dt>
                    <dd>{listing.name}</dd>
                  </div>
                  <div>
                    <dt>Visit type</dt>
                    <dd>{mode}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{readableDate ?? 'Team will suggest'}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{slot}</dd>
                  </div>
                </dl>

                <div className="dayal-visit__success-actions">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dre-btn-solid"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Confirm on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="dre-btn-quiet"
                    onClick={() => setSubmitted(false)}
                  >
                    Book another slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="dayal-visit__form">
                <div className="dayal-visit__form-head">
                  <p>Schedule your visit</p>
                  <small>Fields marked * are required. We only call about your visit.</small>
                </div>

                <fieldset className="dayal-visit__block">
                  <legend>Visit type</legend>
                  <div className="dayal-visit__segment">
                    {VISIT_MODES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={mode === option ? 'is-active' : undefined}
                        aria-pressed={mode === option}
                        onClick={() => setMode(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="dre-field" htmlFor={`${fieldId}-project`}>
                  <span>Project</span>
                  <select
                    id={`${fieldId}-project`}
                    className="dre-input"
                    value={listingId}
                    onChange={(event) => setListingId(event.target.value)}
                  >
                    {ESTATE_LISTINGS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — {item.location}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="dayal-visit__row">
                  <label className="dre-field" htmlFor={`${fieldId}-date`}>
                    <span>Preferred date</span>
                    <input
                      id={`${fieldId}-date`}
                      type="date"
                      className="dre-input"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>

                  <fieldset className="dayal-visit__block">
                    <legend>
                      <Clock aria-hidden />
                      Time slot
                    </legend>
                    <div className="dayal-visit__slots">
                      {VISIT_SLOTS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`dre-slot${slot === option ? ' is-selected' : ''}`}
                          aria-pressed={slot === option}
                          onClick={() => setSlot(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="dayal-visit__row">
                  <label className="dre-field" htmlFor={`${fieldId}-name`}>
                    <span>Full name *</span>
                    <input
                      id={`${fieldId}-name`}
                      required
                      name="name"
                      autoComplete="name"
                      className="dre-input"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="dre-field" htmlFor={`${fieldId}-phone`}>
                    <span>Phone *</span>
                    <input
                      id={`${fieldId}-phone`}
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className="dre-input"
                      placeholder="+91"
                    />
                  </label>
                </div>

                <label className="dre-field" htmlFor={`${fieldId}-email`}>
                  <span>Email</span>
                  <input
                    id={`${fieldId}-email`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="dre-input"
                    placeholder="you@email.com"
                  />
                </label>

                <p className="dayal-visit__summary">
                  <CalendarCheck aria-hidden />
                  <span>
                    {mode} · {listing.name} · {readableDate ?? 'date to be picked'} · {slot}
                  </span>
                </p>

                <button type="submit" className="dre-btn-solid dayal-visit__submit">
                  Confirm visit request
                </button>
              </form>
            )}
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
