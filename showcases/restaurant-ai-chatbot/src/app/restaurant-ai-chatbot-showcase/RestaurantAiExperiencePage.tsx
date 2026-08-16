import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  ChefHat,
  CircleDollarSign,
  Clock3,
  Globe2,
  Headphones,
  Languages,
  MessageCircle,
  PlugZap,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  WandSparkles,
  Zap,
} from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { RestaurantAiExperiencePanel } from './RestaurantAiExperiencePanel';

const TRUST_POINTS = [
  { label: 'Menu-grounded replies', icon: ShieldCheck },
  { label: 'WhatsApp ready', icon: MessageCircle },
  { label: 'Human handoff', icon: Headphones },
  { label: '12+ languages', icon: Languages },
] as const;

const ACTIVITY = [
  { label: 'Table confirmed', detail: '4 guests · 8:00 PM', icon: CalendarCheck },
  { label: 'Order accepted', detail: '₹1,540 · Kitchen notified', icon: ShoppingBag },
  { label: 'Guest question', detail: 'Nut allergy · Answered safely', icon: ShieldCheck },
] as const;

const JOURNEY = [
  {
    number: '01',
    title: 'Connect your menu',
    description:
      'Sync menu, availability, dietary tags, and service rules from your existing stack.',
    icon: PlugZap,
  },
  {
    number: '02',
    title: 'Train your AI host',
    description: 'Tune voice, upsell logic, policies, and escalation paths for every outlet.',
    icon: WandSparkles,
  },
  {
    number: '03',
    title: 'Serve every guest',
    description:
      'Launch on web and WhatsApp with one intelligence layer and full operator visibility.',
    icon: Sparkles,
  },
] as const;

const CAPABILITIES = [
  {
    id: 'recommend',
    eyebrow: 'Menu intelligence',
    title: 'Recommendations that respect taste—and margin.',
    description:
      'Aira combines dietary needs, spice preference, party size, availability, and contribution margin before suggesting a dish.',
    icon: ChefHat,
    points: ['Allergy-safe filtering', 'Inventory-aware suggestions', 'Smart pairing and upsells'],
  },
  {
    id: 'booking',
    eyebrow: 'Reservations',
    title: 'Turn “Do you have a table?” into a confirmed booking.',
    description:
      'Capture party details, suggest live slots, collect deposits, and send reminders without making guests wait on a call.',
    icon: CalendarCheck,
    points: ['Live slot discovery', 'Waitlist and deposit rules', 'Calendar-ready confirmations'],
  },
  {
    id: 'ordering',
    eyebrow: 'Conversational commerce',
    title: 'Build accurate orders inside a natural conversation.',
    description:
      'Guests can discover, customise, and confirm an order while Aira applies modifier, combo, and kitchen constraints.',
    icon: UtensilsCrossed,
    points: ['Guided order building', 'Modifier guardrails', 'POS-ready payloads'],
  },
  {
    id: 'support',
    eyebrow: 'Guest care',
    title: 'Resolve routine questions. Escalate the moments that matter.',
    description:
      'Policy-grounded support handles the repetitive load and hands the complete context to a human when confidence drops.',
    icon: Headphones,
    points: ['Confidence-based handoff', 'Transcript preserved', 'SLA and sentiment alerts'],
  },
] as const;

const OUTCOMES = [
  {
    value: '38%',
    label: 'more digital orders',
    detail: 'Against the pre-assistant baseline',
    meter: 76,
    icon: ShoppingBag,
  },
  {
    value: '24/7',
    label: 'guest response coverage',
    detail: 'No enquiry waits for opening hours',
    meter: 100,
    icon: Clock3,
  },
  {
    value: '3.4×',
    label: 'faster reservation flow',
    detail: 'First question to confirmed table',
    meter: 68,
    icon: Zap,
  },
  {
    value: '18%',
    label: 'higher average basket',
    detail: 'Pairings suggested inside the chat',
    meter: 54,
    icon: CircleDollarSign,
  },
] as const;

