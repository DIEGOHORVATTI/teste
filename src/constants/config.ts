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
  },
  Scheduling: {
    name: 'Scheduling',
    collection: 'schedulings'
  }
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org'
const COUNTRIES_BASE_URL = 'https://countriesnow.space/api/v0.1'

const apiIntegrations = {
  nominatim: NOMINATIM_BASE_URL,
  countries: COUNTRIES_BASE_URL
}

export const endpoints = {
  nominatim: {
    search: `${apiIntegrations.nominatim}/search`,
    reverse: `${apiIntegrations.nominatim}/reverse`
  },
  countries: {
    all: `${apiIntegrations.countries}/countries`,
    states: `${apiIntegrations.countries}/countries/states`,
    cities: `${apiIntegrations.countries}/countries/state/cities`,
    iso: `${apiIntegrations.countries}/countries/iso`
  }
}

// Environment variables
export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000
export { version } from '../../package.json'

// Database configuration
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || ''
export const MONGO_URL = process.env.MONGO_URI || ''

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXP = process.env.JWT_EXP || '7d'

// Password recovery configuration
export const CODE_EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutos em milissegundos
export const MAX_ATTEMPTS = 3

// Mail configuration
export const MAIL_HOST = process.env.MAIL_HOST || ''
export const MAIL_PORT = process.env.MAIL_PORT || 0
export const MAIL_USERNAME = process.env.MAIL_USERNAME || ''
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || ''

// AWS S3 Configuration
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || ''
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || ''
export const AWS_REGION = process.env.AWS_REGION || ''
export const S3_BUCKET = process.env.S3_BUCKET || ''
