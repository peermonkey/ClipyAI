import ffmpeg from 'fluent-ffmpeg'
import { getClipSettings } from './config.js'

export async function extractAudioClip(inputPath, outputPath, startTime, duration) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .seekInput(startTime)
      .duration(duration)
      .audioCodec('libmp3lame')
      .audioBitrate('128k')
      .format('mp3')
      .on('end', () => {
        resolve({
          success: true,
          outputPath,
          startTime,
          duration
        })
      })
      .on('error', (err) => {
        console.error('FFmpeg audio extraction error:', err)
        reject({
          success: false,
          error: err.message
        })
      })
      .save(outputPath)
  })
}

export async function extractVideoClip(inputPath, outputPath, startTime, duration, options = {}) {
  return new Promise((resolve, reject) => {
    const settings = getClipSettings()
    
    // Ensure duration is within limits
    const clampedDuration = Math.max(settings.minDuration, Math.min(duration, settings.maxDuration))
    
    let command = ffmpeg(inputPath)
      .seekInput(startTime)
      .duration(clampedDuration)
      .videoCodec('libx264')
      .audioCodec('aac')
      .format('mp4')
      
    // Apply video options
    if (options.resolution) {
      command = command.size(options.resolution)
    } else {
      command = command.size('1080x1920') // Default to vertical format for social media
    }
    
    if (options.fps) {
      command = command.fps(options.fps)
    } else {
      command = command.fps(30)
    }
    
    // Add filters for better quality
    command = command.videoFilters([
      'scale=1080:1920:force_original_aspect_ratio=increase',
      'crop=1080:1920'
    ])
    
    command
      .on('progress', (progress) => {
        console.log(`Processing: ${Math.round(progress.percent)}% done`)
      })
      .on('end', () => {
        resolve({
          success: true,
          outputPath,
          startTime,
          duration: clampedDuration,
          resolution: options.resolution || '1080x1920'
        })
      })
      .on('error', (err) => {
        console.error('FFmpeg video extraction error:', err)
        reject({
          success: false,
          error: err.message
        })
      })
      .save(outputPath)
  })
}

export async function getVideoInfo(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('FFprobe error:', err)
        reject({
          success: false,
          error: err.message
        })
        return
      }
      
      const videoStream = metadata.streams.find(stream => stream.codec_type === 'video')
      const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio')
      
      resolve({
        success: true,
        duration: metadata.format.duration,
        size: metadata.format.size,
        bitrate: metadata.format.bit_rate,
        video: videoStream ? {
          codec: videoStream.codec_name,
          width: videoStream.width,
          height: videoStream.height,
          fps: eval(videoStream.r_frame_rate), // Convert fraction to decimal
          bitrate: videoStream.bit_rate
        } : null,
        audio: audioStream ? {
          codec: audioStream.codec_name,
          sampleRate: audioStream.sample_rate,
          channels: audioStream.channels,
          bitrate: audioStream.bit_rate
        } : null
      })
    })
  })
}

export async function generateThumbnail(inputPath, outputPath, timeOffset = '00:00:01') {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .screenshots({
        timestamps: [timeOffset],
        filename: 'thumbnail.jpg',
        folder: outputPath,
        size: '480x270'
      })
      .on('end', () => {
        resolve({
          success: true,
          thumbnailPath: `${outputPath}/thumbnail.jpg`
        })
      })
      .on('error', (err) => {
        console.error('Thumbnail generation error:', err)
        reject({
          success: false,
          error: err.message
        })
      })
  })
}

export function validateVideoFile(filePath, maxSizeMB = 500) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject({
          valid: false,
          error: 'Invalid video file'
        })
        return
      }
      
      const duration = metadata.format.duration
      const sizeBytes = metadata.format.size
      const sizeMB = sizeBytes / (1024 * 1024)
      
      const validations = {
        validDuration: duration > 0 && duration <= 3600, // Max 1 hour
        validSize: sizeMB <= maxSizeMB,
        hasVideo: metadata.streams.some(stream => stream.codec_type === 'video'),
        hasAudio: metadata.streams.some(stream => stream.codec_type === 'audio')
      }
      
      const isValid = Object.values(validations).every(v => v)
      
      resolve({
        valid: isValid,
        duration,
        sizeMB,
        validations,
        metadata: {
          duration,
          size: sizeBytes,
          streams: metadata.streams.length
        }
      })
    })
  })
}
