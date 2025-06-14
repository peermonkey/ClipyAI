'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@xclips/ui';
import { 
  FilmIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  SparklesIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@xclips/ui/utils/cn';

// Navigation items
const navigationItems = [
  {
    name: 'Features',
    href: '/features',
    description: 'Powerful AI-driven video editing tools',
  },
  {
    name: 'Pricing',
    href: '/pricing',
    description: 'Simple, transparent pricing',
  },
  {
    name: 'About',
    href: '/about',
    description: 'Learn about our mission',
  },
  {
    name: 'Blog',
    href: '/blog',
    description: 'Tips and insights',
  },
];

// Dropdown menu items
const dropdownItems = [
  {
    name: 'Getting Started',
    href: '/docs/getting-started',
    description: 'Quick start guide',
    icon: <RocketLaunchIcon className="w-5 h-5" />,
  },
  {
    name: 'Documentation',
    href: '/docs',
    description: 'Complete API reference',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    name: 'Community',
    href: '/community',
    description: 'Join our community',
    icon: <UserGroupIcon className="w-5 h-5" />,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          isScrolled 
            ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-primary shadow-lg' 
            : 'bg-bg-primary/50 backdrop-blur-md'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-glow">
                  <FilmIcon className="w-5 h-5 text-white" />
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 w-8 h-8 bg-accent-blue rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200 blur-md" />
              </div>
              <span className="text-xl font-semibold text-white transition-colors duration-200 group-hover:text-accent-blue">
                ClippyAI.ai
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-text-secondary hover:text-white transition-colors duration-200 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
              
              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  Resources
                  <ChevronDownIcon 
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isResourcesOpen && 'rotate-180'
                    )} 
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={cn(
                    'absolute top-full left-0 mt-2 w-64 bg-bg-elevated border border-border-primary rounded-lg shadow-xl transition-all duration-200 origin-top',
                    isResourcesOpen 
                      ? 'opacity-100 scale-100 pointer-events-auto' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  )}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <div className="p-2">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-glass transition-colors duration-150 group"
                      >
                        <div className="p-1 bg-accent-blue-light text-accent-blue rounded group-hover:bg-accent-blue group-hover:text-white transition-colors duration-150">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className="text-xs text-text-tertiary">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="sm" className="relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Get started
                    <SparklesIcon className="w-4 h-4" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg-overlay backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed top-16 left-0 right-0 z-50 bg-bg-primary border-b border-border-primary transition-all duration-300 md:hidden',
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Navigation */}
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-text-secondary hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Resources */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-text-secondary">Resources</div>
            {dropdownItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 p-2 text-text-secondary hover:text-white hover:bg-bg-glass rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="text-accent-blue">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm">{item.name}</div>
                  <div className="text-xs text-text-tertiary">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 pt-4 border-t border-border-primary">
            <Link href="/login">
              <Button variant="ghost" fullWidth>
                Sign in
              </Button>
            </Link>
            <Link href="/upload">
              <Button fullWidth>
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
