'use client';

import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { RPYTECH, RPYTECH_FLOATING_ACTIONS } from '@/lib/rpytechShowcaseData';

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function RpytechFloatingActions() {
  const [show, setShow] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const footerActions = document.querySelector('.rpytech-footer-actions');
    if (!footerActions) return;

    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px',
    });

    observer.observe(footerActions);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = show && !footerInView;

  return (
    <div
      className={`rpytech-floating-actions${visible ? ' rpytech-floating-actions--visible' : ''}`}
      aria-label="Quick actions"
      aria-hidden={!visible}
    >
      {RPYTECH_FLOATING_ACTIONS.map((action) => {
        if (action.label === 'Call Now') {
          return (
            <a
              key={action.label}
              href={`tel:${RPYTECH.phone.replace(/\s/g, '')}`}
              className="rpytech-floating-btn rpytech-floating-btn--navy"
              tabIndex={visible ? 0 : -1}
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {action.label}
            </a>
          );
        }
        if (action.label === 'WhatsApp') {
          return (
            <a
              key={action.label}
              href={`https://wa.me/${RPYTECH.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rpytech-floating-btn rpytech-floating-btn--green"
              tabIndex={visible ? 0 : -1}
            >
              {action.label}
            </a>
          );
        }
        return (
          <button
            key={action.label}
            type="button"
            onClick={scrollToContact}
            className="rpytech-floating-btn rpytech-floating-btn--orange"
            tabIndex={visible ? 0 : -1}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
