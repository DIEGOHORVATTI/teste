import { readdirSync } from 'fs'
import { join } from 'path'

import { server } from '.'

const routesPath = join(__dirname, 'routes')
const routeFiles = readdirSync(routesPath)

export const router = async () => {
  for (const file of routeFiles) {
    if (file.endsWith('.routes.ts')) {
      const { default: router } = await import(join(routesPath, file))

      server.use(router)
    }
  }
}
