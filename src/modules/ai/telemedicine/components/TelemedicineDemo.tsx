'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarCheck, CircleDot, Video } from 'lucide-react';

function clinicImage(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces,entropy&w=${w}&h=${h}&q=80`;
}

const SLOTS = [
  { time: 'Today · 5:15 PM', doctor: 'Dr. Ananya Mehta', status: 'Available' },
  { time: 'Today · 6:40 PM', doctor: 'Dr. Rahul Kapadia', status: 'Available' },
  { time: 'Tomorrow · 10:00 AM', doctor: 'Dr. Nikita Saraf', status: 'Waitlist' },
] as const;

export default function TelemedicineDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="cl-card overflow-hidden">
        <div className="cl-media relative aspect-[16/10]">
          <Image
            src={clinicImage('photo-1576091160550-2173dba999ef', 1200, 750)}
            alt="Clinician joining a video consultation from the telehealth suite"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 92vw, 50vw"
          />
        </div>
        <div className="p-6">
          <p className="cl-eyebrow">
            <Video className="h-3.5 w-3.5" aria-hidden />
            Telemedicine AI
          </p>
          <h2 className="cl-h3 mt-3">Secure video consultation</h2>
          <p className="cl-body mt-2">
            AI matches you to the next available consultant, confirms device readiness and prepares
            your intake notes before the call.
          </p>
          <Link
            href="/portfolio/clinic-healthcare-showcase#appointment"
            className="cl-btn cl-btn--primary mt-5"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Book Video Call
          </Link>
        </div>
      </article>

      <section className="cl-card p-6" aria-labelledby="ai-slots">
        <h2 id="ai-slots" className="cl-h3">
          Doctor availability
        </h2>
        <ul className="mt-4 space-y-3">
          {SLOTS.map((slot) => (
            <li
              key={slot.time}
              className="flex items-start justify-between gap-3 rounded-xl border px-3 py-3"
              style={{ borderColor: 'var(--cl-border)' }}
            >
              <span>
                <span className="block text-sm font-semibold">{slot.doctor}</span>
                <span className="cl-small block">{slot.time}</span>
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  background: slot.status === 'Available' ? '#ccfbf1' : '#e2e8f0',
                  color: slot.status === 'Available' ? '#0f766e' : '#475569',
                }}
              >
                <CircleDot className="h-3 w-3" aria-hidden />
                {slot.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
