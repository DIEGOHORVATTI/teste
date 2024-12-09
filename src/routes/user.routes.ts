import { Elysia } from 'elysia'

import { getOneUserUseCase, createUserService, updateUserService, deleteUserService } from '@/services/users'

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
      body: UserSchema,
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
      body: UserSchema,
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
      detail: { description: 'Deleta um usuário' }
    }
  )

export default router
