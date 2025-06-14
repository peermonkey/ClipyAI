'use client';

import React from 'react';
import { Button } from '@xclips/ui';
import {
  ArrowUpTrayIcon,
  CpuChipIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: 'upload',
    number: '1',
    title: 'Upload Your Video',
    description: 'Drag and drop your long-form content. We support all major video formats.',
    icon: <ArrowUpTrayIcon className="w-8 h-8" />,
    color: 'blue',
  },
  {
    id: 'analyze',
    number: '2', 
    title: 'AI Analysis',
    description: 'Our AI identifies the best moments and creates optimized clips for each platform.',
    icon: <CpuChipIcon className="w-8 h-8" />,
    color: 'purple',
  },
  {
    id: 'download',
    number: '3',
    title: 'Download & Share',
    description: 'Review, edit if needed, and download your viral-ready clips in minutes.',
    icon: <ArrowDownTrayIcon className="w-8 h-8" />,
    color: 'green',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Transform your long-form content into viral clips in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group h-full">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border-primary to-transparent z-0" />
              )}
              
              {/* Step Card */}
              <div className="relative bg-bg-surface rounded-2xl p-8 border border-border-primary hover:border-accent-blue/50 transition-all duration-300 hover:bg-bg-surface/80 backdrop-blur-sm z-10 h-full flex flex-col">
                {/* Step Number Circle */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl
                    ${step.color === 'blue' ? 'bg-accent-blue' : 
                      step.color === 'purple' ? 'bg-purple-500' : 
                      'bg-green-500'}
                    group-hover:scale-110 transition-transform duration-300 shadow-lg
                  `}>
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    ${step.color === 'blue' ? 'bg-accent-blue/10 text-accent-blue' : 
                      step.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                      'bg-green-500/10 text-green-400'}
                  `}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="relative overflow-hidden group px-8 py-4">
            <span className="relative z-10 flex items-center gap-2">
              Start Creating for Free
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          <p className="text-text-tertiary text-sm mt-4">
            No credit card required • 7-day free trial
          </p>
        </div>
      </div>
    </section>
  );
}
