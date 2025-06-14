'use client';

import React from 'react';
import Link from 'next/link';
import { FilmIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@xclips/ui/utils/cn';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API', href: '/api' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help', href: '/help' },
    { name: 'Docs', href: '/docs' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/xclipsai', icon: '𝕏' },
  { name: 'GitHub', href: 'https://github.com/xclipsai', icon: '⚡' },
  { name: 'Discord', href: 'https://discord.gg/xclipsai', icon: '💬' },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-bg-primary border-t border-border-primary/50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/20 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <FilmIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-accent-blue transition-colors duration-200">
                Clippy.ai
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm">
              AI-powered video editing that transforms long-form content into viral clips optimized for every platform.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-bg-surface border border-border-primary flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all duration-200"
                  aria-label={link.name}
                >
                  <span className="text-sm">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links sections */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-primary/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            © 2024 Clippy.ai. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs">
            Made with ❤️ for content creators worldwide
          </p>
        </div>
      </div>
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 w-11 h-11 bg-accent-blue rounded-full text-white shadow-lg z-50 transition-all duration-300 hover:bg-accent-blue-hover hover:shadow-xl hover:scale-105",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUpIcon className="w-5 h-5 mx-auto" />
      </button>
    </footer>
  );
}
