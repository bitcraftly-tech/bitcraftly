'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import DayalReveal from '@/components/dayal/DayalReveal';
import { CONTACT_FORM_BG, DAYAL } from '@/lib/dayal/data';

/** Zoom in → zoom out, once when section enters view */
const buildingZoom = {
  hidden: { scale: 0.72, opacity: 0.45 },
  visible: {
    scale: [0.72, 1.07, 1],
    opacity: [0.45, 1, 1],
    transition: {
      duration: 2.4,
      times: [0, 0.48, 1],
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: 0.12,
    },
  },
};

export default function DayalVisitCta() {
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  const waUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    'Hi Dayal Builders, I would like to discuss my next project in Jamshedpur.',
  )}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    'dayal-form-input mt-1.5 w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c8a46b] sm:text-base';

  return (
    <section
      id="contact"
      className="dayal-on-dark relative scroll-mt-20 overflow-hidden border-t border-[#c8a46b]/12 bg-[#0b1633] py-12 sm:scroll-mt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_50%,rgba(227,47,42,0.06),transparent_60%)]"
        aria-hidden
      />

      <div className="dayal-container relative">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-10">
          {/* Left — copy */}
          <DayalReveal className="lg:col-span-4 xl:col-span-4">
            <div>
              <p className="dayal-eyebrow tracking-[0.28em]">Get in touch</p>
              <div className="dayal-gold-line mt-4" aria-hidden />
              <h2 className="dayal-serif mt-6 text-[1.75rem] font-semibold leading-[1.2] text-white sm:text-3xl lg:text-[2.1rem] xl:text-[2.35rem]">
                Let&apos;s Discuss Your Next <span className="text-[#e32f2a]">Project.</span>
              </h2>
              <p className="mt-6 text-base font-bold text-white">Have a vision in mind?</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65 sm:text-[15px]">
                Share your ideas with us—we&apos;re here to turn your dream project into reality
                with expert planning and execution.
              </p>
              <div className="mt-8 hidden flex-col gap-3 sm:flex sm:max-w-xs lg:flex">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dayal-btn-outline inline-flex w-full items-center justify-center gap-2 border-[#c8a46b]/60 py-3 text-sm"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp
                </a>
                <a
                  href={`tel:${DAYAL.phones[0].tel}`}
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm text-white/70 transition hover:text-[#c8a46b]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {DAYAL.phones[0].display}
                </a>
              </div>
            </div>
          </DayalReveal>

          {/* Image (40%) + Form (60%) — same row height, image centered */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:col-span-8 lg:gap-8">
            <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-6 xl:gap-10">
              {/* Building: middle column, vertically centered vs form */}
              <div className="flex items-center justify-center lg:col-span-2 lg:px-2">
                <motion.div
                  className="relative aspect-[3/4] w-full max-w-[300px] origin-center sm:max-w-[340px] lg:h-full lg:max-h-[min(28rem,100%)] lg:max-w-none lg:min-h-[22rem]"
                  variants={buildingZoom}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView={reduceMotion ? undefined : 'visible'}
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <Image
                    src={CONTACT_FORM_BG}
                    alt=""
                    fill
                    priority
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 42vw, 420px"
                  />
                </motion.div>
              </div>

              <DayalReveal delay={0.12} className="flex lg:col-span-3 lg:items-center">
                <div className="w-full">
                  {submitted ? (
                    <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-xl border border-white/15 bg-[#0b1633]/50 px-6 py-10 text-center text-white backdrop-blur-sm sm:min-h-[18rem] sm:p-8">
                      <Calendar className="h-12 w-12 text-[#c8a46b]" aria-hidden />
                      <h3 className="dayal-serif mt-4 text-2xl font-semibold">Thank you!</h3>
                      <p className="mt-2 text-sm text-white/70">
                        Our team will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={onSubmit}
                      className="w-full rounded-xl border border-white/15 bg-[#0b1633]/50 p-6 backdrop-blur-sm sm:p-7 lg:max-w-none"
                    >
                      <label className="block text-sm text-white">
                        <span className="font-medium">First name *</span>
                        <input
                          required
                          name="firstName"
                          className={inputClass}
                          placeholder="Your name"
                          autoComplete="given-name"
                        />
                      </label>
                      <label className="mt-4 block text-sm text-white">
                        <span className="font-medium">Phone *</span>
                        <input
                          required
                          type="tel"
                          name="phone"
                          className={inputClass}
                          placeholder="+91"
                          autoComplete="tel"
                        />
                      </label>
                      <label className="mt-4 block text-sm text-white">
                        <span className="font-medium">Email</span>
                        <input
                          type="email"
                          name="email"
                          className={inputClass}
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </label>
                      <button type="submit" className="dayal-btn-gold mt-5 w-full sm:mt-6">
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </DayalReveal>
            </div>

            <div className="flex flex-col gap-3 lg:hidden">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dayal-btn-outline inline-flex items-center justify-center gap-2 py-3 text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
