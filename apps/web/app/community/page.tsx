import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { UserGroupIcon, ChatBubbleLeftRightIcon, SparklesIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const communityFeatures = [
  {
    title: 'Discord Community',
    description: 'Join 5,000+ content creators sharing tips, tricks, and success stories.',
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
    link: 'https://discord.gg/clippyai',
    linkText: 'Join Discord',
    stats: '5,000+ Members'
  },
  {
    title: 'Creator Showcases',
    description: 'Share your viral clips and get feedback from fellow creators.',
    icon: <SparklesIcon className="w-8 h-8" />,
    link: '/showcase',
    linkText: 'View Showcases',
    stats: '1,000+ Clips Shared'
  },
  {
    title: 'Weekly Challenges',
    description: 'Participate in themed challenges and win prizes.',
    icon: <UserGroupIcon className="w-8 h-8" />,
    link: '/challenges',
    linkText: 'Join Challenge',
    stats: 'New Challenge Every Monday'
  },
  {
    title: 'Knowledge Base',
    description: 'Access community-contributed guides and tutorials.',
    icon: <BookOpenIcon className="w-8 h-8" />,
    link: '/knowledge-base',
    linkText: 'Browse Guides',
    stats: '200+ Tutorials'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'YouTube Creator',
    content: 'The ClippyAI community is incredible! I\'ve learned more in 2 months here than in years of trial and error.',
    avatar: 'S'
  },
  {
    name: 'Mike Rodriguez',
    role: 'TikTok Influencer',
    content: 'Love the daily tips and the supportive environment. Everyone here genuinely wants to help each other grow.',
    avatar: 'M'
  },
  {
    name: 'Emma Thompson',
    role: 'Podcast Host',
    content: 'The weekly challenges pushed me to try new content styles. My engagement has never been higher!',
    avatar: 'E'
  }
];

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Connect with thousands of content creators using ClippyAI.ai to grow their audience and create viral content
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-20">
            {communityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-bg-surface border border-border-primary rounded-xl p-8 hover:border-accent-blue/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-text-tertiary text-sm">{feature.stats}</p>
                  </div>
                </div>
                
                <p className="text-text-secondary mb-6">{feature.description}</p>
                
                <a 
                  href={feature.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium"
                >
                  {feature.linkText} →
                </a>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What Our Community Says
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-xl p-6"
                >
                  <p className="text-text-secondary mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-text-tertiary text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                Ready to Join?
              </h3>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Be part of a community that's shaping the future of content creation with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://discord.gg/clippyai" 
                  className="px-8 py-4 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium"
                >
                  Join Discord Community
                </a>
                <a 
                  href="/docs/getting-started" 
                  className="px-8 py-4 bg-transparent border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200"
                >
                  Get Started with ClippyAI
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              Community Guidelines
            </h3>
            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-white mb-3">✅ Do</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Share your knowledge and experiences</li>
                    <li>• Ask questions and help others</li>
                    <li>• Provide constructive feedback</li>
                    <li>• Celebrate others' successes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">❌ Don't</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Spam or self-promote excessively</li>
                    <li>• Share inappropriate content</li>
                    <li>• Be disrespectful or toxic</li>
                    <li>• Share pirated content or tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
