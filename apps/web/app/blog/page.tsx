'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  MagnifyingGlassIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  FireIcon,
  SparklesIcon,
  BookOpenIcon,
  LightBulbIcon,
  TrophyIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@xclips/ui';

const blogCategories = [
  { id: 'all', name: 'All Posts', count: 24 },
  { id: 'tutorials', name: 'Tutorials', count: 8 },
  { id: 'tips', name: 'Tips & Tricks', count: 6 },
  { id: 'case-studies', name: 'Case Studies', count: 4 },
  { id: 'industry', name: 'Industry News', count: 3 },
  { id: 'features', name: 'New Features', count: 3 },
];

const featuredPosts = [
  {
    id: 'viral-secrets',
    title: '5 AI Secrets That Made My TikTok Go Viral',
    excerpt: 'Discover the AI-powered strategies that helped creators achieve millions of views using Clippy.ai\'s advanced algorithms.',
    author: 'Sarah Chen',
    authorAvatar: 'S',
    date: 'Dec 14, 2024',
    readTime: '8 min read',
    category: 'Tips & Tricks',
    thumbnail: 'featured',
    views: '25.3k',
    featured: true,
    tags: ['AI', 'TikTok', 'Viral', 'Strategy'],
  },
  {
    id: 'long-form-optimization',
    title: 'How to Optimize Your Long-Form Content for Maximum Clips',
    excerpt: 'Learn the best practices for structuring your podcasts and videos to generate the most engaging short-form clips.',
    author: 'Mike Rodriguez',
    authorAvatar: 'M',
    date: 'Dec 12, 2024',
    readTime: '6 min read',
    category: 'Tutorials',
    thumbnail: 'new',
    views: '18.7k',
    featured: false,
    tags: ['Podcasts', 'Optimization', 'Content Strategy'],
  },
];

const blogPosts = [
  {
    id: 'platform-specific',
    title: 'Platform-Specific Content: YouTube vs TikTok vs Instagram',
    excerpt: 'Understanding how to tailor your AI-generated clips for different social media platforms to maximize engagement.',
    author: 'Alex Johnson',
    authorAvatar: 'A',
    date: 'Dec 10, 2024',
    readTime: '7 min read',
    category: 'Tutorials',
    thumbnail: 'guide',
    views: '22.1k',
    tags: ['Multi-Platform', 'Social Media', 'Strategy'],
  },
  {
    id: 'caption-magic',
    title: 'Caption Magic: Writing Hooks That Convert',
    excerpt: 'Master the art of creating compelling captions and hooks that grab attention in the first 3 seconds.',
    author: 'Emma Davis',
    authorAvatar: 'E',
    date: 'Dec 8, 2024',
    readTime: '5 min read',
    category: 'Tips & Tricks',
    thumbnail: 'tips',
    views: '31.5k',
    tags: ['Captions', 'Hooks', 'Engagement'],
  },
  {
    id: 'creator-journey',
    title: 'From 0 to 1M Views: A Creator\'s Journey with AI',
    excerpt: 'Follow Sarah\'s transformation from struggling creator to viral sensation using Clippy.ai\'s advanced features.',
    author: 'Sarah Martinez',
    authorAvatar: 'S',
    date: 'Dec 6, 2024',
    readTime: '12 min read',
    category: 'Case Studies',
    thumbnail: 'case-study',
    views: '45.2k',
    tags: ['Success Story', 'Growth', 'AI Tools'],
  },
  {
    id: 'advanced-features',
    title: 'Advanced AI Features: Custom Styles and Branding',
    excerpt: 'Deep dive into Clippy.ai\'s advanced customization options to maintain consistent branding across all your clips.',
    author: 'David Kim',
    authorAvatar: 'D',
    date: 'Dec 4, 2024',
    readTime: '10 min read',
    category: 'Tutorials',
    thumbnail: 'tutorial',
    views: '19.8k',
    tags: ['Branding', 'Customization', 'Advanced'],
  },
  {
    id: 'ai-trends-2024',
    title: 'AI Video Editing Trends That Will Dominate 2025',
    excerpt: 'Stay ahead of the curve with the latest AI video editing trends and predictions for the coming year.',
    author: 'Lisa Thompson',
    authorAvatar: 'L',
    date: 'Dec 2, 2024',
    readTime: '8 min read',
    category: 'Industry News',
    thumbnail: 'trends',
    views: '33.7k',
    tags: ['Trends', 'Future', 'Industry'],
  },
  {
    id: 'monetization-guide',
    title: 'The Creator\'s Guide to Monetizing AI-Generated Content',
    excerpt: 'Learn proven strategies to turn your AI-powered clips into sustainable revenue streams.',
    author: 'Ryan Foster',
    authorAvatar: 'R',
    date: 'Nov 30, 2024',
    readTime: '11 min read',
    category: 'Tips & Tricks',
    thumbnail: 'monetization',
    views: '27.4k',
    tags: ['Monetization', 'Revenue', 'Business'],
  },
];

