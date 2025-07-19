import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  onTimeUpdate?: (time: number) => void;
  currentTime?: number;
  aspectRatio?: string;
}

export function VideoPlayer({ 
  src, 
  className = '', 
  onTimeUpdate, 
  currentTime,
  aspectRatio = '16:9'
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && currentTime !== undefined) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const time = e.currentTarget.currentTime;
    if (onTimeUpdate) {
      onTimeUpdate(time);
    }
  };

  const aspectRatioClass = aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      className={`w-full h-auto rounded-lg ${aspectRatioClass} ${className}`}
      onTimeUpdate={handleTimeUpdate}
    >
      Your browser does not support the video tag.
    </video>
  );
}