import { error, t as Type } from 'elysia'

import { IUser, User, UserSchema } from '@/models/User'

import { convertObjectToQuery, paginationSettings } from '@/shared'
import { registrationDate } from '@/utils/validations'

export const getAllUsersService = async ({ limit = 10, page = 0, filters = {} }: typeof userFilter.static) => {
  const queryFilters = convertObjectToQuery(filters)

  const options = paginationSettings({ limit, page })

  const { data, ...pagination } = await User.paginate(queryFilters, options)
  const users = data as Array<IUser['userSchema']>

  if (!users) {
    throw error('Not Found', { error: 'Nenhum usuário encontrado com os filtros fornecidos' })
  }

  const aggregatedStatus = users.reduce(
    (acc, { status }) => {
      acc[status] = acc[status] + 1

      return acc
    },
    { active: 0, inactive: 0, analysis: 0 }
  )

  return { users, pagination, aggregatedStatus }
}

export const userFilter = Type.Object({
  limit: Type.Optional(
    Type.Number({
      default: 10,
      description: 'Número de resultados por página (máximo recomendado: 100)',
      minimum: 1,
      maximum: 100
    })
  ),
  page: Type.Optional(
    Type.Number({
      default: 0,
      description: 'Página atual da consulta (começando de 0)',
      minimum: 0
    })
  ),
  filters: Type.Optional(
    Type.Object({
      status: Type.Optional(Type.String({ enum: ['active', 'inactive', 'analysis'], default: 'active' })),
      document: Type.Optional(UserSchema.document),
      startDate: Type.Optional({ ...registrationDate, default: '2021-01-01' }),
      endDate: Type.Optional({ ...registrationDate, default: '2024-12-31' })
    })
  )
})
