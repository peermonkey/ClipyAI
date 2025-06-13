'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@xclips/ui';
import { Button } from '@xclips/ui';

export default function NPSModal() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const shown = localStorage.getItem('nps_submitted');
    if (!shown) {
      const timer = setTimeout(() => setOpen(true), 20000); // 20s after load
      return () => clearTimeout(timer);
    }
  }, []);

  const submit = async () => {
    if (score === null) return;
    try {
      await fetch('https://app.posthog.com/capture/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
          event: 'nps_response',
          properties: { score },
        }),
      });
    } catch {}
    localStorage.setItem('nps_submitted', '1');
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="How likely are you to recommend XClips.ai to a friend? (0–10)">
      <div className="flex gap-1 mb-4 flex-wrap justify-center">
        {Array.from({ length: 11 }).map((_, i) => (
          <button key={i} onClick={() => setScore(i)} className={`w-8 h-8 rounded-full ${score === i ? 'bg-primary-neon' : 'bg-gray-600'}`}>{i}</button>
        ))}
      </div>
      <Button label="Submit" onClick={submit} disabled={score === null} />
    </Modal>
  );
} 