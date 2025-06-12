import { useState, useEffect } from 'react'
import { Upload, Video, TrendingUp, Clock, Plus, Play, Download, Share, Sparkles, Target, Calendar, Award, Eye, Heart, MessageCircle, Zap, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'
// Charts will be added later when recharts is installed

export default function DashboardPage() {
  const [recentClips, setRecentClips] = useState([
    {
      id: 1,
      title: 'Best Marketing Tips',
      duration: '0:45',
      views: 12500,
      likes: 890,
      comments: 45,
      status: 'ready',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '2 hours ago',
      platform: 'tiktok',
      engagement: 7.1
    },
    {
      id: 2,
      title: 'AI Tutorial Highlights',
      duration: '1:20',
      views: 8200,
      likes: 654,
      comments: 32,
      status: 'processing',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '5 hours ago',
      platform: 'youtube',
      engagement: 8.0
    },
    {
      id: 3,
      title: 'Podcast Insights',
      duration: '0:35',
      views: 15100,
      likes: 1200,
      comments: 78,
      status: 'ready',
      thumbnail: '/api/placeholder/300/200',
      createdAt: '1 day ago',
      platform: 'instagram',
      engagement: 7.9
    }
  ])

  const [stats, setStats] = useState({
    totalClips: 47,
    totalViews: 2300000,
    creditsUsed: 850,
    creditsTotal: 1000,
    avgEngagement: 7.7,
    thisWeekClips: 12
  })

  const [suggestedTopics] = useState([
    { topic: 'How to start a podcast in 2024', trend: '+15%', difficulty: 'Easy' },
    { topic: 'AI tools every creator needs', trend: '+28%', difficulty: 'Medium' },
    { topic: 'Building your personal brand', trend: '+8%', difficulty: 'Easy' },
    { topic: 'Social media growth hacks', trend: '+22%', difficulty: 'Hard' }
  ])

  // Weekly data for future chart implementation
  // const [weeklyData] = useState([
  //   { day: 'Mon', views: 1200, engagement: 6.5 },
  //   { day: 'Tue', views: 1800, engagement: 7.2 },
  //   { day: 'Wed', views: 2400, engagement: 8.1 },
  //   { day: 'Thu', views: 1900, engagement: 7.8 },
  //   { day: 'Fri', views: 3200, engagement: 9.2 },
  //   { day: 'Sat', views: 2800, engagement: 8.5 },
  //   { day: 'Sun', views: 2100, engagement: 7.9 }
  // ])

  const [platformData] = useState([
    { name: 'TikTok', value: 45, color: '#FF0050' },
    { name: 'Instagram', value: 30, color: '#E4405F' },
    { name: 'YouTube', value: 20, color: '#FF0000' },
    { name: 'Twitter', value: 5, color: '#1DA1F2' }
  ])

  const creditsPercentage = (stats.creditsUsed / stats.creditsTotal) * 100

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    const name = "Creator" // This would come from user context
    if (hour < 12) return `Good morning, ${name}! ☀️`
    if (hour < 18) return `Good afternoon, ${name}! 🌤️`
    return `Good evening, ${name}! 🌙`
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}
        </h1>
        <p className="text-gray-400">
          Ready to create something viral today? Let's turn your content into magic! ✨
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Clips</p>
              <p className="text-2xl font-bold text-white">{stats.totalClips}</p>
              <p className="text-xs text-green-400">+{stats.thisWeekClips} this week</p>
            </div>
            <Video className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">{formatNumber(stats.totalViews)}</p>
              <p className="text-xs text-green-400">+15% this month</p>
            </div>
            <Eye className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Engagement</p>
              <p className="text-2xl font-bold text-white">{stats.avgEngagement}%</p>
              <p className="text-xs text-green-400">Above average!</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Credits Used</p>
              <p className="text-2xl font-bold text-white">{stats.creditsUsed}</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${creditsPercentage}%` }}
                ></div>
              </div>
            </div>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Weekly Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-400">Views</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-gray-400">Engagement</span>
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-72 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-600">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">Weekly Analytics Chart</p>
              <p className="text-gray-500 text-sm">Interactive charts coming soon</p>

              {/* Simple Stats Display */}
              <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">15.2K</div>
                  <div className="text-xs text-gray-500">Avg Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">8.5%</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">+23%</div>
                  <div className="text-xs text-gray-500">Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Platform Distribution</h3>

          {/* Platform Stats */}
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-gray-300">{platform.name}</span>
                  </div>
                  <span className="text-white font-medium">{platform.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${platform.value}%`,
                      backgroundColor: platform.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-white">TikTok Leading</div>
              <div className="text-sm text-gray-400">Your best performing platform</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Upload */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Upload</h2>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Drag & drop your video or audio file</p>
              <p className="text-gray-500 text-sm mb-4">
                Supports MP4, MOV, MP3, WAV up to 500MB
              </p>
              <Link href="/upload" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Choose File
              </Link>
            </div>
          </div>

          {/* Recent Clips */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Clips</h2>
              <Link href="/clips" className="text-purple-400 hover:text-purple-300 text-sm">
                View all →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentClips.map((clip) => (
                <div key={clip.id} className="bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg p-4 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 from-opacity-20 to-blue-500 to-opacity-20"></div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      {clip.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                      <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                        <Play className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                        <Share className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-white truncate">{clip.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{clip.views} views</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        clip.status === 'ready' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {clip.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{clip.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Credits Usage */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Credits Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Used this month</span>
                <span className="text-white">{stats.creditsUsed} / {stats.creditsTotal}</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${creditsPercentage}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {stats.creditsTotal - stats.creditsUsed} credits remaining
                </span>
                <Link href="/credits" className="text-purple-400 hover:text-purple-300 text-xs">
                  Buy more →
                </Link>
              </div>
            </div>
          </div>

          {/* Suggested Topics */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🔥 Trending Topics</h3>
            <div className="space-y-4">
              {suggestedTopics.map((topicData, index) => (
                <div key={index} className="group">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors flex-1">
                      {topicData.topic}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Plus className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      topicData.trend.includes('+') ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
                    }`}>
                      {topicData.trend} trending
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      topicData.difficulty === 'Easy' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      topicData.difficulty === 'Medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                      'bg-red-500 bg-opacity-20 text-red-400'
                    }`}>
                      {topicData.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-purple-400 border border-purple-500 border-opacity-30 rounded-lg hover:bg-purple-500 hover:bg-opacity-10 transition-colors text-sm font-medium">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Generate More Ideas
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/upload" className="block w-full p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-center font-medium hover:shadow-lg transition-all hover:from-purple-600 hover:to-blue-600 transform hover:scale-105">
                Upload New Content
              </Link>
              <Link href="/projects" className="block w-full p-3 border border-gray-600 rounded-lg text-gray-300 text-center hover:border-gray-500 hover:text-white transition-all">
                View Projects
              </Link>
              <Link href="/clips" className="block w-full p-3 border border-gray-600 rounded-lg text-gray-300 text-center hover:border-gray-500 hover:text-white transition-all">
                Browse Clips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
