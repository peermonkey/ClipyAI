import React from 'react';

interface PlatformPreviewProps {
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter';
  videoUrl?: string;
  videoSrc?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  aspectRatio?: '16:9' | '9:16' | '1:1';
  className?: string;
}

export function PlatformPreview({ 
  platform, 
  videoUrl,
  videoSrc,
  title = 'Your Video Title',
  description = 'Video description',
  hashtags = [],
  aspectRatio = '16:9',
  className = '' 
}: PlatformPreviewProps) {
  const src = videoSrc || videoUrl || '';
  
  const platformStyles = {
    youtube: {
      container: 'bg-black text-white rounded-lg',
      video: aspectRatio === '16:9' ? 'w-full aspect-video' : 'w-full aspect-square max-h-80',
      header: 'text-red-500 font-bold text-sm',
    },
    tiktok: {
      container: 'bg-black text-white rounded-2xl',
      video: 'w-full aspect-[9/16] max-h-96',
      header: 'text-pink-500 font-bold text-sm',
    },
    instagram: {
      container: 'bg-black text-white rounded-lg',
      video: aspectRatio === '1:1' ? 'w-full aspect-square max-h-80' : 'w-full aspect-video',
      header: 'text-purple-500 font-bold text-sm',
    },
    twitter: {
      container: 'bg-gray-900 text-white rounded-2xl',
      video: 'w-full aspect-video',
      header: 'text-blue-400 font-bold text-sm',
    },
  };

  const styles = platformStyles[platform];

  return (
    <div className={`${styles.container} p-4 ${className}`}>
      <div className={styles.header}>
        {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
      </div>
      <div className="mt-2">
        <video
          src={src}
          controls
          className={`${styles.video} rounded`}
          muted
        >
          Your browser does not support the video tag.
        </video>
        <div className="mt-2">
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-gray-300 mt-1">{description}</div>
          {hashtags.length > 0 && (
            <div className="text-xs text-blue-400 mt-1">
              {hashtags.map(tag => `#${tag}`).join(' ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}