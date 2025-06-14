import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SparklesIcon, UsersIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    number: '50K+',
    label: 'Content Creators',
    description: 'Trust ClippyAI.ai'
  },
  {
    number: '2M+',
    label: 'Viral Clips',
    description: 'Generated monthly'
  },
  {
    number: '95%',
    label: 'Success Rate',
    description: 'For viral content'
  },
  {
    number: '10hrs',
    label: 'Average Time',
    description: 'Saved per week'
  }
];

const team = [
  {
    name: 'Alex Chen',
    role: 'CEO & Co-founder',
    bio: 'Former TikTok algorithm engineer with 8+ years in AI and social media.',
    avatar: 'A'
  },
  {
    name: 'Sarah Kim',
    role: 'CTO & Co-founder',
    bio: 'Ex-Google AI researcher specializing in computer vision and video processing.',
    avatar: 'S'
  },
  {
    name: 'Mike Johnson',
    role: 'Head of AI',
    bio: 'PhD in Machine Learning, previously led AI teams at Meta and YouTube.',
    avatar: 'M'
  },
  {
    name: 'Emma Davis',
    role: 'Head of Product',
    bio: 'Former product manager at Canva, passionate about creator tools.',
    avatar: 'E'
  }
];

const values = [
  {
    icon: <SparklesIcon className="w-8 h-8" />,
    title: 'Innovation First',
    description: 'We push the boundaries of AI to give creators superpowers.'
  },
  {
    icon: <UsersIcon className="w-8 h-8" />,
    title: 'Creator-Centric',
    description: 'Every feature is designed with content creators at the center.'
  },
  {
    icon: <TrophyIcon className="w-8 h-8" />,
    title: 'Excellence',
    description: 'We strive for the highest quality in everything we build.'
  },
  {
    icon: <HeartIcon className="w-8 h-8" />,
    title: 'Community',
    description: 'We believe in building tools that bring creators together.'
  }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Empowering the Next Generation of Content Creators
            </h1>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              ClippyAI.ai was born from a simple belief: every creator deserves the tools to turn their passion into viral content. 
              We're democratizing video editing with AI that understands what makes content go viral.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-text-secondary text-sm">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Story</h2>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">The Problem We Saw</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Talented creators were spending 80% of their time editing and only 20% creating. 
                  They had amazing ideas but lacked the technical skills or time to turn long-form content into viral clips.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Meanwhile, algorithms were getting smarter, but the tools creators used remained frustratingly manual and time-consuming.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Our Solution</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  We built ClippyAI.ai to flip that ratio. Now creators spend 80% of their time creating and only 20% on editing.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Our AI understands viral patterns, automatically identifies the best moments, and creates platform-optimized clips in minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-lg">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-text-secondary text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-blue to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-accent-blue text-sm mb-3">{member.role}</p>
                  <p className="text-text-secondary text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
                To democratize content creation by giving every creator access to AI-powered tools that were once 
                only available to major studios and tech companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/docs/getting-started" 
                  className="px-8 py-4 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium"
                >
                  Start Creating Today
                </a>
                <a 
                  href="/community" 
                  className="px-8 py-4 bg-transparent border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200"
                >
                  Join Our Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
