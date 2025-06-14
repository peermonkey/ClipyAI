'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button } from '@xclips/ui';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16 flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to continue creating viral content
            </p>
          </div>

          <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button fullWidth variant="secondary" className="justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              <Button fullWidth variant="secondary" className="justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-primary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bg-surface text-text-secondary">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-white"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 text-accent-blue bg-bg-primary border-border-primary rounded focus:ring-accent-blue focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-accent-blue hover:text-accent-blue-hover">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                className="justify-center group"
              >
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Don't have an account?{' '}
                <Link href="/signup" className="text-accent-blue hover:text-accent-blue-hover font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-text-tertiary">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-accent-blue hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
