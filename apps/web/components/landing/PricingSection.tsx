'use client';

import React, { useState } from 'react';
import { Button } from '@xclips/ui';
import { 
  CheckIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: '$0',
    annualPrice: '$0',
    description: 'Perfect for trying out Clippy.ai',
    features: [
      '3 video uploads per month',
      'AI-powered clip extraction',
      'Basic captions',
      '720p exports',
      'Watermark included',
      'Community support',
      'Basic analytics',
      'Standard processing',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'secondary' as const,
    popular: false,
    limits: '3 videos/month',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: '$29',
    annualPrice: '$19',
    description: 'For serious content creators',
    features: [
      '50 video uploads per month',
      'Advanced AI analysis',
      'Custom captions & styles',
      '4K exports',
      'No watermark',
      'Priority support',
      'Analytics dashboard',
      'Fast processing',
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'primary' as const,
    popular: true,
    limits: '50 videos/month',
    savings: 'Save $120/year',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: '$99',
    annualPrice: '$79',
    description: 'For teams and agencies',
    features: [
      'Unlimited uploads',
      'Team collaboration tools',
      'Brand customization',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'Priority processing',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary' as const,
    popular: false,
    limits: 'Unlimited',
    savings: 'Save $240/year',
  },
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'What happens to my videos if I cancel?',
    answer: 'You can download all your videos and clips before cancellation. We keep your data for 30 days.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.',
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            Choose the plan that works best for your content creation needs. 
            Start free, upgrade when you're ready.
          </p>
          
          {/* Billing Toggle */}
          <div className="relative flex flex-col items-center mb-8">
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-white' : 'text-text-secondary'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 ${
                  isAnnual ? 'bg-accent-blue' : 'bg-gray-600'
                }`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                  isAnnual ? 'left-7' : 'left-0.5'
                }`} />
              </button>
              <span className={`text-sm font-medium transition-colors duration-300 ${isAnnual ? 'text-white' : 'text-text-secondary'}`}>
                Annual
              </span>
            </div>
            <div className={`mt-3 transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium border ${
              isAnnual 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 opacity-100 animate-pulse' 
                : 'bg-transparent text-transparent border-transparent opacity-0'
            }`}>
              Save up to 34%
            </div>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-bg-surface rounded-2xl p-8 border transition-all duration-300 hover:scale-105 h-full flex flex-col ${
                plan.popular 
                  ? 'border-accent-blue shadow-2xl shadow-accent-blue/20 ring-1 ring-accent-blue/20' 
                  : 'border-border-primary hover:border-accent-blue/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-accent-blue to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-text-secondary">
                    {plan.id === 'free' ? '' : '/month'}
                  </span>
                </div>
                {/* Consistent height for savings text */}
                <div className="h-6 mb-2">
                  {isAnnual && plan.savings && (
                    <p className="text-green-400 text-sm font-medium">{plan.savings}</p>
                  )}
                </div>
                <p className="text-text-secondary text-sm mb-4 h-10 flex items-center justify-center">{plan.description}</p>
                <div className="bg-bg-primary/50 rounded-lg p-3">
                  <span className="text-accent-blue font-medium">{plan.limits}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto">
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full relative overflow-hidden group ${
                    plan.popular ? 'shadow-lg shadow-accent-blue/25' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {plan.buttonText}
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 text-text-secondary">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5" />
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="text-sm">30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            <span className="text-sm">Cancel anytime</span>
          </div>
        </div>

        {/* Quick FAQ Link */}
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            Have questions about our pricing?
          </p>
          <Button variant="secondary" className="inline-flex items-center gap-2">
            View FAQ
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
