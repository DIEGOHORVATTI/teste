import { HTTPError } from '@/errors'

import { IUser, User } from '@/models/User'

export const createUserService = async ({ email, password }: IUser) => {
  if (await User.findOne({ email })) {
    throw new HTTPError('User of this email already exists', 409)
  }

  const user = new User({ email, password })

  await user.save().catch(() => {
    throw new HTTPError('Failed to create user', 500)
  })
}