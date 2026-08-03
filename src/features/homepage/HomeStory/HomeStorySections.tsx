import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { getIndustryHref } from '@/constants/industries';
import { ROUTES } from '@/constants/navigation';
import { GoLiveLaunch } from './GoLiveLaunch';
import './home-story-production.css';

const MODULES = [
  'Marketing Website',
  'Admin Dashboard',
  'CMS',
  'AI Assistant',
  'Lead Management',
  'Analytics',
  'Integrations',
  'Deployment Ready',
] as const;

const OUTCOMES = [
  {
    index: '01',
    label: 'Launch',
    title: 'Go live faster',
    body: 'Start from a ready Industry System — not a blank brief.',
  },
  {
    index: '02',
    label: 'Growth',
    title: 'Convert and capture demand',
    body: 'Site and lead management work as one growth surface.',
  },
  {
    index: '03',
    label: 'Operations',
    title: 'Operate with intelligence',
    body: 'Dashboard, AI, and analytics keep ops running after launch.',
  },
] as const;

const PATH = [
  'Business Problem',
  'Industry',
  'Complete Digital System',
  'AI',
  'Dashboard',
  'Integrations',
  'Launch',
] as const;

const WAVE1 = [
  {
    index: '01',
    name: 'Healthcare System',
    short: 'Healthcare',
    href: getIndustryHref('healthcare'),
    blurb: 'Patient site, ops dashboard, AI intake, and live analytics.',
    modules: ['Website', 'AI Intake', 'Dashboard', 'Analytics'] as const,
    tone: 'violet',
  },
  {
    index: '02',
    name: 'Real Estate System',
    short: 'Real Estate',
    href: getIndustryHref('real-estate'),
    blurb: 'Listings, lead pipeline, AI assistant, and performance analytics.',
    modules: ['Listings', 'Leads', 'AI', 'Analytics'] as const,
    tone: 'sky',
  },
  {
    index: '03',
    name: 'Restaurant System',
    short: 'Restaurant',
    href: getIndustryHref('restaurant'),
    blurb: 'Brand site, reservations, AI concierge, and ops dashboard.',
    modules: ['Brand Site', 'Reservations', 'AI Concierge', 'Ops'] as const,
    tone: 'rose',
  },
  {
    index: '04',
    name: 'Corporate Services System',
    short: 'Corporate',
    href: getIndustryHref('corporate-services'),
    blurb: 'Authority site, CRM leads, AI assistant, and exec analytics.',
    modules: ['Authority Site', 'CRM', 'AI', 'Exec Analytics'] as const,
    tone: 'amber',
  },
] as const;

const WORKFLOWS = [
  {
    index: '01',
    title: 'Lead qualification',
    input: 'Capture',
    process: 'Score & route',
    output: 'Follow-up',
  },
  {
    index: '02',
    title: 'Booking / intake',
    input: 'Inquiry',
    process: 'Assistant',
    output: 'Confirm',
  },
  {
    index: '03',
    title: 'Customer answers',
    input: 'Question',
    process: 'Industry knowledge',
    output: 'Grounded reply',
  },
  {
    index: '04',
    title: 'Operator assists',
    input: 'Signal',
    process: 'Summary',
    output: 'Next action',
  },
] as const;

const COMPARISON = [
  {
    dim: 'Starting point',
    agency: 'Blank brief / build from scratch',
    ours: 'Industry System foundation',
  },
  {
    dim: 'Deliverable',
    agency: 'Mostly a website',
    ours: 'Website + Dashboard + CMS + AI + Leads + Analytics',
  },
  {
    dim: 'Speed',
    agency: 'Months of rebuild',
    ours: 'Configure → brand → launch',
  },
  {
    dim: 'AI',
    agency: 'Bolt-on or absent',
    ours: 'Automation built into the system',
  },
  {
    dim: 'Ops',
    agency: 'Fragmented tools',
    ours: 'Dashboard + lead management included',
  },
  {
    dim: 'Accountability',
    agency: 'Project closeout',
    ours: 'Digital Engineering Partner',
  },
] as const;

