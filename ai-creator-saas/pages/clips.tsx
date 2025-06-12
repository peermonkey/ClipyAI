import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List, Play, Download, Share2, Edit, Trash2, Eye, Heart, MessageCircle, TrendingUp, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

interface Clip {
  id: string
  title: string
  duration: string
  views: number
  likes: number
  comments: number
  status: 'ready' | 'processing' | 'failed'
  thumbnail: string
  createdAt: string
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter'
  engagement: number
  tags: string[]
}

export default function ClipsPage() {
  const [clips, setClips] = useState<Clip[]>([
    {
      id: '1',
      title: 'Best Marketing Tips for 2024',
      duration: '0:45',
      views: 12500,
      likes: 890,
      comments: 45,
      status: 'ready',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '2 hours ago',
      platform: 'tiktok',
      engagement: 7.1,
      tags: ['marketing', 'tips', 'business']
    },
    {
      id: '2',
      title: 'AI Tutorial Highlights',
      duration: '1:20',
      views: 8200,
      likes: 654,
      comments: 32,
      status: 'ready',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '5 hours ago',
      platform: 'youtube',
      engagement: 8.0,
      tags: ['ai', 'tutorial', 'tech']
    },
    {
      id: '3',
      title: 'Podcast Insights',
      duration: '0:35',
      views: 15100,
      likes: 1200,
      comments: 78,
      status: 'processing',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '1 day ago',
      platform: 'instagram',
      engagement: 7.9,
      tags: ['podcast', 'insights', 'growth']
    }
  ])

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'ready' | 'processing' | 'failed'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'engagement'>('newest')

  const filteredClips = clips
    .filter(clip => {
      const matchesSearch = clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           clip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFilter = filterStatus === 'all' || clip.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views
        case 'engagement':
          return b.engagement - a.engagement
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'tiktok': return 'bg-pink-500'
      case 'instagram': return 'bg-purple-500'
      case 'youtube': return 'bg-red-500'
      case 'twitter': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Clips</h1>
          <p className="text-gray-400">
            Manage and track your viral content
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="/upload" className="btn-neon">
            Create New Clip
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card-dark p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Clips</p>
              <p className="text-2xl font-bold text-white">{clips.length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-neon/20 rounded-lg flex items-center justify-center">
              <Grid className="w-5 h-5 text-purple-neon" />
            </div>
          </div>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {formatNumber(clips.reduce((sum, clip) => sum + clip.views, 0))}
              </p>
            </div>
            <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-electric-blue" />
            </div>
          </div>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Engagement</p>
              <p className="text-2xl font-bold text-white">
                {(clips.reduce((sum, clip) => sum + clip.engagement, 0) / clips.length).toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-lime-signal/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-lime-signal" />
            </div>
          </div>
        </div>

        <div className="card-dark p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">This Week</p>
              <p className="text-2xl font-bold text-white">+12</p>
            </div>
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-dark p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark pl-10 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input-dark"
            >
              <option value="all">All Status</option>
              <option value="ready">Ready</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-dark"
            >
              <option value="newest">Newest</option>
              <option value="views">Most Views</option>
              <option value="engagement">Best Engagement</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-neon text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-neon text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clips Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.map((clip) => (
            <div key={clip.id} className="clip-card group">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-neon/20 to-electric-blue/20"></div>
                
                {/* Platform Badge */}
                <div className={`absolute top-2 left-2 ${getPlatformColor(clip.platform)} text-white text-xs px-2 py-1 rounded-full`}>
                  {clip.platform}
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {clip.duration}
                </div>

                {/* Status Badge */}
                {clip.status !== 'ready' && (
                  <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                    clip.status === 'processing' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {clip.status}
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="clip-overlay">
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Play className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-white truncate group-hover:text-purple-neon transition-colors">
                  {clip.title}
                </h3>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(clip.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(clip.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{clip.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-lime-signal" />
                    <span className="text-lime-signal font-medium">{clip.engagement}%</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {clip.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {clip.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {filteredClips.map((clip) => (
            <div key={clip.id} className="card-dark p-6 hover:border-purple-neon/50 transition-colors">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-20 bg-gray-800 rounded-lg relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-neon/20 to-electric-blue/20"></div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded">
                    {clip.duration}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate mb-2">{clip.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(clip.views)} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(clip.likes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{clip.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-lime-signal" />
                          <span className="text-lime-signal">{clip.engagement}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`${getPlatformColor(clip.platform)} text-white text-xs px-2 py-1 rounded-full`}>
                          {clip.platform}
                        </div>
                        <span className="text-xs text-gray-500">{clip.createdAt}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredClips.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No clips found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Upload your first video to get started'}
          </p>
          <Link href="/upload" className="btn-neon">
            Create Your First Clip
          </Link>
        </div>
      )}
    </div>
  )
}
