import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const COURSES = [
  {
    name: 'Industrial Safety',
    desc: 'Comprehensive training in workplace hazard identification, risk assessment, and safety protocols.',
    duration: '3–6 Months',
    level: 'Beginner to Advanced',
    accent: '#f97316',
    icon: '🦺',
  },
  {
    name: 'Fire & Safety',
    desc: 'Fire prevention, emergency response, and firefighting techniques for industrial environments.',
    duration: '3–6 Months',
    level: 'Beginner to Advanced',
    accent: '#ef4444',
    icon: '🔥',
  },
  {
    name: 'QA / QC',
    desc: 'Quality assurance and control principles covering inspection, testing, and documentation.',
    duration: '3–6 Months',
    level: 'Intermediate',
    accent: '#3b82f6',
    icon: '🔬',
  },
  {
    name: 'Piping',
    desc: 'Piping design, layout, and engineering standards used in oil, gas, and process industries.',
    duration: '3–6 Months',
    level: 'Intermediate',
    accent: '#8b5cf6',
    icon: '🔧',
  },
  {
    name: 'Welding',
    desc: 'Practical welding skills including MIG, TIG, and arc welding with safety certifications.',
    duration: '3–6 Months',
    level: 'Beginner to Advanced',
    accent: '#22c55e',
    icon: '⚙️',
  },
  {
    name: 'NDT Level II',
    desc: 'Non-destructive testing methods — ultrasonic, radiographic, and magnetic particle inspection.',
    duration: '3–6 Months',
    level: 'Advanced',
    accent: '#0891b2',
    icon: '📡',
  },
  {
    name: 'HVAC',
    desc: 'Heating, ventilation, and air-conditioning systems — design, installation, and maintenance.',
    duration: '3–6 Months',
    level: 'Intermediate',
    accent: '#06b6d4',
    icon: '❄️',
  },
  {
    name: 'Fitter',
    desc: 'Mechanical fitting skills covering assembly, alignment, and maintenance of industrial machinery.',
    duration: '3–6 Months',
    level: 'Beginner to Advanced',
    accent: '#f59e0b',
    icon: '🔩',
  },
];

export default function Rpy2Courses() {
  return (
    <section className="rpyv2-courses" id="courses" aria-label="Popular training courses">
      <div className="rpyv2-container">
        {/* Header */}
        <div className="rpyv2-courses-hd">
          <div>
            <span className="rpyv2-courses-eyebrow">Popular Training Courses</span>
            <h2 className="rpyv2-courses-title">Explore Our Top Courses</h2>
            <p className="rpyv2-courses-sub">
              Industry-recognised certifications designed to fast-track your career.
            </p>
          </div>
          <a
            href="https://rpytech.in/index.php/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="rpyv2-btn rpyv2-btn--primary"
          >
            View All Courses
          </a>
        </div>

        {/* Grid */}
        <div className="rpyv2-courses-grid">
          {COURSES.map(({ name, desc, duration, level, accent, icon }) => (
            <a
              key={name}
              href="https://rpytech.in/index.php/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="rpyv2-crs-card"
              style={{ '--crs-accent': accent } as React.CSSProperties}
              aria-label={`${name} course`}
            >
              {/* Left accent bar */}
              <span className="rpyv2-crs-bar" aria-hidden />

              {/* Icon */}
              <div className="rpyv2-crs-icon" aria-hidden>
                {icon}
              </div>

              {/* Body */}
              <div className="rpyv2-crs-body">
                <h3 className="rpyv2-crs-name">{name}</h3>
                <p className="rpyv2-crs-desc">{desc}</p>
                <div className="rpyv2-crs-meta">
                  <span className="rpyv2-crs-badge">
                    <ShieldCheck size={11} /> Industry Certified
                  </span>
                  <span className="rpyv2-crs-dur">{duration}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="rpyv2-crs-arrow" aria-hidden>
                <ArrowUpRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