export function HomeStorySections() {
  return (
    <div className="home-story">
      {/* Outcomes */}
      <section className="hs-section hs-section--outcomes" aria-labelledby="hs-outcomes-heading">
        <div className="hs-outcomes-stage" aria-hidden="true" />
        <Container size="xl" className="hs-outcomes-shell">
          <header className="hs-outcomes-head">
            <div className="hs-outcomes-head__meta">
              <p className="hs-outcomes-kicker">Business outcomes</p>
              <span className="hs-outcomes-head__rule" aria-hidden="true" />
              <p className="hs-outcomes-count" aria-hidden="true">
                01 — 03
              </p>
            </div>
            <h2 id="hs-outcomes-heading" className="hs-outcomes-title">
              Outcomes your business <em>can expect</em>
            </h2>
            <p className="hs-outcomes-lede">
              Launch faster, convert demand, and run ops — one connected Industry System.
            </p>
          </header>

          <ol className="hs-outcomes">
            {OUTCOMES.map((item) => (
              <li key={item.title} className="hs-outcome">
                <span className="hs-outcome__mark" aria-hidden="true">
                  {item.index}
                </span>
                <div className="hs-outcome__body">
                  <p className="hs-outcome__label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Path */}
      <section className="hs-section hs-section--path" aria-labelledby="hs-path-heading">
        <Container size="xl">
          <header className="hs-path-head">
            <div className="hs-path-head__meta">
              <p className="hs-path-kicker">Delivery path</p>
              <span className="hs-path-head__rule" aria-hidden="true" />
            </div>
            <h2 id="hs-path-heading" className="hs-path-title">
              From problem to <em>launch</em>
            </h2>
            <p className="hs-path-lede">
              From business problem to a live Industry System — in a clear sequence.
            </p>
          </header>

          <ol className="hs-path">
            {PATH.map((step, index) => (
              <li key={step} className="hs-path-step">
                <span className="hs-path-step__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="hs-path-step__label">{step}</span>
                {index < PATH.length - 1 ? (
                  <span className="hs-path-step__arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <path
                        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What's included */}
      <section
        className="hs-section hs-section--included"
        id="whats-included"
        aria-labelledby="hs-included-heading"
      >
        <Container size="xl">
          <header className="hs-included-head">
            <div className="hs-included-head__meta">
              <p className="hs-included-kicker">Unit of value</p>
              <span className="hs-included-head__rule" aria-hidden="true" />
              <p className="hs-included-count" aria-hidden="true">
                08 modules
              </p>
            </div>
            <h2 id="hs-included-heading" className="hs-included-title">
              What&apos;s included in every <em>Industry System</em>
            </h2>
            <p className="hs-included-lede">
              Eight modules ship as one product — everything needed to launch and operate.
            </p>
          </header>

          <ol className="hs-modules">
            {MODULES.map((mod, index) => (
              <li key={mod} className="hs-module">
                <span className="hs-module__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="hs-module__name">{mod}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Wave 1 */}
      <section
        className="hs-section hs-wave"
        id="wave-1"
        aria-labelledby="hs-wave-heading"
      >
        <div className="hs-wave-stage">
          <Container size="xl" className="hs-wave-shell">
            <header className="hs-wave-head">
              <div className="hs-wave-head__meta">
                <p className="hs-wave-kicker">Wave 1</p>
                <span className="hs-wave-head__rule" aria-hidden="true" />
                <p className="hs-wave-count">01 — 04</p>
              </div>
              <div className="hs-wave-head__row">
                <div className="hs-wave-head__copy">
                  <h2 id="hs-wave-heading" className="hs-wave-title">
                    Explore <em>Industry Systems</em>
                  </h2>
                  <p className="hs-wave-lede">
                    Four launch-ready systems — website, AI, dashboard, and analytics as one
                    product for your vertical.
                  </p>
                </div>
                <Link href={ROUTES.industries} className="hs-wave-all">
                  Browse all industries
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </header>

            <div className="hs-wave-grid">
              {WAVE1.map((system) => (
                <article
                  key={system.name}
                  className="hs-system"
                  data-tone={system.tone}
                >
                  <span className="hs-system__watermark" aria-hidden="true">
                    {system.index}
                  </span>
                  <div className="hs-system__top">
                    <span className="hs-system__index">{system.index}</span>
                    <span className="hs-system__tag">{system.short}</span>
                  </div>
                  <h3 className="hs-system__title">{system.name}</h3>
                  <p className="hs-system__blurb">{system.blurb}</p>
                  <ul className="hs-system__modules" aria-label="Core modules">
                    {system.modules.map((mod, modIndex) => (
                      <li key={mod} className="hs-system__module">
                        {modIndex > 0 ? (
                          <span className="hs-system__sep" aria-hidden="true" />
                        ) : null}
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={system.href}
                    className="hs-system__cta"
                    aria-label={`Explore ${system.short} System`}
                  >
                    Explore system
                    <span className="hs-system__cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* Intelligent Business Automation */}
      <section className="hs-section hs-auto" id="automation" aria-labelledby="hs-auto-heading">
        <div className="hs-auto-stage">
          <Container size="xl" className="hs-auto-shell">
            <header className="hs-auto-head">
              <div className="hs-auto-head__meta">
                <p className="hs-auto-kicker">AI</p>
                <span className="hs-auto-head__rule" aria-hidden="true" />
                <p className="hs-auto-count">04 workflows</p>
              </div>
              <h2 id="hs-auto-heading" className="hs-auto-title">
                Intelligent <em>Business Automation</em>
              </h2>
              <p className="hs-auto-lede">
                AI as workflows — not a feature list. Input becomes action in every Industry System.
              </p>
            </header>

            <div className="hs-auto-grid">
              {WORKFLOWS.map((wf) => (
                <article key={wf.title} className="hs-flow">
                  <div className="hs-flow__top">
                    <span className="hs-flow__index">{wf.index}</span>
                    <h3 className="hs-flow__title">{wf.title}</h3>
                  </div>

                  <ol className="hs-flow__rail" aria-label={`${wf.title} workflow`}>
                    <li className="hs-flow__step hs-flow__step--in">
                      <span className="hs-flow__label">Input</span>
                      <span className="hs-flow__value">{wf.input}</span>
                    </li>
                    <li className="hs-flow__connector" aria-hidden="true">
                      <svg viewBox="0 0 24 12" fill="none" className="hs-flow__arrow">
                        <path
                          d="M1 6h18M15 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                    <li className="hs-flow__step hs-flow__step--mid">
                      <span className="hs-flow__label">Process</span>
                      <span className="hs-flow__value">{wf.process}</span>
                    </li>
                    <li className="hs-flow__connector" aria-hidden="true">
                      <svg viewBox="0 0 24 12" fill="none" className="hs-flow__arrow">
                        <path
                          d="M1 6h18M15 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                    <li className="hs-flow__step hs-flow__step--out">
                      <span className="hs-flow__label">Output</span>
                      <span className="hs-flow__value">{wf.output}</span>
                    </li>
                  </ol>
                </article>
              ))}
            </div>

            <p className="hs-auto-after">
              <Link href={ROUTES.assistant} className="hs-auto-link">
                See AI inside Industry Systems
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Container>
        </div>
      </section>

      {/* Dashboard ecosystem */}
      <section className="hs-section hs-dash" aria-labelledby="hs-dash-heading">
        <div className="hs-dash-stage">
          <Container size="xl" className="hs-dash-shell">
            <div className="hs-dash-split">
              <div className="hs-dash-copy">
                <div className="hs-dash-head__meta">
                  <p className="hs-dash-kicker">Operations</p>
                  <span className="hs-dash-head__rule" aria-hidden="true" />
                  <p className="hs-dash-count">01 plane</p>
                </div>
                <h2 id="hs-dash-heading" className="hs-dash-title">
                  An ecosystem dashboard — <em>not a single chart</em>
                </h2>
                <p className="hs-dash-lede">
                  Leads, content, AI, and KPIs in one control plane — act from signal, not scattered
                  tools.
                </p>
                <ul className="hs-dash-points">
                  <li>
                    <span className="hs-dash-points__index">01</span>
                    <span>Live leads and pipeline in one view</span>
                  </li>
                  <li>
                    <span className="hs-dash-points__index">02</span>
                    <span>Content + AI activity alongside ops</span>
                  </li>
                  <li>
                    <span className="hs-dash-points__index">03</span>
                    <span>KPI signals that drive next actions</span>
                  </li>
                </ul>
              </div>

              <div className="hs-eco" aria-hidden="true">
                <div className="hs-eco__chrome">
                  <span className="hs-eco__dot hs-eco__dot--r" />
                  <span className="hs-eco__dot hs-eco__dot--y" />
                  <span className="hs-eco__dot hs-eco__dot--g" />
                  <span className="hs-eco__chrome-label">ops.bitcraftly.com</span>
                  <span className="hs-eco__live">Live</span>
                </div>

                <div className="hs-eco__canvas">
                  <div className="hs-eco__glow" />
                  <div className="hs-eco__ring hs-eco__ring--outer" />
                  <div className="hs-eco__ring hs-eco__ring--inner" />

                  <svg className="hs-eco__lines" viewBox="0 0 440 300" preserveAspectRatio="none">
                    <path d="M220 150 C170 150 130 95 105 72" />
                    <path d="M220 150 C270 150 310 95 335 72" />
                    <path d="M220 150 C165 150 125 210 108 232" />
                    <path d="M220 150 C275 150 315 210 332 232" />
                  </svg>

                  <div className="hs-eco__hub">
                    <div className="hs-eco__hub-top">
                      <span className="hs-eco__hub-dot" />
                      <span>Control plane</span>
                    </div>
                    <div className="hs-eco__hub-metrics">
                      <div>
                        <strong>98%</strong>
                        <span>uptime</span>
                      </div>
                      <div>
                        <strong>12</strong>
                        <span>signals</span>
                      </div>
                    </div>
                    <div className="hs-eco__spark" />
                  </div>

                  <div className="hs-eco__node hs-eco__node--1">
                    <div className="hs-eco__node-head">
                      <span className="hs-eco__node-label">Leads</span>
                      <span className="hs-eco__node-trend">+15%</span>
                    </div>
                    <strong className="hs-eco__node-value">248</strong>
                    <span className="hs-eco__node-meta">Pipeline · live</span>
                  </div>
                  <div className="hs-eco__node hs-eco__node--2">
                    <div className="hs-eco__node-head">
                      <span className="hs-eco__node-label">Content</span>
                      <span className="hs-eco__node-trend">CMS</span>
                    </div>
                    <strong className="hs-eco__node-value">36</strong>
                    <span className="hs-eco__node-meta">Published items</span>
                  </div>
                  <div className="hs-eco__node hs-eco__node--3">
                    <div className="hs-eco__node-head">
                      <span className="hs-eco__node-label">AI</span>
                      <span className="hs-eco__node-trend hs-eco__node-trend--live">On</span>
                    </div>
                    <strong className="hs-eco__node-value">84</strong>
                    <span className="hs-eco__node-meta">Actions today</span>
                  </div>
                  <div className="hs-eco__node hs-eco__node--4">
                    <div className="hs-eco__node-head">
                      <span className="hs-eco__node-label">KPIs</span>
                      <span className="hs-eco__node-trend">+2.1%</span>
                    </div>
                    <strong className="hs-eco__node-value">12.4%</strong>
                    <span className="hs-eco__node-meta">Conversion</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Integrations */}
      <section className="hs-section hs-section--mesh" aria-labelledby="hs-int-heading">
        <div className="hs-mesh-stage">
          <div className="hs-mesh-stage__glow" aria-hidden="true" />
          <div className="hs-mesh-stage__grid" aria-hidden="true" />
          <Container size="xl" className="hs-mesh-stage__inner">
            <header className="hs-mesh-head">
              <div className="hs-mesh-head__meta">
                <p className="hs-mesh-kicker">Integrations</p>
                <span className="hs-mesh-head__rule" aria-hidden="true" />
                <p className="hs-mesh-count">05 channels</p>
              </div>
              <h2 id="hs-int-heading" className="hs-mesh-title">
                Connected workflows — <em>not a logo wall</em>
              </h2>
              <p className="hs-mesh-lede">
                Your Industry System stays central. Payments, calendar, CRM, messaging, and email
                stay in sync — no bolt-on tool sprawl.
              </p>
            </header>

            <div className="hs-sync" aria-hidden="true">
              <div className="hs-sync__core">
                <div className="hs-sync__core-top">
                  <span className="hs-sync__pulse" />
                  <span className="hs-sync__core-live">Live</span>
                </div>
                <p className="hs-sync__core-label">Industry System</p>
                <p className="hs-sync__core-sub">One operating layer</p>
                <div className="hs-sync__core-stats">
                  <div>
                    <strong>5</strong>
                    <span>channels</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>synced</span>
                  </div>
                </div>
                <div className="hs-sync__core-bar" />
              </div>

              <div className="hs-sync__bridge">
                <span className="hs-sync__bridge-line" />
                <span className="hs-sync__bridge-packet" />
                <span className="hs-sync__bridge-packet hs-sync__bridge-packet--late" />
                <span className="hs-sync__bridge-label">sync bus</span>
              </div>

              <ul className="hs-sync__channels">
                {[
                  { label: "Payments", hint: "Billing & payouts", lag: "12ms" },
                  { label: "Calendar", hint: "Bookings & slots", lag: "18ms" },
                  { label: "CRM", hint: "Leads & clients", lag: "9ms" },
                  { label: "Messaging", hint: "Chat & alerts", lag: "14ms" },
                  { label: "Email", hint: "Campaigns & inbox", lag: "21ms" },
                ].map((ch) => (
                  <li key={ch.label} className="hs-sync__channel">
                    <span className="hs-sync__channel-mark" />
                    <div className="hs-sync__channel-copy">
                      <strong>{ch.label}</strong>
                      <span>{ch.hint}</span>
                    </div>
                    <span className="hs-sync__channel-lag">{ch.lag}</span>
                    <span className="hs-sync__channel-status">Synced</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </section>

      {/* Why Industry Systems */}
      <section className="hs-section hs-why" aria-labelledby="hs-why-heading">
        <div className="hs-why-stage">
          <Container size="xl" className="hs-why-shell">
            <header className="hs-why-head">
              <div className="hs-why-head__meta">
                <p className="hs-why-kicker">Why us</p>
                <span className="hs-why-head__rule" aria-hidden="true" />
                <p className="hs-why-count">06 diffs</p>
              </div>
              <h2 id="hs-why-heading" className="hs-why-title">
                Why <em>Industry Systems?</em>
              </h2>
              <p className="hs-why-lede">
                Same ambition as an agency — a clearer operating model built for launch and ops.
              </p>
            </header>

            <div className="hs-duel">
              <div className="hs-duel__legend" aria-hidden="true">
                <span className="hs-duel__legend-them">Traditional agency</span>
                <span className="hs-duel__legend-gap" />
                <span className="hs-duel__legend-us">Bitcraftly Industry System</span>
              </div>

              <ul className="hs-duel__list">
                {COMPARISON.map((row, index) => (
                  <li key={row.dim} className="hs-duel__row">
                    <div className="hs-duel__dim">
                      <span className="hs-duel__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="hs-duel__dim-label">{row.dim}</span>
                    </div>
                    <div className="hs-duel__pair">
                      <p className="hs-duel__side hs-duel__side--them">{row.agency}</p>
                      <span className="hs-duel__vs" aria-hidden="true">
                        vs
                      </span>
                      <p className="hs-duel__side hs-duel__side--us">{row.ours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </section>

      {/* Go Live Faster */}
      <section className="hs-section hs-live" aria-labelledby="hs-live-heading">
        <div className="hs-live-stage">
          <Container size="xl" className="hs-live-shell">
            <header className="hs-live-head">
              <div className="hs-live-head__meta">
                <p className="hs-live-kicker">Launch</p>
                <span className="hs-live-head__rule" aria-hidden="true" />
                <p className="hs-live-count">04 steps</p>
              </div>
              <h2 id="hs-live-heading" className="hs-live-title">
                Go <em>Live Faster</em>
              </h2>
              <p className="hs-live-lede">
                Pick an industry, configure modules, brand it, and ship deployment-ready.
              </p>
            </header>

            <GoLiveLaunch />
          </Container>
        </div>
      </section>

      {/* CTA invite */}
      <section className="hs-section hs-invite" aria-labelledby="hs-invite-heading">
        <div className="hs-invite-stage">
          <div className="hs-invite-stage__texture" aria-hidden="true" />
          <div className="hs-invite-stage__glow" aria-hidden="true" />
          <Container size="xl" className="hs-invite-shell">
            <div className="hs-invite-row">
              <header className="hs-invite-head">
                <div className="hs-invite-head__meta">
                  <p className="hs-invite-kicker">Next step</p>
                  <span className="hs-invite-head__rule" aria-hidden="true" />
                  <p className="hs-invite-count">Start here</p>
                </div>
                <h2 id="hs-invite-heading" className="hs-invite-title">
                  Ready to explore your <em>Industry System?</em>
                </h2>
                <p className="hs-invite-lede">
                  Choose a Wave 1 system and go live — or book a call and we&apos;ll map your path.
                </p>
              </header>

              <div className="hs-invite-actions">
                <Link
                  href={ROUTES.industries}
                  className={bcButtonClassName({
                    variant: 'primary',
                    size: 'xl',
                    className: 'hs-invite-btn group',
                  })}
                >
                  Explore Industry Systems
                  <ButtonArrow />
                </Link>
                <Link
                  href={`${ROUTES.contact}?intent=strategy`}
                  className={bcButtonClassName({
                    variant: 'outline',
                    size: 'xl',
                    className: 'hs-invite-btn',
                  })}
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>

            <ul className="hs-invite-notes" aria-label="What to expect">
              <li>4 Wave 1 systems ready</li>
              <li>Configure → brand → launch</li>
              <li>Strategy call in 24 hours</li>
            </ul>
          </Container>
        </div>
      </section>
    </div>
  );
}
