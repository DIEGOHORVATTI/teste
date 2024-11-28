import { Router } from 'express'

import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const router = Router()

const useCaseModules = readdirSync(join(__dirname, 'use-cases')).filter(f => f !== 'shared')

;(async () => {
  for (const routerModule of useCaseModules) {
    router.use(`/${routerModule}`, (await import(join(__dirname, 'use-cases', routerModule, 'router'))).default)
  }
})()

router.get('/', (_req, res) => {
  res.send('API is running 🚀')
})
