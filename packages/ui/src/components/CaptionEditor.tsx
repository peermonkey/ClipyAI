import React from 'react';

// Make this compatible with any caption format
interface CaptionEditorProps {
  captions: any[];
  onCaptionUpdate?: (captions: any[]) => void;
  onCaptionsChange?: (captions: any[]) => void;
  currentTime?: number;
  duration?: number;
  className?: string;
}

export function CaptionEditor({ 
  captions, 
  onCaptionUpdate, 
  onCaptionsChange,
  currentTime,
  duration,
  className = '' 
}: CaptionEditorProps) {
  const handleCaptionChange = (id: string, text: string) => {
    const updatedCaptions = captions.map(caption =>
      caption.id === id ? { ...caption, text } : caption
    );
    onCaptionUpdate?.(updatedCaptions);
    onCaptionsChange?.(updatedCaptions);
  };

  const getStartTime = (caption: any) => {
    return caption.start ?? caption.startTime ?? 0;
  };

  const getEndTime = (caption: any) => {
    return caption.end ?? caption.endTime ?? 0;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold">Edit Captions</h3>
      
      {currentTime !== undefined && (
        <div className="text-sm text-gray-500">
          Current time: {formatTime(currentTime)}
          {duration && ` / ${formatTime(duration)}`}
        </div>
      )}
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {captions.map((caption) => {
          const startTime = getStartTime(caption);
          const endTime = getEndTime(caption);
          const isActive = currentTime !== undefined && 
                          currentTime >= startTime && 
                          currentTime <= endTime;
          
          return (
            <div 
              key={caption.id} 
              className={`flex items-center space-x-2 p-2 rounded ${
                isActive ? 'bg-blue-100 border border-blue-300' : 'border border-gray-200'
              }`}
            >
              <span className="text-sm text-gray-500 w-20">
                {formatTime(startTime)}
              </span>
              <span className="text-sm text-gray-400 w-4 text-center">-</span>
              <span className="text-sm text-gray-500 w-20">
                {formatTime(endTime)}
              </span>
              <input
                type="text"
                value={caption.text || ''}
                onChange={(e) => handleCaptionChange(caption.id, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Enter caption text..."
              />
            </div>
          );
        })}
      </div>
      
      {captions.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No captions available
        </div>
      )}
    </div>
  );
}