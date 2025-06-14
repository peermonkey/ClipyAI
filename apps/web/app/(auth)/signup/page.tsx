'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button } from '@xclips/ui';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    marketingEmails: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    // TODO: Implement actual signup logic
    console.log('Signup attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16 flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-text-secondary">
              Join thousands of creators making viral content with AI
            </p>
          </div>

          <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
            {/* Social Signup */}
            <div className="space-y-3 mb-6">
              <Button fullWidth variant="secondary" className="justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>
              <Button fullWidth variant="secondary" className="justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign up with Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-primary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bg-surface text-text-secondary">Or create account with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  placeholder="john@example.com"
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
                    placeholder="Create a strong password"
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-bg-primary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength())}`}
                          style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">{getStrengthText(passwordStrength())}</span>
                    </div>
                    <div className="text-xs text-text-tertiary">
                      Use 8+ characters with uppercase, lowercase, numbers, and symbols
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 bg-bg-primary border border-border-primary rounded-lg text-white placeholder-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-accent-blue bg-bg-primary border-border-primary rounded focus:ring-accent-blue focus:ring-2 mt-0.5"
                  />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    I agree to the{' '}
                    <Link href="/terms" className="text-accent-blue hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                
                <label className="flex items-start gap-3">
                  <input
                    name="marketingEmails"
                    type="checkbox"
                    checked={formData.marketingEmails}
                    onChange={handleChange}
                    className="w-4 h-4 text-accent-blue bg-bg-primary border-border-primary rounded focus:ring-accent-blue focus:ring-2 mt-0.5"
                  />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    Send me product updates, tips, and special offers (optional)
                  </span>
                </label>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                disabled={!formData.acceptTerms || formData.password !== formData.confirmPassword}
                className="justify-center group"
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Already have an account?{' '}
                <Link href="/login" className="text-accent-blue hover:text-accent-blue-hover font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-bg-surface/50 border border-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 text-center">Why join ClippyAI.ai?</h3>
            <div className="space-y-3">
              {[
                'Generate viral clips in minutes with AI',
                'Export optimized content for all platforms',
                'Join a community of successful creators',
                'Free plan includes 5 video uploads'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
