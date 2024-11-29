import { User } from '@/models/User'

import { error } from 'elysia'

export const getOneUserService = async (useId: string) => {
  const user = await User.findById(useId).select('-password')

  if (!user) {
    error(404, 'User not found')
  }

  return user
}
