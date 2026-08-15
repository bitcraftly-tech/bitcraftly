'use client';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useClayCraftDemo } from './ClayCraftDemoContext';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
});

type FormValues = z.infer<typeof schema>;

export default function ClayCraftAccountModal() {
  const { accountOpen, setAccountOpen, signedInAs, signIn, signOut } = useClayCraftDemo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!accountOpen) return null;

  return (
    <div className="cc-overlay" role="presentation">
      <button
        type="button"
        className="cc-overlay__backdrop"
        aria-label="Close account"
        onClick={() => setAccountOpen(false)}
      />
      <div
        className="cc-account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-account-title"
      >
        <div className="cc-drawer__head">
          <h2 id="cc-account-title">Account</h2>
          <button
            type="button"
            className="cc-icon-btn"
            aria-label="Close"
            onClick={() => setAccountOpen(false)}
          >
            <X aria-hidden />
          </button>
        </div>
        {signedInAs ? (
          <div className="cc-account-modal__body">
            <p>
              Signed in as <strong>{signedInAs}</strong>
            </p>
            <p className="cc-product-meta">Demo session only — no real account is created.</p>
            <button type="button" className="cc-btn cc-btn--secondary" onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <form
            className="cc-account-modal__body"
            onSubmit={handleSubmit((values) => {
              signIn(values.name.trim());
              reset();
            })}
          >
            <p className="cc-product-meta">
              Sign in to this demo with any name. No password required.
            </p>
            <label htmlFor="cc-account-name">Display name</label>
            <input id="cc-account-name" {...register('name')} placeholder="Your name" />
            {errors.name ? <p className="cc-form-error">{errors.name.message}</p> : null}
            <button type="submit" className="cc-btn cc-btn--primary">
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
