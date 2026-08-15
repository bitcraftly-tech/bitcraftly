'use client';

import { useState } from 'react';

import DayalActionDock from '@bitcraftly/showcase-dayal-builders/components/DayalActionDock';
import DayalChatWidget from '@bitcraftly/showcase-dayal-builders/components/DayalChatWidget';

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
