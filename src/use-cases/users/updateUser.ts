import { HTTPError } from '@/errors'

import { IUser, User } from '@/models/User'

export const updateUserService = async (id: string, { email, password }: IUser) => {
  const user = await User.findById(id)

  if (!user) {
    throw new HTTPError('User not found', 404)
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    const isDifferentUser = existingUser?.id !== id
    validateEmailUniqueness(isDifferentUser)

    user.email = email
  }

  if (password) {
    user.password = password
  }

  await user.save().catch(() => {
    throw new HTTPError('Failed to update user', 500)
  })

  return user
}

function validateEmailUniqueness(existingUser: boolean) {
  if (existingUser) {
    throw new HTTPError('User with this email already exists', 409)
  }
}
