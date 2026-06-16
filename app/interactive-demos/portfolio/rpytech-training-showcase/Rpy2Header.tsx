"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  LogIn,
  CheckCircle,
  Phone,
  ChevronDown,
  X,
} from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./Rpy2SocialIcons";

const BASE = "https://rpytech.in/index.php";

const NAV_ITEMS = [
  { label: "Home", href: BASE, active: true },
  {
    label: "About Us",
    href: `${BASE}/about-us`,
    children: [
      { label: "About Us",              href: `${BASE}/about-us` },
      { label: "Director Message",      href: `${BASE}/director-message` },
      { label: "Our Mission / Our Vision", href: `${BASE}/our-mission-our-vision` },
    ],
  },
  {
    label: "Courses",
    href: `${BASE}/courses`,
    children: [
      { label: "Training Services",           href: `${BASE}/courses` },
      { label: "Inspection and Testing Services", href: `${BASE}/courses` },
    ],
  },
  {
    label: "Student Zone",
    href: `${BASE}/student-verification`,
    children: [
      { label: "Student Verification",    href: `${BASE}/student-verification` },
      { label: "Student Login",           href: `${BASE}/student-login` },
      { label: "Download Admitcard",      href: `${BASE}/download-admitcard` },
      { label: "Marksheet Verification",  href: `${BASE}/marksheet-verification` },
      { label: "Certificate Verification",href: `${BASE}/certificate-verification` },
    ],
  },
  {
    label: "Certifications",
    href: `${BASE}/courses`,
    children: [
      { label: "Training Services",           href: `${BASE}/courses` },
      { label: "Inspection and Testing Services", href: `${BASE}/courses` },
    ],
  },
  {
    label: "Franchise",
    href: `${BASE}/become-a-franchise`,
    children: [
      { label: "Become A Franchise",    href: `${BASE}/become-a-franchise` },
      { label: "Franchise Enquiry",     href: `${BASE}/franchise-enquiry` },
      { label: "Franchise Verification",href: `${BASE}/franchise-verification` },
      { label: "Franchise List",        href: `${BASE}/franchise-list` },
      { label: "Franchise Login",       href: `${BASE}/franchise-login` },
    ],
  },
  {
    label: "Gallery",
    href: `${BASE}/gallery`,
    children: [
      { label: "Photos", href: `${BASE}/gallery` },
      { label: "Videos", href: `${BASE}/gallery` },
    ],
  },
  { label: "Contact Us", href: `${BASE}/contact-us` },
];

export default function Rpy2Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="rpyv2-header">
      {/* Top Bar */}
      <div className="rpyv2-topbar">
        <div className="rpyv2-container rpyv2-topbar-inner">
          <span className="rpyv2-topbar-welcome">
            Welcome to RPY Technical &amp; Training Services Pvt. Ltd.
          </span>
          <div className="rpyv2-topbar-right">
            {/* Highlight badges */}
            <div className="rpyv2-topbar-highlights">
              <a href="#certifications" className="rpyv2-topbar-highlight rpyv2-topbar-highlight--cert">
                🏆 Our Certificates
              </a>
              <a href="#placement" className="rpyv2-topbar-highlight rpyv2-topbar-highlight--place">
                💼 Placement Cell
              </a>
            </div>

            <nav className="rpyv2-topbar-links" aria-label="Quick links">
              <a href="#" className="rpyv2-topbar-link">
                <User size={10} aria-hidden />
                Student Login
              </a>
              <span className="rpyv2-topbar-sep" aria-hidden>|</span>
              <a href="#" className="rpyv2-topbar-link">
                <LogIn size={10} aria-hidden />
                Center Login
              </a>
              <span className="rpyv2-topbar-sep" aria-hidden>|</span>
              <a href="#verify" className="rpyv2-topbar-link">
                <CheckCircle size={10} aria-hidden />
                Verify Certificate
              </a>
              <span className="rpyv2-topbar-sep" aria-hidden>|</span>
              <a href="#contact" className="rpyv2-topbar-link">
                <Phone size={10} aria-hidden />
                Contact Us
              </a>
            </nav>
            <div className="rpyv2-topbar-social" aria-label="Social media">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: TwitterIcon, label: "Twitter" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: LinkedinIcon, label: "LinkedIn" },
                { Icon: YoutubeIcon, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="rpyv2-topbar-social-btn"
                  aria-label={label}
                >
                  <Icon size={11} aria-hidden={true} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="rpyv2-navbar" aria-label="Main navigation">
        <div className="rpyv2-container rpyv2-navbar-inner">
          {/* Logo */}
          <a href="#" className="rpyv2-logo" aria-label="RPY Tech Home">
            <div className="rpyv2-logo-mark" aria-hidden>
              <Image
                src="/rpy-tech/logo.png"
                alt=""
                width={52}
                height={52}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                priority
              />
            </div>
            <div className="rpyv2-logo-text-wrap">
              <div className="rpyv2-logo-brand">
                RPY<span>Tech</span>
              </div>
              <div className="rpyv2-logo-tagline">
                Permanent Proud Yellow Educational and Welfare Trust
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="rpyv2-nav" role="menubar">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="rpyv2-nav-item" role="none">
                <a
                  href={item.href}
                  className={`rpyv2-nav-link${item.active ? " rpyv2-nav-link--active" : ""}`}
                  role="menuitem"
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className="rpyv2-nav-chevron"
                      aria-hidden
                    />
                  )}
                </a>
                {item.children && (
                  <ul className="rpyv2-dropdown" role="menu" aria-label={`${item.label} submenu`}>
                    {item.children.map((child) => (
                      <li key={child.label} role="none">
                        <a
                          href={child.href}
                          className="rpyv2-dropdown-item"
                          role="menuitem"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Apply Now CTA */}
          <a href="#contact" className="rpyv2-nav-apply">
            Apply Now
          </a>

          {/* Hamburger */}
          <button
            className="rpyv2-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden />
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="rpyv2-mobile-menu rpyv2-mobile-menu--open" role="menu">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rpyv2-mobile-link"
                role="menuitem"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                {item.children && <ChevronDown size={14} aria-hidden />}
              </a>
            ))}
            <a href="#contact" className="rpyv2-mobile-apply" onClick={() => setMenuOpen(false)}>
              Apply Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
