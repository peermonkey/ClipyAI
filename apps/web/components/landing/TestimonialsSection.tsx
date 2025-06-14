'use client';

import React from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'YouTube Creator, 2M subscribers',
    avatar: 'A',
    avatarColor: 'bg-accent-blue',
    content: "Game changer! Clippy.ai transformed my 3-hour videos into 15 viral clips in minutes. My engagement skyrocketed 400% and I save 20+ hours weekly.",
    rating: 5,
    metric: '400% engagement boost',
  },
  {
    id: 'sarah-martinez',
    name: 'Sarah Martinez',
    role: 'TikTok Influencer, 5M followers',
    avatar: 'S',
    avatarColor: 'bg-purple-500',
    content: "The AI is scary accurate at predicting what goes viral. 9 out of 10 clips it generates for me hit over 1M views. My brand deals doubled!",
    rating: 5,
    metric: '90% viral success rate',
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Podcast Host, Tech Talk Weekly',
    avatar: 'M',
    avatarColor: 'bg-green-500',
    content: "From dreading clip creation to loving it! Clippy.ai finds the perfect moments, adds stunning captions, and exports in every format I need. Pure magic.",
    rating: 5,
    metric: '20+ hours saved weekly',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-bg-primary to-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 px-4 py-2 rounded-full mb-6">
            <StarSolid className="w-4 h-4 text-accent-blue" />
            <span className="text-accent-blue font-medium text-sm">Trusted by 50,000+ Creators</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            See what content creators are saying about Clippy.ai and how it's transforming their content workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group bg-bg-surface border border-border-primary rounded-2xl p-8 hover:border-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300 hover:scale-105 relative overflow-hidden h-full flex flex-col"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  {/* Metric Badge */}
                  <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    {testimonial.metric}
                  </div>
                </div>
                
                {/* Quote Content */}
                <blockquote className="text-text-secondary mb-8 leading-relaxed text-lg group-hover:text-white transition-colors duration-300 flex-1">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border-primary group-hover:border-accent-blue/30 transition-colors duration-300 mt-auto">
                  <div className={`w-14 h-14 ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg group-hover:text-accent-blue transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Subtle decoration */}
              <div className={`absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br ${testimonial.avatarColor} to-purple-500 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
