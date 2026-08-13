'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Mail, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useId, useState } from 'react';

import DayalReveal from '@/components/dayal/DayalReveal';
import { CONTACT_FORM_BG, DAYAL } from '@/lib/dayal/data';

const buildingReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
};

export default function DayalVisitCta() {
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();
  const formId = useId();

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    'Hi Dayal Builders, I would like to discuss my next project in Jamshedpur.',
  )}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="dayal-contact dayal-on-dark dayal-section" aria-labelledby={`${formId}-heading`}>
      <div className="dayal-contact__glow" aria-hidden />

      <div className="dayal-container relative">
        <div className="dayal-contact__grid">
          {/* Left — copy + channels + visual */}
          <DayalReveal className="dayal-contact__intro">
            <p className="dayal-eyebrow tracking-[0.28em]">Get in touch</p>
            <div className="dayal-gold-line mt-4" aria-hidden />
            <h2 id={`${formId}-heading`} className="dayal-contact__title">
              Let&apos;s discuss your next <span>project</span>
            </h2>
            <p className="dayal-contact__lead">
              Share your ideas — we&apos;ll help turn them into a planned, well-built home or
              commercial space in Jamshedpur.
            </p>

            <ul className="dayal-contact__channels">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-contact__channel dayal-contact__channel--wa"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${DAYAL.phones[0].tel}`} className="dayal-contact__channel">
                  <Phone className="h-4 w-4" aria-hidden />
                  {DAYAL.phones[0].display}
                </a>
              </li>
              <li>
                <a href={`mailto:${DAYAL.email}`} className="dayal-contact__channel">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email us
                </a>
              </li>
            </ul>

            <motion.div
              className="dayal-contact__visual"
              variants={buildingReveal}
              initial={reduceMotion ? false : 'hidden'}
              whileInView={reduceMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Image
                src={CONTACT_FORM_BG}
                alt="Dayal Builders project elevation"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 70vw, 360px"
              />
            </motion.div>
          </DayalReveal>

          {/* Right — form */}
          <DayalReveal delay={0.1} className="dayal-contact__form-wrap">
            {submitted ? (
              <div className="dayal-contact__success" role="status" aria-live="polite">
                <Calendar className="h-11 w-11 text-[#c8a46b]" aria-hidden />
                <h3 className="dayal-serif mt-4 text-2xl font-semibold text-[#0b1633]">Thank you</h3>
                <p className="mt-2 text-sm text-[#5c6478]">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="dayal-contact__form"
                aria-labelledby={`${formId}-title`}
              >
                <p id={`${formId}-title`} className="dayal-contact__form-title">
                  Request a callback
                </p>
                <p className="dayal-contact__form-hint">
                  Tell us how to reach you. Fields marked * are required.
                </p>

                <label className="dayal-contact__field">
                  <span>First name *</span>
                  <input
                    required
                    name="firstName"
                    className="dayal-form-input dayal-contact__input"
                    placeholder="Your name"
                    autoComplete="given-name"
                  />
                </label>

                <label className="dayal-contact__field">
                  <span>Phone *</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="dayal-form-input dayal-contact__input"
                    placeholder="+91"
                    autoComplete="tel"
                  />
                </label>

                <label className="dayal-contact__field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    className="dayal-form-input dayal-contact__input"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </label>

                <button type="submit" className="dayal-btn-gold dayal-contact__submit">
                  Submit enquiry
                </button>
              </form>
            )}
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
