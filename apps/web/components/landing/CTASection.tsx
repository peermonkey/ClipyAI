'use client';

import React from 'react';
import { Button } from '@xclips/ui';
import { ArrowRightIcon, SparklesIcon, PlayIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent-blue/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-blue/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 border border-accent-blue/30 px-6 py-3 rounded-full mb-8">
          <TrophyIcon className="w-5 h-5 text-accent-blue" />
          <span className="text-accent-blue font-semibold">Join 50,000+ Successful Creators</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Go 
          <span className="bg-gradient-to-r from-accent-blue to-purple-500 bg-clip-text text-transparent"> Viral</span>?
        </h2>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
          Transform your long-form content into viral clips in minutes. 
          <span className="text-white font-semibold"> Join the creators already seeing 400% engagement boosts</span> with AI-powered clip generation.
        </p>

        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <Button 
            size="lg" 
            className="relative overflow-hidden group px-10 py-5 text-lg font-semibold shadow-2xl shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              <SparklesIcon className="w-6 h-6" />
              Start Creating Viral Content
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg" 
            className="px-10 py-5 text-lg font-semibold border-2 hover:bg-white/10 transition-all duration-300"
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

      </div>
    </section>
  );
}
