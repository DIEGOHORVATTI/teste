import { HTTPError } from '@/errors'

import { IUser, User, UserSchema } from '@/models/User'

type UpdatedUser = IUser & {
  userId: string
}

export const updateUserService = async (data: UpdatedUser) => {
  const { email, password } = UserSchema.parse(data)

  const user = await User.findById(data.userId)

  if (!user) {
    throw new HTTPError('User not found', 404)
  }

  if (email) {
    const existingUser = await User.findOne({ email })

    const isDifferentUser = existingUser?.id !== data.userId
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
