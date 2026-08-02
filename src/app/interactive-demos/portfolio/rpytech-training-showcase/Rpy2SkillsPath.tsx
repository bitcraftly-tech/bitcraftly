import Image from 'next/image';
import { Brain, Medal, Briefcase, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    label: 'Get the Skills',
    Icon: Brain,
    img: '/rpy-tech/about-vocational.jpg',
    desc: 'Industry-relevant, hands-on training with 100% practical lab support.',
    accent: '#22c55e',
    tag: 'Training',
  },
  {
    num: '02',
    label: 'Get Certified',
    Icon: Medal,
    img: '/rpy-tech/rajiv-students.jpg',
    desc: 'Globally recognised certifications that validate your expertise.',
    accent: '#3b82f6',
    tag: 'Certification',
  },
  {
    num: '03',
    label: 'Get the Job',
    Icon: Briefcase,
    img: '/rpy-tech/about-feature.jpg',
    desc: 'Dedicated placement assistance and career guidance for every graduate.',
    accent: '#f59e0b',
    tag: 'Career',
  },
];

export default function Rpy2SkillsPath() {
  return (
    <section className="rpyv2-journey" id="skills-path" aria-label="Skills to career journey">
      <div className="rpyv2-container">
        {/* Header */}
        <div className="rpyv2-journey-head">
          <span className="rpyv2-journey-eyebrow">Your Path to Success</span>
          <h2 className="rpyv2-journey-title">From Learning to Earning</h2>
          <p className="rpyv2-journey-sub">
            Three steps. One destination. A career you're proud of.
          </p>
        </div>

        {/* Cards */}
        <div className="rpyv2-journey-grid">
          {STEPS.map(({ num, label, Icon, img, desc, accent, tag }, i) => (
            <div key={num} className="rpyv2-journey-item">
              {/* Card */}
              <div
                className="rpyv2-journey-card"
                style={{ '--jrn-accent': accent } as React.CSSProperties}
              >
                {/* Image half */}
                <div className="rpyv2-journey-img-wrap" aria-hidden>
                  <Image src={img} alt="" fill className="rpyv2-journey-img" sizes="320px" />
                  <div className="rpyv2-journey-img-overlay" />
                  {/* Tag pill on image */}
                  <span className="rpyv2-journey-tag">{tag}</span>
                  {/* Step number */}
                  <span className="rpyv2-journey-num">{num}</span>
                </div>

                {/* Text half */}
                <div className="rpyv2-journey-body">
                  <div className="rpyv2-journey-icon" aria-hidden>
                    <Icon size={22} />
                  </div>
                  <h3 className="rpyv2-journey-label">{label}</h3>
                  <p className="rpyv2-journey-desc">{desc}</p>
                  <a
                    href="https://rpytech.in/index.php/courses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rpyv2-journey-link"
                    aria-label={`Learn more about ${label}`}
                  >
                    Explore <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Arrow connector */}
              {i < STEPS.length - 1 && (
                <div className="rpyv2-journey-arrow" aria-hidden>
                  <svg viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 Q20 0 40 10 Q20 20 0 10Z" fill="#e2e8f0" />
                    <path
                      d="M28 5 L38 10 L28 15"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rpyv2-journey-cta">
          <a
            href="https://rpytech.in/index.php/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="rpyv2-btn rpyv2-btn--primary"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}
