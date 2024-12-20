import { error } from 'elysia'
import { User } from '@/models/User'
import { MAX_ATTEMPTS } from '../../constants/config'

export const verifyCodeService = async (email: string, code: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  const { resetPassword } = user

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
    resetPassword.attempts += 1

    await user.save().catch<{ message: string }>(err => {
      throw error('Internal Server Error', {
        error: 'Erro ao salvar informações do usuário',
        details: err.message
      })
    })

    throw error('Unauthorized', { error: 'Código inválido' })
  }

  Object.assign(user.resetPassword, {
    code: null,
    expires: null,
    attempts: 0
  })

  await user.save().catch<{ message: string }>(err => {
    throw error('Internal Server Error', {
      error: 'Erro ao salvar informações do usuário',
      details: err.message
    })
  })

  return { message: 'Código verificado com sucesso' }
}
