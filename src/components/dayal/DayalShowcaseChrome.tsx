'use client';

import { useState } from 'react';

import DayalActionDock from '@/components/dayal/DayalActionDock';
import DayalChatWidget from '@/components/dayal/DayalChatWidget';

/** One place for chat + contact shortcuts — no duplicate floating buttons */
export default function DayalShowcaseChrome() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <DayalChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      <DayalActionDock onOpenChat={() => setChatOpen(true)} chatOpen={chatOpen} />
    </>
  );
}
