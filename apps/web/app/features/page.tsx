import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  SparklesIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  CpuChipIcon,
  ShareIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UsersIcon,
  PaintBrushIcon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckIcon,
  PlayIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const coreFeatures = [
  {
    icon: CpuChipIcon,
    title: 'AI-Powered Clip Detection',
    description: 'Our advanced AI analyzes your content and automatically identifies the most engaging, shareable moments that drive viral growth.',
    benefits: ['95% accuracy in moment detection', 'Saves 10+ hours per video', 'Identifies trending patterns'],
    demo: 'Watch AI in action'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Smart Auto-Captions',
    description: 'Generate perfectly timed captions with custom styling, animations, and brand colors that boost engagement by 300%.',
    benefits: ['Multi-language support', 'Custom brand styling', 'Animated text effects'],
    demo: 'See caption styles'
  },
  {
    icon: ShareIcon,
    title: 'Multi-Platform Optimization',
    description: 'Each clip is optimized for maximum engagement with perfect timing, dynamic pacing, and platform-specific formatting.',
    benefits: ['TikTok, Instagram, YouTube ready', 'Optimal aspect ratios', 'Platform-specific hooks'],
    demo: 'View formats'
  },
  {
    icon: ClockIcon,
    title: 'Lightning Fast Processing',
    description: 'Transform hours of footage into viral clips in minutes. Our cloud infrastructure processes videos 10x faster than competitors.',
    benefits: ['60-second average processing', 'Bulk upload support', '99.9% uptime guarantee'],
    demo: 'Speed test'
  },
];

const advancedFeatures = [
  {
    icon: ChartBarIcon,
    title: 'Performance Analytics',
    description: 'AI-powered engagement scoring predicts viral potential before you publish.',
    features: ['Viral probability scoring', 'Engagement predictions', 'A/B testing insights', 'Performance tracking']
  },
  {
    icon: UsersIcon,
    title: 'Team Collaboration',
    description: 'Streamline content creation with team workspaces and approval workflows.',
    features: ['Team workspaces', 'Approval workflows', 'Comment system', 'Role management']
  },
  {
    icon: PaintBrushIcon,
    title: 'Brand Customization',
    description: 'Maintain consistent branding across all your clips with custom templates.',
    features: ['Brand templates', 'Custom color schemes', 'Logo watermarks', 'Font libraries']
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud Integration',
    description: 'Seamlessly connect with your existing workflow and storage solutions.',
    features: ['Dropbox sync', 'Google Drive integration', 'API access', 'Webhook support']
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile Optimization',
    description: 'Perfect clips for mobile consumption with vertical formats and mobile-first design.',
    features: ['9:16 aspect ratio', 'Mobile-first editing', 'Touch-friendly interface', 'Offline viewing']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and enterprise-grade data protection.',
    features: ['SOC 2 compliant', 'End-to-end encryption', 'GDPR compliance', 'Data residency options']
  },
];

const platforms = [
  { name: 'TikTok', logo: '🎵', aspectRatio: '9:16', features: ['Trending sounds', 'Effect overlays', 'Hashtag optimization'] },
  { name: 'Instagram', logo: '📷', aspectRatio: '9:16 & 1:1', features: ['Story format', 'Reel optimization', 'IGTV support'] },
  { name: 'YouTube', logo: '▶️', aspectRatio: '16:9 & 9:16', features: ['Shorts optimization', 'Thumbnail generation', 'Chapter markers'] },
  { name: 'Twitter', logo: '🐦', aspectRatio: '16:9', features: ['Tweet threads', 'GIF creation', 'Live tweeting'] },
  { name: 'LinkedIn', logo: '💼', aspectRatio: '16:9 & 1:1', features: ['Professional tone', 'Industry tags', 'Thought leadership'] },
  { name: 'Facebook', logo: '📘', aspectRatio: '16:9 & 1:1', features: ['Page integration', 'Event promotion', 'Group sharing'] },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    avatar: '👩‍💻',
    followers: '2.1M',
    quote: 'ClippyAI.ai turned my 3-hour podcasts into 20 viral clips. My engagement is up 400%!',
    stats: '+400% engagement'
  },
  {
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    avatar: '👨‍💼',
    company: 'TechCorp',
    quote: 'We cut our video editing costs by 80% and our content velocity increased 5x.',
    stats: '80% cost reduction'
  },
  {
    name: 'Alex Rivera',
    role: 'YouTuber',
    avatar: '🎬',
    subscribers: '850K',
    quote: 'The AI knows exactly which moments will go viral. It\'s like having a crystal ball.',
    stats: '95% accuracy'
  },
];

export default function FeaturesPage() {
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
                <SparklesIcon className="w-5 h-5 text-accent-blue" />
                <span className="text-accent-blue font-medium">AI-Powered Features</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Everything You Need to
                <span className="bg-gradient-to-r from-accent-blue to-purple-500 bg-clip-text text-transparent block">
                  Create Viral Content
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
                Powerful AI features designed for modern content creators. From automatic clip detection 
                to viral prediction analytics, we've built the complete toolkit for content success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-accent-blue text-white rounded-lg font-medium hover:bg-accent-blue-hover transition-colors duration-200 group flex items-center justify-center gap-2">
                  Try All Features Free
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-bg-surface text-white border border-border-primary rounded-lg font-medium hover:border-accent-blue/30 transition-colors duration-200 group flex items-center justify-center gap-2">
                  <PlayIcon className="w-4 h-4" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Core AI Features
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                The essential tools that transform your long-form content into viral gold
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-2xl p-8 hover:border-accent-blue/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-accent-blue/20 to-purple-500/20 p-4 rounded-xl border border-accent-blue/20">
                      <feature.icon className="w-8 h-8 text-accent-blue" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-text-secondary mb-6 leading-relaxed">{feature.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckIcon className="w-5 h-5 text-accent-blue flex-shrink-0" />
                            <span className="text-text-secondary text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className="text-accent-blue hover:text-accent-blue-hover font-medium text-sm flex items-center gap-2 group/demo">
                        {feature.demo}
                        <ArrowRightIcon className="w-4 h-4 group-hover/demo:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-20 px-6 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Optimized for Every Platform
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Perfect formatting and optimization for all major social media platforms
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{platform.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                      <p className="text-sm text-text-secondary">{platform.aspectRatio}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-accent-blue flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Advanced Capabilities
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Professional tools for serious content creators and teams
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-accent-blue/20 to-purple-500/20 p-3 rounded-xl border border-accent-blue/20 w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-accent-blue" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-text-secondary mb-4 text-sm leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-accent-blue flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Loved by Creators Worldwide
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                See how our features help creators achieve viral success
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
                        <p className="text-xs text-accent-blue">{testimonial.followers} followers</p>
                      )}
                      {testimonial.company && (
                        <p className="text-xs text-accent-blue">{testimonial.company}</p>
                      )}
                      {testimonial.subscribers && (
                        <p className="text-xs text-accent-blue">{testimonial.subscribers} subscribers</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
                  
                  <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-3">
                    <span className="text-accent-blue font-bold text-sm">{testimonial.stats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using our AI-powered features to create viral content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-accent-blue text-white rounded-lg font-medium hover:bg-accent-blue-hover transition-colors duration-200 group flex items-center justify-center gap-2">
                  Start Creating for Free
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-bg-surface text-white border border-border-primary rounded-lg font-medium hover:border-accent-blue/30 transition-colors duration-200">
                  Schedule Demo
                </button>
              </div>
              
              <p className="text-text-tertiary text-sm mt-6">
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
