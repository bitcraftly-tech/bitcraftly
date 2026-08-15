'use client';

import { Award, BadgeCheck, Globe, GraduationCap, User, UserRound, Users } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { RPYTECH_CONTAINER, RPYTECH_STATS } from '@/lib/rpytechShowcaseData';

const STAT_ICONS = {
  certification: Award,
  partners: UserRound,
  associate: User,
  graduates: GraduationCap,
  registered: Users,
  issued: BadgeCheck,
  visitors: Globe,
} as const;

function statDuration(value: number) {
  return Math.min(2600, 700 + Math.log10(Math.max(value, 10)) * 450);
}

function AnimatedStatValue({
  value,
  active,
  delay,
}: {
  value: number;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      hasAnimated.current = true;
      setDisplay(value);
      return;
    }

    let raf = 0;
    const timeout = window.setTimeout(() => {
      hasAnimated.current = true;
      const duration = statDuration(value);
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, value, delay]);

  return <span className="rpytech-stat-value">{display}</span>;
}

export default function RpytechStatsBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="rpytech-stats-bar">
      <div className={RPYTECH_CONTAINER}>
        {RPYTECH_STATS.map((stat, index) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div
              key={stat.label}
              className={`rpytech-stat-item${active ? ' rpytech-stat-item--visible' : ''}`}
              style={{ '--stat-delay': `${index * 90}ms` } as CSSProperties}
            >
              <div className="rpytech-stat-icon-wrap" aria-hidden="true">
                <Icon className="rpytech-stat-icon" strokeWidth={1.5} />
              </div>
              <AnimatedStatValue value={stat.value} active={active} delay={index * 90} />
              <span className="rpytech-stat-label">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
