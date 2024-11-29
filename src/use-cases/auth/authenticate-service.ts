import { User, IUser } from '@/models/User'

import { error } from 'elysia'

export const authenticateUserService = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    error(401, 'Email not registered')
  }

  const passwordMatch = user?.comparePassword?.(password)

  if (!passwordMatch) {
    error(401, 'Invalid credentials')
  }

  return user
}
