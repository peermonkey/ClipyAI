'use client';

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button } from '@xclips/ui';
import { 
  PlayIcon, 
  CloudArrowUpIcon, 
  EyeIcon, 
  ArrowDownTrayIcon,
  ShareIcon,
  PlusIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock data for demonstration
const mockVideos = [
  {
    id: '1',
    title: 'How to Build a Startup in 2024',
    status: 'completed',
    uploaded: '2 hours ago',
    duration: '45:30',
    clips: [
      { id: '1a', title: 'Top 3 Startup Tips', duration: '0:45', views: 2400, platform: 'TikTok' },
      { id: '1b', title: 'Biggest Startup Mistakes', duration: '0:52', views: 1800, platform: 'Instagram' },
      { id: '1c', title: 'Finding Your First Customer', duration: '0:38', views: 3200, platform: 'YouTube' },
    ]
  },
  {
    id: '2', 
    title: 'Morning Routine for Productivity',
    status: 'processing',
    uploaded: '30 minutes ago',
    duration: '28:15',
    progress: 75
  },
  {
    id: '3',
    title: 'React Best Practices 2024',
    status: 'completed',
    uploaded: '1 day ago', 
    duration: '52:40',
    clips: [
      { id: '3a', title: 'useState vs useReducer', duration: '0:41', views: 5200, platform: 'YouTube' },
      { id: '3b', title: 'Performance Optimization', duration: '0:55', views: 4100, platform: 'TikTok' },
    ]
  }
];

export default function DashboardPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-text-secondary';
    }
  };

  const totalClips = mockVideos.reduce((acc, video) => acc + (video.clips?.length || 0), 0);
  const totalViews = mockVideos.reduce((acc, video) => 
    acc + (video.clips?.reduce((clipAcc, clip) => clipAcc + clip.views, 0) || 0), 0
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-text-secondary">Manage your videos and track your viral clips</p>
            </div>
            <Button className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Upload New Video
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CloudArrowUpIcon className="w-8 h-8 text-accent-blue" />
                <div>
                  <p className="text-2xl font-bold text-white">{mockVideos.length}</p>
                  <p className="text-text-secondary text-sm">Videos Uploaded</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <PlayIcon className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalClips}</p>
                  <p className="text-text-secondary text-sm">Clips Generated</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <ChartBarIcon className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
                  <p className="text-text-secondary text-sm">Total Views</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <ClockIcon className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">2.4hrs</p>
                  <p className="text-text-secondary text-sm">Processing Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Videos</h2>
            
            {mockVideos.map((video) => (
              <div key={video.id} className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Video Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">{video.title}</h3>
                      <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(video.status)} ${
                        video.status === 'completed' ? 'bg-green-400/10 border-green-400/30' :
                        video.status === 'processing' ? 'bg-yellow-400/10 border-yellow-400/30' :
                        'bg-red-400/10 border-red-400/30'
                      }`}>
                        {video.status === 'processing' ? `Processing (${video.progress}%)` : video.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-text-secondary text-sm mb-4">
                      <span>Duration: {video.duration}</span>
                      <span>Uploaded: {video.uploaded}</span>
                      {video.clips && <span>{video.clips.length} clips generated</span>}
                    </div>

                    {video.status === 'processing' && (
                      <div className="mb-4">
                        <div className="bg-bg-primary rounded-full h-2">
                          <div 
                            className="bg-accent-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${video.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {video.status === 'completed' && (
                      <>
                        <Button variant="secondary" size="sm">
                          <EyeIcon className="w-4 h-4" />
                          View Clips
                        </Button>
                        <Button variant="secondary" size="sm">
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          Export
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Generated Clips */}
                {video.clips && video.clips.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border-primary">
                    <h4 className="font-medium text-white mb-4">Generated Clips</h4>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {video.clips.map((clip) => (
                        <div key={clip.id} className="bg-bg-primary/50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-white text-sm">{clip.title}</h5>
                            <span className="text-xs text-text-tertiary bg-bg-primary px-2 py-1 rounded">
                              {clip.platform}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-text-secondary text-xs mb-3">
                            <span>{clip.duration}</span>
                            <span>{clip.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="xs" variant="ghost">
                              <PlayIcon className="w-3 h-3" />
                              Preview
                            </Button>
                            <Button size="xs" variant="ghost">
                              <ShareIcon className="w-3 h-3" />
                              Share
                            </Button>
                            <Button size="xs" variant="ghost">
                              <ArrowDownTrayIcon className="w-3 h-3" />
                              Export
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State (if no videos) */}
          {mockVideos.length === 0 && (
            <div className="text-center py-16">
              <CloudArrowUpIcon className="w-16 h-16 text-text-tertiary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">No videos uploaded yet</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Upload your first video to start creating viral clips with AI
              </p>
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Upload Your First Video
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
