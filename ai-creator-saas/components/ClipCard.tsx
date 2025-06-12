import { useState } from 'react'
import { Play, Download, Share2, Eye, Heart, MessageCircle, MoreHorizontal, TrendingUp, Clock, Sparkles } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'

interface ClipCardProps {
  clip: {
    id: string
    title: string
    thumbnail: string
    duration: number
    views: number
    likes?: number
    comments?: number
    createdAt: string
    platform?: string
    engagement?: number
    status?: 'ready' | 'processing' | 'trending'
  }
  onPlay: (id: string) => void
  onDownload: (id: string) => void
  onShare: (id: string) => void
  variant?: 'default' | 'featured' | 'compact'
}

export default function ClipCard({ 
  clip, 
  onPlay, 
  onDownload, 
  onShare, 
  variant = 'default' 
}: ClipCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getPlatformColor = (platform?: string) => {
    switch (platform) {
      case 'tiktok':
        return 'bg-gradient-to-r from-pink-500 to-red-500'
      case 'youtube':
        return 'bg-gradient-to-r from-red-500 to-red-600'
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400'
      case 'twitter':
        return 'bg-gradient-to-r from-blue-400 to-blue-500'
      default:
        return 'bg-gradient-to-r from-purple-neon to-electric-blue'
    }
  }

  const getStatusBadge = () => {
    if (clip.status === 'trending') {
      return (
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
          <TrendingUp className="w-3 h-3" />
          <span>Trending</span>
        </div>
      )
    }
    if (clip.status === 'processing') {
      return (
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-yellow-500/90 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
          <div className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse" />
          <span>Processing</span>
        </div>
      )
    }
    return null
  }

  if (variant === 'compact') {
    return (
      <Card 
        variant="default" 
        hover 
        padding="sm" 
        className="group animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex space-x-3">
          {/* Compact Thumbnail */}
          <div className="relative w-24 h-16 bg-dark-surface rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={clip.thumbnail}
              alt={clip.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                icon={Play}
                onClick={() => onPlay(clip.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
              {formatDuration(clip.duration)}
            </div>
          </div>

          {/* Compact Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm truncate mb-1">{clip.title}</h4>
            <div className="flex items-center text-xs text-gray-400 space-x-2 mb-2">
              <span>{formatNumber(clip.views)} views</span>
              <span>•</span>
              <span>{formatDate(clip.createdAt)}</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" icon={Download} onClick={() => onDownload(clip.id)} />
              <Button variant="ghost" size="sm" icon={Share2} onClick={() => onShare(clip.id)} />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === 'featured') {
    return (
      <Card 
        variant="neon" 
        hover 
        glow
        padding="none" 
        className="group animate-fade-in-up overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Thumbnail */}
        <div className="relative aspect-video bg-dark-surface overflow-hidden">
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          {/* Status Badge */}
          {getStatusBadge()}
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full font-medium">
            {formatDuration(clip.duration)}
          </div>

          {/* Platform Badge */}
          {clip.platform && (
            <div className={`absolute top-3 right-3 ${getPlatformColor(clip.platform)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
              {clip.platform.toUpperCase()}
            </div>
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="neon"
              size="xl"
              icon={Play}
              onClick={() => onPlay(clip.id)}
              className="shadow-2xl animate-pulse-neon"
            />
          </div>

          {/* Bottom Gradient Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{clip.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatNumber(clip.views)}</span>
                </div>
                {clip.likes && (
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(clip.likes)}</span>
                  </div>
                )}
                {clip.comments && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{formatNumber(clip.comments)}</span>
                  </div>
                )}
              </div>
              {clip.engagement && (
                <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>{clip.engagement}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Actions */}
        <div className="p-4 bg-gradient-to-r from-dark-card to-dark-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatDate(clip.createdAt)}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={() => onDownload(clip.id)}
              >
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Share2}
                onClick={() => onShare(clip.id)}
              />
              <Button
                variant="ghost"
                size="sm"
                icon={MoreHorizontal}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card 
      variant="default" 
      hover 
      padding="none" 
      className="group animate-fade-in-up overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-dark-surface overflow-hidden">
        <img
          src={clip.thumbnail}
          alt={clip.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <Button
              variant="neon"
              size="lg"
              icon={Play}
              onClick={() => onPlay(clip.id)}
              className="shadow-2xl"
            />
          </div>
        </div>

        {/* Status Badge */}
        {getStatusBadge()}
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
          {formatDuration(clip.duration)}
        </div>

        {/* Platform Badge */}
        {clip.platform && (
          <div className={`absolute top-2 right-2 ${getPlatformColor(clip.platform)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
            {clip.platform.toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 flex-1 pr-2">
            {clip.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            icon={MoreHorizontal}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{formatNumber(clip.views)}</span>
            </div>
            {clip.likes && (
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{formatNumber(clip.likes)}</span>
              </div>
            )}
            {clip.comments && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{formatNumber(clip.comments)}</span>
              </div>
            )}
          </div>
          
          {clip.engagement && (
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>{clip.engagement}%</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>{formatDate(clip.createdAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              icon={Download}
              onClick={() => onDownload(clip.id)}
              className="text-lime-signal hover:bg-lime-signal/10"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Share2}
              onClick={() => onShare(clip.id)}
              className="text-electric-blue hover:bg-electric-blue/10"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
