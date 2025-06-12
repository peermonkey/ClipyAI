import { useState } from 'react'
import { Play, Download, Share2, Edit, Scissors, Wand2, Copy, FileText, Hash, Calendar, Clock, MoreHorizontal } from 'lucide-react'

interface Project {
  id: string
  title: string
  originalFile: string
  duration: string
  status: 'processing' | 'ready' | 'failed'
  createdAt: string
  transcript: string
  clips: Clip[]
  suggestions: ContentSuggestion[]
}

interface Clip {
  id: string
  title: string
  startTime: number
  endTime: number
  duration: string
  confidence: number
  status: 'ready' | 'processing'
  captions: string
  hashtags: string[]
  description: string
}

interface ContentSuggestion {
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter'
  caption: string
  hashtags: string[]
  bestTime: string
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>({
    id: '1',
    title: 'Marketing Masterclass Episode 12',
    originalFile: 'marketing-masterclass-ep12.mp4',
    duration: '45:32',
    status: 'ready',
    createdAt: '2 hours ago',
    transcript: `Welcome to Marketing Masterclass! Today we're diving deep into the psychology of consumer behavior and how understanding your audience can transform your marketing strategy. 

The first principle we need to understand is that people don't buy products, they buy solutions to their problems. When you frame your marketing around the problems you solve rather than the features you offer, you create an emotional connection with your audience.

Let me share a story about how one of my clients increased their conversion rate by 300% simply by changing their messaging to focus on the pain points their product addressed...`,
    clips: [
      {
        id: '1',
        title: 'The Psychology of Consumer Behavior',
        startTime: 120,
        endTime: 165,
        duration: '0:45',
        confidence: 0.92,
        status: 'ready',
        captions: 'People don\'t buy products, they buy solutions to their problems. Frame your marketing around problems, not features.',
        hashtags: ['#marketing', '#psychology', '#business', '#sales'],
        description: 'Discover the key principle that transforms how customers perceive your product'
      },
      {
        id: '2',
        title: '300% Conversion Rate Increase Story',
        startTime: 280,
        endTime: 340,
        duration: '1:00',
        confidence: 0.88,
        status: 'ready',
        captions: 'Real case study: How changing messaging to focus on pain points increased conversions by 300%',
        hashtags: ['#casestudy', '#conversion', '#marketing', '#results'],
        description: 'Learn from a real success story that could transform your business'
      },
      {
        id: '3',
        title: 'Emotional Connection in Marketing',
        startTime: 450,
        endTime: 495,
        duration: '0:45',
        confidence: 0.85,
        status: 'processing',
        captions: 'Creating emotional connections with your audience is the secret to memorable marketing',
        hashtags: ['#emotion', '#branding', '#connection', '#marketing'],
        description: 'Why emotional marketing outperforms logical appeals every time'
      }
    ],
    suggestions: [
      {
        platform: 'tiktok',
        caption: '🧠 The psychology hack that 10x your sales! People don\'t buy products - they buy solutions. Here\'s how to reframe your marketing message to speak directly to your customer\'s pain points. Save this for later! 💡',
        hashtags: ['#marketingtips', '#psychology', '#business', '#entrepreneur', '#sales'],
        bestTime: 'Post at 6-9 PM for maximum engagement'
      },
      {
        platform: 'instagram',
        caption: 'MARKETING PSYCHOLOGY 101 💡\n\nThe biggest mistake I see entrepreneurs make? Talking about features instead of solutions.\n\nYour customers don\'t care about what your product does - they care about what problems it solves.\n\nSwipe to see how one client increased conversions by 300% with this simple mindset shift ➡️',
        hashtags: ['#marketingpsychology', '#businesstips', '#entrepreneur', '#conversion', '#mindset'],
        bestTime: 'Post at 11 AM - 1 PM or 7-9 PM'
      }
    ]
  })

