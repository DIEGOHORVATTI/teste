import { Elysia, t as Type } from 'elysia'

import { UserCredentialsSchema } from '@/models/User'

import { signService } from '@/services/auth/sign'
import { recoverPasswordService } from '@/services/auth/recover-password'
import { jwtSettings } from '@/shared/jwt-settings'

const router = new Elysia().group('/auth', server =>
  server
    .use(jwtSettings)
    .post(
      '/login',
      async ({ body, jwt }) => {
        const user = await signService(body)

        const token = await jwt.sign({ id: user.id })

        return { token }
      },
      { body: Type.Object(UserCredentialsSchema) }
    )
    .post(
      '/recover-password',
      async ({ body: { email } }) => {
        await recoverPasswordService(email)

        return { message: 'E-mail enviado com sucesso' }
      },
      {
        body: Type.Object({ email: UserCredentialsSchema.email })
      }
    )
)

export default router
