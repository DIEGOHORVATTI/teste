import { error } from 'elysia'

import { IUser, User } from '@/models/User'

export const updateUserService = async (id: string, { email, password }: Pick<IUser, 'email' | 'password'>) => {
  const newUser = await User.findById(id)

  if (!newUser) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    const isDifferentUser = existingUser?.id !== id

    if (isDifferentUser) {
      throw error('Conflict', { error: 'Esse e-mail já está em uso' })
    }

    newUser.email = email
  }

  if (password) {
    newUser.password = password
  }

  await newUser?.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao atualizar usuário' })
  })

  const { password: _password, ...user } = newUser.toObject()

  return { user }
}
