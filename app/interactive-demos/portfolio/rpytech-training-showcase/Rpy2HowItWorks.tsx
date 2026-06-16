"use client";
import Image from "next/image";
import { MousePointerClick, CalendarCheck, ClipboardCheck, MapPin, PenLine, Gem } from "lucide-react";

const STEPS = [
  { num: "01", Icon: MousePointerClick, title: "Choose Your Certification", desc: "Browse our wide catalogue and select the certification that aligns with your career goals.", accent: "#22c55e" },
  { num: "02", Icon: CalendarCheck,     title: "Make Your Schedule",        desc: "Pick from a range of available dates and examination centers that suit you best.", accent: "#38bdf8" },
  { num: "03", Icon: ClipboardCheck,    title: "Complete Registration",     desc: "Fill in your personal details and securely complete the online registration form.", accent: "#a78bfa" },
  { num: "04", Icon: MapPin,            title: "Find Exam Center",          desc: "Use our locator to find the nearest test center offering your chosen exam.", accent: "#fb923c" },
  { num: "05", Icon: PenLine,           title: "Attend the Exam",           desc: "Appear at your selected test center on time and give it your best shot.", accent: "#f472b6" },
  { num: "06", Icon: Gem,               title: "Get Certified",             desc: "Receive your verified certificate and step confidently into a brighter future.", accent: "#facc15" },
];

export default function Rpy2HowItWorks() {
  return (
    <section className="rpyv2-hiw" id="how-it-works" aria-label="How it works">

      {/* Header */}
      <div className="rpyv2-hiw-head">
        <span className="rpyv2-hiw-label">Step by Step</span>
        <h2 className="rpyv2-hiw-title">How It Works</h2>
        <p className="rpyv2-hiw-sub">Your journey from enrollment to certification — six simple steps.</p>
      </div>

      {/* Timeline */}
      <div className="rpyv2-hiw-timeline">

        {/* Center spine */}
        <div className="rpyv2-hiw-spine" aria-hidden />

        {/* Steps */}
        {STEPS.map(({ num, Icon, title, desc, accent }, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div key={num} className={`rpyv2-hiw-row rpyv2-hiw-row--${side}`}>
              {/* Empty spacer for opposite side */}
              <div className="rpyv2-hiw-spacer" />

              {/* Node on spine */}
              <div className="rpyv2-hiw-node" style={{ "--hiw-accent": accent } as React.CSSProperties} aria-hidden>
                <span>{num}</span>
              </div>

              {/* Card */}
              <div className="rpyv2-hiw-card" style={{ "--hiw-accent": accent } as React.CSSProperties}>
                <div className="rpyv2-hiw-card-icon" aria-hidden>
                  <Icon size={22} />
                </div>
                <div className="rpyv2-hiw-card-body">
                  <h3 className="rpyv2-hiw-card-title">{title}</h3>
                  <p className="rpyv2-hiw-card-desc">{desc}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center image between step 3 and 4 */}
        <div className="rpyv2-hiw-centerimg" aria-hidden>
          <div className="rpyv2-hiw-centerimg-ring">
            <div className="rpyv2-hiw-centerimg-inner">
              <Image
                src="/rpy-tech/rajiv-students.jpg"
                alt="RPY Tech students"
                fill
                sizes="180px"
                className="rpyv2-hiw-centerimg-photo"
              />
            </div>
          </div>
        </div>

      </div>

      <p className="rpyv2-hiw-tagline">Your Bright Future is Our Mission.</p>
    </section>
  );
}
