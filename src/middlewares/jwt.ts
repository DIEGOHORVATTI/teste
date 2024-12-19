import { Elysia, error, t } from 'elysia'

import { IUser, User } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'

export const jwt = (app: Elysia) =>
  app
    .use(jwtSettings)
    .guard({ cookie: t.Cookie({ token: t.String() }) })
    .derive(async ({ cookie: { token }, jwt }) => {
      if (!token.value) {
        throw error('Unauthorized', { error: 'Nenhum token encontrado nos cookies' })
      }

      const decoded = await jwt.verify(token.value)
      if (!decoded) {
        throw error('Unauthorized', { error: 'Token inválido' })
      }

      type UserPayloadWithId = IUser['userSchema'] & { _id: string }
      const user = (await User.findById(decoded.id))?.toJSON() as unknown as UserPayloadWithId
      if (!user) {
        throw error('Unauthorized', { error: 'Usuário não encontrado', reLogin: true })
      }

      return { user, token }
    })
