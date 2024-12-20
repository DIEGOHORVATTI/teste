import { t as Type } from 'elysia'

export const registrationDate = Type.String({
  format: 'date',
  default: '2017-07-21',
  pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
})
