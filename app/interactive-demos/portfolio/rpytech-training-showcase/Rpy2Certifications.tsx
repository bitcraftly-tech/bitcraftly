import Image from "next/image";
import { Brain, Medal, Briefcase } from "lucide-react";

const CERT_CARDS = [
  {
    title: "Training Services",
    img: "/rpy-tech/rajiv-students.jpg",
    imgAlt: "RPY Tech Training Services",
    href: "https://rpytech.in/index.php/courses",
  },
  {
    title: "Inspection and Testing Services",
    img: "/rpy-tech/about-feature.jpg",
    imgAlt: "RPY Tech Inspection and Testing Services",
    href: "https://rpytech.in/index.php/courses",
  },
];

const STEPS = [
  {
    label: "Get the Skills",
    Icon: Brain,
    img: "/rpy-tech/about-vocational.jpg",
    accent: false,
  },
  {
    label: "Get Certified",
    Icon: Medal,
    img: "/rpy-tech/rajiv-students.jpg",
    accent: true,
  },
  {
    label: "Get the Job",
    Icon: Briefcase,
    img: "/rpy-tech/about-feature.jpg",
    accent: false,
  },
];

export default function Rpy2Certifications() {
  return (
    <section className="rpyv2-certifications" id="certifications" aria-label="Certifications">
      <div className="rpyv2-container">
        <h2 className="rpyv2-cert-heading">Certifications</h2>

        <div className="rpyv2-cert-grid">
          {CERT_CARDS.map((card) => (
            <div key={card.title} className="rpyv2-cert-card">
              {/* Image */}
              <div className="rpyv2-cert-img-wrap">
                <Image
                  src={card.img}
                  alt={card.imgAlt}
                  fill
                  className="rpyv2-cert-img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Chevron bottom */}
                <div className="rpyv2-cert-chevron" aria-hidden>
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 100,0 50,30" fill="#fff" />
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div className="rpyv2-cert-body">
                <h3 className="rpyv2-cert-title">{card.title}</h3>
                <a
                  href={card.href}
                  className="rpyv2-cert-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Steps: Get the Skills → Get Certified → Get the Job */}
        <div className="rpyv2-cert-steps">
          {STEPS.map(({ label, Icon, img, accent }) => (
            <div
              key={label}
              className={`rpyv2-cert-step${accent ? " rpyv2-cert-step--accent" : ""}`}
            >
              <div className="rpyv2-cert-step-bg" aria-hidden>
                <Image src={img} alt="" fill className="rpyv2-cert-step-img" sizes="33vw" />
                <div className="rpyv2-cert-step-overlay" />
              </div>
              <div className="rpyv2-cert-step-content">
                <div className="rpyv2-cert-step-icon" aria-hidden>
                  <Icon size={28} />
                </div>
                <span className="rpyv2-cert-step-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
