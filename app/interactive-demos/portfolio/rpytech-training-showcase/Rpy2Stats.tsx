"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Handshake, Users, GraduationCap, UserCheck, ScrollText, Globe } from "lucide-react";

const STATS = [
  { value: 43,     suffix: "+",  label: "Our Certifications",   Icon: Award,         color: "#22c55e" },
  { value: 157,    suffix: "+",  label: "Our Partners",         Icon: Handshake,     color: "#3b82f6" },
  { value: 69,     suffix: "+",  label: "Our Associates",       Icon: Users,         color: "#a855f7" },
  { value: 62572,  suffix: "+",  label: "Certified Candidates", Icon: GraduationCap, color: "#f97316" },
  { value: 88503,  suffix: "+",  label: "Registered Users",     Icon: UserCheck,     color: "#ec4899" },
  { value: 122377, suffix: "+",  label: "Certificates Issued",  Icon: ScrollText,    color: "#eab308" },
  { value: 407363, suffix: "+",  label: "Site Visitors",        Icon: Globe,         color: "#06b6d4" },
];

function useCountUp(target: number, active: boolean, duration = 2200) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, duration]);
  return count;
}

function StatCard({ value, suffix, label, Icon, color, active }: (typeof STATS)[0] & { active: boolean }) {
  const count = useCountUp(value, active);
  const display = count >= 1000 ? count.toLocaleString("en-IN") : String(count);

  return (
    <div
      className="rpyv2-stat-card"
      style={{ "--stat-color": color } as React.CSSProperties}
    >
      <div className="rpyv2-stat-card-icon" aria-hidden>
        <Icon size={20} />
      </div>
      <div className="rpyv2-stat-card-num" aria-live={active ? "polite" : undefined}>
        {display}{suffix}
      </div>
      <p className="rpyv2-stat-card-label">{label}</p>
    </div>
  );
}

export default function Rpy2Stats() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="rpyv2-stats" id="stats" aria-label="Statistics">
      <div className="rpyv2-container">
        <div className="rpyv2-stats-header">
          <span className="rpyv2-stats-eyebrow">By the Numbers</span>
          <h2 className="rpyv2-stats-title">Our Impact Speaks</h2>
          <p className="rpyv2-stats-sub">Trusted by thousands of learners, partners, and employers across India.</p>
        </div>

        <div className="rpyv2-stats-bento">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} active={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
