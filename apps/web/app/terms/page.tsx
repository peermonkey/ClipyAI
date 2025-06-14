import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DocumentTextIcon, ExclamationTriangleIcon, ShieldCheckIcon, ScaleIcon } from '@heroicons/react/24/outline';

const sections = [
  {
    title: 'Service Overview',
    icon: <DocumentTextIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'What ClippyAI.ai Provides',
        details: [
          'AI-powered video analysis and clip generation',
          'Automated caption creation and styling',
          'Multi-platform content optimization',
          'Cloud-based video processing and storage',
          'Analytics and performance tracking'
        ]
      },
      {
        subtitle: 'Account Requirements',
        details: [
          'You must be 18 years or older to use our service',
          'Provide accurate and complete registration information',
          'Maintain the security of your account credentials',
          'Accept responsibility for all activities under your account'
        ]
      }
    ]
  },
  {
    title: 'Acceptable Use',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Permitted Uses',
        details: [
          'Create clips from your own original content',
          'Process content you have rights to use',
          'Generate content for commercial or personal use',
          'Share and distribute your generated clips'
        ]
      },
      {
        subtitle: 'Prohibited Content',
        details: [
          'Copyrighted material without proper authorization',
          'Illegal, harmful, or offensive content',
          'Content that violates third-party rights',
          'Spam, malware, or malicious software',
          'Content promoting violence or discrimination'
        ]
      }
    ]
  },
  {
    title: 'Intellectual Property',
    icon: <ScaleIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Your Content Rights',
        details: [
          'You retain all rights to your original content',
          'You grant us license to process and analyze your content',
          'Generated clips belong to you upon creation',
          'You can delete your content at any time'
        ]
      },
      {
        subtitle: 'Our Technology Rights',
        details: [
          'ClippyAI.ai owns all rights to our AI technology',
          'Our algorithms and processing methods are proprietary',
          'You may not reverse engineer or copy our systems',
          'Feedback about our service may be used to improve it'
        ]
      }
    ]
  },
  {
    title: 'Payment & Billing',
    icon: <ExclamationTriangleIcon className="w-6 h-6" />,
    content: [
      {
        subtitle: 'Subscription Terms',
        details: [
          'Free plan includes limited features and usage',
          'Paid subscriptions auto-renew unless cancelled',
          'Prices may change with 30 days notice',
          'Refunds available within 30 days of purchase'
        ]
      },
      {
        subtitle: 'Usage Limits',
        details: [
          'Each plan has specific upload and processing limits',
          'Exceeding limits may result in additional charges',
          'Fair use policy applies to prevent abuse',
          'Commercial use may require enterprise licensing'
        ]
      }
    ]
  }
];

const importantNotices = [
  {
    title: 'Service Availability',
    content: 'We strive for 99.9% uptime but cannot guarantee uninterrupted service. Maintenance windows will be announced in advance.',
    type: 'info'
  },
  {
    title: 'Content Responsibility',
    content: 'You are solely responsible for ensuring you have rights to all content you upload. We may remove content that violates these terms.',
    type: 'warning'
  },
  {
    title: 'Data Retention',
    content: 'Original videos are automatically deleted after 30 days. Generated clips are stored indefinitely unless you delete them.',
    type: 'info'
  },
  {
    title: 'Limitation of Liability',
    content: 'Our liability is limited to the amount you paid for the service. We are not liable for indirect or consequential damages.',
    type: 'warning'
  }
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4">
              These terms govern your use of ClippyAI.ai. By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-text-tertiary">
              Last updated: December 15, 2024 • Effective: January 1, 2025
            </p>
          </div>

          {/* Important Notices */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Important Notices</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {importantNotices.map((notice, index) => (
                <div 
                  key={index} 
                  className={`border rounded-xl p-6 ${
                    notice.type === 'warning' 
                      ? 'bg-yellow-500/5 border-yellow-500/30' 
                      : 'bg-bg-surface border-border-primary'
                  }`}
                >
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    {notice.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />}
                    {notice.title}
                  </h4>
                  <p className="text-text-secondary text-sm">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Sections */}
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

          {/* Termination and Changes */}
          <div className="mt-16 space-y-8">
            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Account Termination</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-white mb-3">By You</h4>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>• Cancel your subscription anytime</li>
                    <li>• Download your data before termination</li>
                    <li>• Account deletion is permanent</li>
                    <li>• Refunds per our refund policy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">By Us</h4>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>• Violation of these terms</li>
                    <li>• Illegal or harmful activity</li>
                    <li>• Non-payment of fees</li>
                    <li>• 30 days notice when possible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Changes to Terms</h3>
              <div className="space-y-4 text-text-secondary">
                <p>
                  We may update these terms from time to time. When we make material changes, we will:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Notify you by email at least 30 days in advance</li>
                  <li>• Post the updated terms on our website</li>
                  <li>• Give you the opportunity to cancel if you disagree</li>
                  <li>• Continue under existing terms until the effective date</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact and Dispute Resolution */}
          <div className="mt-16 bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Questions or Disputes?
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-white mb-3">Contact Us First</h4>
                <p className="text-text-secondary text-sm mb-4">
                  Most issues can be resolved quickly through our support team. We're committed to working with you to find solutions.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 text-sm"
                >
                  Contact Support
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Legal Information</h4>
                <div className="space-y-2 text-text-secondary text-sm">
                  <p>These terms are governed by Delaware law.</p>
                  <p>Email: legal@clippyai.ai</p>
                  <p>Address: ClippyAI Inc., San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
