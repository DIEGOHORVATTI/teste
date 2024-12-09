import { error } from 'elysia'

import { User } from '@/models/User'

export const getOneUserUseCase = async (useId: string) => {
  const user = await User.findById(useId).select('-password')

  if (!user) {
    error('Not Found', 'Usuário não encontrado')
  }

  return { user }
}
