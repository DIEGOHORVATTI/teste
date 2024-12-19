import { Elysia, t } from 'elysia'

import { uploadToS3 } from '@/services/upload/s3'

import { jwt } from '@/middlewares/jwt'

const router = new Elysia({ prefix: '/upload', tags: ['upload'] }).use(jwt).post(
  '/file',
  async ({ body: { file, filename, mimetype } }) => {
    const { url, key } = await uploadToS3(Buffer.from(await file.arrayBuffer()), filename, mimetype)

    return { url, key, message: 'Arquivo enviado com sucesso' }
  },
  {
    type: 'formdata',
    body: t.Object({
      file: t.File({
        maxSize: '5m',
        description: 'Arquivo formdata para upload em S3',
        types: ['image/jpeg', 'image/png', 'application/pdf']
      }),
      filename: t.String({ description: 'Nome do arquivo', default: 'file-name' }),
      mimetype: t.String({
        enum: ['image/jpeg', 'image/png', 'application/pdf'],
        default: 'image/jpeg',
        description:
          'Tipo do arquivo em mime type https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types'
      })
    }),
    detail: {
      description: 'Upload a file to S3',
      tags: ['upload']
    }
  }
)

export default router
