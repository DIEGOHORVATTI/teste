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

  return { users, pagination }
}

export const userFilterCriteria = {
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
      startDate: Type.Optional(registrationDate),
      endDate: Type.Optional(registrationDate),
      ...Object.fromEntries(Object.entries(UserSchema).map(([key, value]) => [key, Type.Optional(value)]))
    })
  )
}
export const userFilter = Type.Object(userFilterCriteria)
