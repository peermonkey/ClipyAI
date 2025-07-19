export interface PlatformPreviewProps {
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter';
  videoSrc: string;
  aspectRatio?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
}

export function PlatformPreview({ platform, videoSrc, aspectRatio, title, description, hashtags }: PlatformPreviewProps) {
  const platformStyles = {
    youtube: 'bg-red-600',
    tiktok: 'bg-black',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    twitter: 'bg-blue-500'
  };

  return (
    <div className={`rounded-lg p-4 ${platformStyles[platform]}`}>
      <div className="text-white text-sm font-medium mb-2 capitalize">
        {platform} Preview
      </div>
      <div className="bg-white rounded overflow-hidden">
        <video 
          className="w-full h-48 object-cover" 
          src={videoSrc} 
          muted
          style={{ aspectRatio }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {title && (
          <div className="p-3">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
            {hashtags && hashtags.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {hashtags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}