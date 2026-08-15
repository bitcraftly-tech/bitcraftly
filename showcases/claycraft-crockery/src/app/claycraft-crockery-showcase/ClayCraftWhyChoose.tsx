import { Package, RefreshCcw, ShieldCheck, Truck } from 'lucide-react';
import type { ReactNode } from 'react';

type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

function QualitySealIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <circle cx="12" cy="11" r="7.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.2 11.1l1.7 1.7 3.9-3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 17.2l1.2 3.2 2.6-1.4 2.6 1.4 1.2-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Returns30Icon() {
  return (
    <span className="cc-why__returns-icon" aria-hidden>
      <RefreshCcw />
      <span>30</span>
    </span>
  );
}

const ITEMS: readonly WhyChooseItem[] = [
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'Finest materials, crafted to perfection.',
    icon: <QualitySealIcon />,
  },
  {
    id: 'shipping',
    title: 'Free Shipping',
    description: 'On orders above ₹999.',
    icon: <Truck />,
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    description: '30-day returns & exchanges.',
    icon: <Returns30Icon />,
  },
  {
    id: 'payments',
    title: 'Secure Payments',
    description: '100% safe & secure checkout.',
    icon: <ShieldCheck />,
  },
  {
    id: 'packaging',
    title: 'Safe Packaging',
    description: 'Packed with care, delivered safely.',
    icon: <Package />,
  },
];

export default function ClayCraftWhyChoose() {
  return (
    <section id="why-choose" className="cc-section cc-why" aria-labelledby="cc-why-heading">
      <div className="cc-container">
        <h2 id="cc-why-heading" className="sr-only">
          Why shop with us
        </h2>

        <ul className="cc-why__grid" data-cc-reveal>
          {ITEMS.map((item) => (
            <li key={item.id} className="cc-why__item">
              <span className="cc-why__icon" aria-hidden>
                {item.icon}
              </span>
              <div className="cc-why__copy">
                <h3 className="cc-why__item-title">{item.title}</h3>
                <p className="cc-why__item-desc">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
