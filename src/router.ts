import Elysia from 'elysia'

import { readdirSync } from 'fs'
import { join } from 'path'

export const router = async (dirname: string) => {
  const app = new Elysia({ prefix: '' })

  const directory = join(dirname, 'routes')

  for (const file of readdirSync(directory)) app.use((await import(join(directory, file))).default)

  return app
}
