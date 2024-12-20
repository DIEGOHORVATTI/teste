import { Elysia, error, t as Type } from 'elysia'

import { getOneUserUseCase, createUserService, updateUserService, deleteUserService } from '@/services/users'
import { getAllUsersService, userFilter, userFilterCriteria } from '@/services/users/get-all'
import { getStatusAggregationService } from '@/services/users/get-status-aggregation'

import { UserSchema } from '@/models/User'
import { jwt } from '@/middlewares/jwt'

const router = new Elysia({ tags: ['users'], prefix: '/users' })
  .post(
    '/',
    async ({ body }) => {
      const { user } = await createUserService(body)
      return { message: 'Usuário criado com sucesso', user }
    },
    {
      body: Type.Object(UserSchema),
      detail: { description: 'Cria um usuário' }
    }
  )
  .use(jwt)
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const { user } = await getOneUserUseCase(id)

      return { message: 'Usuário encontrado com sucesso', user }
    },
    {
      detail: { description: 'Busca um usuário' }
    }
  )
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const { user } = await updateUserService(id, body)
      return { message: 'Usuário atualizado com sucesso', user }
    },
    {
      body: Type.Object(UserSchema),
      detail: { description: 'Atualiza um usuário' }
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await deleteUserService(id)
      return { message: 'Usuário deletado com sucesso' }
    },
    {
      type: 'text/plain',
      detail: { description: 'Deleta um usuário' }
    }
  )
  .post(
    '/filters/aggregation',
    async ({ user, body }) => {
      if (user.role !== 'admin') {
        throw error('Unauthorized', { error: 'Você não tem permissão para acessar essa rota' })
      }

      const { aggregatedStatus } = await getStatusAggregationService({ filters: body?.filters })

      return { message: 'Agregação de status obtida com sucesso', aggregatedStatus }
    },
    {
      body: Type.Optional(
        Type.Object({
          filters: userFilterCriteria.filters
        })
      ),
      detail: { description: 'Retorna a agregação de status dos usuários' }
    }
  )
  .post(
    '/filters',
    async ({ user, body: { limit, page, filters } }) => {
      if (user.role !== 'admin') {
        throw error('Unauthorized', { error: 'Você não tem permissão para acessar essa rota' })
      }

      const allUsers = await getAllUsersService({ limit, page, filters })
      return { message: 'Usuários encontrados com sucesso', ...allUsers }
    },
    {
      body: userFilter,
      detail: { description: 'Retorna todos os usuários' }
    }
  )

export default router