const thumbnailStyles: Record<string, string> = {
  featured: 'bg-gradient-to-br from-accent-blue/30 to-purple-500/30',
  new: 'bg-gradient-to-br from-green-500/30 to-blue-500/30',
  guide: 'bg-gradient-to-br from-purple-500/30 to-pink-500/30',
  tips: 'bg-gradient-to-br from-orange-500/30 to-red-500/30',
  'case-study': 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30',
  tutorial: 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30',
  trends: 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30',
  monetization: 'bg-gradient-to-br from-green-500/30 to-teal-500/30',
};

const categoryIcons: Record<string, any> = {
  'Tips & Tricks': LightBulbIcon,
  'Tutorials': BookOpenIcon,
  'Case Studies': TrophyIcon,
  'Industry News': FireIcon,
  'New Features': SparklesIcon,
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().replace(/\s+/g, '-').replace('&', '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-blue/10 px-4 py-2 rounded-full mb-6">
                <BookOpenIcon className="w-4 h-4 text-accent-blue" />
                <span className="text-accent-blue font-medium text-sm">Creator Resources</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Clippy.ai Blog
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Tips, insights, and best practices for content creators using AI-powered video editing.
                Learn from experts and grow your audience with proven strategies.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative mb-8">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search articles, tips, tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-bg-surface border border-border-primary rounded-2xl text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center">
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/25'
                        : 'bg-bg-surface border border-border-primary text-text-secondary hover:border-accent-blue/30 hover:text-white'
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 opacity-70">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FireIcon className="w-5 h-5 text-accent-blue" />
              <h2 className="text-xl font-bold text-white">Featured Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {featuredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group relative bg-bg-surface border border-border-primary rounded-xl overflow-hidden hover:border-accent-blue/30 hover:shadow-lg hover:shadow-accent-blue/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex">
                    {/* Compact Thumbnail */}
                    <div className={`w-32 h-24 ${thumbnailStyles[post.thumbnail]} relative flex-shrink-0`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          post.featured ? 'bg-accent-blue text-white' : 'bg-green-500 text-white'
                        }`}>
                          {post.featured ? '★' : 'New'}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <PlayIcon className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          {React.createElement(categoryIcons[post.category] || BookOpenIcon, {
                            className: "w-3 h-3 text-accent-blue"
                          })}
                          <span className="text-accent-blue text-xs font-medium">{post.category}</span>
                        </div>
                        <span className="text-text-tertiary text-xs">•</span>
                        <div className="flex items-center gap-1 text-text-tertiary text-xs">
                          <ClockIcon className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-3 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {post.authorAvatar}
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">{post.author}</p>
                            <p className="text-text-tertiary text-xs">{post.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-bg-primary/50 text-text-tertiary text-xs rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Articles' : `${blogCategories.find(c => c.id === selectedCategory)?.name} Articles`}
              </h2>
              <p className="text-text-secondary">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-bg-surface border border-border-primary rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300 hover:scale-105"
                >
                  <div className={`aspect-video ${thumbnailStyles[post.thumbnail]} relative`}>
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2">
                        {React.createElement(categoryIcons[post.category] || BookOpenIcon, {
                          className: "w-4 h-4 text-accent-blue"
                        })}
                        <span className="text-accent-blue text-sm font-medium">{post.category}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <PlayIcon className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-text-tertiary text-sm">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-bg-primary/50 text-text-tertiary text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 text-text-tertiary text-xs">
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.authorAvatar}
                      </div>
                      <span className="text-text-secondary text-sm">{post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <MagnifyingGlassIcon className="w-10 h-10 text-text-tertiary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button variant="secondary" onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                  View All Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-purple-500/5" />
              <div className="relative">
                <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SparklesIcon className="w-8 h-8 text-accent-blue" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Stay Ahead of the Curve
                </h3>
                <p className="text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join 50,000+ creators who receive our weekly newsletter with the latest AI tips, 
                  platform updates, and proven strategies to grow their audience.
                </p>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-6 py-4 bg-bg-surface border border-border-primary rounded-xl text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
                  />
                  <Button type="submit" className="px-8 py-4 shadow-lg shadow-accent-blue/25">
                    Subscribe Free
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </form>
                
                <p className="text-text-tertiary text-sm mt-4">
                  No spam, unsubscribe anytime. Read our <span className="text-accent-blue hover:underline cursor-pointer">privacy policy</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
