import { Elysia, t, t as Type } from 'elysia'

import { UserSchema } from '@/models/User'

import { signService } from '@/services/auth/sign'
import { recoverPasswordService } from '@/services/auth/recover-password'
import { verifyCodeService } from '@/services/auth/verify-code'
import { resetPasswordService } from '@/services/auth/reset-password'

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
    {
      detail: 'Realiza o login',
      body: Type.Object({
        email: UserSchema.email,
        password: UserSchema.password
      })
    }
  )
  .post(
    '/recover-password',
    async ({ body: { email } }) => {
      await recoverPasswordService(email)

      return { message: 'E-mail enviado com sucesso' }
    },
    {
      detail: { description: 'Envia um e-mail para recuperação de senha' },
      body: Type.Object({ email: UserSchema.email })
    }
  )
  .post(
    '/verify-code',
    async ({ body: { email, code } }) => {
      await verifyCodeService({ email, code })

      return { message: 'Código verificado com sucesso' }
    },
    {
      detail: {
        description: 'Verifica o código enviado por e-mail para recuperação de senha'
      },
      body: Type.Object({
        email: UserSchema.email,
        code: t.String({ description: 'Código enviado por e-mail' })
      })
    }
  )
  .post(
    '/reset-password',
    async ({ body: { email, code, newPassword } }) => {
      await resetPasswordService({ email, newPassword, code })

      return { message: 'Senha redefinida com sucesso' }
    },
    {
      body: Type.Object({
        email: UserSchema.email,
        newPassword: UserSchema.password,
        code: t.String({ description: 'Código de verificação' })
      }),
      detail: {
        description: 'Redefine a senha do usuário após verificação do código'
      }
    }
  )
  .use(jwt)
  .get('/me', async ({ user }) => user, { detail: { description: 'Retorna os dados do usuário logado' } })
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
