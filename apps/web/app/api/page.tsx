import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CodeBracketIcon, KeyIcon, CloudArrowUpIcon, BellIcon } from '@heroicons/react/24/outline';

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/v1/upload',
    description: 'Upload a video file for processing',
    auth: 'Required',
    parameters: [
      { name: 'file', type: 'File', required: true, description: 'Video file to upload' },
      { name: 'title', type: 'String', required: false, description: 'Video title' },
      { name: 'description', type: 'String', required: false, description: 'Video description' }
    ]
  },
  {
    method: 'GET',
    endpoint: '/api/v1/videos/{id}',
    description: 'Get video processing status and results',
    auth: 'Required',
    parameters: [
      { name: 'id', type: 'String', required: true, description: 'Video ID from upload response' }
    ]
  },
  {
    method: 'GET',
    endpoint: '/api/v1/clips/{videoId}',
    description: 'Get all clips generated for a video',
    auth: 'Required',
    parameters: [
      { name: 'videoId', type: 'String', required: true, description: 'Video ID' },
      { name: 'limit', type: 'Number', required: false, description: 'Number of clips to return (default: 10)' }
    ]
  },
  {
    method: 'POST',
    endpoint: '/api/v1/export/{clipId}',
    description: 'Export a clip in specific format',
    auth: 'Required',
    parameters: [
      { name: 'clipId', type: 'String', required: true, description: 'Clip ID' },
      { name: 'format', type: 'String', required: true, description: 'Export format (mp4, mov, etc.)' },
      { name: 'resolution', type: 'String', required: false, description: 'Video resolution (720p, 1080p, 4k)' }
    ]
  }
];

const codeExamples = {
  upload: `// Upload a video
const formData = new FormData();
formData.append('file', videoFile);
formData.append('title', 'My Video');

const response = await fetch('/api/v1/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: formData
});

const result = await response.json();
console.log('Video ID:', result.videoId);`,

  status: `// Check processing status
const response = await fetch('/api/v1/videos/video_123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  }
});

const video = await response.json();
console.log('Status:', video.status);
console.log('Progress:', video.progress);`,

  clips: `// Get generated clips
const response = await fetch('/api/v1/clips/video_123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  }
});

const clips = await response.json();
clips.forEach(clip => {
  console.log('Clip:', clip.title);
  console.log('Viral Score:', clip.viralScore);
});`
};

export default function ApiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Integrate ClippyAI.ai's powerful video processing capabilities into your applications
            </p>
          </div>

          {/* Getting Started */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Getting Started</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <KeyIcon className="w-6 h-6 text-accent-blue" />
                  <h3 className="text-xl font-semibold text-white">1. Get API Key</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Generate your API key from the dashboard to authenticate your requests.
                </p>
                <a href="/dashboard/api-keys" className="text-accent-blue hover:text-accent-blue-hover">
                  Get API Key →
                </a>
              </div>

              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CloudArrowUpIcon className="w-6 h-6 text-accent-blue" />
                  <h3 className="text-xl font-semibold text-white">2. Upload Video</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Use the upload endpoint to send your video for AI processing.
                </p>
                <a href="#upload" className="text-accent-blue hover:text-accent-blue-hover">
                  View Example →
                </a>
              </div>

              <div className="bg-bg-surface border border-border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BellIcon className="w-6 h-6 text-accent-blue" />
                  <h3 className="text-xl font-semibold text-white">3. Get Results</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Poll for status or use webhooks to get notified when processing is complete.
                </p>
                <a href="#webhooks" className="text-accent-blue hover:text-accent-blue-hover">
                  Setup Webhooks →
                </a>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">API Endpoints</h2>
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="bg-bg-surface border border-border-primary rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-accent-blue font-mono">{endpoint.endpoint}</code>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                      {endpoint.auth}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-4">{endpoint.description}</p>
                  
                  <h4 className="font-semibold text-white mb-3">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-primary">
                          <th className="text-left py-2 text-white">Name</th>
                          <th className="text-left py-2 text-white">Type</th>
                          <th className="text-left py-2 text-white">Required</th>
                          <th className="text-left py-2 text-white">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-border-primary/50">
                            <td className="py-2 text-accent-blue font-mono">{param.name}</td>
                            <td className="py-2 text-text-secondary">{param.type}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                param.required ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td className="py-2 text-text-secondary">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Code Examples</h2>
            <div className="space-y-8">
              <div id="upload">
                <h3 className="text-xl font-semibold text-white mb-4">Upload Video</h3>
                <div className="bg-bg-elevated border border-border-primary rounded-xl p-6">
                  <pre className="text-text-secondary text-sm overflow-x-auto">
                    <code>{codeExamples.upload}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Check Status</h3>
                <div className="bg-bg-elevated border border-border-primary rounded-xl p-6">
                  <pre className="text-text-secondary text-sm overflow-x-auto">
                    <code>{codeExamples.status}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Get Clips</h3>
                <div className="bg-bg-elevated border border-border-primary rounded-xl p-6">
                  <pre className="text-text-secondary text-sm overflow-x-auto">
                    <code>{codeExamples.clips}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Rate Limits</h2>
            <div className="bg-bg-surface border border-border-primary rounded-xl p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-accent-blue mb-2">100</h3>
                  <p className="text-white font-medium">Requests per minute</p>
                  <p className="text-text-secondary text-sm">Free Plan</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-accent-blue mb-2">1,000</h3>
                  <p className="text-white font-medium">Requests per minute</p>
                  <p className="text-text-secondary text-sm">Pro Plan</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-accent-blue mb-2">Custom</h3>
                  <p className="text-white font-medium">Requests per minute</p>
                  <p className="text-text-secondary text-sm">Enterprise Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-blue/10 to-purple-500/10 border border-accent-blue/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need Help with Integration?
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Our team is here to help you integrate ClippyAI.ai into your application successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-hover transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a 
                  href="/docs" 
                  className="px-6 py-3 bg-transparent border border-border-primary text-white rounded-lg hover:border-accent-blue/50 transition-colors duration-200"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
