import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const updateUserService = async (id: string, { email, password }: IUser) => {
  const user = await User.findById(id)

  if (!user) {
    throw error('Not Found', 'User not found')
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    const isDifferentUser = existingUser?.id !== id

    if (isDifferentUser) {
      throw error('Conflict', 'User of this email already exists')
    }

    user.email = email
  }

  if (password) {
    user.password = password
  }

  await user?.save().catch(() => {
    throw error('Internal Server Error', 'Failed to update user')
  })

  return user
}
