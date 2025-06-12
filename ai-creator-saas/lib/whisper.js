import OpenAI from 'openai'
import { getWhisperConfig } from './config.js'

let openai = null

function getOpenAIClient() {
  if (!openai) {
    const config = getWhisperConfig()
    openai = new OpenAI({
      apiKey: config.apiKey
    })
  }
  return openai
}

export async function transcribeAudio(audioBuffer, options = {}) {
  try {
    const client = getOpenAIClient()
    
    // Create a file-like object from buffer
    const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' })
    
    const transcription = await client.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: options.language || 'en',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment']
    })

    return {
      success: true,
      text: transcription.text,
      segments: transcription.segments || [],
      language: transcription.language,
      duration: transcription.duration
    }
  } catch (error) {
    console.error('Whisper transcription error:', error)
    return {
      success: false,
      error: error.message || 'Transcription failed'
    }
  }
}

export async function transcribeFromUrl(audioUrl, options = {}) {
  try {
    // Download the audio file
    const response = await fetch(audioUrl)
    if (!response.ok) {
      throw new Error('Failed to download audio file')
    }
    
    const audioBuffer = await response.arrayBuffer()
    return await transcribeAudio(audioBuffer, options)
  } catch (error) {
    console.error('Audio download error:', error)
    return {
      success: false,
      error: error.message || 'Failed to download and transcribe audio'
    }
  }
}

export function extractInterestingSegments(segments, minDuration = 15, maxDuration = 90) {
  const interestingSegments = []
  
  // Simple algorithm to find engaging segments
  // This can be enhanced with more sophisticated AI analysis
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const duration = segment.end - segment.start
    
    // Check if segment is within duration limits
    if (duration >= minDuration && duration <= maxDuration) {
      // Look for segments with certain keywords or high energy
      const text = segment.text.toLowerCase()
      const hasEngagingWords = /\b(amazing|incredible|wow|unbelievable|secret|tip|trick|hack|viral|trending)\b/.test(text)
      const hasQuestions = /\?/.test(text)
      const hasExclamation = /!/.test(text)
      
      if (hasEngagingWords || hasQuestions || hasExclamation) {
        interestingSegments.push({
          start: segment.start,
          end: segment.end,
          text: segment.text,
          duration: duration,
          score: calculateEngagementScore(segment)
        })
      }
    }
  }
  
  // Sort by engagement score
  return interestingSegments.sort((a, b) => b.score - a.score).slice(0, 10)
}

function calculateEngagementScore(segment) {
  let score = 0
  const text = segment.text.toLowerCase()
  
  // Keyword scoring
  const engagingWords = ['amazing', 'incredible', 'wow', 'unbelievable', 'secret', 'tip', 'trick', 'hack']
  engagingWords.forEach(word => {
    if (text.includes(word)) score += 2
  })
  
  // Punctuation scoring
  if (text.includes('?')) score += 1
  if (text.includes('!')) score += 1
  
  // Length preference (not too short, not too long)
  const duration = segment.end - segment.start
  if (duration >= 20 && duration <= 60) score += 1
  
  return score
}
