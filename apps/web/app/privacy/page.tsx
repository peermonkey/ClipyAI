import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const sections = [
  {
    title: 'Information We Collect',
    icon: <EyeIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Personal Information',
        details: [
          'Email address and name when you create an account',
          'Payment information when you subscribe to our services',
          'Profile information you choose to provide',
          'Communication preferences and settings'
        ]
      },
      {
        subtitle: 'Content Data',
        details: [
          'Videos you upload for processing',
          'Generated clips and captions',
          'Usage analytics and performance metrics',
          'Editing preferences and custom settings'
        ]
      },
      {
        subtitle: 'Technical Information',
        details: [
          'IP address and browser information',
          'Device type and operating system',
          'Usage patterns and feature interactions',
          'Error logs and performance data'
        ]
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: <LockClosedIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Service Provision',
        details: [
          'Process your videos and generate AI-powered clips',
          'Provide customer support and technical assistance',
          'Send important service updates and notifications',
          'Maintain and improve our AI algorithms'
        ]
      },
      {
        subtitle: 'Platform Improvement',
        details: [
          'Analyze usage patterns to enhance user experience',
          'Develop new features and capabilities',
          'Optimize AI performance and accuracy',
          'Conduct research and development activities'
        ]
      }
    ]
  },
  {
    title: 'Data Protection & Security',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Security Measures',
        details: [
          'End-to-end encryption for all video uploads',
          'SOC 2 Type II certified infrastructure',
          'Regular security audits and penetration testing',
          'Multi-factor authentication for account access'
        ]
      },
      {
        subtitle: 'Data Storage',
        details: [
          'Videos stored securely in AWS with encryption',
          'Automatic deletion of processed videos after 30 days',
          'Backup systems with geo-redundancy',
          'Access controls and audit logging'
        ]
      }
    ]
  },
  {
    title: 'Your Rights & Choices',
    icon: <UserGroupIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Data Control',
        details: [
          'Access and download your personal data',
          'Delete your account and associated data',
          'Opt-out of marketing communications',
          'Request data portability to other services'
        ]
      },
      {
        subtitle: 'Privacy Settings',
        details: [
          'Control who can see your generated clips',
          'Manage data sharing preferences',
          'Choose analytics and tracking settings',
          'Configure notification preferences'
        ]
      }
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4">
              We take your privacy seriously. This policy explains how ClippyAI.ai collects, uses, and protects your information.
            </p>
            <p className="text-sm text-text-tertiary">
              Last updated: December 15, 2024
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-2 bg-bg-surface border border-border-primary rounded-lg px-4 py-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-surface border border-border-primary rounded-lg px-4 py-2">
              <LockClosedIcon className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-surface border border-border-primary rounded-lg px-4 py-2">
              <EyeIcon className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">CCPA Compliant</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-accent-blue/10 text-accent-blue rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {item.subtitle}
                      </h3>
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3 text-text-secondary">
                            <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              We're committed to transparency. If you have any questions about this privacy policy or how we handle your data, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@clippyai.ai"
                className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200"
              >
                Contact Privacy Team
              </a>
              <a 
                href="/contact"
                className="px-6 py-3 bg-bg-surface border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200"
              >
                General Support
              </a>
            </div>
          </div>

          {/* Key Points Summary */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Key Privacy Points
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">🔒 Your Data is Secure</h4>
                <p className="text-text-secondary text-sm">
                  We use enterprise-grade encryption and security measures to protect your content and personal information.
                </p>
              </div>
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">🗑️ Automatic Deletion</h4>
                <p className="text-text-secondary text-sm">
                  Your original videos are automatically deleted from our servers after 30 days of processing.
                </p>
              </div>
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">👤 You Control Your Data</h4>
                <p className="text-text-secondary text-sm">
                  You can access, modify, or delete your data at any time through your account settings.
                </p>
              </div>
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">🚫 No Ads, No Tracking</h4>
                <p className="text-text-secondary text-sm">
                  We don't sell your data to advertisers or use it for tracking across other websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
