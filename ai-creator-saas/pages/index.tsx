import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Play, Upload, Sparkles, Zap, Users, Star, TrendingUp, Clock, Award, ArrowRight, 
  Video, AudioLines, Scissors, Wand2, BarChart3, Globe, Shield, Rocket, ChevronDown,
  CheckCircle, Brain, Target, PieChart, Bot, Lightbulb, Eye
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "SC",
      content: "ClipMagic turned my 2-hour podcast into 15 viral TikToks. My follower count doubled in a month!",
      metrics: "2M+ views generated",
      platform: "TikTok",
      growth: "+200%"
    },
    {
      name: "Marcus Johnson",
      role: "YouTuber", 
      avatar: "MJ",
      content: "The AI finds moments I would never think to clip. It's like having a professional editor 24/7.",
      metrics: "500K+ subscribers gained",
      platform: "YouTube",
      growth: "+150%"
    },
    {
      name: "Elena Rodriguez",
      role: "Podcast Host",
      avatar: "ER", 
      content: "From upload to viral clip in under 5 minutes. This tool is a game-changer for busy creators.",
      metrics: "10x engagement increase",
      platform: "Instagram",
      growth: "+1000%"
    }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Clipping",
      description: "Our advanced AI automatically identifies the most engaging moments in your content and creates perfect clips ready for social media.",
      gradient: "from-purple-neon to-electric-blue",
      benefits: ["Smart moment detection", "Auto highlight extraction", "Viral potential scoring"]
    },
    {
      icon: Wand2,
      title: "Smart Captions & Hashtags", 
      description: "Generate engaging captions, trending hashtags, and platform-specific descriptions that maximize reach and engagement.",
      gradient: "from-electric-blue to-lime-signal",
      benefits: ["Trending hashtag suggestions", "Platform optimization", "Engagement boosting"]
    },
    {
      icon: Target,
      title: "Multi-Platform Export",
      description: "Export optimized clips for TikTok, Instagram Reels, YouTube Shorts, and more with perfect aspect ratios and formatting.",
      gradient: "from-lime-signal to-purple-neon",
      benefits: ["Perfect aspect ratios", "Platform-specific formats", "One-click publishing"]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(Array.from(prev).concat(entry.target.id)))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-neon/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-electric-blue/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-lime-signal/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-neon to-electric-blue rounded-xl mr-3 flex items-center justify-center shadow-neon">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
                  XClips.ai
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="md">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="neon" size="md" icon={Upload} glow>
                  Join the Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-success/10 border border-success/20 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <Award className="w-5 h-5 text-success mr-2" />
              <span className="text-success font-medium">Trusted by 10,000+ creators worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in-up animation-delay-200">
              Turn Long Form to{' '}
              <span className="bg-gradient-to-r from-purple-neon via-electric-blue to-lime-signal bg-clip-text text-transparent animate-pulse-gradient">
                Viral Clips
              </span>{' '}
              <br />
              <span className="text-4xl md:text-6xl text-gray-400">in Seconds</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Upload your videos, podcasts, or streams. Our cutting-edge AI automatically finds the best moments,
              creates perfect clips, and generates viral captions that make your content explode across social media.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
              <Card variant="glass" padding="md" className="text-center">
                <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.5M+</div>
                <div className="text-sm text-gray-400">clips created</div>
              </Card>
              <Card variant="glass" padding="md" className="text-center">
                <Clock className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">30s</div>
                <div className="text-sm text-gray-400">average processing</div>
              </Card>
              <Card variant="glass" padding="md" className="text-center">
                <Star className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">satisfaction rate</div>
              </Card>
              <Card variant="glass" padding="md" className="text-center">
                <Rocket className="w-8 h-8 text-purple-neon mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">10x</div>
                <div className="text-sm text-gray-400">engagement boost</div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-800">
              <Link href="/signup">
                <Button 
                  variant="neon" 
                  size="xl" 
                  icon={Sparkles}
                  className="group shadow-2xl"
                  glow
                >
                  Start Creating Magic
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="xl"
                icon={Play}
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="border border-purple-neon/30 hover:border-purple-neon"
              >
                Watch Demo (2 min)
              </Button>
            </div>

            {/* Demo Video */}
            <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-1000">
              <Card 
                variant="neon" 
                padding="none" 
                className="overflow-hidden group cursor-pointer"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                <div className="aspect-video bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-neon/5 to-electric-blue/5" />
                  
                  {isVideoPlaying ? (
                    <div className="text-center z-10">
                      <div className="w-16 h-16 border-4 border-purple-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Demo video loading...</p>
                    </div>
                  ) : (
                    <div className="text-center z-10 group-hover:scale-105 transition-transform">
                      <div className="w-24 h-24 bg-purple-neon/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-neon/30 transition-colors border border-purple-neon/30 group-hover:border-purple-neon">
                        <Play className="w-12 h-12 text-purple-neon ml-1" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">See XClips.ai in Action</h3>
                      <p className="text-gray-400">Watch how AI transforms long content into viral clips</p>
                    </div>
                  )}

                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4 flex items-center bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                    LIVE DEMO
                  </div>
                  <div className="absolute top-4 right-4 bg-dark-card/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    2:15
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
                Dominate Social Media
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From upload to viral success, our AI-powered platform handles the entire workflow 
              so you can focus on what matters most - creating amazing content.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                variant="gradient" 
                hover 
                glow
                padding="lg" 
                className="text-center group animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-neon`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-neon transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Process Flow */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              How It Works - <span className="text-purple-neon">Simple as 1-2-3</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: 1, icon: Upload, title: "Upload Your Content", desc: "Drop your video, podcast, or stream" },
                { step: 2, icon: Bot, title: "AI Does the Magic", desc: "Our AI finds the best moments automatically" },
                { step: 3, icon: TrendingUp, title: "Share & Go Viral", desc: "Download optimized clips for any platform" }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-lime-signal rounded-full flex items-center justify-center text-dark-bg font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                  {index < 2 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-purple-neon/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-gradient-to-r from-purple-neon/5 via-transparent to-electric-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Loved by <span className="bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">Creators Worldwide</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of creators who are already using AI to amplify their content and grow their audience exponentially.
            </p>
          </div>

          {/* Featured Testimonial */}
          <Card variant="neon" padding="xl" glow className="max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-warning fill-current" />
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl text-white mb-8 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full flex items-center justify-center shadow-neon">
                  <span className="text-white font-bold text-lg">
                    {testimonials[currentTestimonial].avatar}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="bg-success/10 border border-success/20 rounded-full px-4 py-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-success mr-2" />
                  <span className="text-success font-medium">
                    {testimonials[currentTestimonial].metrics}
                  </span>
                </div>
                <div className="bg-purple-neon/10 border border-purple-neon/20 rounded-full px-4 py-2 flex items-center">
                  <BarChart3 className="w-4 h-4 text-purple-neon mr-2" />
                  <span className="text-purple-neon font-medium">
                    {testimonials[currentTestimonial].growth} growth
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-2 mb-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-purple-neon shadow-neon scale-125'
                    : 'bg-gray-600 hover:bg-purple-neon/50'
                }`}
              />
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2.5M+", label: "Clips Generated", icon: Scissors },
              { value: "50M+", label: "Total Views", icon: Eye },
              { value: "98%", label: "Creator Satisfaction", icon: Star },
              { value: "30s", label: "Average Processing", icon: Clock }
            ].map((stat, index) => (
              <Card key={index} variant="glass" padding="lg" className="text-center">
                <stat.icon className="w-8 h-8 text-purple-neon mx-auto mb-3" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-neon/10 via-transparent to-electric-blue/10" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Rocket className="w-16 h-16 text-purple-neon mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-6 text-white">
              Ready to Create Your First{' '}
              <span className="bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
                Viral Clip?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of creators who are already using AI to amplify their content, 
              grow their audience, and turn their passion into profit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button 
                variant="neon" 
                size="xl" 
                icon={Sparkles}
                className="group shadow-2xl"
                glow
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="ghost" size="xl" icon={Shield}>
              No Credit Card Required
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface/50 backdrop-blur-sm border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-neon to-electric-blue rounded-xl mr-3 flex items-center justify-center shadow-neon">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-neon to-electric-blue bg-clip-text text-transparent">
                XClips.ai
              </span>
            </div>
            <div className="flex space-x-8">
              <Link href="/login" className="text-gray-400 hover:text-purple-neon transition-colors font-medium">
                Login
              </Link>
              <Link href="/signup" className="text-gray-400 hover:text-purple-neon transition-colors font-medium">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-border text-center text-gray-400">
            <p>&copy; 2024 XClips.ai. All rights reserved. Built for creators, by creators. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
