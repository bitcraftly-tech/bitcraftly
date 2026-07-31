'use client';

import { Mail, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useClayCraftDemo } from './ClayCraftDemoContext';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function ClayCraftNewsletter() {
  const { showToast, mockDelay } = useClayCraftDemo();
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <section
      id="newsletter"
      className="cc-section cc-newsletter"
      aria-labelledby="cc-newsletter-heading"
    >
      <div className="cc-container">
        <div className="cc-newsletter__banner" data-cc-reveal>
          <Image
            src="/claycraft/newsletter/newsletter-glassware.png"
            alt=""
            fill
            aria-hidden
            sizes="(max-width: 900px) 100vw, 1200px"
            className="cc-newsletter__bg"
          />
          <div className="cc-newsletter__copy">
            <p className="cc-newsletter__eyebrow">
              <span className="cc-newsletter__icon" aria-hidden>
                <Mail />
              </span>
              Table stories
            </p>
            <h2 id="cc-newsletter-heading" className="cc-newsletter-title">
              Join Our Table Stories
            </h2>
            <p className="cc-newsletter-body">
              Seasonal recipes, new arrivals, and styling ideas — a few times a month, never more.
            </p>
          </div>

          <div className="cc-newsletter__action">
            <form
              className="cc-newsletter__form"
              onSubmit={handleSubmit(async (values) => {
                setBusy(true);
                await mockDelay(900);
                setBusy(false);
                reset();
                showToast(`Welcome to Table Stories — ${values.email} subscribed (demo).`);
              })}
            >
              <label className="sr-only" htmlFor="cc-home-newsletter-email">
                Email address
              </label>
              <div className="cc-newsletter__field">
                <input
                  id="cc-home-newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'cc-home-newsletter-error' : undefined}
                  disabled={busy}
                  {...register('email')}
                />
                <button type="submit" disabled={busy} aria-busy={busy}>
                  {busy ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {errors.email ? (
                <p id="cc-home-newsletter-error" className="cc-form-error">
                  {errors.email.message}
                </p>
              ) : null}
            </form>

            <p className="cc-newsletter__note">
              <ShieldCheck aria-hidden />
              No spam, ever. Unsubscribe in one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
