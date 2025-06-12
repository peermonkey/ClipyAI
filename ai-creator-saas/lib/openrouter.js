import axios from 'axios'
import { getTextConfig } from './config.js'

let client = null

function getOpenRouterClient() {
  if (!client) {
    const config = getTextConfig()
    client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
        'X-Title': 'ClipMagic AI Creator SaaS'
      }
    })
  }
  return client
}

export async function generateCaption(clipText, platform = 'general', options = {}) {
  try {
    const client = getOpenRouterClient()
    const config = getTextConfig()
    
    const platformPrompts = {
      general: 'Create an engaging social media caption',
      tiktok: 'Create a viral TikTok caption with trending hashtags',
      instagram: 'Create an Instagram Reel caption with relevant hashtags',
      youtube: 'Create a YouTube Shorts title and description',
      twitter: 'Create a Twitter post with trending hashtags'
    }
    
    const prompt = `${platformPrompts[platform] || platformPrompts.general} for this content:

"${clipText}"

Requirements:
- Keep it engaging and viral-worthy
- Include relevant hashtags
- Match the tone of the content
- Make it platform-appropriate for ${platform}
- Include a call-to-action
- Maximum 2200 characters

Format your response as JSON:
{
  "caption": "Main caption text",
  "hashtags": ["hashtag1", "hashtag2"],
  "cta": "Call to action text"
}`

    const response = await client.post('/v1/chat/completions', {
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a viral content creation expert. Generate engaging captions and hashtags that maximize engagement and reach.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: config.temperature,
      max_tokens: 500
    })

    const content = response.data.choices[0].message.content
    
    try {
      const parsed = JSON.parse(content)
      return {
        success: true,
        caption: parsed.caption,
        hashtags: parsed.hashtags || [],
        cta: parsed.cta,
        platform
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        success: true,
        caption: content,
        hashtags: [],
        cta: '',
        platform
      }
    }

  } catch (error) {
    console.error('OpenRouter caption generation error:', error)
    return {
      success: false,
      error: error.message || 'Failed to generate caption'
    }
  }
}

export async function generateTitle(clipText, options = {}) {
  try {
    const client = getOpenRouterClient()
    const config = getTextConfig()
    
    const prompt = `Generate a catchy, viral-worthy title for this content:

"${clipText}"

Requirements:
- Maximum 60 characters
- Use power words and emotional triggers
- Make it clickable and shareable
- Include numbers or specific benefits when relevant
- Create urgency or curiosity

Generate 3 different title options and return as JSON:
{
  "titles": ["Title 1", "Title 2", "Title 3"],
  "recommended": "Title 1"
}`

    const response = await client.post('/v1/chat/completions', {
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a viral content title expert. Create titles that maximize click-through rates and engagement.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: config.temperature,
      max_tokens: 200
    })

    const content = response.data.choices[0].message.content
    
    try {
      const parsed = JSON.parse(content)
      return {
        success: true,
        titles: parsed.titles || [],
        recommended: parsed.recommended || parsed.titles?.[0] || 'Untitled Clip'
      }
    } catch (parseError) {
      return {
        success: true,
        titles: [content],
        recommended: content
      }
    }

  } catch (error) {
    console.error('OpenRouter title generation error:', error)
    return {
      success: false,
      error: error.message || 'Failed to generate title'
    }
  }
}

export async function generateTopicSuggestions(userType = 'general', options = {}) {
  try {
    const client = getOpenRouterClient()
    const config = getTextConfig()
    
    const prompt = `Generate 5 trending content topic suggestions for a ${userType} creator.

Requirements:
- Topics should be viral-worthy and engaging
- Include current trends and popular themes
- Make them specific and actionable
- Vary the content types (tutorials, reactions, tips, etc.)

Return as JSON:
{
  "topics": [
    {
      "title": "Topic title",
      "description": "Brief description",
      "type": "tutorial/reaction/tip/etc",
      "trending_score": 1-10
    }
  ]
}`

    const response = await client.post('/v1/chat/completions', {
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a content strategy expert who understands viral trends and audience engagement.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    })

    const content = response.data.choices[0].message.content
    
    try {
      const parsed = JSON.parse(content)
      return {
        success: true,
        topics: parsed.topics || []
      }
    } catch (parseError) {
      return {
        success: true,
        topics: []
      }
    }

  } catch (error) {
    console.error('OpenRouter topic generation error:', error)
    return {
      success: false,
      error: error.message || 'Failed to generate topics'
    }
  }
}
