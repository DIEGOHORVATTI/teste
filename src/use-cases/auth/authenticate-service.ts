import { User, IUser } from '@/models/User'
import { generateToken } from '@/utils/generateToken'

import { HTTPError } from '@/errors'

export const authenticateUserService = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new HTTPError('Email not registered', 401)
  }

  const passwordMatch = user.comparePassword?.(password)

  if (!passwordMatch) {
    throw new HTTPError('Invalid credentials', 401)
  }

  return generateToken(user.id)
}
