import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DocumentTextIcon, RocketLaunchIcon, CodeBracketIcon, CogIcon } from '@heroicons/react/24/outline';

const docSections = [
  {
    title: 'Getting Started',
    description: 'Quick start guide to get you up and running with ClippyAI.ai',
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    href: '/docs/getting-started',
    items: ['Account Setup', 'First Video Upload', 'Basic Editing', 'Export Options']
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation for developers',
    icon: <CodeBracketIcon className="w-6 h-6" />,
    href: '/api',
    items: ['Authentication', 'Upload Endpoints', 'Processing Status', 'Webhooks']
  },
  {
    title: 'Video Processing',
    description: 'Understanding AI-powered video analysis and clipping',
    icon: <DocumentTextIcon className="w-6 h-6" />,
    href: '/docs/video-processing',
    items: ['AI Analysis', 'Clip Generation', 'Caption Creation', 'Quality Settings']
  },
  {
    title: 'Integrations',
    description: 'Connect ClippyAI.ai with your favorite platforms',
    icon: <CogIcon className="w-6 h-6" />,
    href: '/docs/integrations',
    items: ['YouTube', 'TikTok', 'Instagram', 'Twitter/X']
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Everything you need to know about using ClippyAI.ai to create viral video content
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {docSections.map((section, index) => (
              <div 
                key={index}
                className="bg-bg-surface border border-border-primary rounded-xl p-8 hover:border-accent-blue/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-lg">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                    <p className="text-text-secondary text-sm">{section.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-text-secondary">
                      <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={section.href}
                  className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue-hover transition-colors duration-200 font-medium"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Need Help?
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of ClippyAI.ai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a 
                  href="/community" 
                  className="px-6 py-3 bg-bg-primary border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200"
                >
                  Join Community
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
