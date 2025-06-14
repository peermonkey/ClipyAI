import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';

const services = [
  { name: 'API', status: 'operational', uptime: '99.9%' },
  { name: 'Video Processing', status: 'operational', uptime: '99.8%' },
  { name: 'Web Dashboard', status: 'operational', uptime: '99.9%' },
  { name: 'File Upload', status: 'operational', uptime: '99.7%' },
  { name: 'Export Service', status: 'operational', uptime: '99.9%' }
];

export default function StatusPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Status
            </h1>
            <p className="text-xl text-text-secondary">
              Current status of ClippyAI.ai services
            </p>
          </div>

          <div className="bg-bg-surface border border-border-primary rounded-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
            </div>
            <p className="text-text-secondary">All services are running normally.</p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">{service.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">Operational</div>
                    <div className="text-text-secondary text-sm">{service.uptime} uptime</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
