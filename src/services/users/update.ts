import { error } from 'elysia'

import { IUser, User } from '@/models/User'

import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@/services/upload/s3'
import { S3_BUCKET } from '@/constants/config'

export const updateUserService = async (id: string, { email, password, photo, ...restUser }: IUser['userSchema']) => {
  const user = await User.findById(id)
  if (!user) {
    throw error('Not Found', 'Usuário não encontrado')
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    if (existingUser && existingUser.id !== id) {
      throw error('Conflict', 'Esse e-mail já está em uso')
    }

    user.email = email
  }

  if (password) {
    user.password = password
  }

  // Handle photo update and old photo deletion
  if (photo && user.photo && photo !== user.photo) {
    const oldPhotoKey = user.photo.split('/').pop()

    if (oldPhotoKey) {
      await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: oldPhotoKey })).catch(err => {
        console.error('Error deleting old photo from S3:', err)

        throw error('Internal Server Error', { error: 'Erro ao deletar foto antiga' })
      })
    }
  }

  Object.assign(user, { photo, ...restUser })

  const updatedUser = await user.save().catch(err => {
    console.error('Error on update user', err)
    throw error('Internal Server Error', 'Erro ao atualizar usuário')
  })

  const { password: _, ...userWithoutPassword } = updatedUser.toObject()

  return { user: userWithoutPassword }
}
