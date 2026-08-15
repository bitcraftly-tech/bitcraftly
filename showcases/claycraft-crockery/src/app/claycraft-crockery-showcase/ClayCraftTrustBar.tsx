import { CreditCard, Gift, RefreshCcw, Truck } from 'lucide-react';
import type { ReactNode } from 'react';

type TrustItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const ITEMS: readonly TrustItem[] = [
  {
    id: 'shipping',
    title: 'Free Shipping',
    description: 'On Orders Above ₹999',
    icon: <Truck aria-hidden />,
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    description: '30-Day Money Back Guarantee',
    icon: <RefreshCcw aria-hidden />,
  },
  {
    id: 'payments',
    title: 'Secure Payments',
    description: '100% Safe & Secure Checkout',
    icon: <CreditCard aria-hidden />,
  },
  {
    id: 'offers',
    title: 'Exclusive Offers',
    description: 'Save More On Every Order',
    icon: <Gift aria-hidden />,
  },
];

export default function ClayCraftTrustBar() {
  return (
    <section className="cc-section cc-trustbar" aria-label="Shopping benefits">
      <div className="cc-container">
        <ul className="cc-trustbar__banner" data-cc-reveal-group>
          {ITEMS.map((item) => (
            <li key={item.id} className="cc-trustbar__item">
              <span className="cc-trustbar__icon">{item.icon}</span>
              <div className="cc-trustbar__copy">
                <h3 className="cc-trustbar__title">{item.title}</h3>
                <p className="cc-trustbar__desc">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
