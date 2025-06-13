import React from 'react';
// eslint-disable-next-line @next/next/no-img-element
// using plain img tag to avoid next/image dependency

export interface SmartCardProps {
  id: string;
  thumbUrl: string;
  duration: number;
  onClick?: (id: string) => void;
}

export default function SmartCard({ id, thumbUrl, duration, onClick }: SmartCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden bg-black/30 shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      <div className="relative w-full aspect-video">
        {/* Using next/image for optimized thumb */}
        <img src={thumbUrl} alt="Clip thumbnail" className="object-cover" />
        <span className="absolute bottom-1 right-1 text-xs bg-black/70 px-1 rounded">
          {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
} 