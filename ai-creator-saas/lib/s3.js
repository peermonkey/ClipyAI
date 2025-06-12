import AWS from 'aws-sdk'

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
})

const s3 = new AWS.S3()
const bucketName = process.env.S3_BUCKET_NAME

export async function uploadFile(buffer, fileName, contentType) {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read'
    }

    const result = await s3.upload(uploadParams).promise()
    
    return {
      success: true,
      url: result.Location,
      key: result.Key
    }
  } catch (error) {
    console.error('S3 upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function deleteFile(key) {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: key
    }

    await s3.deleteObject(deleteParams).promise()
    
    return {
      success: true
    }
  } catch (error) {
    console.error('S3 delete error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function generateSignedUrl(key, expiresIn = 3600) {
  try {
    const url = await s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: key,
      Expires: expiresIn
    })

    return {
      success: true,
      url
    }
  } catch (error) {
    console.error('S3 signed URL error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export function generateFileName(originalName, userId) {
  const timestamp = Date.now()
  const extension = originalName.split('.').pop()
  const cleanName = originalName.replace(/[^a-zA-Z0-9.]/g, '_')
  
  return `uploads/${userId}/${timestamp}_${cleanName}`
}
