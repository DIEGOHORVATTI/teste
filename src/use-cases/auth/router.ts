import { Elysia, t } from 'elysia'

import { UserSchema } from '@/models/User'
import { authenticateUserService } from './authenticate-service'

export const authRouter = new Elysia({ prefix: '/auth' }).post(
  '/login',
  async ({ body }) => {
    const token = await authenticateUserService(body)

    return { token }
  },
  UserSchema
)
