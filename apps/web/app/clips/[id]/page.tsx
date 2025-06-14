'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VideoPlayer, TimelineScrubber, CaptionEditor, PlatformPreview, ViralScoreMeter, ExportModal } from '@xclips/ui';
import { Button } from '@xclips/ui';
import {
  PlayIcon,
  PauseIcon,
  ScissorsIcon,
  SparklesIcon,
  ShareIcon,
  CloudArrowDownIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  TagIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  SparklesIcon as SparklesSolid,
  FireIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';

// Mock data structure for the clip
interface ClipData {
  id: string;
  title: string;
  originalVideoUrl: string;
  duration: number;
  aiAnalysis: {
    viralScore: number;
    highlights: Array<{
      start: number;
      end: number;
      confidence: number;
      type: 'viral' | 'engaging' | 'quotable';
      label: string;
    }>;
    suggestedHashtags: string[];
    trendPrediction: number;
  };
  currentClip: {
    start: number;
    end: number;
  };
  captions: Array<{
    id: string;
    start: number;
    end: number;
    text: string;
  }>;
  waveform: number[];
}

export default function ClipEditorPage({ params }: { params: { id: string } }) {
  const [clipData, setClipData] = useState<ClipData | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');
  const [showExportModal, setShowExportModal] = useState(false);
  const [activePanel, setActivePanel] = useState<'editor' | 'captions' | 'analytics' | 'export'>('editor');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'analyzing' | 'generating' | 'ready'>('ready');

  // Mock WebSocket connection for real-time updates
  useEffect(() => {
    // Simulate loading clip data
    const mockClipData: ClipData = {
      id: params.id,
      title: "Motivational Speech Highlight",
      originalVideoUrl: "/demo-video.mp4",
      duration: 120, // 2 minutes
      aiAnalysis: {
        viralScore: 92,
        highlights: [
          { start: 15, end: 45, confidence: 95, type: 'viral', label: 'High energy moment' },
          { start: 60, end: 85, confidence: 88, type: 'quotable', label: 'Memorable quote' },
          { start: 90, end: 110, confidence: 76, type: 'engaging', label: 'Call to action' }
        ],
        suggestedHashtags: ['#motivation', '#success', '#mindset', '#viral', '#entrepreneur'],
        trendPrediction: 87
      },
      currentClip: { start: 15, end: 45 },
      captions: [
        { id: '1', start: 15, end: 18, text: "Success is not final" },
        { id: '2', start: 18, end: 22, text: "failure is not fatal" },
        { id: '3', start: 22, end: 26, text: "it is the courage to continue" },
        { id: '4', start: 26, end: 30, text: "that counts" }
      ],
      waveform: Array.from({ length: 120 }, () => Math.random())
    };

    setClipData(mockClipData);
    setCurrentTime(mockClipData.currentClip.start);
  }, [params.id]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleClipChange = (start: number, end: number) => {
    if (clipData) {
      setClipData({
        ...clipData,
        currentClip: { start, end }
      });
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const platforms = [
    { id: 'tiktok', name: 'TikTok', aspectRatio: '9:16' as const, maxDuration: 60 },
    { id: 'instagram', name: 'Instagram', aspectRatio: '1:1' as const, maxDuration: 90 },
    { id: 'youtube', name: 'YouTube Shorts', aspectRatio: '9:16' as const, maxDuration: 60 }
  ];

  if (!clipData) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading clip editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-surface border-b border-border-primary px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              ← Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">{clipData.title}</h1>
              <p className="text-sm text-text-secondary">Clip Editor • {clipData.currentClip.end - clipData.currentClip.start}s duration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Processing Status */}
            <div className="flex items-center gap-2 px-3 py-1 bg-bg-tertiary rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">AI Ready</span>
            </div>
            
            {/* Viral Score */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 rounded-lg border border-accent-blue/30">
              <FireIcon className="w-4 h-4 text-accent-blue" />
              <span className="text-sm font-medium text-white">Viral Score: {clipData.aiAnalysis.viralScore}%</span>
            </div>
            
            <Button onClick={() => setShowExportModal(true)} className="relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <ShareIcon className="w-4 h-4" />
                Export Clip
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-89px)]">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Video Player Area */}
          <div className="flex-1 flex">
            {/* Video Player */}
            <div className="flex-1 p-6">
              <div className="bg-bg-surface rounded-xl border border-border-primary overflow-hidden h-full flex items-center justify-center">
                <VideoPlayer
                  src={clipData.originalVideoUrl}
                  currentTime={currentTime}
                  onTimeUpdate={handleTimeUpdate}
                  aspectRatio={platforms.find(p => p.id === selectedPlatform)?.aspectRatio || '16:9'}
                  className="max-w-2xl max-h-full"
                />
              </div>
            </div>

            {/* Platform Preview Panel */}
            <div className="w-80 border-l border-border-primary bg-bg-surface p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Platform Preview</h3>
                  
                  {/* Platform Selector */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id as any)}
                        className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                          selectedPlatform === platform.id
                            ? 'bg-accent-blue text-white'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'
                        }`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platform Preview */}
                <PlatformPreview
                  videoSrc={clipData.originalVideoUrl}
                  platform={selectedPlatform}
                  aspectRatio={platforms.find(p => p.id === selectedPlatform)?.aspectRatio || '9:16'}
                  title={clipData.title}
                  description={`${clipData.title} - ${clipData.currentClip.end - clipData.currentClip.start}s clip`}
                  hashtags={clipData.aiAnalysis.suggestedHashtags}
                />

                {/* AI Insights */}
                <div className="space-y-4">
                  <h4 className="font-medium text-white">AI Insights</h4>
                  
                  <ViralScoreMeter 
                    score={{
                      overall: clipData.aiAnalysis.viralScore,
                      engagement: 85,
                      trending: clipData.aiAnalysis.trendPrediction,
                      uniqueness: 78,
                      timing: 82
                    }}
                  />
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-bg-tertiary rounded-lg p-3 text-center">
                      <ArrowTrendingUpIcon className="w-5 h-5 text-green-500 mx-auto mb-1" />
                      <div className="text-xs text-text-secondary">Trend Score</div>
                      <div className="text-sm font-medium text-white">{clipData.aiAnalysis.trendPrediction}%</div>
                    </div>
                    <div className="bg-bg-tertiary rounded-lg p-3 text-center">
                      <SparklesSolid className="w-5 h-5 text-accent-blue mx-auto mb-1" />
                      <div className="text-xs text-text-secondary">Highlights</div>
                      <div className="text-sm font-medium text-white">{clipData.aiAnalysis.highlights.length}</div>
                    </div>
                  </div>

                  {/* Hashtag Suggestions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TagIcon className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm font-medium text-white">Suggested Hashtags</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {clipData.aiAnalysis.suggestedHashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full cursor-pointer hover:bg-accent-blue/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Area */}
          <div className="border-t border-border-primary bg-bg-surface p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Timeline Editor</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <BeakerIcon className="w-4 h-4 mr-2" />
                    Auto-crop
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                    Zoom fit
                  </Button>
                </div>
              </div>
              
              <TimelineScrubber
                duration={clipData.duration}
                start={clipData.currentClip.start}
                end={clipData.currentClip.end}
                currentTime={currentTime}
                highlights={clipData.aiAnalysis.highlights}
                waveform={clipData.waveform}
                onChange={handleClipChange}
                onSeek={handleSeek}
                showWaveform={true}
                showHighlights={true}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Tools */}
        <div className="w-80 border-l border-border-primary bg-bg-surface">
          {/* Tool Tabs */}
          <div className="border-b border-border-primary">
            <div className="flex">
              {[
                { id: 'editor', name: 'Editor', icon: ScissorsIcon },
                { id: 'captions', name: 'Captions', icon: ChatBubbleLeftRightIcon },
                { id: 'analytics', name: 'Analytics', icon: SparklesIcon },
                { id: 'export', name: 'Export', icon: CloudArrowDownIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm transition-colors ${
                    activePanel === tab.id
                      ? 'bg-bg-primary text-white border-b-2 border-accent-blue'
                      : 'text-text-secondary hover:text-white hover:bg-bg-elevated'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tool Panel Content */}
          <div className="p-6 h-full overflow-y-auto">
            {activePanel === 'captions' && (
              <CaptionEditor
                captions={clipData.captions}
                currentTime={currentTime}
                duration={clipData.duration}
                onCaptionsChange={(captions) => setClipData({ ...clipData, captions })}
              />
            )}
            
            {activePanel === 'editor' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                      <SparklesIcon className="w-4 h-4 mr-2" />
                      Auto-enhance
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                      <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
                      Adjust timing
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                      <SpeakerWaveIcon className="w-4 h-4 mr-2" />
                      Audio levels
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-3">AI Suggestions</h4>
                  <div className="space-y-3">
                    {clipData.aiAnalysis.highlights.map((highlight, index) => (
                      <div key={index} className="p-3 bg-bg-tertiary rounded-lg border border-border-subtle">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{highlight.label}</span>
                          <span className="text-xs text-accent-blue">{highlight.confidence}%</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleClipChange(highlight.start, highlight.end)}
                          className="w-full text-xs"
                        >
                          Use this clip ({highlight.end - highlight.start}s)
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'analytics' && (
              <div className="space-y-6">
                <h4 className="font-medium text-white mb-3">Engagement Prediction</h4>
                {/* Analytics content would go here */}
                <div className="text-sm text-text-secondary">
                  Advanced analytics panel coming soon...
                </div>
              </div>
            )}
            
            {activePanel === 'export' && (
              <div className="space-y-6">
                <h4 className="font-medium text-white mb-3">Export Settings</h4>
                {/* Export settings would go here */}
                <div className="text-sm text-text-secondary">
                  Export configuration panel...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          clipId={clipData.id}
        />
      )}
    </div>
  );
}
