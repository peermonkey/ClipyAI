import fs from 'fs'
import path from 'path'

let config = null

export function loadConfig() {
  if (!config) {
    try {
      const configPath = path.join(process.cwd(), 'config.json')
      const configFile = fs.readFileSync(configPath, 'utf8')
      config = JSON.parse(configFile)
      
      // Replace ENV placeholders with actual environment variables
      config = replaceEnvVariables(config)
    } catch (error) {
      console.error('Error loading config:', error)
      throw new Error('Failed to load configuration')
    }
  }
  return config
}

function replaceEnvVariables(obj) {
  if (typeof obj === 'string') {
    if (obj.startsWith('ENV.')) {
      const envVar = obj.replace('ENV.', '')
      return process.env[envVar] || obj
    }
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(replaceEnvVariables)
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceEnvVariables(value)
    }
    return result
  }
  
  return obj
}

export function getWhisperConfig() {
  const config = loadConfig()
  return config.whisper
}

export function getTextConfig() {
  const config = loadConfig()
  return config.text
}

export function getClipSettings() {
  const config = loadConfig()
  return config.clipSettings
}

export function getStripeConfig() {
  const config = loadConfig()
  return config.stripe
}
