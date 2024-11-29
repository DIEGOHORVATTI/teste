import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { authRouter } from './use-cases/auth/router'
import { userRouter } from './use-cases/users/router'

import { PORT } from '@/constants/config'

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'API is running 🚀')
  .use(authRouter)
  .use(userRouter)
  .listen(PORT)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
