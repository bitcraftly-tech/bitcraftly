'use client';

import { useState } from 'react';

import ClayCraftPageHeader from '../ClayCraftPageHeader';
import { CLAYCRAFT_FAQS } from '../claycraft-content-data';

export default function ClayCraftFaqPageClient() {
  const [openId, setOpenId] = useState<string | null>(CLAYCRAFT_FAQS[0]?.id ?? null);

  return (
    <>
      <ClayCraftPageHeader
        title="FAQ"
        description="Shipping, returns, care, and demo coupon codes."
        crumbs={[{ label: 'FAQ' }]}
      />
      <div className="cc-container cc-section">
        <ul className="cc-faq">
          {CLAYCRAFT_FAQS.map((item) => {
            const open = openId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="cc-faq__q"
                  aria-expanded={open}
                  aria-controls={`cc-faq-${item.id}`}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  {item.question}
                </button>
                <div id={`cc-faq-${item.id}`} hidden={!open} className="cc-faq__a">
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
