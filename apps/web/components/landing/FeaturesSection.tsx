'use client';

import React from 'react';
import {
  CpuChipIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  LightBulbIcon,
  PlayIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const mainFeatures = [
  {
    id: 'ai-moments',
    icon: CpuChipIcon,
    title: 'AI-Powered Moment Detection',
    description: 'Our advanced AI analyzes your content and automatically identifies the most engaging, shareable moments that drive viral growth.',
    highlight: 'Up to 10x faster',
  },
  {
    id: 'viral-optimization',
    icon: RocketLaunchIcon,
    title: 'Viral Content Optimization',
    description: 'Each clip is optimized for maximum engagement with perfect timing, dynamic pacing, and platform-specific formatting.',
    highlight: '95% accuracy',
  },
  {
    id: 'smart-captions',
    icon: SparklesIcon,
    title: 'Smart Auto-Captions',
    description: 'Generate perfectly timed captions with custom styling, animations, and brand colors that boost engagement by 300%.',
    highlight: '99% accuracy',
  },
];

const additionalFeatures = [
  {
    icon: GlobeAltIcon,
    title: 'Multi-Platform Ready',
    description: 'Perfect formats for TikTok, Instagram, YouTube, Twitter, and LinkedIn',
  },
  {
    icon: ChartBarIcon,
    title: 'Performance Analytics',
    description: 'Predict viral potential with AI-powered engagement scoring',
  },
  {
    icon: LightBulbIcon,
    title: 'Content Suggestions',
    description: 'Get AI recommendations for trending topics and viral hooks',
  },
  {
    icon: PlayIcon,
    title: 'One-Click Publishing',
    description: 'Export and share directly to all major social platforms',
  },
  {
    icon: CheckBadgeIcon,
    title: 'Brand Consistency',
    description: 'Maintain your brand identity across all generated clips',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-bg-secondary relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 border border-accent-blue/30 rounded-full text-accent-blue text-sm font-medium mb-6">
            ✨ Powered by Advanced AI
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Turn Every Video into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-accent-blue via-purple-500 to-accent-blue bg-clip-text text-transparent">
              Viral Content Gold
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Unlock the hidden potential in your content with AI that understands what makes videos go viral
          </p>
        </div>

        {/* Main Features - Larger Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id}
                className="group relative p-8 bg-bg-surface border border-border-primary rounded-2xl hover:border-accent-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-blue/10 hover:-translate-y-2"
              >
                {/* Feature Badge */}
                <div className="absolute -top-3 right-6">
                  <span className="bg-gradient-to-r from-accent-blue to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {feature.highlight}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-accent-blue/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-accent-blue" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-bg-surface/50 rounded-3xl p-8 border border-border-primary backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Everything You Need to Go Viral
            </h3>
            <p className="text-text-secondary">
              Comprehensive tools for modern content creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-bg-surface transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
