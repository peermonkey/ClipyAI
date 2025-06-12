import { useState, useEffect } from 'react'
import { 
  Upload, Video, TrendingUp, Clock, Plus, Play, Download, Share, 
  Sparkles, Target, Calendar, Award, Eye, Heart, MessageCircle, 
  Zap, Users, BarChart3, Star, Rocket, Brain, Wand2, Trophy,
  Activity, PlayCircle, Edit3, ExternalLink, Copy, ChevronRight,
  Gift, Crown, Flame, Lightbulb, Globe, Shield
} from 'lucide-react'
import Link from 'next/link'
import Card from './ui/Card'
import Button from './ui/Button'

export default function EnhancedDashboard() {
  const [recentClips, setRecentClips] = useState([
    {
      id: 1,
      title: 'Best Marketing Tips That Actually Work',
      duration: '0:45',
      views: 125000,
      likes: 8900,
      comments: 450,
      shares: 234,
      status: 'viral',
      thumbnail: '/api/placeholder/400/300',
      createdAt: '2 hours ago',
      platform: 'tiktok',
      engagement: 9.2,
      viralScore: 95,
      tags: ['marketing', 'business', 'tips']
    },
    {
      id: 2,
      title: 'AI Tutorial: Game-Changing Techniques',
      duration: '1:20',
      views: 82000,
      likes: 6540,
      comments: 320,
      shares: 189,
      status: 'trending',
      thumbnail: '/api/placeholder/400/300',
      createdAt: '5 hours ago',
      platform: 'youtube',
      engagement: 8.7,
      viralScore: 88,
      tags: ['ai', 'tutorial', 'tech']
    },
    {
      id: 3,
      title: 'Podcast Insights: Mindset for Success',
      duration: '0:35',
      views: 151000,
      likes: 12000,
      comments: 780,
      shares: 456,
      status: 'explosive',
      thumbnail: '/api/placeholder/400/300',
      createdAt: '1 day ago',
      platform: 'instagram',
      engagement: 9.8,
      viralScore: 98,
      tags: ['mindset', 'success', 'motivation']
    }
  ])

  const [stats, setStats] = useState({
    totalClips: 47,
    totalViews: 2847000,
    creditsUsed: 850,
    creditsTotal: 1000,
    avgEngagement: 8.9,
    thisWeekClips: 12,
    viralClips: 8,
    revenue: 2340,
    followers: 45200
  })

  const [achievements] = useState([
    { title: 'First Viral Hit', icon: Flame, color: 'text-orange-400', unlocked: true },
    { title: 'Engagement Master', icon: Heart, color: 'text-pink-400', unlocked: true },
    { title: 'Content Creator', icon: Video, color: 'text-blue-400', unlocked: true },
    { title: 'AI Whisperer', icon: Brain, color: 'text-purple-400', unlocked: false }
  ])

  const [trendingTopics] = useState([
    { 
      topic: 'AI Tools for Creators in 2024', 
      trend: '+45%', 
      difficulty: 'Medium',
      potential: 'High',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      topic: 'Build Your Personal Brand Fast', 
      trend: '+32%', 
      difficulty: 'Easy',
      potential: 'Very High',
      color: 'from-green-500 to-blue-500'
    },
    { 
      topic: 'Social Media Growth Secrets', 
      trend: '+28%', 
      difficulty: 'Hard',
      potential: 'Explosive',
      color: 'from-orange-500 to-red-500'
    }
  ])

  const [weeklyData] = useState([
    { day: 'Mon', views: 12000, engagement: 6.5, clips: 2 },
    { day: 'Tue', views: 18000, engagement: 7.2, clips: 3 },
    { day: 'Wed', views: 24000, engagement: 8.1, clips: 4 },
    { day: 'Thu', views: 19000, engagement: 7.8, clips: 2 },
    { day: 'Fri', views: 32000, engagement: 9.2, clips: 5 },
    { day: 'Sat', views: 28000, engagement: 8.5, clips: 3 },
    { day: 'Sun', views: 21000, engagement: 7.9, clips: 2 }
  ])

  const [platformPerformance] = useState([
    { name: 'TikTok', value: 45, growth: '+23%', color: '#FF0050', icon: '🎵' },
    { name: 'Instagram', value: 30, growth: '+18%', color: '#E4405F', icon: '📸' },
    { name: 'YouTube', value: 20, growth: '+15%', color: '#FF0000', icon: '▶️' },
    { name: 'Twitter', value: 5, growth: '+8%', color: '#1DA1F2', icon: '🐦' }
  ])

  const creditsPercentage = (stats.creditsUsed / stats.creditsTotal) * 100
  const [animatedStats, setAnimatedStats] = useState({
    views: 0,
    engagement: 0,
    clips: 0
  })

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        views: stats.totalViews,
        engagement: stats.avgEngagement,
        clips: stats.totalClips
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    const name = "Alex" // This would come from user context
    if (hour < 12) return `Good morning, ${name}! ☀️`
    if (hour < 18) return `Good afternoon, ${name}! 🌤️`
    return `Good evening, ${name}! 🌙`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'viral': return 'from-orange-500 to-red-500'
      case 'trending': return 'from-blue-500 to-purple-500'
      case 'explosive': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'viral': return '🔥'
      case 'trending': return '📈'
      case 'explosive': return '💥'
      default: return '✨'
    }
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-neon/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-lime-signal/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Enhanced Welcome Section */}
      <div className="mb-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
              {getGreeting()}
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Ready to create something viral today? Your content empire awaits! ✨
            </p>
            
            {/* Achievement Streak */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-4 py-2">
                <Flame className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-orange-300 font-medium">8-day viral streak!</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                <Crown className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-300 font-medium">Top 1% Creator</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button variant="ghost" size="md" icon={Gift}>
              Daily Bonus
            </Button>
            <Link href="/upload">
              <Button variant="neon" size="lg" icon={Upload} glow>
                Create Magic
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="neon" padding="lg" hover glow className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-white mb-1">
                {formatNumber(animatedStats.views)}
              </p>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-success font-medium">+23% this week</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card variant="gradient" padding="lg" hover className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Avg Engagement</p>
              <p className="text-3xl font-bold text-white mb-1">
                {animatedStats.engagement}%
              </p>
              <div className="flex items-center text-sm">
                <Heart className="w-4 h-4 text-pink-400 mr-1" />
                <span className="text-pink-400 font-medium">Excellent rate!</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="lg" hover className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Viral Clips</p>
              <p className="text-3xl font-bold text-white mb-1">{stats.viralClips}</p>
              <div className="flex items-center text-sm">
                <Flame className="w-4 h-4 text-orange-400 mr-1" />
                <span className="text-orange-400 font-medium">+3 this week</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform">
              <Flame className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card variant="neon" padding="lg" hover glow className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Credits</p>
              <p className="text-3xl font-bold text-white mb-1">{stats.creditsUsed}</p>
              <div className="w-full bg-dark-border rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-lime-signal to-electric-blue h-2 rounded-full transition-all duration-1000 shadow-neon"
                  style={{ width: `${creditsPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-lime-signal to-electric-blue rounded-2xl flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Enhanced Analytics */}
        <div className="lg:col-span-2">
          <Card variant="glass" padding="xl" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Weekly Performance</h3>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" icon={Calendar}>
                  This Week
                </Button>
                <Button variant="ghost" size="sm" icon={ExternalLink}>
                  Full Report
                </Button>
              </div>
            </div>

            {/* Custom Chart Visualization */}
            <div className="h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/50 to-transparent rounded-lg" />
              <div className="flex items-end justify-between h-full px-4 py-6">
                {weeklyData.map((day, index) => {
                  const height = (day.views / Math.max(...weeklyData.map(d => d.views))) * 100
                  return (
                    <div key={day.day} className="flex flex-col items-center group cursor-pointer">
                      <div className="mb-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-dark-card border border-purple-neon/30 rounded-lg p-2 shadow-neon">
                          <div className="text-white font-bold">{formatNumber(day.views)}</div>
                          <div className="text-gray-400 text-sm">{day.engagement}% eng</div>
                        </div>
                      </div>
                      <div 
                        className="w-12 bg-gradient-to-t from-purple-neon to-electric-blue rounded-t-lg transition-all duration-500 hover:scale-110 shadow-neon group-hover:shadow-neon-blue"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      />
                      <div className="mt-2 text-gray-400 text-sm font-medium">{day.day}</div>
                    </div>
                  )
                })}
              </div>
              
              {/* Performance Indicators */}
              <div className="absolute top-4 right-4 flex space-x-4">
                <div className="bg-dark-card/80 backdrop-blur-sm border border-success/30 rounded-lg px-3 py-2">
                  <div className="text-success text-lg font-bold">↗ 23%</div>
                  <div className="text-gray-400 text-xs">Growth</div>
                </div>
                <div className="bg-dark-card/80 backdrop-blur-sm border border-purple-neon/30 rounded-lg px-3 py-2">
                  <div className="text-purple-neon text-lg font-bold">8.9%</div>
                  <div className="text-gray-400 text-xs">Avg Eng</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Platform Performance */}
        <div className="space-y-6">
          <Card variant="neon" padding="lg" glow>
            <h3 className="text-xl font-bold text-white mb-6">Platform Performance</h3>
            <div className="space-y-4">
              {platformPerformance.map((platform, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platform.icon}</span>
                      <div>
                        <span className="text-white font-medium">{platform.name}</span>
                        <div className="text-success text-sm">{platform.growth}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{platform.value}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-1000 shadow-lg group-hover:shadow-neon"
                      style={{
                        width: `${platform.value}%`,
                        background: `linear-gradient(90deg, ${platform.color}80, ${platform.color})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card variant="gradient" padding="lg">
            <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-3 rounded-lg border transition-all hover:scale-105 ${
                  achievement.unlocked 
                    ? 'bg-dark-card border-purple-neon/30 shadow-neon' 
                    : 'bg-dark-surface border-dark-border opacity-50'
                }`}>
                  <achievement.icon className={`w-6 h-6 ${achievement.color} mb-2`} />
                  <div className="text-white text-sm font-medium">{achievement.title}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Clips with Enhanced Cards */}
        <div className="lg:col-span-2">
          <Card variant="glass" padding="xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Recent Viral Clips</h2>
              <Link href="/clips">
                <Button variant="ghost" size="sm" icon={ChevronRight}>
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="space-y-6">
              {recentClips.map((clip) => (
                <Card key={clip.id} variant="neon" padding="lg" hover glow className="group">
                  <div className="flex items-center space-x-6">
                    {/* Enhanced Thumbnail */}
                    <div className="relative">
                      <div className="w-32 h-20 bg-gradient-to-br from-purple-neon/20 to-electric-blue/20 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30" />
                        <div className="absolute bottom-1 right-1 bg-dark-bg/80 text-white text-xs px-2 py-1 rounded">
                          {clip.duration}
                        </div>
                        <div className="absolute top-1 left-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStatusColor(clip.status)} text-white`}>
                            {getStatusEmoji(clip.status)} {clip.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-neon transition-colors">
                          {clip.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
                            {clip.viralScore}
                          </div>
                          <div className="text-xs text-gray-400">Viral Score</div>
                        </div>
                      </div>

                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{formatNumber(clip.views)}</div>
                          <div className="text-xs text-gray-400">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-pink-400">{formatNumber(clip.likes)}</div>
                          <div className="text-xs text-gray-400">Likes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{clip.comments}</div>
                          <div className="text-xs text-gray-400">Comments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{clip.shares}</div>
                          <div className="text-xs text-gray-400">Shares</div>
                        </div>
                      </div>

                      {/* Tags and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {clip.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-purple-neon/20 text-purple-neon text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" icon={Play} />
                          <Button variant="ghost" size="sm" icon={Download} />
                          <Button variant="ghost" size="sm" icon={Share} />
                          <Button variant="ghost" size="sm" icon={Edit3} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Upload Enhanced */}
          <Card variant="gradient" padding="lg" hover glow>
            <h3 className="text-xl font-bold text-white mb-4">Quick Upload</h3>
            <div className="border-2 border-dashed border-purple-neon/30 rounded-lg p-6 text-center hover:border-purple-neon/60 transition-colors group">
              <Upload className="w-12 h-12 text-purple-neon mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-gray-300 mb-2">Drag & drop your content</p>
              <p className="text-gray-500 text-sm mb-4">
                Video, audio, or URL supported
              </p>
              <Link href="/upload">
                <Button variant="neon" size="md" icon={Plus} glow>
                  Choose File
                </Button>
              </Link>
            </div>
          </Card>

          {/* Trending Topics Enhanced */}
          <Card variant="glass" padding="lg">
            <h3 className="text-xl font-bold text-white mb-6">🔥 Trending Topics</h3>
            <div className="space-y-4">
              {trendingTopics.map((topicData, index) => (
                <Card key={index} variant="neon" padding="md" hover className="group cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors flex-1">
                      {topicData.topic}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Plus className="w-4 h-4 text-purple-neon" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded-full bg-success/20 text-success">
                        {topicData.trend} trending
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        topicData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        topicData.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {topicData.difficulty}
                      </span>
                    </div>
                    <span className="text-purple-neon font-medium">{topicData.potential}</span>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="ghost" size="md" icon={Lightbulb} className="w-full mt-4">
              Generate More Ideas
            </Button>
          </Card>

          {/* Credits Enhanced */}
          <Card variant="neon" padding="lg" glow>
            <h3 className="text-xl font-bold text-white mb-4">Credits Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Used this month</span>
                <span className="text-white font-bold">{stats.creditsUsed} / {stats.creditsTotal}</span>
              </div>

              <div className="w-full bg-dark-border rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-neon to-electric-blue h-3 rounded-full transition-all duration-1000 shadow-neon"
                  style={{ width: `${creditsPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {stats.creditsTotal - stats.creditsUsed} credits remaining
                </span>
                <Link href="/credits">
                  <Button variant="ghost" size="sm" icon={Zap}>
                    Buy More
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-r from-purple-neon/10 to-electric-blue/10 border border-purple-neon/30 rounded-lg p-3 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">Pro Tip 💡</div>
                  <div className="text-sm text-gray-300">Upload longer content for more clips!</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
