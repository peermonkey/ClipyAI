"use client";
import React, { useState } from 'react';
import { Modal, Button } from '@xclips/ui';

const personas = ['Indie YouTuber', 'Educator/Coach', 'Podcaster', 'Agency Editor'];

export default function OnboardingWizard({
  open,
  onComplete,
}: {
  open: boolean;
  onComplete: (persona: string) => void;
}) {
  const [selected, setSelected] = useState<string>('');

  return (
    <Modal open={open} onClose={() => {}} title="Tell us about yourself">
      <div className="space-y-4">
        {personas.map((p) => (
          <button
            key={p}
            onClick={() => setSelected(p)}
            className={`w-full rounded border px-4 py-2 text-left ${p === selected ? 'border-primary-neon' : 'border-gray-600'}`}
          >
            {p}
          </button>
        ))}
        <div className="flex justify-end">
          <Button
            label="Continue"
            onClick={() => selected && onComplete(selected)}
            variant={selected ? 'primary' : 'ghost'}
          />
        </div>
      </div>
    </Modal>
  );
} 