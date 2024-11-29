import { Elysia } from 'elysia'
import { HTTPError } from '@/errors/httpError'

import { jwtConfig } from '@/shared/jwt-config'

export const jwt = new Elysia()
  .use(jwtConfig)

  .derive(async ({ headers, jwt }) => {
    const auth = headers['authorization']

    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null

    if (!token) return { user: null }

    const user = await jwt.verify(token)

    return { user }
  })
  .onError(({ error, set }) => {
    if (error instanceof HTTPError) {
      set.status = error.status
      return { error: error.message }
    }

    set.status = 500
    return { error: 'Internal Server Error' }
  })
