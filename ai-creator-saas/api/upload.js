import { requireAuth } from '../lib/auth.js'
import { query } from '../lib/db.js'
import { uploadFile, generateFileName } from '../lib/s3.js'
import { validateVideoFile } from '../lib/ffmpeg.js'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user

    // Check user's credit balance
    const users = query('SELECT credits_balance FROM users WHERE id = ?', [userId])
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = users[0]
    if (user.credits_balance < 10) { // Uploading costs 10 credits
      return res.status(400).json({ error: 'Insufficient credits. Upload requires 10 credits.' })
    }

    // Parse the form data
    const form = formidable({
      maxFileSize: 500 * 1024 * 1024, // 500MB limit
      multiples: false
    })

    const [fields, files] = await form.parse(req)
    
    const file = files.file?.[0]
    const topic = fields.topic?.[0] || 'Untitled'
    const contentType = fields.contentType?.[0] || 'video'

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Validate file type
    const allowedTypes = [
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv',
      'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac'
    ]
    
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload video (MP4, AVI, MOV) or audio (MP3, WAV, M4A) files.' 
      })
    }

    // Validate video file if it's a video
    if (file.mimetype.startsWith('video/')) {
      const validation = await validateVideoFile(file.filepath)
      if (!validation.valid) {
        return res.status(400).json({ 
          error: `Invalid video file: ${validation.error}`,
          details: validation.validations 
        })
      }
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath)
    
    // Generate S3 filename
    const s3FileName = generateFileName(file.originalFilename, userId)
    
    // Upload to S3
    const uploadResult = await uploadFile(fileBuffer, s3FileName, file.mimetype)
    
    if (!uploadResult.success) {
      return res.status(500).json({ error: 'Failed to upload file to storage' })
    }

    // Save file record to database
    const fileResult = query(
      `INSERT INTO files (user_id, filename, original_name, file_size, file_type, s3_key, s3_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        s3FileName,
        file.originalFilename,
        file.size,
        file.mimetype,
        uploadResult.key,
        uploadResult.url,
        'uploaded'
      ]
    )

    // Create project record
    const projectResult = query(
      `INSERT INTO projects (user_id, file_id, name, content_type, status) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, fileResult.insertId, topic, contentType, 'processing']
    )

    // Deduct credits
    query(
      'UPDATE users SET credits_balance = credits_balance - 10 WHERE id = ?',
      [userId]
    )

    // Log credit usage
    query(
      `INSERT INTO credit_usage (user_id, action, credits_used, file_id, description) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, 'upload', 10, fileResult.insertId, `Upload: ${file.originalFilename}`]
    )

    // Clean up temp file
    fs.unlinkSync(file.filepath)

    // Return success response
    res.status(200).json({
      message: 'File uploaded successfully!',
      file: {
        id: fileResult.insertId,
        originalName: file.originalFilename,
        size: file.size,
        type: file.mimetype,
        url: uploadResult.url
      },
      project: {
        id: projectResult.insertId,
        name: topic,
        contentType
      },
      creditsUsed: 10,
      remainingCredits: user.credits_balance - 10
    })

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed', details: error.message })
  }
}

export default requireAuth(handler)
