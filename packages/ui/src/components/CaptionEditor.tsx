import { useState } from 'react';

export interface Caption {
  id: string;
  text: string;
  start?: number;       // legacy format
  end?: number;         // legacy format  
  startTime?: number;   // new format
  endTime?: number;     // new format
  style?: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    position?: 'top' | 'center' | 'bottom';
  };
}

export interface CaptionEditorProps {
  captions: Caption[];
  onCaptionsChange: (captions: Caption[]) => void;
  currentTime?: number;
  duration?: number;
}

export function CaptionEditor({ captions, onCaptionsChange, currentTime, duration = 60 }: CaptionEditorProps) {
  const [selectedCaption, setSelectedCaption] = useState<Caption | null>(null);

  // Normalize captions to use startTime/endTime
  const normalizedCaptions = captions.map(caption => ({
    ...caption,
    startTime: caption.startTime ?? caption.start ?? 0,
    endTime: caption.endTime ?? caption.end ?? 2,
  }));

  const addCaption = () => {
    const newCaption: Caption = {
      id: Date.now().toString(),
      text: 'New caption',
      startTime: currentTime || 0,
      endTime: (currentTime || 0) + 2,
    };
    onCaptionsChange([...normalizedCaptions, newCaption]);
  };

  const updateCaption = (id: string, updates: Partial<Caption>) => {
    const updated = normalizedCaptions.map(caption => 
      caption.id === id ? { ...caption, ...updates } : caption
    );
    onCaptionsChange(updated);
  };

  const deleteCaption = (id: string) => {
    onCaptionsChange(normalizedCaptions.filter(caption => caption.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Caption Editor</h3>
        <button
          onClick={addCaption}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Caption
        </button>
      </div>

      <div className="space-y-3">
        {normalizedCaptions.map((caption) => (
          <div 
            key={caption.id}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              selectedCaption?.id === caption.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedCaption(caption)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                {caption.startTime.toFixed(1)}s - {caption.endTime.toFixed(1)}s
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCaption(caption.id);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
            <textarea
              value={caption.text}
              onChange={(e) => updateCaption(caption.id, { text: e.target.value })}
              className="w-full text-sm border-none resize-none outline-none"
              rows={2}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {selectedCaption && (
        <div className="mt-6 p-4 border-t">
          <h4 className="font-medium mb-3">Caption Timing</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time (s)
              </label>
              <input
                type="number"
                value={selectedCaption.startTime}
                onChange={(e) => updateCaption(selectedCaption.id, { 
                  startTime: Math.max(0, Math.min(duration, parseFloat(e.target.value) || 0))
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                step="0.1"
                min="0"
                max={duration}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time (s)
              </label>
              <input
                type="number"
                value={selectedCaption.endTime}
                onChange={(e) => updateCaption(selectedCaption.id, { 
                  endTime: Math.max(selectedCaption.startTime || 0, Math.min(duration, parseFloat(e.target.value) || 0))
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                step="0.1"
                min={selectedCaption.startTime || 0}
                max={duration}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}