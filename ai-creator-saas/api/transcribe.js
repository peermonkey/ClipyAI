import { requireAuth } from '../lib/auth.js'
import { query } from '../lib/db.js'
import { transcribeFromUrl } from '../lib/whisper.js'
import { extractInterestingSegments } from '../lib/whisper.js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user
    const { fileId } = req.body

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' })
    }

    // Check if file belongs to user
    const files = query('SELECT * FROM files WHERE id = ? AND user_id = ?', [fileId, userId])
    if (files.length === 0) {
      return res.status(404).json({ error: 'File not found' })
    }

    const file = files[0]

    // Check if transcription already exists
    const existingTranscriptions = query('SELECT * FROM transcriptions WHERE file_id = ?', [fileId])
    if (existingTranscriptions.length > 0) {
      return res.status(400).json({ error: 'File already transcribed' })
    }

    // Check user's credit balance
    const users = query('SELECT credits_balance FROM users WHERE id = ?', [userId])
    const user = users[0]
    if (user.credits_balance < 5) { // Transcription costs 5 credits
      return res.status(400).json({ error: 'Insufficient credits. Transcription requires 5 credits.' })
    }

    // Start transcription process
    const startTime = Date.now()

    // Update file status
    query('UPDATE files SET status = ? WHERE id = ?', ['transcribing', fileId])

    // Create initial transcription record
    const transcriptionResult = query(
      'INSERT INTO transcriptions (file_id, status) VALUES (?, ?)',
      [fileId, 'processing']
    )

    try {
      // Transcribe the audio/video
      const transcription = await transcribeFromUrl(file.s3_url)

      if (!transcription.success) {
        throw new Error(transcription.error)
      }

      const processingTime = Date.now() - startTime

      // Update transcription record with results
      query(
        `UPDATE transcriptions SET 
         transcript_text = ?, 
         language = ?, 
         confidence_score = ?, 
         processing_time = ?, 
         status = ? 
         WHERE id = ?`,
        [
          transcription.text,
          transcription.language,
          0.95, // Mock confidence score - Whisper doesn't provide this
          processingTime,
          'completed',
          transcriptionResult.insertId
        ]
      )

      // Extract interesting segments for clip generation
      const interestingSegments = extractInterestingSegments(
        transcription.segments || [],
        15, // min duration
        90  // max duration
      )

      // Create clip records for interesting segments
      const clipIds = []
      for (const segment of interestingSegments.slice(0, 5)) { // Max 5 clips initially
        const clipResult = query(
          `INSERT INTO clips (file_id, user_id, title, start_time, end_time, duration, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            fileId,
            userId,
            `Clip ${clipIds.length + 1}`, // Default title, can be improved with AI
            segment.start,
            segment.end,
            segment.duration,
            'pending'
          ]
        )
        clipIds.push(clipResult.insertId)
      }

      // Update file status
      query('UPDATE files SET status = ? WHERE id = ?', ['transcribed', fileId])

      // Update project status
      query('UPDATE projects SET status = ?, total_clips = ? WHERE file_id = ?', 
        ['transcribed', clipIds.length, fileId])

      // Deduct credits
      query('UPDATE users SET credits_balance = credits_balance - 5 WHERE id = ?', [userId])

      // Log credit usage
      query(
        `INSERT INTO credit_usage (user_id, action, credits_used, file_id, description) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, 'transcription', 5, fileId, `Transcription: ${file.original_name}`]
      )

      res.status(200).json({
        message: 'Transcription completed successfully!',
        transcription: {
          id: transcriptionResult.insertId,
          text: transcription.text,
          language: transcription.language,
          duration: transcription.duration,
          processingTime
        },
        clips: {
          count: clipIds.length,
          ids: clipIds
        },
        creditsUsed: 5,
        remainingCredits: user.credits_balance - 5
      })

    } catch (transcriptionError) {
      console.error('Transcription error:', transcriptionError)

      // Update transcription status to failed
      query(
        'UPDATE transcriptions SET status = ? WHERE id = ?',
        ['failed', transcriptionResult.insertId]
      )

      // Update file status
      query('UPDATE files SET status = ? WHERE id = ?', ['error', fileId])

      // Update project status
      query('UPDATE projects SET status = ? WHERE file_id = ?', ['error', fileId])

      res.status(500).json({
        error: 'Transcription failed',
        details: transcriptionError.message
      })
    }

  } catch (error) {
    console.error('Transcribe API error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

export default requireAuth(handler)
