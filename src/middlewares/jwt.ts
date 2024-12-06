import { Elysia, error, t } from 'elysia'

import { User } from '@/models/User'

import { jwtSettings } from '@/shared/jwt-settings'

const bearerTokenGuard = {
  headers: t.Object({
    authorization: t.String({ pattern: '^Bearer \\S+$' })
  })
}

export const jwt = new Elysia()
  .use(jwtSettings)
  .guard(bearerTokenGuard)
  .derive(async ({ headers: { authorization }, jwt }) => {
    if (!authorization) {
      throw error('Unauthorized', { error: 'Nenhum token fornecido' })
    }

    const token = authorization.slice('Bearer '.length)
    const decoded = await jwt.verify(token)

    if (!decoded) {
      throw error('Unauthorized', { error: 'Token inválido' })
    }

    const user = await User.findById(decoded.id)
    if (!user) {
      throw error('Unauthorized', { error: 'Usuário não encontrado' })
    }

    return { user }
  })
