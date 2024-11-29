import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'

import { authRouter } from './use-cases/auth/router'
import { userRouter } from './use-cases/users/router'

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(jwt({ name: 'jwt', secret: process.env.JWT_SECRET! }))
  .get('/', () => 'API is running 🚀')
  .use(authRouter)
  .use(userRouter)
  .listen(process.env.PORT || 3000)

console.log(`🦊 Server is running at http://localhost:${app.server?.port}`)
