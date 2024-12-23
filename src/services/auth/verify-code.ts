import { error } from 'elysia'

import { IUser, User } from '@/models/User'

import { MAX_ATTEMPTS } from '@/constants/config'

type Props = {
  email: string
  code: string
}

export const verifyCodeService = async ({ email, code }: Props) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  const { resetPassword } = user

  console.log(resetPassword)

  if (!resetPassword || !resetPassword.code) {
    throw error('Bad Request', { error: 'Nenhum código de recuperação foi gerado' })
  }

  if (resetPassword.attempts >= MAX_ATTEMPTS) {
    throw error('Too Many Requests', { error: 'Número máximo de tentativas de verificação atingido' })
  }

  if (!resetPassword.expires || resetPassword.expires < new Date()) {
    throw error('Bad Request', { error: 'Código expirado' })
  }

  if (resetPassword.code !== code) {
    await incrementResetAttempts(user)

    throw error('Unauthorized', { error: 'Código inválido' })
  }

  await user.save().catch<{ message: string }>(err => {
    throw error('Internal Server Error', {
      error: 'Erro ao salvar informações do usuário',
      details: err.message
    })
  })

  return { message: 'Código verificado com sucesso' }

  async function incrementResetAttempts(user: IUser['userDocument']) {
    resetPassword.attempts += 1

    await user.save().catch<{ message: string }>(err => {
      throw error('Internal Server Error', {
        error: 'Erro ao salvar informações do usuário',
        details: err.message
      })
    })
  }
}
