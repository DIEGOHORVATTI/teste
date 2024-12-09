import { Elysia } from 'elysia'

import { openApi } from '@/middlewares/openApi'
import { rateLimit } from '@/middlewares/rate-limit'

import { PORT } from '@/constants/config'

import { router } from './router'

new Elysia()
  .use(openApi)
  .use(rateLimit)
  .onError(({ code, error }) => {
    if (code === 'NOT_FOUND') return 'Route not found 😭'

    if (code === 'VALIDATION') {
      const { summary, ...primaryError } = error.all[0]

      if ('path' in primaryError) return { error: `${primaryError.path.slice('/'.length)}: ${summary}` }

      return { error: summary }
    }

    return error
  })
  .use(router(__dirname)) // Usar o roteador customizado
  .get('/', () => 'API is running 🚀') // Rota principal
  .listen(PORT, ({ url }) => console.info(`🦊 Elysia is running at ${url}`))
