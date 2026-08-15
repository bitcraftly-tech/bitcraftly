'use client';

import {
  Award,
  BadgeCheck,
  Briefcase,
  Flame,
  Globe,
  HardHat,
  Mail,
  Map,
  MapPin,
  Megaphone,
  Phone,
  Presentation,
  TrendingUp,
  User,
  Users,
  HandHelping,
} from 'lucide-react';
import { Poppins } from 'next/font/google';

import {
  RPYTECH,
  RPYTECH_CONTAINER,
  RPYTECH_COURSES,
  RPYTECH_FRANCHISE_BENEFITS,
  RPYTECH_GALLERY,
  RPYTECH_PLACEMENTS,
  RPYTECH_TESTIMONIALS,
} from '@/lib/rpytechShowcaseData';

import RpytechAboutSection from './RpytechAboutSection';
import RpytechCertificationsSection from './RpytechCertificationsSection';
import RpytechDirectorSection from './RpytechDirectorSection';
import RpytechELearningSection from './RpytechELearningSection';
import RpytechHeroSection from './RpytechHeroSection';
import RpytechHowItWorksSection from './RpytechHowItWorksSection';
import RpytechMissionVisionSection from './RpytechMissionVisionSection';
import RpytechStatsBar from './RpytechStatsBar';
import RpytechVerifyFlow from './RpytechVerifyFlow';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const GALLERY_ICONS = {
  users: Users,
  teacher: Presentation,
  award: Award,
  hardhat: HardHat,
  fire: Flame,
} as const;
const FRANCHISE_ICONS = {
  chart: TrendingUp,
  help: HandHelping,
  medal: Award,
  megaphone: Megaphone,
  certificate: BadgeCheck,
  briefcase: Briefcase,
} as const;

