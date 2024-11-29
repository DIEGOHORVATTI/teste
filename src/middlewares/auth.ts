import { Elysia } from 'elysia'
import { HTTPError } from '@/errors/httpError'

export const authMiddleware = new Elysia()
  .derive(({ headers, jwt }) => {
    const auth = headers.authorization

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new HTTPError('Unauthorized', 401)
    }

    const token = auth.slice(7)

    return {
      token,
      jwtVerify: jwt.verify(token)
    }
  })
  .onError(({ error, set }) => {
    if (error instanceof HTTPError) {
      set.status = error.status
      return { error: error.message }
    }

    set.status = 500
    return { error: 'Internal Server Error' }
  })
