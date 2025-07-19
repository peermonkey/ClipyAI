import React, { useState } from 'react';

export interface Highlight {
  start: number;
  end: number;
  confidence: number;
  type: 'viral' | 'engaging' | 'quotable';
  label: string;
}

export interface TimelineScrubberProps {
  duration: number; // seconds
  start: number;
  end: number;
  currentTime?: number;
  highlights?: Highlight[];
  waveform?: number[];
  showWaveform?: boolean;
  showHighlights?: boolean;
  onChange?: (start: number, end: number) => void;
  onSeek?: (time: number) => void;
}

export function TimelineScrubber({ 
  duration, 
  start, 
  end, 
  currentTime = 0,
  highlights = [],
  waveform = [],
  showWaveform = false,
  showHighlights = false,
  onChange,
  onSeek 
}: TimelineScrubberProps) {
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
      {/* Timeline track with waveform and highlights */}
      <div className="relative w-full h-12 bg-gray-200 rounded">
        {/* Waveform visualization */}
        {showWaveform && waveform.length > 0 && (
          <div className="absolute inset-0 flex items-end justify-around px-1">
            {waveform.map((level, index) => (
              <div
                key={index}
                className="bg-gray-400 w-1 rounded-t"
                style={{ height: `${Math.max(level * 100, 2)}%` }}
              />
            ))}
          </div>
        )}
        
        {/* Highlights */}
        {showHighlights && highlights.map((highlight, index) => {
          const startPercent = (highlight.start / duration) * 100;
          const widthPercent = ((highlight.end - highlight.start) / duration) * 100;
          const colors = {
            viral: 'bg-red-400',
            engaging: 'bg-blue-400',
            quotable: 'bg-green-400'
          };
          
          return (
            <div
              key={index}
              className={`absolute top-0 h-2 ${colors[highlight.type]} opacity-70 rounded`}
              style={{
                left: `${startPercent}%`,
                width: `${widthPercent}%`
              }}
              title={`${highlight.label} (${highlight.confidence}% confidence)`}
            />
          );
        })}
        
        {/* Current time indicator */}
        <div
          className="absolute top-0 w-0.5 h-full bg-red-500"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />
        
        {/* Selection range */}
        <div
          className="absolute top-2 h-8 bg-blue-500 opacity-30 rounded"
          style={{
            left: `${(localStart / duration) * 100}%`,
            width: `${((localEnd - localStart) / duration) * 100}%`
          }}
        />
        
        {/* Clickable area for seeking */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPercent = (e.clientX - rect.left) / rect.width;
            const seekTime = clickPercent * duration;
            onSeek?.(seekTime);
          }}
        />
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span>{localStart.toFixed(1)}s</span>
        <input
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={localStart}
          onChange={handleStart}
          className="flex-1 accent-blue-500"
        />
        <input
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={localEnd}
          onChange={handleEnd}
          className="flex-1 accent-blue-500"
        />
        <span>{localEnd.toFixed(1)}s</span>
      </div>
    </div>
  );
} 