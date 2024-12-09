import { Elysia, error, t } from 'elysia'

import { User } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'

const cookieGuard = {
  cookie: t.Object({
    token: t.String()
  })
}

export const jwt = (app: Elysia) =>
  app
    .use(jwtSettings)
    .guard(cookieGuard)
    .derive(async ({ cookie: { token }, jwt }) => {
      if (!token.value) {
        throw error('Unauthorized', { error: 'Nenhum token encontrado nos cookies' })
      }

      const decoded = await jwt.verify(token.value)
      if (!decoded) {
        throw error('Unauthorized', { error: 'Token inválido' })
      }

      const user = await User.findById(decoded.id).catch(() => {
        throw error('Unauthorized', { error: 'Usuário não encontrado' })
      })

      return { user, token }
    })
