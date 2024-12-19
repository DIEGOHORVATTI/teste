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