  const [activeTab, setActiveTab] = useState<'transcript' | 'clips' | 'content'>('clips')
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {selectedProject.duration}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {selectedProject.createdAt}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              selectedProject.status === 'ready' 
                ? 'bg-green-500/20 text-green-400' 
                : selectedProject.status === 'processing'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {selectedProject.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="btn-neon flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Timeline & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="card-dark p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('clips')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'clips' 
                    ? 'bg-purple-neon text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Scissors className="w-4 h-4 inline mr-2" />
                Clips ({selectedProject.clips.length})
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'transcript' 
                    ? 'bg-purple-neon text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Transcript
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'content' 
                    ? 'bg-purple-neon text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Hash className="w-4 h-4 inline mr-2" />
                Content Ideas
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'clips' && (
            <div className="space-y-4">
              {selectedProject.clips.map((clip, index) => (
                <div key={clip.id} className="card-dark p-6 hover:border-purple-neon/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{clip.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          clip.status === 'ready' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {clip.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>{formatTime(clip.startTime)} - {formatTime(clip.endTime)}</span>
                        <span>{clip.duration}</span>
                        <span className="flex items-center">
                          <Wand2 className="w-3 h-3 mr-1" />
                          {Math.round(clip.confidence * 100)}% confidence
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{clip.captions}</p>
                      <div className="flex flex-wrap gap-2">
                        {clip.hashtags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedClip(clip)}
                        className="p-2 bg-purple-neon/20 text-purple-neon rounded-lg hover:bg-purple-neon/30 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="btn-neon text-sm px-4 py-2">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Full Transcript</h3>
                <button className="text-purple-neon hover:text-purple-400 text-sm flex items-center">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy All
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedProject.transcript}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {selectedProject.suggestions.map((suggestion, index) => (
                <div key={index} className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        suggestion.platform === 'tiktok' ? 'bg-pink-500' :
                        suggestion.platform === 'instagram' ? 'bg-purple-500' :
                        suggestion.platform === 'youtube' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}>
                        <span className="text-white text-xs font-bold">
                          {suggestion.platform.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">
                        {suggestion.platform} Post
                      </h3>
                    </div>
                    <button className="text-purple-neon hover:text-purple-400 text-sm flex items-center">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Caption</label>
                      <p className="text-gray-300 bg-gray-800 p-3 rounded-lg">
                        {suggestion.caption}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Hashtags</label>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.hashtags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
                      💡 <strong>Best time to post:</strong> {suggestion.bestTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Preview & Actions */}
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="w-12 h-12 text-purple-neon mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  {selectedClip ? `Preview: ${selectedClip.title}` : 'Select a clip to preview'}
                </p>
              </div>
            </div>
            
            {selectedClip && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{selectedClip.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Confidence:</span>
                  <span className="text-lime-signal">{Math.round(selectedClip.confidence * 100)}%</span>
                </div>
                <button className="w-full btn-neon">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Clip
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-purple-neon to-electric-blue rounded-lg text-white font-medium hover:shadow-lg transition-all">
                <Wand2 className="w-4 h-4 inline mr-2" />
                Generate More Clips
              </button>
              <button className="w-full p-3 border border-gray-600 rounded-lg text-gray-300 hover:border-gray-500 hover:text-white transition-all">
                <Hash className="w-4 h-4 inline mr-2" />
                Regenerate Captions
              </button>
              <button className="w-full p-3 border border-gray-600 rounded-lg text-gray-300 hover:border-gray-500 hover:text-white transition-all">
                <FileText className="w-4 h-4 inline mr-2" />
                Export Transcript
              </button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Clips:</span>
                <span className="text-white font-semibold">{selectedProject.clips.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Ready:</span>
                <span className="text-green-400 font-semibold">
                  {selectedProject.clips.filter(c => c.status === 'ready').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Processing:</span>
                <span className="text-yellow-400 font-semibold">
                  {selectedProject.clips.filter(c => c.status === 'processing').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Avg Confidence:</span>
                <span className="text-lime-signal font-semibold">
                  {Math.round(selectedProject.clips.reduce((sum, clip) => sum + clip.confidence, 0) / selectedProject.clips.length * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