/** Decorative trend for the operator insight card — one bar per recent service. */
const INSIGHT_TREND = [
  { label: 'Fri', height: 34 },
  { label: 'Sat', height: 48 },
  { label: 'Sun', height: 42 },
  { label: 'Mon', height: 68 },
  { label: 'Tue', height: 61 },
  { label: 'Wed', height: 84 },
  { label: 'Thu', height: 76 },
  { label: 'Fri', height: 96 },
] as const;

const INTEGRATIONS = ['WhatsApp', 'Square', 'Toast', 'Razorpay', 'Twilio', 'Freshdesk'] as const;

/**
 * Responsive restaurant AI product showcase with a functional demo.
 */
export default function RestaurantAiExperiencePage() {
  return (
    <div className="ra-page">
      <section id="hero" className="ra-hero" aria-labelledby="ra-hero-heading">
        <div className="ra-hero__texture" aria-hidden />
        <div className={`${CONTAINER} ra-hero__inner`}>
          <div className="ra-hero__copy">
            <p className="ra-kicker">
              <span>
                <Sparkles size={14} aria-hidden />
              </span>
              Restaurant intelligence, always on
            </p>
            <h1 id="ra-hero-heading">
              Your busiest table deserves an <em>AI host.</em>
            </h1>
            <p className="ra-hero__lead">
              One conversational assistant for menu discovery, ordering, reservations, and guest
              care—across your website and WhatsApp.
            </p>
            <div className="ra-hero__actions">
              <ShowcaseAnchor href="#live-demo" className="ra-button ra-button--primary">
                Try the live demo
                <ArrowRight size={17} aria-hidden />
              </ShowcaseAnchor>
              <ShowcaseAnchor href="#capabilities" className="ra-button ra-button--secondary">
                Explore capabilities
              </ShowcaseAnchor>
            </div>
            <p className="ra-hero__rating">
              <span aria-hidden>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={14} fill="currentColor" />
                ))}
              </span>
              <span>
                <strong>4.9 / 5</strong> guest satisfaction across illustrative AI-handled
                conversations
              </span>
            </p>
            <ul className="ra-hero__proof" aria-label="Product strengths">
              {TRUST_POINTS.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={15} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="ra-hero__stage">
            <span className="ra-hero__orbit" aria-hidden />
            <span className="ra-hero__float ra-hero__float--top" aria-hidden>
              <i />
              Answering 3 guests right now
            </span>
            <span className="ra-hero__float ra-hero__float--bottom" aria-hidden>
              <Sparkles size={13} />
              Menu synced · 42 live items
            </span>

            <div className="ra-command" aria-label="AI host command centre preview">
              <span className="ra-command__hud" aria-hidden />
              <div className="ra-command__head">
                <div>
                  <span className="ra-command__logo" aria-hidden>
                    <Bot size={20} />
                  </span>
                  <span>
                    <strong>Tasting Desk AI</strong>
                    <small>Restaurant command centre</small>
                  </span>
                </div>
                <span className="ra-command__live">
                  <i aria-hidden />
                  Live
                </span>
              </div>

              <div className="ra-command__metrics">
                <div>
                  <small>Conversations</small>
                  <strong>1,284</strong>
                  <span>↑ 18.4%</span>
                </div>
                <div>
                  <small>Orders assisted</small>
                  <strong>342</strong>
                  <span>↑ 12.7%</span>
                </div>
                <div>
                  <small>Booked tonight</small>
                  <strong>86%</strong>
                  <span>34 tables</span>
                </div>
              </div>

              <div className="ra-command__body">
                <div className="ra-command__conversation">
                  <p className="ra-command__label">Live conversation</p>
                  <div className="ra-command__bubble ra-command__bubble--guest">
                    We are four people. Two vegetarian and one nut allergy.
                  </div>
                  <div className="ra-command__bubble ra-command__bubble--ai">
                    I have a kitchen-verified menu for you. Shall I build a mild sharing order under
                    ₹2,000?
                  </div>
                  <div className="ra-command__chips">
                    <span>Build my order</span>
                    <span>Reserve first</span>
                  </div>
                  <p className="ra-command__typing" aria-hidden>
                    <i />
                    <i />
                    <i />
                    Aira is drafting the next reply
                  </p>
                </div>

                <div className="ra-command__activity">
                  <p className="ra-command__label">Recent activity</p>
                  <ul>
                    {ACTIVITY.map(({ label, detail, icon: Icon }) => (
                      <li key={label}>
                        <span aria-hidden>
                          <Icon size={15} />
                        </span>
                        <span>
                          <strong>{label}</strong>
                          <small>{detail}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ra-command__footer">
                <span>
                  <Globe2 size={14} aria-hidden />
                  English · हिंदी · Hinglish
                </span>
                <span>Avg. response 1.2s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ra-trust" aria-label="Restaurant AI highlights">
        <div className={CONTAINER}>
          <p>Built for busy restaurant teams</p>
          <div>
            <span>Menu-aware</span>
            <i aria-hidden />
            <span>Multi-outlet</span>
            <i aria-hidden />
            <span>Human-backed</span>
            <i aria-hidden />
            <span>Enterprise-ready</span>
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="ra-journey scroll-mt-24"
        aria-labelledby="ra-journey-heading"
      >
        <div className={`${CONTAINER} ra-section`}>
          <div className="ra-section-heading">
            <p className="ra-overline">From menu to momentum</p>
            <h2 id="ra-journey-heading">Live in three thoughtful steps.</h2>
            <p>
              Keep your existing restaurant stack. Add an intelligence layer that makes it easier
              for guests to decide and act.
            </p>
          </div>
          <ol className="ra-journey__grid">
            {JOURNEY.map(({ number, title, description, icon: Icon }) => (
              <li key={number}>
                <span className="ra-journey__number">{number}</span>
                <span className="ra-journey__icon" aria-hidden>
                  <Icon size={21} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="live-demo"
        className="ra-live-demo scroll-mt-24"
        aria-labelledby="ra-demo-heading"
      >
        <span id="demo" className="ra-anchor-alias" aria-hidden />
        <span id="demo-chat" className="ra-anchor-alias" aria-hidden />
        <div className={`${CONTAINER} ra-section ra-live-demo__grid`}>
          <div className="ra-live-demo__copy">
            <p className="ra-overline">Interactive product demo</p>
            <h2 id="ra-demo-heading">Meet Aira, your next digital host.</h2>
            <p>
              Ask a menu question, assemble an order, or reserve a table. This functional demo
              mirrors the guest journey while keeping every interaction local to your browser.
            </p>
            <ul>
              <li>
                <Check size={16} aria-hidden />
                Grounded answers with dietary guardrails
              </li>
              <li>
                <Check size={16} aria-hidden />
                Menu ordering with live basket totals
              </li>
              <li>
                <Check size={16} aria-hidden />
                Instant reservation confirmation
              </li>
            </ul>
            <div className="ra-live-demo__note">
              <MessageCircle size={18} aria-hidden />
              <span>
                <strong>Try it yourself</strong>
                Every button and form in the demo works.
              </span>
            </div>
          </div>
          <RestaurantAiExperiencePanel />
        </div>
      </section>

      <section
        id="capabilities"
        className="ra-capabilities scroll-mt-24"
        aria-labelledby="ra-capabilities-heading"
      >
        <span id="features" className="ra-anchor-alias" aria-hidden />
        <div className={`${CONTAINER} ra-section`}>
          <div className="ra-section-heading ra-section-heading--split">
            <div>
              <p className="ra-overline">One assistant. Every guest moment.</p>
              <h2 id="ra-capabilities-heading">
                Hospitality is human. Your operations can still be smart.
              </h2>
            </div>
            <p>
              Aira handles repetitive coordination so your team can focus on service, recovery, and
              memorable dining experiences.
            </p>
          </div>

          <div className="ra-capabilities__grid">
            {CAPABILITIES.map(({ id, eyebrow, title, description, icon: Icon, points }) => (
              <article key={id} className={`ra-capability ra-capability--${id}`}>
                <div className="ra-capability__top">
                  <span className="ra-capability__icon" aria-hidden>
                    <Icon size={23} />
                  </span>
                  <span className="ra-capability__eyebrow">{eyebrow}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>
                      <Check size={14} aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="outcomes"
        className="ra-outcomes scroll-mt-24"
        aria-labelledby="ra-outcomes-heading"
      >
        <div className={`${CONTAINER} ra-section`}>
          <div className="ra-outcomes__intro">
            <div>
              <p className="ra-overline">Measured at the table</p>
              <h2 id="ra-outcomes-heading">Designed around outcomes operators understand.</h2>
              <p className="ra-outcomes__lead">
                Every number maps to a shift decision—covers booked, prep load, and the questions
                your team no longer answers twice.
              </p>
            </div>
            <div className="ra-outcomes__rating">
              <span aria-hidden>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={15} fill="currentColor" />
                ))}
              </span>
              <strong>4.9 / 5 guest satisfaction</strong>
              <small>Illustrative product benchmark</small>
            </div>
          </div>

          <div className="ra-outcomes__bento">
            <article className="ra-insight">
              <div className="ra-insight__copy">
                <span className="ra-insight__icon" aria-hidden>
                  <BarChart3 size={19} />
                </span>
                <p className="ra-overline">Operator insight</p>
                <h3>See what guests ask before it becomes a trend.</h3>
                <p>
                  Track unmet demand, lost-order reasons, booking intent, sentiment, and the menu
                  items Aira helps convert.
                </p>
              </div>

              <figure className="ra-insight__figure">
                <div className="ra-insight__chart" aria-hidden>
                  {INSIGHT_TREND.map(({ label, height }, index) => (
                    <span key={`${label}-${index}`}>
                      <span className="ra-insight__track">
                        <span className="ra-insight__bar" style={{ height: `${height}%` }} />
                      </span>
                      <small>{label}</small>
                    </span>
                  ))}
                </div>
                <figcaption>Guest conversations handled · last eight services</figcaption>
              </figure>
            </article>

            <ul className="ra-outcomes__grid">
              {OUTCOMES.map(({ value, label, detail, meter, icon: Icon }) => (
                <li key={label}>
                  <span className="ra-outcome__icon" aria-hidden>
                    <Icon size={18} />
                  </span>
                  <strong>{value}</strong>
                  <p>{label}</p>
                  <small>{detail}</small>
                  <span className="ra-outcome__meter" aria-hidden>
                    <i style={{ width: `${meter}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ra-integrations" aria-labelledby="ra-integrations-heading">
        <span id="languages" className="ra-anchor-alias" aria-hidden />
        <div className={`${CONTAINER} ra-section`}>
          <p className="ra-overline">Fits your restaurant stack</p>
          <h2 id="ra-integrations-heading">Connect the tools your team already uses.</h2>
          <div className="ra-integrations__list" aria-label="Example integrations">
            {INTEGRATIONS.map((integration) => (
              <span key={integration}>{integration}</span>
            ))}
          </div>
          <p className="ra-integrations__note">
            API-first architecture supports POS, reservation, payment, delivery, CRM, and helpdesk
            integrations.
          </p>
        </div>
      </section>

      <section className="ra-final" aria-labelledby="ra-final-heading">
        <span className="ra-final__rings" aria-hidden />
        <div className={`${CONTAINER} ra-final__inner`}>
          <span className="ra-final__spark" aria-hidden>
            <Sparkles size={24} />
          </span>
          <p className="ra-overline">The next shift starts here</p>
          <h2 id="ra-final-heading">Give every guest an answer—and every operator an advantage.</h2>
          <p>
            Bring your menu, workflows, and service standards. Bitcraftly will help you shape the AI
            host around your restaurant.
          </p>
          <div>
            <ShowcaseLink
              href="/contact?intent=consultation&source=restaurant-ai-chatbot-showcase"
              className="ra-button ra-button--light"
            >
              Design my restaurant assistant
              <ArrowRight size={17} aria-hidden />
            </ShowcaseLink>
            <ShowcaseAnchor href="#live-demo" className="ra-button ra-button--dark-ghost">
              Replay the demo
            </ShowcaseAnchor>
          </div>
          <span className="ra-final__meta">
            Fictional product showcase · Metrics are illustrative
          </span>
        </div>
      </section>
    </div>
  );
}
