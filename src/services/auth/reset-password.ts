import { error } from 'elysia'

import { User } from '@/models/User'

type Props = {
  email: string
  newPassword: string
  code: string
}

export const resetPasswordService = async ({ email, newPassword, code }: Props) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  if (!user.resetPassword?.code) {
    throw error('Bad Request', { error: 'Nenhum código de recuperação foi gerado' })
  }

  if (user.resetPassword.code !== code) {
    throw error('Unauthorized', { error: 'Código inválido' })
  }

  if (!user.resetPassword.expires || user.resetPassword.expires < new Date()) {
    throw error('Bad Request', { error: 'Código expirado' })
  }

  user.password = newPassword

  Object.assign(user.resetPassword, {
    code: null,
    expires: null,
    attempts: 0
  })

  await user.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao redefinir senha' })
  })

  return { message: 'Senha redefinida com sucesso' }
}
