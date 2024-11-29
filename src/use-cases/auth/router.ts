import { Elysia, t } from 'elysia'

import { UserSchema } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'
import { authenticateUserService } from './authenticate-service'

export const authRouter = new Elysia({ prefix: '/auth' }).use(jwtSettings).post(
  '/login',
  async ({ body, jwt }) => {
    const user = await authenticateUserService(body)

    const token = await jwt.sign({ id: user?.id })

    return { token }
  },
  UserSchema
)
