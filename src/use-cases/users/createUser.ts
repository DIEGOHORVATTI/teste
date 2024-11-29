import { IUser, User } from '@/models/User'

import { error } from 'elysia'

export const createUserService = async ({ email, password }: IUser) => {
  if (await User.findOne({ email })) {
    throw error('Conflict', 'User of this email already exists')
  }

  console.log('kapa')

  console.log({ email, password })

  const user = new User({ email, password })

  await user.save().catch(() => {
    throw error('Internal Server Error', 'Failed to create user')
  })

  return user
}
