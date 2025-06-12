import { requireAuth } from '../../lib/auth.js'
import { query } from '../../lib/db.js'

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user

    // Get user's credit balance and usage history
    const users = query(`
      SELECT credits_balance, subscription_plan 
      FROM users 
      WHERE id = ?
    `, [userId])

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = users[0]

    // Get recent credit usage history (last 30 days)
    const usageHistory = query(`
      SELECT action, credits_used, description, created_at 
      FROM credit_usage 
      WHERE user_id = ? 
      AND created_at >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 DAY)
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId])

    // Calculate usage stats
    const usageStats = query(`
      SELECT 
        SUM(credits_used) as total_used_30_days,
        SUM(CASE WHEN action = 'upload' THEN credits_used ELSE 0 END) as upload_credits,
        SUM(CASE WHEN action = 'transcription' THEN credits_used ELSE 0 END) as transcription_credits,
        SUM(CASE WHEN action = 'clip_generation' THEN credits_used ELSE 0 END) as clip_credits,
        SUM(CASE WHEN action = 'ai_content' THEN credits_used ELSE 0 END) as ai_content_credits
      FROM credit_usage 
      WHERE user_id = ? 
      AND created_at >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 DAY)
    `, [userId])

    const stats = usageStats[0] || {
      total_used_30_days: 0,
      upload_credits: 0,
      transcription_credits: 0,
      clip_credits: 0,
      ai_content_credits: 0
    }

    res.status(200).json({
      balance: user.credits_balance,
      subscriptionPlan: user.subscription_plan,
      usage: {
        totalUsedLast30Days: stats.total_used_30_days,
        breakdown: {
          uploads: stats.upload_credits,
          transcriptions: stats.transcription_credits,
          clips: stats.clip_credits,
          aiContent: stats.ai_content_credits
        },
        history: usageHistory
      }
    })

  } catch (error) {
    console.error('Credit balance error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

export default requireAuth(handler)
