import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { EnvelopeIcon, ChatBubbleLeftRightIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Have questions? Need help? We're here to support your content creation journey.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <EnvelopeIcon className="w-6 h-6 text-accent-blue" />
                  <div>
                    <div className="text-white font-medium">Email Support</div>
                    <div className="text-text-secondary">support@clippyai.ai</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-accent-blue" />
                  <div>
                    <div className="text-white font-medium">Live Chat</div>
                    <div className="text-text-secondary">Available 24/7</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <PhoneIcon className="w-6 h-6 text-accent-blue" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-text-secondary">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPinIcon className="w-6 h-6 text-accent-blue" />
                  <div>
                    <div className="text-white font-medium">Address</div>
                    <div className="text-text-secondary">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-white focus:border-accent-blue focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-white focus:border-accent-blue focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-white focus:border-accent-blue focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-white focus:border-accent-blue focus:outline-none"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
