import { HTTPError } from '@/errors'
import { endpoint } from '@/middlewares'

import { verify } from 'jsonwebtoken'

import { User } from '@/models/User'

export const jwt = endpoint(async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new HTTPError('Unauthorized', 401)
  }

  const token = authorization.slice('Bearer '.length)

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as {
      email: string
      id: string
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({
        message: 'Usuário inexistente'
      })
    }

    req.user = user

    return next()
  } catch (_error) {
    throw new HTTPError('Unauthorized', 401)
  }
})
