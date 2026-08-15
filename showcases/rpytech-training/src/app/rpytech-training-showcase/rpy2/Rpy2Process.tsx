import { UserCheck, FileCheck2, ClipboardList, Handshake, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    Icon: UserCheck,
    title: 'Student Verification',
    action: 'View',
    href: 'https://rpytech.in/index.php/student-verification',
    color: 'yellow',
  },
  {
    Icon: FileCheck2,
    title: 'Certification Verification',
    action: 'View',
    href: 'https://rpytech.in/index.php/certificate-verification',
    color: 'green',
  },
  {
    Icon: ClipboardList,
    title: 'Marksheet Verification',
    action: 'View',
    href: 'https://rpytech.in/index.php/marksheet-verification',
    color: 'green',
  },
  {
    Icon: Handshake,
    title: 'Become A Partner',
    action: 'Submit',
    href: 'https://rpytech.in/index.php/become-a-franchise',
    color: 'yellow',
  },
];

export default function Rpy2Process() {
  return (
    <section className="rpyv2-process" id="process" aria-label="Verification and partnership">
      <div className="rpyv2-container">
        <div className="rpyv2-process-header">
          <p className="rpyv2-section-label">Quick Access</p>
          <h2 className="rpyv2-section-title">Verification &amp; Partnership</h2>
        </div>

        <div className="rpyv2-process-steps" role="list" aria-label="Verification steps">
          {STEPS.map(({ Icon, title, action, href, color }, i) => (
            <div key={title} className="rpyv2-process-step" role="listitem">
              {/* Circle icon */}
              <div className="rpyv2-process-icon-wrap" aria-hidden>
                <div className={`rpyv2-process-circle rpyv2-process-circle--${color}`}>
                  <Icon size={28} />
                </div>
                <span className="rpyv2-process-num">0{i + 1}</span>
              </div>

              <h3 className="rpyv2-process-title">{title}</h3>

              <a
                href={href}
                className="rpyv2-process-action"
                target="_blank"
                rel="noopener noreferrer"
              >
                {action}
                <ArrowRight size={12} aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
