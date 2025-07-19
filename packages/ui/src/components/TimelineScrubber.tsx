import React, { useState } from 'react';

interface Highlight {
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
  showControls?: boolean;
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
  showControls = true,
  showHighlights = true,
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    onSeek?.(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHighlightColor = (type: string) => {
    switch (type) {
      case 'viral': return 'bg-red-500';
      case 'engaging': return 'bg-blue-500';
      case 'quotable': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Timeline */}
      <div className="relative">
        {/* Waveform visualization */}
        {showWaveform && waveform.length > 0 && (
          <div className="flex items-end h-16 mb-2 bg-gray-800 rounded px-1">
            {waveform.map((amplitude, index) => (
              <div
                key={index}
                className="flex-1 bg-gray-400 mx-px rounded-t"
                style={{ height: `${amplitude * 100}%` }}
              />
            ))}
          </div>
        )}

        {/* Timeline track */}
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
          {/* Selected range */}
          <div
            className="absolute h-full bg-primary-neon opacity-30"
            style={{
              left: `${(localStart / duration) * 100}%`,
              width: `${((localEnd - localStart) / duration) * 100}%`,
            }}
          />

          {/* Current time indicator */}
          <div
            className="absolute w-1 h-full bg-white z-10"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Highlights */}
          {showHighlights && highlights.map((highlight, index) => (
            <div
              key={index}
              className={`absolute h-full ${getHighlightColor(highlight.type)} opacity-60`}
              style={{
                left: `${(highlight.start / duration) * 100}%`,
                width: `${((highlight.end - highlight.start) / duration) * 100}%`,
              }}
              title={`${highlight.label} (${highlight.confidence}% confidence)`}
            />
          ))}

          {/* Clickable track for seeking */}
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Time markers */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0:00</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Start:</span>
            <span>{formatTime(localStart)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={localStart}
              onChange={handleStart}
              className="w-24 accent-primary-neon"
            />
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">End:</span>
            <span>{formatTime(localEnd)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={localEnd}
              onChange={handleEnd}
              className="w-24 accent-primary-neon"
            />
          </div>

          <div className="text-xs text-gray-400">
            Duration: {formatTime(localEnd - localStart)}
          </div>
        </div>
      )}

      {/* Highlights legend */}
      {showHighlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${getHighlightColor(highlight.type)}`} />
              <span>{highlight.label}</span>
              <span className="text-gray-400">({highlight.confidence}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 