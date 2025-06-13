import React, { useState } from 'react';

export interface TimelineScrubberProps {
  duration: number; // seconds
  start: number;
  end: number;
  onChange?: (start: number, end: number) => void;
}

export function TimelineScrubber({ duration, start, end, onChange }: TimelineScrubberProps) {
  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0 && val < localEnd) {
      setLocalStart(val);
      onChange?.(val, localEnd);
    }
  };

  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= duration && val > localStart) {
      setLocalEnd(val);
      onChange?.(localStart, val);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>{localStart}s</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={localStart}
          onChange={handleStart}
          className="flex-1 accent-primary-neon"
        />
        <input
          type="range"
          min={0}
          max={duration}
          value={localEnd}
          onChange={handleEnd}
          className="flex-1 accent-primary-neon"
        />
        <span>{localEnd}s</span>
      </div>
    </div>
  );
} 