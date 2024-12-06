import { error } from 'elysia'

import { User, IUser } from '@/models/User'

export const signService = async ({ email, password }: Pick<IUser, 'email' | 'password'>) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Unauthorized', { error: 'E-mail não cadastrado' })
  }

  const isValidPassword = await user.comparePassword(password)

  if (!isValidPassword) {
    throw error('Unauthorized', { error: 'Senha inválida' })
  }

  return user
}
