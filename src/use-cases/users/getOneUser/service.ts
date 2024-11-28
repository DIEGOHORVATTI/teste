import { HTTPError } from '@/errors'

import { User } from '@/models/User'

export const getOneUserService = async (useId: string) => {
  const user = await User.findById(useId).select('-password')

  if (!user) {
    throw new HTTPError('User not found', 404)
  }

  return user
}
