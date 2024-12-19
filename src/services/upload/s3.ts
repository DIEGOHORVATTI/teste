import { error } from 'elysia'

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY, S3_BUCKET } from '@/constants/config'

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
  },
  region: AWS_REGION
})

export const uploadToS3 = async (file: Buffer, fileName: string, mimetype: string) => {
  try {
    const key = `${Date.now()}-${fileName}`
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: mimetype
    }

    await s3.send(new PutObjectCommand(params))

    const url = `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`

    return { url, key }
  } catch (err) {
    console.error('Error uploading to S3:', err)
    throw error('Internal Server Error', { error: 'Failed to upload file to S3' })
  }
}
