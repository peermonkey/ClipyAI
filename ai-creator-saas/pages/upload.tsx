import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, Play, Loader, Link as LinkIcon, Sparkles, Wand2, Target, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function UploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState('')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file')
  const [urlInput, setUrlInput] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'podcast',
    language: 'en',
    targetPlatforms: ['tiktok', 'instagram'],
    clipLength: 'auto'
  })
  const [aiSuggestions, setAiSuggestions] = useState({
    title: '',
    contentType: '',
    tags: [] as string[]
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
      setFormData(prev => ({
        ...prev,
        title: acceptedFiles[0].name.replace(/\.[^/.]+$/, '') // Remove file extension
      }))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024 // 500MB
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadedFile) return

    setIsProcessing(true)
    setProcessingStep('Uploading file...')
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Create FormData for file upload
      const fileData = new FormData()
      fileData.append('file', uploadedFile)
      fileData.append('title', formData.title)
      fileData.append('description', formData.description)
      fileData.append('contentType', formData.contentType)
      fileData.append('language', formData.language)

      // Upload file
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fileData
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      const uploadResult = await uploadResponse.json()
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Start transcription
      setProcessingStep('Transcribing audio...')
      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          fileId: uploadResult.file.id,
          language: formData.language
        })
      })

      if (!transcribeResponse.ok) {
        throw new Error('Transcription failed')
      }

      setProcessingStep('Complete! Redirecting...')
      
      // Redirect to projects page after a short delay
      setTimeout(() => {
        window.location.href = `/projects/${uploadResult.project.id}`
      }, 2000)

    } catch (error) {
      console.error('Upload process failed:', error)
      setIsProcessing(false)
      setProcessingStep('')
      setUploadProgress(0)
      // Show error message
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFormData(prev => ({ ...prev, title: '' }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isProcessing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card-dark p-8 text-center">
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <Loader className="w-12 h-12 text-white animate-spin" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-purple-neon/20 animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            🎬 Creating Your Viral Clips
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            {processingStep}
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="progress-bar mb-4">
              <div
                className="progress-fill transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>0%</span>
              <span className="font-medium text-purple-neon">{uploadProgress}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-4 rounded-lg border ${uploadProgress > 30 ? 'border-lime-signal bg-lime-signal/10' : 'border-gray-600'}`}>
              <div className="flex items-center justify-center mb-2">
                {uploadProgress > 30 ? (
                  <CheckCircle className="w-6 h-6 text-lime-signal" />
                ) : (
                  <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                )}
              </div>
              <p className="text-sm font-medium text-white">Analyzing Audio</p>
              <p className="text-xs text-gray-400">AI is listening to your content</p>
            </div>

            <div className={`p-4 rounded-lg border ${uploadProgress > 60 ? 'border-lime-signal bg-lime-signal/10' : 'border-gray-600'}`}>
              <div className="flex items-center justify-center mb-2">
                {uploadProgress > 60 ? (
                  <CheckCircle className="w-6 h-6 text-lime-signal" />
                ) : (
                  <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                )}
              </div>
              <p className="text-sm font-medium text-white">Finding Highlights</p>
              <p className="text-xs text-gray-400">Identifying viral moments</p>
            </div>

            <div className={`p-4 rounded-lg border ${uploadProgress > 90 ? 'border-lime-signal bg-lime-signal/10' : 'border-gray-600'}`}>
              <div className="flex items-center justify-center mb-2">
                {uploadProgress > 90 ? (
                  <CheckCircle className="w-6 h-6 text-lime-signal" />
                ) : (
                  <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                )}
              </div>
              <p className="text-sm font-medium text-white">Creating Clips</p>
              <p className="text-xs text-gray-400">Generating final videos</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              ⏱️ This usually takes 2-5 minutes depending on file size
            </p>
            <p className="text-xs text-gray-500">
              Feel free to close this tab - we'll email you when it's ready!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create Your Next Viral Clip ✨
        </h1>
        <p className="text-gray-400">
          Upload your content and let AI find the most engaging moments for social media
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload Method Selection */}
        <div className="card-dark p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Upload Method</h2>
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setUploadMethod('file')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                uploadMethod === 'file'
                  ? 'border-purple-neon bg-purple-neon/10 text-white'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              <Upload className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Upload File</p>
              <p className="text-sm opacity-75">MP4, MOV, MP3, WAV</p>
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod('url')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                uploadMethod === 'url'
                  ? 'border-purple-neon bg-purple-neon/10 text-white'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              <LinkIcon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">From URL</p>
              <p className="text-sm opacity-75">YouTube, Vimeo, etc.</p>
            </button>
          </div>

          {uploadMethod === 'file' ? (
            !uploadedFile ? (
              <div
                {...getRootProps()}
                className={`upload-area cursor-pointer ${isDragActive ? 'drag-active' : ''}`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">
                  {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Supports MP4, MOV, MP3, WAV up to 500MB
                </p>
                <button
                  type="button"
                  className="btn-neon"
                >
                  Choose File
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-neon/20 rounded">
                    <File className="w-5 h-5 text-purple-neon" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{uploadedFile.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <input
                type="url"
                placeholder="Paste your video URL here (YouTube, Vimeo, etc.)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="input-dark w-full"
              />
              {urlInput && (
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-lime-signal" />
                  <span className="text-lime-signal">Valid URL detected</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Details */}
        {(uploadedFile || urlInput) && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Content Details</h2>
                    <button
                      type="button"
                      className="text-purple-neon hover:text-purple-400 text-sm flex items-center"
                    >
                      <Wand2 className="w-4 h-4 mr-1" />
                      AI Suggestions
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="input-dark w-full"
                        placeholder="Enter a catchy title for your content"
                        required
                      />
                      {aiSuggestions.title && (
                        <div className="mt-2 p-3 bg-purple-neon/10 border border-purple-neon/20 rounded-lg">
                          <p className="text-sm text-purple-neon mb-1">💡 AI Suggestion:</p>
                          <p className="text-sm text-gray-300">{aiSuggestions.title}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contentType" className="block text-sm font-medium text-gray-300 mb-2">
                          Content Type
                        </label>
                        <select
                          id="contentType"
                          value={formData.contentType}
                          onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value }))}
                          className="input-dark w-full"
                        >
                          <option value="podcast">🎙️ Podcast</option>
                          <option value="interview">🗣️ Interview</option>
                          <option value="tutorial">📚 Tutorial</option>
                          <option value="presentation">📊 Presentation</option>
                          <option value="webinar">💻 Webinar</option>
                          <option value="livestream">📺 Livestream</option>
                          <option value="other">🎬 Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
                          Language
                        </label>
                        <select
                          id="language"
                          value={formData.language}
                          onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                          className="input-dark w-full"
                        >
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="input-dark w-full h-24 resize-none"
                        placeholder="Brief description to help AI understand your content better"
                      />
                    </div>
                  </div>
                </div>

                {/* Target Platforms */}
                <div className="card-dark p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Target Platforms</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'tiktok', name: 'TikTok', icon: '📱', ratio: '9:16' },
                      { id: 'instagram', name: 'Instagram', icon: '📷', ratio: '9:16' },
                      { id: 'youtube', name: 'YouTube', icon: '📺', ratio: '16:9' },
                      { id: 'twitter', name: 'Twitter', icon: '🐦', ratio: '16:9' }
                    ].map((platform) => (
                      <label key={platform.id} className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.targetPlatforms.includes(platform.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                targetPlatforms: [...prev.targetPlatforms, platform.id]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                targetPlatforms: prev.targetPlatforms.filter(p => p !== platform.id)
                              }))
                            }
                          }}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-lg border-2 transition-all text-center ${
                          formData.targetPlatforms.includes(platform.id)
                            ? 'border-purple-neon bg-purple-neon/10 text-white'
                            : 'border-gray-600 text-gray-400 hover:border-gray-500'
                        }`}>
                          <div className="text-2xl mb-2">{platform.icon}</div>
                          <div className="font-medium text-sm">{platform.name}</div>
                          <div className="text-xs opacity-75">{platform.ratio}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Processing Options */}
                <div className="card-dark p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">⚡ Processing Options</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Clip Length
                      </label>
                      <select
                        value={formData.clipLength}
                        onChange={(e) => setFormData(prev => ({ ...prev, clipLength: e.target.value }))}
                        className="input-dark w-full"
                      >
                        <option value="auto">🤖 Auto (AI decides)</option>
                        <option value="short">⚡ Short (15-30s)</option>
                        <option value="medium">📱 Medium (30-60s)</option>
                        <option value="long">📺 Long (60-90s)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-electric-blue" />
                        <span className="text-sm font-medium text-white">Estimated Processing Time</span>
                      </div>
                      <p className="text-sm text-gray-400">2-5 minutes</p>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-lime-signal" />
                        <span className="text-sm font-medium text-white">Expected Clips</span>
                      </div>
                      <p className="text-sm text-gray-400">3-8 viral moments</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="card-dark p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">💡 Pro Tips</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-lime-signal mt-0.5 flex-shrink-0" />
                      <span>Clear audio gets better results</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-lime-signal mt-0.5 flex-shrink-0" />
                      <span>Longer content = more clip options</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-lime-signal mt-0.5 flex-shrink-0" />
                      <span>Descriptive titles help AI understand context</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-dark p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="text-sm text-gray-400">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Processing will take 2-5 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>You'll be notified when clips are ready</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-neon flex items-center text-lg px-8 py-4"
                  disabled={(!uploadedFile && !urlInput) || !formData.title}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Viral Clips
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
