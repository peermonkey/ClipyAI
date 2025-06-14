'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSection from '../../components/landing/PricingSection';
import { 
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out ClippyAI.ai',
    features: [
      '3 video uploads per month',
      'AI-powered clip extraction',
      'Basic captions',
      '720p exports',
      'Watermark included',
      'Community support',
      'Basic analytics',
      'Standard processing'
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    popular: false,
    savings: null
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    yearlyPrice: '$19',
    description: 'For serious content creators',
    features: [
      '50 video uploads per month',
      'Advanced AI analysis',
      'Custom captions & styles',
      '4K exports',
      'No watermark',
      'Priority support',
      'Analytics dashboard',
      'Fast processing'
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/signup?plan=pro',
    popular: true,
    savings: 'Save 34%'
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    yearlyPrice: '$79',
    description: 'For teams and agencies',
    features: [
      'Unlimited uploads',
      'Team collaboration tools',
      'Brand customization',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'Priority processing'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
    savings: 'Save 20%'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    avatar: '👩‍💻',
    followers: '2.1M followers',
    quote: 'ClippyAI.ai increased my engagement by 400%. The AI knows exactly which moments will go viral.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    avatar: '👨‍💼',
    company: 'TechCorp',
    quote: 'We cut our video editing costs by 80% and increased our content output by 5x. Game changer.',
    rating: 5
  },
  {
    name: 'Alex Rivera',
    role: 'YouTuber',
    avatar: '🎬',
    subscribers: '850K subscribers',
    quote: 'The time saved is incredible. What used to take me hours now takes minutes. Worth every penny.',
    rating: 5
  }
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'If you exceed your monthly limits, we\'ll notify you and give you the option to upgrade or wait until next month. No surprise charges.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. Just contact support if you\'re not satisfied.'
  },
  {
    question: 'Is there a discount for annual billing?',
    answer: 'Yes! Annual billing saves you up to 34% compared to monthly billing. You can switch to annual billing anytime.'
  },
  {
    question: 'Do you offer student or nonprofit discounts?',
    answer: 'We offer special pricing for students and nonprofits. Contact our sales team for more information.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use bank-level encryption and are SOC 2 compliant. Your videos are automatically deleted after processing.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time with no cancellation fees.'
  }
];

const features = [
  {
    icon: ChartBarIcon,
    title: 'ROI Guarantee',
    description: 'Most creators see 3x+ engagement increase within 30 days or get your money back.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with bank-level encryption. Your content is always protected.'
  },
  {
    icon: UsersIcon,
    title: 'Team Collaboration',
    description: 'Built for teams with shared workspaces, approval workflows, and role management.'
  },
  {
    icon: ClockIcon,
    title: '24/7 Support',
    description: 'Get help when you need it with our responsive support team and extensive documentation.'
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = React.useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-2 mb-6">
                <CurrencyDollarIcon className="w-5 h-5 text-accent-blue" />
                <span className="text-accent-blue font-medium">Simple, Transparent Pricing</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Choose the Perfect Plan for
                <span className="bg-gradient-to-r from-accent-blue to-purple-500 bg-clip-text text-transparent block">
                  Your Content Goals
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
                Start free and upgrade as your content creation needs grow. All plans include our core AI-powered features 
                with no hidden fees or surprise charges.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-text-secondary'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 ${
                    isYearly ? 'bg-accent-blue' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isYearly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-text-secondary'}`}>
                  Annual
                </span>
                <div className="bg-gradient-to-r from-accent-blue/20 to-purple-500/20 border border-accent-blue/20 rounded-full px-3 py-1">
                  <span className="text-accent-blue text-sm font-medium">Save up to 34%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-bg-surface border rounded-2xl p-8 hover:scale-105 transition-all duration-300 ${
                    plan.popular 
                      ? 'border-accent-blue shadow-2xl shadow-accent-blue/10' 
                      : 'border-border-primary hover:border-accent-blue/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-accent-blue to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <StarIcon className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-text-secondary mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        {isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
                      </span>
                      <span className="text-text-secondary ml-1">{plan.period}</span>
                      {isYearly && plan.yearlyPrice && (
                        <div className="text-sm text-text-tertiary line-through">
                          {plan.price}{plan.period}
                        </div>
                      )}
                    </div>
                    
                    {isYearly && plan.savings && (
                      <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg px-3 py-2 mb-4">
                        <span className="text-accent-blue text-sm font-medium">{plan.savings}</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-accent-blue flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                      plan.popular 
                        ? 'bg-accent-blue text-white hover:bg-accent-blue-hover' 
                        : 'bg-bg-primary text-white border border-border-primary hover:border-accent-blue/30'
                    }`}
                    onClick={() => window.location.href = plan.ctaLink}
                  >
                    {plan.cta}
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Why Choose ClippyAI.ai?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                More than just pricing - we're committed to your success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-bg-surface border border-border-primary rounded-xl hover:border-accent-blue/30 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-accent-blue/20 to-purple-500/20 p-4 rounded-xl border border-accent-blue/20 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Trusted by 10,000+ Creators
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                See what our customers are saying about their results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-text-secondary">{testimonial.role}</p>
                      {testimonial.followers && (
                        <p className="text-xs text-accent-blue">{testimonial.followers}</p>
                      )}
                      {testimonial.company && (
                        <p className="text-xs text-accent-blue">{testimonial.company}</p>
                      )}
                      {testimonial.subscribers && (
                        <p className="text-xs text-accent-blue">{testimonial.subscribers}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-text-secondary text-sm leading-relaxed">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-bg-surface/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-2 mb-6">
                <QuestionMarkCircleIcon className="w-5 h-5 text-accent-blue" />
                <span className="text-accent-blue font-medium">Frequently Asked Questions</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Got Questions? We've Got Answers
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Everything you need to know about our pricing and plans
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-2xl p-12">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Content?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using ClippyAI.ai to create viral content. 
                Start your free trial today - no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button className="px-8 py-4 bg-accent-blue text-white rounded-lg font-medium hover:bg-accent-blue-hover transition-colors duration-200 group flex items-center justify-center gap-2">
                  Start Creating for Free
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-bg-surface text-white border border-border-primary rounded-lg font-medium hover:border-accent-blue/30 transition-colors duration-200">
                  Schedule Demo
                </button>
              </div>
              
              <p className="text-text-tertiary text-sm">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
