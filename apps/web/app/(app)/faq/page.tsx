'use client';

import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button } from '@xclips/ui';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I get started with Xclips.ai?',
        answer: 'Simply sign up for a free account, upload your first video, and our AI will automatically generate viral clips for you. No technical knowledge required!'
      },
      {
        question: 'What video formats do you support?',
        answer: 'We support all major video formats including MP4, MOV, AVI, MKV, and more. Our system automatically handles format conversion.'
      },
      {
        question: 'How long does it take to process a video?',
        answer: 'Most videos are processed within 5 minutes. Processing time depends on video length and complexity, but our AI is optimized for speed.'
      }
    ]
  },
  {
    category: 'Pricing & Plans',
    questions: [
      {
        question: 'Can I change plans anytime?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we handle prorated billing automatically.'
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact support for a full refund.'
      },
      {
        question: 'What happens if I exceed my plan limits?',
        answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan or wait for the next billing cycle to reset your quota.'
      }
    ]
  },
  {
    category: 'Features & AI',
    questions: [
      {
        question: 'How accurate is the AI in selecting viral moments?',
        answer: 'Our AI has a 95% accuracy rate in identifying engaging moments. It analyzes factors like speaker emotion, visual changes, and audience engagement patterns.'
      },
      {
        question: 'Can I edit the generated clips?',
        answer: 'Absolutely! You can trim clips, adjust captions, change styles, and customize everything before exporting. Our editor is intuitive and powerful.'
      },
      {
        question: 'Do you support multiple languages?',
        answer: 'Yes, we support over 50 languages for transcription and caption generation. Our AI automatically detects the language in your videos.'
      }
    ]
  },
  {
    category: 'Account & Data',
    questions: [
      {
        question: 'What happens to my videos if I cancel?',
        answer: 'You can download all your videos and clips before cancellation. We keep your data for 30 days after cancellation, then permanently delete it.'
      },
      {
        question: 'Is my content secure and private?',
        answer: 'Yes, we use enterprise-grade security with encrypted storage and transmission. Your content is never shared or used for training without permission.'
      },
      {
        question: 'Can I delete my videos from your servers?',
        answer: 'Yes, you can delete individual videos or all your content at any time from your dashboard. Deletion is permanent and immediate.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Everything you need to know about Xclips.ai
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                {/* Category Header */}
                <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-border-primary">
                  {category.category}
                </h2>
                
                {/* Questions */}
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="group bg-bg-surface rounded-2xl p-6 border border-border-primary hover:border-accent-blue/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-accent-blue/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors duration-300">
                          <span className="text-accent-blue font-bold text-sm">Q</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                            {faq.question}
                          </h3>
                          <p className="text-text-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-bg-surface rounded-3xl p-8 border border-border-primary">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Our support team is here to help you get the most out of Xclips.ai. 
                We typically respond within 2 hours during business hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="inline-flex items-center gap-2">
                  Contact Support
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
                <Button variant="secondary" className="inline-flex items-center gap-2">
                  Join Discord Community
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
