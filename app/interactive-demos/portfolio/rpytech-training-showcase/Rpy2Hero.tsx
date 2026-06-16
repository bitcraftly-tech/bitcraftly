import Image from "next/image";
import { GraduationCap, BookOpen, Briefcase, Building2, ShieldCheck } from "lucide-react";

const TRUST_BADGES = [
  { icon: "ISO", name: "ISO 9001:2015", sub: "Certified Institute" },
  { icon: "M", name: "MSME", sub: "Registered" },
  { icon: "MCA", name: "MCA", sub: "Approved" },
  { icon: "N", name: "NABL", sub: "Accredited" },
];

export default function Rpy2Hero() {
  return (
    <section className="rpyv2-hero" id="hero" aria-label="Hero banner">
      <div className="rpyv2-container rpyv2-hero-inner">
        {/* Left content */}
        <div className="rpyv2-hero-left">
          <p className="rpyv2-hero-eyebrow">Vocational Training &amp; Certification</p>

          <h1 className="rpyv2-hero-heading">
            Empowering Skills.
            <br />
            Building{" "}
            <span className="rpyv2-hero-heading--orange">Careers.</span>
          </h1>

          <p className="rpyv2-hero-sub">
            Vocational Training, Fire &amp; Safety, NDT, QA/QC, Industrial
            Certifications and more. Industry-aligned programs for your bright
            future.
          </p>

          <div className="rpyv2-hero-btns">
            <a href="#contact" className="rpyv2-btn rpyv2-btn--primary">
              Apply Now
            </a>
            <a href="#verify" className="rpyv2-btn rpyv2-btn--outline">
              <ShieldCheck size={15} aria-hidden />
              Verify Certificate
            </a>
          </div>

          {/* Trust badges */}
          <div className="rpyv2-trust-badges" role="list" aria-label="Accreditations">
            {TRUST_BADGES.map((b) => (
              <div key={b.name} className="rpyv2-trust-badge" role="listitem">
                <div className="rpyv2-trust-badge-icon" aria-hidden>
                  {b.icon}
                </div>
                <div className="rpyv2-trust-badge-info">
                  <div className="rpyv2-trust-badge-name">{b.name}</div>
                  <div className="rpyv2-trust-badge-sub">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: circular orbit image */}
        <div className="rpyv2-hero-right" aria-hidden="true">
          <div className="rpyv2-hero-orbit">
            {/* Dashed orbit ring */}
            <div className="rpyv2-hero-orbit-ring" />

            {/* Portrait image */}
            <div className="rpyv2-hero-img-wrap">
              <Image
                src="/rpy-tech/hero-portrait.png"
                alt="RPY Tech student"
                width={460}
                height={460}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>

            {/* Orbit badges */}
            <div className="rpyv2-orbit-badge rpyv2-orbit-badge--tr">
              <div className="rpyv2-badge-icon rpyv2-badge-icon--blue">
                <GraduationCap size={14} />
              </div>
              Certified Trainer
            </div>

            <div className="rpyv2-orbit-badge rpyv2-orbit-badge--l">
              <div className="rpyv2-badge-icon rpyv2-badge-icon--orange">
                <BookOpen size={14} />
              </div>
              Practical Training
            </div>

            <div className="rpyv2-orbit-badge rpyv2-orbit-badge--r">
              <div className="rpyv2-badge-icon rpyv2-badge-icon--green">
                <Briefcase size={14} />
              </div>
              Placement Support
            </div>

            <div className="rpyv2-orbit-badge rpyv2-orbit-badge--b">
              <div className="rpyv2-badge-icon rpyv2-badge-icon--purple">
                <Building2 size={14} />
              </div>
              Industry Recognized
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
