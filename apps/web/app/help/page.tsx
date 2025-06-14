import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { QuestionMarkCircleIcon, BookOpenIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const faqItems = [
  {
    question: 'How does ClippyAI.ai identify viral moments?',
    answer: 'Our AI analyzes audio patterns, facial expressions, engagement triggers, and viral content patterns from millions of successful clips to identify the most engaging moments in your videos.'
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support all major video formats including MP4, MOV, AVI, MKV, and WebM. Maximum file size is 5GB for free users and 50GB for Pro users.'
  },
  {
    question: 'How long does processing take?',
    answer: 'Processing time depends on video length and complexity. Typically, a 1-hour video takes 5-10 minutes to process. Pro users get priority processing.'
  },
  {
    question: 'Can I edit the AI-generated clips?',
    answer: 'Yes! You can edit captions, adjust timing, change styles, and customize clips for different platforms before exporting.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, our free plan includes 3 video uploads per month with basic features. No credit card required to get started.'
  }
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Help Center
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Find answers to common questions and get the help you need
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <a href="/docs" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <BookOpenIcon className="w-8 h-8 text-accent-blue mb-4" />
              <h3 className="text-white font-semibold mb-2">Documentation</h3>
              <p className="text-text-secondary text-sm">Complete guides and tutorials</p>
            </a>
            <a href="/community" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-accent-blue mb-4" />
              <h3 className="text-white font-semibold mb-2">Community</h3>
              <p className="text-text-secondary text-sm">Connect with other creators</p>
            </a>
            <a href="/contact" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <EnvelopeIcon className="w-8 h-8 text-accent-blue mb-4" />
              <h3 className="text-white font-semibold mb-2">Contact Support</h3>
              <p className="text-text-secondary text-sm">Get direct help from our team</p>
            </a>
            <a href="/status" className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <QuestionMarkCircleIcon className="w-8 h-8 text-accent-blue mb-4" />
              <h3 className="text-white font-semibold mb-2">System Status</h3>
              <p className="text-text-secondary text-sm">Check service availability</p>
            </a>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.question}</h3>
                  <p className="text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Need Help?
              </h3>
              <p className="text-text-secondary mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
