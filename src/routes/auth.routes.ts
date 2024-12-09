import { Elysia, t as Type } from 'elysia'

import { UserCredentialsSchema } from '@/models/User'

import { signService } from '@/services/auth/sign'
import { recoverPasswordService } from '@/services/auth/recover-password'

import { jwt } from '@/middlewares/jwt'
import { jwtSettings } from '@/shared/jwt-settings'

const router = new Elysia({ tags: ['auth'], prefix: '/auth' })
  .use(jwtSettings)
  .post(
    '/sign',
    async ({ body, jwt, cookie: { token } }) => {
      const user = await signService(body)

      token.set({
        value: await jwt.sign({ id: user.id }),
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })

      return { message: 'Login realizado com sucesso' }
    },
    { detail: 'Realiza o login', body: Type.Object(UserCredentialsSchema) }
  )
  .post(
    '/recover-password',
    async ({ body: { email } }) => {
      await recoverPasswordService(email)

      return { message: 'E-mail enviado com sucesso' }
    },
    {
      detail: { description: 'Envia um e-mail para recuperação de senha' },
      body: Type.Object({ email: UserCredentialsSchema.email })
    }
  )
  .use(jwt)
  .get(
    '/logout',
    async ({ token }) => {
      token.set({
        value: '',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)
      })

      return { message: 'Logout realizado com sucesso' }
    },
    { detail: { description: 'Realiza o logout' } }
  )

export default router
