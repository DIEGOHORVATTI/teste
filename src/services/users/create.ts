import { error } from 'elysia'

import { IUser, User } from '@/models/User'

export const createUserService = async (data: IUser['userSchema']) => {
  const userInstance = new User(data)

  await userInstance.save().catch<MongoError>(err => {
    if (err?.keyValue?.email) {
      throw error('Conflict', { error: 'O usuário com este email já existe.' })
    }

    if (err?.keyValue?.document) {
      Object.keys(err.keyValue.document).forEach(key => {
        throw error('Conflict', { error: `O usuário com este ${key} já existe.` })
      })
    }

    throw error('Conflict', { error: 'Ocorreu um erro ao criar o usuário.', details: err })
  })

  const user = userInstance.toJSON()

  return { user }
}

type MongoError = MongoServerError<{ keyValue: Partial<IUser['userSchema']> }>
