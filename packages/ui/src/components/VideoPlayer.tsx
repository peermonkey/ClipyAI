export interface VideoPlayerProps {
  src: string;
  poster?: string;
  currentTime?: number;
  aspectRatio?: string;
  className?: string;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({ src, poster, currentTime, aspectRatio, className, onTimeUpdate }: VideoPlayerProps) {
  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className || ''}`}>
      <video
        className="w-full h-full"
        src={src}
        poster={poster}
        controls
        style={{ aspectRatio }}
        onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}