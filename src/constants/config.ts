export const collectionsData = {
  User: {
    name: 'User',
    collection: 'users'
  }
}

export const HOST_API = process.env.HOST_API || ''

export const MONGO_URL = process.env.MONGO_URI || ''

export const PORT = process.env.PORT || 3000

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const JWT_EXP = process.env.JWT_EXP || '7d'

export const JWT_REFRESH_EXP = process.env.JWT_REFRESH_EXP || '30d'

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh'

export const JWT_REFRESH_NAME = process.env.JWT_REFRESH_NAME || 'refresh'
