import { requireAuth } from '../lib/auth.js'
import { query } from '../lib/db.js'
import { generateCaption } from '../lib/openrouter.js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user
    const { clipId, platform = 'general', regenerate = false } = req.body

    if (!clipId) {
      return res.status(400).json({ error: 'Clip ID is required' })
    }

    // Get clip and transcript details
    const clips = query(`
      SELECT c.*, t.transcript_text, f.original_name
      FROM clips c
      JOIN files f ON c.file_id = f.id
      LEFT JOIN transcriptions t ON f.id = t.file_id
      WHERE c.id = ? AND c.user_id = ?
    `, [clipId, userId])

    if (clips.length === 0) {
      return res.status(404).json({ error: 'Clip not found' })
    }

    const clip = clips[0]

    // Check if clip is completed
    if (clip.status !== 'completed') {
      return res.status(400).json({ error: 'Clip must be completed before repurposing' })
    }

    // Check if AI content already exists for this platform
    if (!regenerate) {
      const existingContent = query(`
        SELECT * FROM ai_content 
        WHERE clip_id = ? AND content_type = 'caption' AND platform = ?
      `, [clipId, platform])

      if (existingContent.length > 0) {
        return res.status(200).json({
          message: 'Content already exists',
          content: {
            id: existingContent[0].id,
            caption: existingContent[0].content_text,
            platform: existingContent[0].platform,
            createdAt: existingContent[0].created_at
          },
          isExisting: true
        })
      }
    }

    // Check user's credit balance
    const users = query('SELECT credits_balance FROM users WHERE id = ?', [userId])
    const user = users[0]
    if (user.credits_balance < 2) { // AI content generation costs 2 credits
      return res.status(400).json({ error: 'Insufficient credits. AI content generation requires 2 credits.' })
    }

    // Extract relevant text from transcript
    let clipText = clip.title || `Clip from ${clip.original_name}`
    
    if (clip.transcript_text) {
      // Rough estimation of clip text based on timestamps
      const totalDuration = clip.transcript_text.length / 10 // Assuming ~10 chars per second
      const startRatio = clip.start_time / totalDuration
      const endRatio = clip.end_time / totalDuration
      
      const startChar = Math.floor(startRatio * clip.transcript_text.length)
      const endChar = Math.floor(endRatio * clip.transcript_text.length)
      
      clipText = clip.transcript_text.substring(startChar, endChar).trim()
      
      // If extracted text is too short, use more context
      if (clipText.length < 50) {
        const contextStart = Math.max(0, startChar - 100)
        const contextEnd = Math.min(clip.transcript_text.length, endChar + 100)
        clipText = clip.transcript_text.substring(contextStart, contextEnd).trim()
      }
    }

    try {
      // Generate AI content
      const aiResult = await generateCaption(clipText, platform)

      if (!aiResult.success) {
        throw new Error(aiResult.error)
      }

      // Store the generated content
      const contentResult = query(`
        INSERT INTO ai_content (clip_id, content_type, platform, content_text, prompt_used, model_used) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        clipId,
        'caption',
        platform,
        JSON.stringify({
          caption: aiResult.caption,
          hashtags: aiResult.hashtags,
          cta: aiResult.cta
        }),
        `Generate ${platform} caption for: ${clipText.substring(0, 100)}...`,
        'gpt-4-turbo'
      ])

      // Store hashtags separately if they exist
      if (aiResult.hashtags && aiResult.hashtags.length > 0) {
        query(`
          INSERT INTO ai_content (clip_id, content_type, platform, content_text, model_used) 
          VALUES (?, ?, ?, ?, ?)
        `, [
          clipId,
          'hashtags',
          platform,
          JSON.stringify(aiResult.hashtags),
          'gpt-4-turbo'
        ])
      }

      // Deduct credits
      query('UPDATE users SET credits_balance = credits_balance - 2 WHERE id = ?', [userId])

      // Log credit usage
      query(`
        INSERT INTO credit_usage (user_id, action, credits_used, file_id, description) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'ai_content', 2, clip.file_id, `${platform} caption for: ${clip.title}`])

      res.status(200).json({
        message: 'AI content generated successfully!',
        content: {
          id: contentResult.insertId,
          caption: aiResult.caption,
          hashtags: aiResult.hashtags,
          cta: aiResult.cta,
          platform: platform
        },
        creditsUsed: 2,
        remainingCredits: user.credits_balance - 2
      })

    } catch (aiError) {
      console.error('AI content generation error:', aiError)
      res.status(500).json({
        error: 'AI content generation failed',
        details: aiError.message
      })
    }

  } catch (error) {
    console.error('Repurpose API error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

export default requireAuth(handler)
