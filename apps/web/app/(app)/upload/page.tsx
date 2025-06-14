'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button } from '@xclips/ui';
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  PlayIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('video/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Simulate successful upload and redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upload Your Video
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Drop your long-form content here and watch AI transform it into viral clips optimized for every platform
            </p>
          </div>

          {!uploading ? (
            <>
              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-accent-blue bg-accent-blue/5' 
                    : 'border-border-primary hover:border-accent-blue/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <CloudArrowUpIcon className="w-16 h-16 text-accent-blue mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {dragActive ? 'Drop your video here' : 'Drag & drop your video'}
                </h3>
                <p className="text-text-secondary mb-6">
                  Or click to browse files
                </p>
                
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <Button variant="secondary">
                  Choose Files
                </Button>
                
                <div className="mt-8 text-sm text-text-tertiary">
                  <p>Supports MP4, MOV, AVI, MKV, WebM</p>
                  <p>Max file size: 5GB (Free) • 50GB (Pro)</p>
                </div>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div key={index} className="bg-bg-surface border border-border-primary rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PlayIcon className="w-8 h-8 text-accent-blue" />
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-text-secondary text-sm">
                              {formatFileSize(file.size)} • {file.type}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-text-secondary hover:text-red-400 transition-colors p-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleUpload}
                      className="px-8 py-3 group"
                    >
                      <span className="flex items-center gap-2">
                        Start Processing
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => setFiles([])}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}

              {/* Features Overview */}
              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">AI-Powered Analysis</h4>
                  <p className="text-text-secondary text-sm">
                    Our AI identifies the most engaging moments automatically
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <PlayIcon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Multiple Clips</h4>
                  <p className="text-text-secondary text-sm">
                    Generate 5-10 viral clips from each video upload
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <DocumentIcon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Smart Captions</h4>
                  <p className="text-text-secondary text-sm">
                    Auto-generated captions with perfect timing and styling
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Upload Progress */
            <div className="text-center">
              <div className="bg-bg-surface border border-border-primary rounded-2xl p-12">
                <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CloudArrowUpIcon className="w-8 h-8 text-accent-blue animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Processing Your Video
                </h3>
                <p className="text-text-secondary mb-8">
                  Our AI is analyzing your content and creating viral clips
                </p>

                <div className="max-w-md mx-auto">
                  <div className="bg-bg-primary rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-accent-blue to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-text-secondary text-sm">
                    {uploadProgress}% Complete
                  </p>
                </div>

                {uploadProgress === 100 && (
                  <div className="mt-8">
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                      <CheckIcon className="w-5 h-5" />
                      <span>Processing complete!</span>
                    </div>
                    <p className="text-text-secondary">
                      Redirecting to your dashboard...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-16 bg-bg-surface/50 border border-border-primary rounded-xl p-8">
            <div className="flex items-start gap-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-accent-blue flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Tips for Best Results</h4>
                <ul className="text-text-secondary space-y-1 text-sm">
                  <li>• Upload videos longer than 5 minutes for more clip options</li>
                  <li>• Ensure good audio quality for accurate transcription</li>
                  <li>• Videos with clear speech work best for caption generation</li>
                  <li>• Vertical videos (9:16) are optimized for TikTok and Instagram</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
