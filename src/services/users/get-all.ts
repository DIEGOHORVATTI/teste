import { error } from 'elysia'

import { User } from '@/models/User'
import { userFilter } from '@/routes/user.routes'

export const getAllUsersService = async ({ limit = 10, offset = 0, filters = {} }: typeof userFilter.static) => {
  const users = await User.find(filters).skip(offset).limit(limit).select('-password -resetPassword')

  if (!users || users.length === 0) {
    throw error('Not Found', 'Nenhum usuário encontrado com os filtros fornecidos')
  }

  return { users }
}
