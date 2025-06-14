'use client';

import React from 'react';
import { Button } from '@xclips/ui';
import {
  PlayIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-20 pb-32 overflow-hidden">
      {/* Clean Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Clean Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 border border-accent-blue/30 rounded-full text-accent-blue text-sm font-medium mb-8 backdrop-blur-sm">
            AI-Powered Video Editing
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Long Videos into{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-accent-blue via-purple-500 to-accent-blue bg-clip-text text-transparent">
              Viral Clips
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            AI-powered video editing that automatically extracts the best moments from your content 
            and optimizes them for every platform. Turn hours of footage into viral clips in minutes.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="relative overflow-hidden group px-8 py-4">
              <span className="relative z-10 flex items-center gap-2">
                Start Creating for Free
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
            
            <button className="flex items-center gap-3 px-6 py-4 text-white hover:text-accent-blue transition-colors duration-300 group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors duration-300 backdrop-blur-sm border border-white/10">
                <PlayIcon className="w-5 h-5 ml-0.5" />
              </div>
              <span className="font-medium">Watch Demo</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
