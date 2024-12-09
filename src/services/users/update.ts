import { error } from 'elysia'

import { IUser, User } from '@/models/User'

type Props = Pick<IUser['userSchema'], 'email' | 'password'>

export const updateUserService = async (id: string, { email, password }: Props) => {
  const newUser = await User.findById(id)

  if (!newUser) {
    throw error('Not Found', 'Usuário não encontrado')
  }

  const existingUser = await User.findOne({ email }).catch(() => {
    throw error('Internal Server Error', 'Email inválido')
  })

  if (existingUser) {
    const isDifferentUser = existingUser.id !== id

    if (isDifferentUser) {
      throw error('Conflict', { error: 'Esse e-mail já está em uso' })
    }

    newUser.email = email
  }

  if (password) {
    newUser.password = password
  }

  await newUser.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao atualizar usuário' })
  })

  const { password: _password, ...user } = newUser.toObject()

  return { user }
}
