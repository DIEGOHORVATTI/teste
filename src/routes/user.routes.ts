import { Elysia, error, t as Type } from 'elysia'

import { getOneUserUseCase, createUserService, updateUserService, deleteUserService } from '@/services/users'
import { getAllUsersService } from '@/services/users/get-all'

import { UserSchema, userStatusEnum } from '@/models/User'
import { jwt } from '@/middlewares/jwt'

export const userFilter = Type.Object({
  limit: Type.Optional(Type.Number({ default: 10 })),
  offset: Type.Optional(Type.Number({ default: 0 })),
  filters: Type.Optional(
    Type.Object({
      status: Type.Optional(Type.String({ enum: userStatusEnum, default: 'active' })),
      startDate: Type.Optional(Type.String({ format: 'date' })),
      endDate: Type.Optional(Type.String({ format: 'date' }))
    })
  )
})

const router = new Elysia({ tags: ['users'], prefix: '/users' })
  .post(
    '/',
    async ({ body }) => {
      const { user } = await createUserService(body)

      return { message: 'Usuário criado com sucesso', user }
    },
    {
      body: UserSchema,
      detail: { description: 'Cria um usuário' }
    }
  )
  .use(jwt)
  .get(
    '/',
    async ({ user, query: { limit, offset, filters } }) => {
      if (!(user.role === 'admin')) {
        throw error('Unauthorized', 'Você não tem permissão para acessar essa rota')
      }

      const { users } = await getAllUsersService({ limit, offset, filters })

      return { message: 'Usuários encontrados com sucesso', users }
    },
    {
      query: userFilter,
      detail: { description: 'Retorna todos os usuários' }
    }
  )
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
      body: UserSchema,
      detail: { description: 'Atualiza um usuário' }
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await deleteUserService(id)

      return {
        message: 'Usuário deletado com sucesso'
      }
    },
    {
      type: 'text/plain',
      detail: { description: 'Deleta um usuário' }
    }
  )

export default router

/* 
listagem de usuarioas com entrada de documento value
listagem em limit and offset com entrada de query value
filtros de status, data startar date e end date
status do usuario - > ativo inativo
*/
