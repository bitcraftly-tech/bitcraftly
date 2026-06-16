"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, Users, Building2 } from "lucide-react";

const FULL_TEXT = `RPY TECHNICAL & TRAINING Services Pvt. Ltd. is approved by MCA - Ministry of Corporate Affairs (Govt. of India) CIN: U74999BR2018PTC038904 and also approved by Ministry of MSME (Govt. of India) UDYAM-BR-13-0011251 and ISO 9001:2015 & ISO 45001:2018 Certified. We provide services in Industrial Piping, Non-Destructive Testing (NDT), Fire Fighting & Safety, Welding Technology, Maintenance & Repair, Power-Plant Work, Man Power Supply, QA/QC Training with 100% practical lab support & Certification. We also provide NDT SERVICES — Ultrasonic Testing, Magnetic Particle Testing, Penetrant Testing, Ultrasonic Thickness Gauging, Metal Hardness Testing and more.`;

const SHORT = 260;

const BADGES = [
  { Icon: ShieldCheck, label: "ISO 9001:2015",  sub: "Certified" },
  { Icon: Award,       label: "ISO 45001:2018", sub: "Certified" },
  { Icon: Building2,   label: "MCA",            sub: "Approved" },
  { Icon: Users,       label: "MSME",           sub: "Registered" },
];

export default function Rpy2About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rpyv2-about" id="about" aria-label="About RPY Tech">
      <div className="rpyv2-container rpyv2-about-grid">

        {/* ── Left ── */}
        <div className="rpyv2-about-left">
          <span className="rpyv2-section-label">About Us</span>

          <h2 className="rpyv2-about-heading">
            Welcome to <span>RPY Technical</span> &amp;<br />
            Training Services Pvt Ltd
          </h2>

          {/* Trust badges */}
          <div className="rpyv2-about-badges">
            {BADGES.map(({ Icon, label, sub }) => (
              <div key={label} className="rpyv2-about-badge">
                <div className="rpyv2-about-badge-icon" aria-hidden>
                  <Icon size={14} />
                </div>
                <div>
                  <div className="rpyv2-about-badge-name">{label}</div>
                  <div className="rpyv2-about-badge-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="rpyv2-about-text">
            {expanded ? FULL_TEXT : FULL_TEXT.slice(0, SHORT) + "…"}
          </p>

          <button
            className="rpyv2-about-readmore"
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>

        {/* ── Right: premium image frame ── */}
        <div className="rpyv2-about-visual-wrap" aria-hidden>
          {/* Decorative bg block */}
          <div className="rpyv2-about-deco-block" />

          {/* Main image */}
          <div className="rpyv2-about-img-frame">
            <Image
              src="/rpy-tech/students-hd.png"
              alt="RPY Tech students"
              fill
              quality={100}
              priority
              className="rpyv2-about-img"
              sizes="(max-width: 900px) 90vw, 520px"
            />
          </div>

          {/* Floating stat card */}
          <div className="rpyv2-about-float-card">
            <div className="rpyv2-about-float-num">14+</div>
            <div className="rpyv2-about-float-lbl">Years of<br />Excellence</div>
          </div>

          {/* Floating cert card */}
          <div className="rpyv2-about-float-card rpyv2-about-float-card--br">
            <div className="rpyv2-about-float-num">1,22,377</div>
            <div className="rpyv2-about-float-lbl">Certificates<br />Issued</div>
          </div>
        </div>

      </div>
    </section>
  );
}
