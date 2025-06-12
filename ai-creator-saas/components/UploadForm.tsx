import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, Link, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'
import Input from './ui/Input'

interface UploadFormProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  isProcessing?: boolean
  uploadProgress?: number
}

export default function UploadForm({ 
  onFileSelect, 
  selectedFile, 
  isProcessing = false,
  uploadProgress = 0 
}: UploadFormProps) {
  const [urlInput, setUrlInput] = useState('')
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      console.log('Rejected files:', rejectedFiles)
    }
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.flac']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024, // 500MB
    disabled: isProcessing
  })

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      console.log('URL submitted:', urlInput)
      // Handle URL processing logic here
    }
  }

  const removeFile = () => {
    onFileSelect(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeIcon = (file: File) => {
    if (file.type.startsWith('video/')) return '🎥'
    if (file.type.startsWith('audio/')) return '🎵'
    return '📄'
  }

  return (
    <div className="space-y-8">
      {/* Upload Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-dark-card border border-dark-border rounded-xl p-1 flex">
          <button
            onClick={() => setUploadMode('file')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              uploadMode === 'file'
                ? 'bg-purple-neon text-white shadow-neon'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setUploadMode('url')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              uploadMode === 'url'
                ? 'bg-purple-neon text-white shadow-neon'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Link className="w-4 h-4 inline mr-2" />
            Use URL
          </button>
        </div>
      </div>

      {uploadMode === 'file' && (
        <Card variant="gradient" padding="lg" className="animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-purple-neon/20 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-purple-neon" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Upload Your Content</h2>
            <p className="text-gray-400">Transform your videos and audio into viral clips</p>
          </div>
          
          {!selectedFile ? (
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                ${isDragActive && !isDragReject 
                  ? 'border-purple-neon bg-purple-neon/5 animate-pulse-neon' 
                  : isDragReject
                  ? 'border-error bg-error/5'
                  : 'border-gray-600 hover:border-purple-neon/50 hover:bg-purple-neon/5'
                }
              `}
            >
              <input {...getInputProps()} />
              
              <div className={`transform transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                {isDragReject ? (
                  <AlertCircle className="w-16 h-16 text-error mx-auto mb-4 animate-bounce" />
                ) : (
                  <Upload className={`w-16 h-16 mx-auto mb-4 ${
                    isDragActive ? 'text-purple-neon animate-bounce' : 'text-gray-400'
                  }`} />
                )}
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragActive 
                    ? isDragReject 
                      ? 'File type not supported' 
                      : 'Drop your file here' 
                    : 'Drag & drop your file here'
                  }
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {isDragReject 
                    ? 'Please select a valid video or audio file'
                    : 'Supports MP4, MOV, AVI, MP3, WAV up to 500MB'
                  }
                </p>
                
                <Button 
                  variant="neon" 
                  size="lg" 
                  icon={Upload}
                  disabled={isProcessing}
                  className="animate-pulse-neon"
                >
                  Choose File
                </Button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-purple-neon/20 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-electric-blue/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-between p-6 bg-dark-surface border border-purple-neon/30 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-purple-neon/20 rounded-xl">
                    <span className="text-2xl">{getFileTypeIcon(selectedFile)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium truncate max-w-xs">
                      {selectedFile.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-success mr-1" />
                      <span className="text-success text-sm">Ready to process</span>
                    </div>
                  </div>
                </div>
                
                {!isProcessing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={X}
                    onClick={removeFile}
                    className="text-gray-400 hover:text-error"
                  />
                )}
              </div>

              {/* Upload Progress */}
              {isProcessing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing...</span>
                    <span className="text-white">{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full transition-all duration-300 animate-pulse"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {uploadMode === 'url' && (
        <Card variant="glass" padding="lg" className="animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-electric-blue/20 rounded-full mb-4">
              <Link className="w-8 h-8 text-electric-blue" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Import from URL</h2>
            <p className="text-gray-400">Paste a link to your content</p>
          </div>

          <form onSubmit={handleUrlSubmit} className="space-y-6">
            <Input
              label="Content URL"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
              icon={Link}
              disabled={isProcessing}
              variant="neon"
              helperText="Supports YouTube, Vimeo, and direct media links"
            />
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="neon"
                size="lg"
                icon={Sparkles}
                disabled={!urlInput.trim() || isProcessing}
                loading={isProcessing}
                className="flex-1"
              >
                Import Content
              </Button>
              
              {urlInput && (
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  icon={X}
                  onClick={() => setUrlInput('')}
                  disabled={isProcessing}
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {/* Tips */}
      <Card variant="default" padding="md" className="bg-gradient-to-r from-purple-neon/5 to-electric-blue/5 border-purple-neon/20">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-neon/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-neon" />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Pro Tips</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Longer content (10+ minutes) produces better clips</li>
              <li>• Clear audio helps AI identify key moments</li>
              <li>• Vertical videos work great for social platforms</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
