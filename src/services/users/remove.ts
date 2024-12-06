import { error } from 'elysia'

import { User } from '@/models/User'

export const deleteUserService = async (id: string) => {
  const domainExists = await User.findOne({ _id: id })

  if (!domainExists) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  return User.deleteOne({ _id: id })
}
