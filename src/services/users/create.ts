import { error } from 'elysia'

import { IUser, User } from '@/models/User'

export const createUserService = async (data: IUser['userSchema']) => {
  const userInstance = new User(data)

  await userInstance.save().catch<void, MongoError>(({ keyValue: { email, cpf } }) => {
    if (email) {
      throw error('Conflict', { error: 'O usuário com este email já existe.' })
    }

    if (cpf) {
      throw error('Conflict', { error: 'O usuário com este CPF já existe.' })
    }

    throw error('Conflict', { error: 'Ocorreu um erro ao criar o usuário.' })
  })

  const user = userInstance.toJSON()

  return { user }
}

type MongoError = MongoServerError<{ keyValue: IUser['userSchema'] }>
