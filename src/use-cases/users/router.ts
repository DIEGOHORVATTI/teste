import { Elysia } from 'elysia'

import { createUserService } from './createUser'
import { getOneUserService } from './getOneUser'
import { updateUserService } from './updateUser'
import { deleteUserService } from './removeUser'

import { authMiddleware } from '@/middlewares/auth'
import { UserSchema } from '@/models/User'

export const userRouter = new Elysia({ prefix: '/users' })
  .post(
    '/',
    async ({ body }) => {
      const user = await createUserService(body)

      return { message: 'User created successfully', user }
    },
    UserSchema
  )
  .use(authMiddleware)
  .get('/:id', async ({ params: { id } }) => {
    const user = await getOneUserService(id)

    return { message: 'User found successfully', user }
  })
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const user = await updateUserService(id, body)

      return { message: 'User updated successfully', user }
    },
    UserSchema
  )
  .delete('/:id', async ({ params: { id } }) => {
    await deleteUserService(id)

    return { message: 'User deleted successfully' }
  })
