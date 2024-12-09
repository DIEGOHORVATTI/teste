export const collectionsData = {
  User: {
    name: 'User',
    collection: 'users'
  },
  Product: {
    name: 'Product',
    collection: 'products'
  },
  Company: {
    name: 'Company',
    collection: 'companies'
  }
}

export { version } from '../../package.json'

export const HOST_API = process.env.HOST_API || ''

export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || ''
export const MONGO_URL = process.env.MONGO_URI || ''

export const PORT = process.env.PORT || 3000

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXP = process.env.JWT_EXP || '7d'

export const NODE_ENV = process.env.NODE_ENV

export const MAIL_HOST = process.env.MAIL_HOST || ''
export const MAIL_PORT = process.env.MAIL_PORT || 0
export const MAIL_USERNAME = process.env.MAIL_USERNAME || ''
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || ''
