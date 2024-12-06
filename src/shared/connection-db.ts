import { MONGO_URL, MONGODB_DATABASE as dbName, NODE_ENV } from '../constants/config'

import { createConnection } from 'mongoose'

import { version } from '../../package.json'

export const connectDB = createConnection(MONGO_URL, { dbName, maxPoolSize: 10 })

connectDB.once('connected', () => {
  console.info('🟢 Database connected')

  if (NODE_ENV) console.info(`🌟 ${NODE_ENV}`)

  if (version) console.info(`🔖 ${version}`)
})

connectDB.on('error', error => {
  console.error(`🔥 ${error}`)
})
