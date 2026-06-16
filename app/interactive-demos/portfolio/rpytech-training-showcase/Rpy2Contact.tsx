"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, Globe, MapPin, ExternalLink } from "lucide-react";

const CONTACT_INFO = [
  { Icon: Phone,  label: "Phone",   value: "7061005611 / 8235436410" },
  { Icon: Mail,   label: "Email",   value: "rtitechnicalinstitute@gmail.com" },
  { Icon: Globe,  label: "Website", value: "www.rpytech.in" },
  { Icon: MapPin, label: "Address", value: "Shyama Market, 1st Floor, Near Ghosh & Sinha Petrol Pump, Mirganj, Gopalganj, Bihar 841438" },
];

export default function Rpy2Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="rpyv2-contact" id="contact" aria-label="Contact us">
      <div className="rpyv2-container rpyv2-contact-grid">
        {/* Left: contact info */}
        <div>
          <p className="rpyv2-section-label">Get in Touch</p>
          <h2 className="rpyv2-contact-heading">
            We&apos;re Here to Help You
          </h2>

          <ul className="rpyv2-contact-list" aria-label="Contact details">
            {CONTACT_INFO.map(({ Icon, label, value }) => (
              <li key={label} className="rpyv2-contact-item">
                <div className="rpyv2-contact-icon" aria-hidden>
                  <Icon size={16} />
                </div>
                <div>
                  <div className="rpyv2-contact-label">{label}</div>
                  <div className="rpyv2-contact-value">{value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form + map */}
        <div className="rpyv2-contact-right">
          <div className="rpyv2-form" role="region" aria-label="Send a message">
            {submitted ? (
              <p style={{ color: "#16a34a", fontWeight: 600, textAlign: "center", padding: "2rem 0" }}>
                ✅ Message sent! We&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="rpyv2-form-row">
                  <div className="rpyv2-form-group">
                    <label htmlFor="rpy2-name" className="rpyv2-sr-only">Your Name</label>
                    <input
                      id="rpy2-name"
                      type="text"
                      className="rpyv2-form-input"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="rpyv2-form-group">
                    <label htmlFor="rpy2-email" className="rpyv2-sr-only">Your Email</label>
                    <input
                      id="rpy2-email"
                      type="email"
                      className="rpyv2-form-input"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="rpyv2-form-group">
                  <label htmlFor="rpy2-phone" className="rpyv2-sr-only">Phone Number</label>
                  <input
                    id="rpy2-phone"
                    type="tel"
                    className="rpyv2-form-input"
                    placeholder="Your Phone"
                  />
                </div>
                <div className="rpyv2-form-group">
                  <label htmlFor="rpy2-message" className="rpyv2-sr-only">Message</label>
                  <textarea
                    id="rpy2-message"
                    className="rpyv2-form-textarea"
                    placeholder="Your Message"
                    required
                  />
                </div>
                <button type="submit" className="rpyv2-form-submit">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map card */}
          <div className="rpyv2-map-card" aria-label="Office location map">
            <div className="rpyv2-map-iframe-wrap">
              <iframe
                src="https://www.google.com/maps?q=RPY+Technical+and+Training+Services+Pvt+Ltd+Gopalganj+Bihar&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RPY Tech Office Location"
              />
            </div>
            <div className="rpyv2-map-body">
              <div>
                <div className="rpyv2-map-office-label">Head Office</div>
                <div className="rpyv2-map-office-addr">
                  Shyama Market, 1st Floor,<br />
                  Mirganj, Gopalganj, Bihar 841438
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/RPY+Technical+and+Training+Services+Pvt+Ltd+Gopalganj+Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="rpyv2-map-view-link"
              >
                Open in Maps
                <ExternalLink size={11} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
