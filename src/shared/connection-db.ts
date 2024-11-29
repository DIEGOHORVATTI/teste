import { MONGO_URL } from '../constants/config'

import { createConnection } from 'mongoose'

import { version } from '../../package.json'

export const connectDB = createConnection(MONGO_URL, {
  dbName: process.env.MONGODB_DATABASE,
  maxPoolSize: 10
})

connectDB.once('connected', () => {
  if (process.env.NODE_ENV) console.info(`🌟 ${process.env.NODE_ENV}`)

  if (version) console.info(`🔖 ${version}`)
})

connectDB.on('error', error => {
  console.error(`🔥 ${error}`)
})
