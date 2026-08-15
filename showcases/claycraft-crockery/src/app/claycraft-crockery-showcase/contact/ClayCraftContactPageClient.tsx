'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { useClayCraftDemo } from '../ClayCraftDemoContext';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Please write at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function ClayCraftContactPageClient() {
  const { showToast, mockDelay } = useClayCraftDemo();
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <>
      <ClayCraftPageHeader
        title="Contact"
        description="Questions about an order, wholesale, or care advice? Send a demo message."
        crumbs={[{ label: 'Contact' }]}
      />
      <div className="cc-container cc-section">
        <form
          className="cc-contact-form"
          onSubmit={handleSubmit(async (values) => {
            setBusy(true);
            await mockDelay(900);
            setBusy(false);
            reset();
            showToast(`Thanks ${values.name} — your demo message was received.`);
          })}
        >
          <label htmlFor="cc-contact-name">Name</label>
          <input id="cc-contact-name" {...register('name')} />
          {errors.name ? <p className="cc-form-error">{errors.name.message}</p> : null}

          <label htmlFor="cc-contact-email">Email</label>
          <input id="cc-contact-email" type="email" {...register('email')} />
          {errors.email ? <p className="cc-form-error">{errors.email.message}</p> : null}

          <label htmlFor="cc-contact-message">Message</label>
          <textarea id="cc-contact-message" rows={5} {...register('message')} />
          {errors.message ? <p className="cc-form-error">{errors.message.message}</p> : null}

          <button type="submit" className="cc-btn cc-btn--primary" disabled={busy} aria-busy={busy}>
            {busy ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </>
  );
}
