import { useState } from 'react'
import { X, Play, Pause, Save, Edit } from 'lucide-react'

interface PreviewModalProps {
  clip: {
    id: string
    title: string
    videoUrl: string
    thumbnail: string
    duration: number
    captions: string
    startTime: number
    endTime: number
  }
  onClose: () => void
  onSave: (id: string, updatedData: any) => void
}

export default function PreviewModal({ clip, onClose, onSave }: PreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(clip.startTime)
  const [title, setTitle] = useState(clip.title)
  const [captions, setCaptions] = useState(clip.captions)
  const [startTime, setStartTime] = useState(clip.startTime)
  const [endTime, setEndTime] = useState(clip.endTime)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // Logic to control video playback can be implemented here
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleSave = () => {
    onSave(clip.id, {
      title,
      captions,
      startTime,
      endTime
    })
    onClose()
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = parseFloat(e.target.value)
    setStartTime(newStartTime)
    if (newStartTime > endTime) {
      setEndTime(newStartTime + 10)
    }
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = parseFloat(e.target.value)
    if (newEndTime > startTime) {
      setEndTime(newEndTime)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl max-w-5xl w-full border border-gray-700">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyPress={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-purple-neon"
                autoFocus
              />
            ) : (
              <span onClick={() => setIsEditingTitle(true)} className="cursor-pointer flex items-center">
                {title}
                <Edit className="w-4 h-4 ml-2 text-gray-400 hover:text-purple-neon" />
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Video Player */}
          <div className="lg:w-3/5 bg-black">
            <div className="relative aspect-video">
              <video
                src={clip.videoUrl}
                poster={clip.thumbnail}
                className="w-full h-full object-contain"
                // Add controls or custom playback logic as needed
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
                <button
                  onClick={togglePlay}
                  className="text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(clip.duration)}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Panel */}
          <div className="lg:w-2/5 p-4 bg-gray-800/50">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Clip Range</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Start</label>
                    <input
                      type="range"
                      min="0"
                      max={clip.duration}
                      step="0.1"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-300">{formatTime(startTime)}</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">End</label>
                    <input
                      type="range"
                      min="0"
                      max={clip.duration}
                      step="0.1"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-300">{formatTime(endTime)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Captions</h3>
                <textarea
                  value={captions}
                  onChange={(e) => setCaptions(e.target.value)}
                  className="w-full h-32 bg-gray-800 text-white p-2 rounded border border-gray-700 focus:outline-none focus:border-purple-neon text-sm"
                  placeholder="Edit captions for this clip..."
                />
                <p className="text-xs text-gray-500 mt-1">Customize the auto-generated captions.</p>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center bg-purple-neon text-white rounded px-4 py-2 hover:bg-purple-neon/90 transition-colors"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save Changes
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
