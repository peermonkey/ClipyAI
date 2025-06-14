import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ClippyAI.ai Blog
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Tips, insights, and best practices for content creators using AI-powered video editing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured Blog Posts */}
            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-accent-blue font-semibold">Featured</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                5 AI Secrets That Made My TikTok Go Viral
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Discover the AI-powered strategies that helped creators achieve millions of views using ClippyAI.ai's advanced algorithms.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 14, 2024</span>
                <span>8 min read</span>
              </div>
            </article>

            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-green-400 font-semibold">New</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                How to Optimize Your Long-Form Content for Maximum Clips
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Learn the best practices for structuring your podcasts and videos to generate the most engaging short-form clips.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 12, 2024</span>
                <span>6 min read</span>
              </div>
            </article>

            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-purple-400 font-semibold">Guide</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Platform-Specific Content: YouTube vs TikTok vs Instagram
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Understanding how to tailor your AI-generated clips for different social media platforms to maximize engagement.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 10, 2024</span>
                <span>7 min read</span>
              </div>
            </article>

            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-orange-400 font-semibold">Tips</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Caption Magic: Writing Hooks That Convert
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Master the art of creating compelling captions and hooks that grab attention in the first 3 seconds.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 8, 2024</span>
                <span>5 min read</span>
              </div>
            </article>

            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-cyan-400 font-semibold">Case Study</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                From 0 to 1M Views: A Creator's Journey with AI
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Follow Sarah's transformation from struggling creator to viral sensation using ClippyAI.ai's advanced features.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 6, 2024</span>
                <span>12 min read</span>
              </div>
            </article>

            <article className="bg-bg-surface border border-border-primary rounded-xl p-6 hover:border-accent-blue/30 transition-colors duration-300">
              <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-yellow-400 font-semibold">Tutorial</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Advanced AI Features: Custom Styles and Branding
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Deep dive into ClippyAI.ai's advanced customization options to maintain consistent branding across all your clips.
              </p>
              <div className="flex items-center justify-between text-xs text-text-tertiary">
                <span>Dec 4, 2024</span>
                <span>10 min read</span>
              </div>
            </article>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest tips, trends, and insights in AI-powered content creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-white focus:border-accent-blue focus:outline-none"
                />
                <button className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
