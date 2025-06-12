import { requireAuth } from '../lib/auth.js'
import { query } from '../lib/db.js'
import { extractVideoClip, generateThumbnail } from '../lib/ffmpeg.js'
import { uploadFile, generateFileName } from '../lib/s3.js'
import { generateTitle } from '../lib/openrouter.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user
    const { clipId, options = {} } = req.body

    if (!clipId) {
      return res.status(400).json({ error: 'Clip ID is required' })
    }

    // Get clip details
    const clips = query(`
      SELECT c.*, f.s3_url, f.file_type, f.original_name, t.transcript_text
      FROM clips c
      JOIN files f ON c.file_id = f.id
      LEFT JOIN transcriptions t ON f.id = t.file_id
      WHERE c.id = ? AND c.user_id = ?
    `, [clipId, userId])

    if (clips.length === 0) {
      return res.status(404).json({ error: 'Clip not found' })
    }

    const clip = clips[0]

    // Check if clip is already processed
    if (clip.status === 'completed') {
      return res.status(400).json({ error: 'Clip already processed' })
    }

    // Check user's credit balance
    const users = query('SELECT credits_balance FROM users WHERE id = ?', [userId])
    const user = users[0]
    if (user.credits_balance < 3) { // Clip generation costs 3 credits
      return res.status(400).json({ error: 'Insufficient credits. Clip generation requires 3 credits.' })
    }

    // Update clip status to processing
    query('UPDATE clips SET status = ? WHERE id = ?', ['processing', clipId])

    try {
      // Create temporary directories
      const tempDir = path.join(os.tmpdir(), `clip_${clipId}_${Date.now()}`)
      fs.mkdirSync(tempDir, { recursive: true })

      // Download original file
      const originalResponse = await fetch(clip.s3_url)
      if (!originalResponse.ok) {
        throw new Error('Failed to download original file')
      }

      const originalPath = path.join(tempDir, `original_${clip.original_name}`)
      const originalBuffer = Buffer.from(await originalResponse.arrayBuffer())
      fs.writeFileSync(originalPath, originalBuffer)

      // Generate clip filename
      const clipExtension = clip.file_type.startsWith('video/') ? 'mp4' : 'mp3'
      const clipFilename = `clip_${clipId}_${Date.now()}.${clipExtension}`
      const clipPath = path.join(tempDir, clipFilename)

      let clipResult
      let thumbnailResult = null

      if (clip.file_type.startsWith('video/')) {
        // Extract video clip
        clipResult = await extractVideoClip(
          originalPath,
          clipPath,
          clip.start_time,
          clip.duration,
          {
            resolution: options.resolution || '1080x1920',
            fps: options.fps || 30
          }
        )

        // Generate thumbnail
        const thumbnailPath = path.join(tempDir, 'thumbnails')
        fs.mkdirSync(thumbnailPath, { recursive: true })
        
        try {
          thumbnailResult = await generateThumbnail(
            clipPath,
            thumbnailPath,
            '00:00:01'
          )
        } catch (thumbError) {
          console.warn('Thumbnail generation failed:', thumbError)
        }
      } else {
        // Extract audio clip
        const { extractAudioClip } = await import('../lib/ffmpeg.js')
        clipResult = await extractAudioClip(
          originalPath,
          clipPath,
          clip.start_time,
          clip.duration
        )
      }

      // Read generated clip
      const clipBuffer = fs.readFileSync(clipPath)

      // Upload clip to S3
      const s3ClipKey = generateFileName(clipFilename, userId)
      const uploadResult = await uploadFile(
        clipBuffer,
        s3ClipKey,
        clip.file_type.startsWith('video/') ? 'video/mp4' : 'audio/mp3'
      )

      if (!uploadResult.success) {
        throw new Error('Failed to upload clip to storage')
      }

      // Upload thumbnail if generated
      let thumbnailUrl = null
      if (thumbnailResult) {
        try {
          const thumbnailBuffer = fs.readFileSync(thumbnailResult.thumbnailPath)
          const thumbnailKey = generateFileName(`thumb_${clipId}.jpg`, userId)
          const thumbnailUpload = await uploadFile(thumbnailBuffer, thumbnailKey, 'image/jpeg')
          
          if (thumbnailUpload.success) {
            thumbnailUrl = thumbnailUpload.url
          }
        } catch (thumbUploadError) {
          console.warn('Thumbnail upload failed:', thumbUploadError)
        }
      }

      // Generate AI title if transcript is available
      let aiTitle = `Clip ${clipId}`
      if (clip.transcript_text) {
        try {
          const clipText = clip.transcript_text.substring(
            Math.floor(clip.start_time * 10), // Rough character estimation
            Math.floor(clip.end_time * 10)
          )
          
          if (clipText.length > 20) {
            const titleResult = await generateTitle(clipText)
            if (titleResult.success && titleResult.recommended) {
              aiTitle = titleResult.recommended
            }
          }
        } catch (titleError) {
          console.warn('AI title generation failed:', titleError)
        }
      }

      // Update clip record
      query(`
        UPDATE clips SET 
          title = ?,
          s3_key = ?, 
          s3_url = ?, 
          thumbnail_url = ?, 
          status = ?
        WHERE id = ?
      `, [
        aiTitle,
        uploadResult.key,
        uploadResult.url,
        thumbnailUrl,
        'completed',
        clipId
      ])

      // Deduct credits
      query('UPDATE users SET credits_balance = credits_balance - 3 WHERE id = ?', [userId])

      // Log credit usage
      query(`
        INSERT INTO credit_usage (user_id, action, credits_used, file_id, description) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'clip_generation', 3, clip.file_id, `Clip generation: ${aiTitle}`])

      // Clean up temp files
      fs.rmSync(tempDir, { recursive: true, force: true })

      res.status(200).json({
        message: 'Clip generated successfully!',
        clip: {
          id: clipId,
          title: aiTitle,
          url: uploadResult.url,
          thumbnailUrl,
          duration: clip.duration,
          startTime: clip.start_time,
          endTime: clip.end_time
        },
        creditsUsed: 3,
        remainingCredits: user.credits_balance - 3
      })

    } catch (processingError) {
      console.error('Clip processing error:', processingError)

      // Update clip status to failed
      query('UPDATE clips SET status = ? WHERE id = ?', ['failed', clipId])

      res.status(500).json({
        error: 'Clip generation failed',
        details: processingError.message
      })
    }

  } catch (error) {
    console.error('Clip API error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

export default requireAuth(handler)