export default function RpytechShowcaseContent() {
  return (
    <div className={poppins.className}>
      <RpytechHeroSection />

      <RpytechStatsBar />

      <RpytechAboutSection />

      <RpytechDirectorSection />

      <RpytechMissionVisionSection />

      <RpytechVerifyFlow />

      <RpytechCertificationsSection />

      <RpytechELearningSection />

      <RpytechHowItWorksSection />

      <section id="courses" className="rpytech-page-section scroll-mt-28">
        <div className={RPYTECH_CONTAINER}>
          <div className="rpytech-courses-header">
            <div>
              <p className="rpytech-section-label rpytech-section-label--left">OUR COURSES</p>
              <h2>Popular Training Courses</h2>
            </div>
            <button type="button" className="rpytech-view-all">
              VIEW ALL COURSES +
            </button>
          </div>
          <div className="rpytech-courses-grid">
            {RPYTECH_COURSES.map((course) => (
              <article
                key={course.title}
                className={`rpytech-course-card rpytech-course-card--${course.tone}`}
              >
                <div className="rpytech-course-bg">{course.emoji}</div>
                <div className="rpytech-course-label">{course.title}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="placement"
        className="rpytech-placement-section rpytech-page-section scroll-mt-28"
      >
        <div className={`${RPYTECH_CONTAINER} rpytech-placement-inner`}>
          <div className="rpytech-placement-left">
            <p className="rpytech-section-label rpytech-section-label--left">PLACEMENT CELL</p>
            <h2>Building Successful Careers</h2>
            <p>
              We provide 100% placement assistance to our students. Get placed in top companies
              across India and abroad.
            </p>
            <button type="button" className="rpytech-btn-primary rpytech-btn-sm">
              KNOW MORE →
            </button>
          </div>
          <div className="rpytech-placement-cards">
            {RPYTECH_PLACEMENTS.map((s) => (
              <div key={s.name} className="rpytech-place-card">
                <div className={`rpytech-company-logo rpytech-company-logo--${s.companyTone}`}>
                  {s.company}
                </div>
                <div className="rpytech-place-avatar">
                  <User className="size-7" />
                </div>
                <h4>{s.name}</h4>
                <span>{s.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="rpytech-page-section scroll-mt-28">
        <div className={RPYTECH_CONTAINER}>
          <p className="rpytech-section-label rpytech-section-label--left">GALLERY</p>
          <h2 className="rpytech-section-title rpytech-section-title--left">Moments & Memories</h2>
          <div className="rpytech-section-divider rpytech-section-divider--left" />
          <div className="rpytech-gallery-grid">
            {RPYTECH_GALLERY.map((item, i) => {
              const Icon = GALLERY_ICONS[item.icon];
              return (
                <div key={i} className="rpytech-gal-item">
                  <Icon className="size-7" />
                </div>
              );
            })}
          </div>
          <div className="rpytech-gallery-footer">
            <button type="button" className="rpytech-btn-gallery">
              VIEW GALLERY →
            </button>
          </div>
        </div>
      </section>

      <section
        id="franchise"
        className="rpytech-franchise-section rpytech-page-section scroll-mt-28"
      >
        <div className={`${RPYTECH_CONTAINER} rpytech-franchise-inner`}>
          <div className="rpytech-franchise-left">
            <p className="rpytech-section-label rpytech-section-label--left">FRANCHISE NETWORK</p>
            <h2>Be a Part of Our Growing Network</h2>
            <p>
              Join RPYTech as a franchise center and grow with India&apos;s most trusted training
              brand.
            </p>
            <button type="button" className="rpytech-btn-primary rpytech-btn-sm">
              ENQUIRE NOW →
            </button>
          </div>
          <div className="rpytech-map-placeholder">
            <Map className="size-12" />
          </div>
          <div className="rpytech-franchise-right">
            <div className="rpytech-franchise-features">
              {RPYTECH_FRANCHISE_BENEFITS.map((item) => {
                const Icon = FRANCHISE_ICONS[item.icon];
                return (
                  <div key={item.label} className="rpytech-ff-item">
                    <Icon className="size-5 text-[var(--rpytech-orange)]" />
                    <span className="whitespace-pre-line">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="rpytech-page-section">
        <div className={RPYTECH_CONTAINER}>
          <p className="rpytech-section-label">TESTIMONIALS</p>
          <h2 className="rpytech-section-title">What Our Students Say</h2>
          <div className="rpytech-section-divider" />
          <div className="rpytech-testi-grid">
            {RPYTECH_TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rpytech-testi-card">
                <div className="rpytech-stars">★★★★★</div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer className="rpytech-testi-author">
                  <div className="rpytech-testi-avatar">
                    <User className="size-4" />
                  </div>
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="student-zone" className="scroll-mt-28" aria-hidden />

      <section id="contact" className="rpytech-contact-section rpytech-page-section scroll-mt-28">
        <div className={`${RPYTECH_CONTAINER} rpytech-contact-inner`}>
          <div className="rpytech-contact-info">
            <p className="rpytech-section-label rpytech-section-label--left">GET IN TOUCH</p>
            <h2>We&apos;re Here to Help You</h2>
            <ul>
              <li className="rpytech-ci-item">
                <Phone className="size-4 text-[var(--rpytech-orange)]" />
                {RPYTECH.phone}
              </li>
              <li className="rpytech-ci-item">
                <Mail className="size-4 text-[var(--rpytech-orange)]" />
                {RPYTECH.email}
              </li>
              <li className="rpytech-ci-item">
                <Globe className="size-4 text-[var(--rpytech-orange)]" />
                {RPYTECH.website}
              </li>
              <li className="rpytech-ci-item">
                <MapPin className="size-4 text-[var(--rpytech-orange)]" />
                {RPYTECH.address}
              </li>
            </ul>
          </div>
          <form className="rpytech-contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="tel" placeholder="Your Phone" />
            <textarea placeholder="Your Message" rows={4} />
            <button type="submit" className="rpytech-btn-primary">
              SEND MESSAGE
            </button>
          </form>
          <div className="rpytech-contact-map">
            <Map className="size-10" />
            <div className="rpytech-map-badge">
              <strong>{RPYTECH.mapLabel}</strong>
              {RPYTECH.address}
              <button type="button" className="rpytech-map-link">
                View on Map →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
