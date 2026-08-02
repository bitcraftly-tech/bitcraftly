'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { loginOwnerAction, type OwnerLoginState } from '../actions/owner-auth.actions';

interface OwnerLoginFormProps {
  readonly nextPath: string;
}

export function OwnerLoginForm({ nextPath }: OwnerLoginFormProps) {
  const [state, formAction, pending] = useActionState<OwnerLoginState | null, FormData>(
    loginOwnerAction,
    null,
  );

  return (
    <form action={formAction} className="owner-auth-form" noValidate>
      <input type="hidden" name="next" value={nextPath} />

      <div className="owner-auth-form__field">
        <label htmlFor="owner-login-email">Email</label>
        <input
          id="owner-login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          aria-invalid={state ? true : undefined}
          aria-describedby={state ? 'owner-login-error' : undefined}
        />
      </div>

      <div className="owner-auth-form__field">
        <label htmlFor="owner-login-password">Password</label>
        <input
          id="owner-login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state ? true : undefined}
          aria-describedby={state ? 'owner-login-error' : undefined}
        />
      </div>

      {state ? (
        <p id="owner-login-error" className="owner-auth-form__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="md" loading={pending}>
        Sign in
      </Button>
    </form>
  );
}
