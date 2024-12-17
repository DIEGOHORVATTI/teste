import { Elysia, t } from 'elysia'

import { httpFetch } from '@/shared/http-fetch'
import { endpoints } from '../constants/config'

const router = new Elysia({ prefix: '/location', tags: ['location'] })
  .get(
    '/suburb-search',
    async ({ query: { suburb, city, inputSuburb } }) => {
      const results = await httpFetch({
        url: endpoints.nominatim.search,
        options: {
          params: {
            q: `${inputSuburb || suburb}, ${city}`,
            format: 'json',
            addressdetails: 1
          }
        }
      })

      return { message: 'Suburb search results', results }
    },
    {
      query: t.Object({
        suburb: t.String({ default: 'centro' }),
        city: t.String({ default: 'florianopolis' }),
        inputSuburb: t.String({ default: 'centro' })
      })
    }
  )
  .get('/search/road/:road', async ({ params: { road } }) => {
    const results = await httpFetch({
      url: endpoints.nominatim.search,
      options: {
        params: {
          q: road,
          format: 'json',
          addressdetails: 1
        }
      }
    })

    return { message: 'Road search results', results }
  })
  .get('/search/:query', async ({ params: { query } }) => {
    const results = await httpFetch({
      url: endpoints.nominatim.search,
      options: {
        params: {
          q: query,
          format: 'json',
          limit: 5
        }
      }
    })

    return { message: 'Location search results', results }
  })
  .get(
    '/details',
    async ({ query: { lat, lon } }) => {
      const results = await httpFetch({
        url: endpoints.nominatim.reverse,
        options: {
          params: { lat, lon, format: 'json' }
        }
      })

      return { message: 'Location details', results }
    },
    {
      query: t.Object({
        lat: t.String({ default: '-27.5954' }),
        lon: t.String({ default: '-48.548' })
      })
    }
  )
  .get('/countries', async () => {
    const countries = await httpFetch({ url: endpoints.countries.all })

    return { message: 'All countries data', countries }
  })
  .post(
    '/cities',
    async ({ body: { country, state } }) => {
      const cities = await httpFetch({
        url: endpoints.countries.cities,
        method: 'POST',
        options: {
          data: { country, state }
        }
      })

      return { message: 'Cities in state', cities }
    },
    {
      body: t.Object({
        country: t.String({ default: 'brazil' }),
        state: t.String({ default: 'santa catarina' })
      })
    }
  )
  .get('/postal-code/:code', async ({ params: { code } }) => {
    const results = await httpFetch({ url: `https://viacep.com.br/ws/${code}/json/` })

    return { message: 'Postal code search results', results }
  })
  .post(
    '/states',
    async ({ body: { country } }) => {
      const states = await httpFetch({
        url: endpoints.countries.states,
        method: 'POST',
        options: {
          data: { country }
        }
      })

      return { message: 'Country states data', states }
    },
    {
      body: t.Object({
        country: t.String({ default: 'brazil' })
      })
    }
  )

export default router
