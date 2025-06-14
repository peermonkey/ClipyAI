import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { 
  PlayIcon, 
  CloudArrowUpIcon, 
  CogIcon, 
  ShareIcon,
  CheckIcon,
  ArrowRightIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Sign Up & Account Setup',
    description: 'Create your free ClippyAI.ai account in under 30 seconds',
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    details: [
      'Visit ClippyAI.ai and click "Get Started"',
      'Sign up with email or social login (Google/Facebook)',
      'Verify your email address',
      'Complete your profile setup'
    ],
    tips: 'Pro tip: Use the same email across all your social platforms for easier integration later.'
  },
  {
    title: 'Upload Your First Video',
    description: 'Upload your long-form content to start creating viral clips',
    icon: <CloudArrowUpIcon className="w-6 h-6" />,
    details: [
      'Click "Upload Video" from your dashboard',
      'Drag & drop your video file or browse to select',
      'Supported formats: MP4, MOV, AVI, MKV, WebM',
      'Wait for the upload and initial processing to complete'
    ],
    tips: 'Best results: Upload videos longer than 5 minutes with clear audio and good lighting.'
  },
  {
    title: 'AI Analysis & Clip Generation',
    description: 'Our AI analyzes your content and identifies viral moments',
    icon: <CogIcon className="w-6 h-6" />,
    details: [
      'AI analyzes audio patterns, facial expressions, and engagement triggers',
      'Identifies 5-10 of the most viral-worthy moments',
      'Generates clips optimized for different platforms',
      'Creates auto-captions with perfect timing'
    ],
    tips: 'Processing time: ~5-10 minutes for a 1-hour video. Pro users get priority processing.'
  },
  {
    title: 'Review & Customize Clips',
    description: 'Fine-tune your clips before sharing with the world',
    icon: <PlayIcon className="w-6 h-6" />,
    details: [
      'Preview all generated clips in your dashboard',
      'Edit captions, adjust timing, and change styles',
      'Customize for specific platforms (TikTok, Instagram, YouTube)',
      'Add your branding and call-to-actions'
    ],
    tips: 'Each clip includes a viral potential score to help you choose the best ones.'
  },
  {
    title: 'Export & Share',
    description: 'Download your clips or publish directly to social platforms',
    icon: <ShareIcon className="w-6 h-6" />,
    details: [
      'Export in platform-optimized formats and resolutions',
      'One-click publishing to connected social accounts',
      'Download individual clips or batch export',
      'Track performance with built-in analytics'
    ],
    tips: 'Connect your social accounts for seamless publishing and performance tracking.'
  }
];

const quickStart = [
  'Create account (30 seconds)',
  'Upload your first video (2 minutes)',
  'AI processes and creates clips (5-10 minutes)',
  'Review, customize, and share (5 minutes)',
  'Watch your content go viral! 🚀'
];

export default function GettingStartedPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Getting Started with ClippyAI.ai
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Transform your long-form content into viral clips in just 5 simple steps. 
              No technical skills required – our AI does the heavy lifting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="px-8 py-4 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium flex items-center gap-2">
                  Start Creating Now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-8 py-4 bg-transparent border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200">
                  Browse All Docs
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Start Checklist */}
          <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🚀 Quick Start Checklist
            </h2>
            <div className="max-w-2xl mx-auto">
              {quickStart.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Step-by-Step Guide
            </h2>
            
            {steps.map((step, index) => (
              <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                      <div className="text-accent-blue">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-bold text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-text-secondary mb-6">
                      {step.description}
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-white mb-3">Instructions:</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2 text-text-secondary text-sm">
                              <CheckIcon className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-bg-primary/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">💡 Pro Tip:</h4>
                        <p className="text-text-secondary text-sm">
                          {step.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Tutorial Section */}
          <div className="mt-16 text-center">
            <div className="bg-bg-surface border border-border-primary rounded-xl p-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                📹 Video Tutorial
              </h3>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Watch our 5-minute tutorial to see ClippyAI.ai in action and learn pro tips for creating viral content.
              </p>
              
              {/* Placeholder for video */}
              <div className="aspect-video bg-bg-primary rounded-lg flex items-center justify-center mb-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <PlayIcon className="w-16 h-16 text-accent-blue mx-auto mb-4" />
                  <p className="text-text-secondary">Video tutorial coming soon!</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/upload">
                  <button className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200">
                    Try It Yourself
                  </button>
                </Link>
                <Link href="/community">
                  <button className="px-6 py-3 bg-bg-primary border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              What's Next?
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Link href="/docs" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
                <h4 className="font-semibold text-white mb-2">📚 Explore Documentation</h4>
                <p className="text-text-secondary text-sm">
                  Dive deeper into advanced features, API integration, and best practices.
                </p>
              </Link>
              
              <Link href="/community" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
                <h4 className="font-semibold text-white mb-2">👥 Join Our Community</h4>
                <p className="text-text-secondary text-sm">
                  Connect with 5,000+ creators, share tips, and get inspired.
                </p>
              </Link>
              
              <Link href="/help" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
                <h4 className="font-semibold text-white mb-2">❓ Get Help</h4>
                <p className="text-text-secondary text-sm">
                  Find answers to common questions or contact our support team.
                </p>
              </Link>
              
              <Link href="/pricing" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
                <h4 className="font-semibold text-white mb-2">⚡ Upgrade to Pro</h4>
                <p className="text-text-secondary text-sm">
                  Unlock unlimited uploads, priority processing, and advanced features.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
