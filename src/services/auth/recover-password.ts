import { renderToStaticMarkup } from 'react-dom/server'
import { error } from 'elysia'

import nodemailer from 'nodemailer'

import { User } from '@/models/User'
import RecoverPasswordEmail from '@/emails/RecoverPasswordEmail'

import { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME } from '@/constants/config'

const CODE_EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutos em milissegundos
const MAX_ATTEMPTS = 3

export const recoverPasswordService = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw error('Not Found', { error: 'Usuário não encontrado' })
  }

  if (user.resetPassword.attempts >= MAX_ATTEMPTS) {
    throw error('Too Many Requests', { error: 'Número máximo de tentativas de recuperação atingido.' })
  }

  // Gera um código de 6 dígitos
  const code = Math.floor(100_000 + Math.random() * 900_000).toString()

  const expirationTime = Date.now() + CODE_EXPIRATION_TIME

  Object.assign(user.resetPassword, {
    code,
    expires: new Date(expirationTime),
    attempts: 0
  })

  await user.save().catch<{ message: string }>(err => {
    throw error('Internal Server Error', {
      error: 'Erro ao salvar informações do código de recuperação',
      details: err.message
    })
  })

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_PORT === 465,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD
    }
  })

  const html = renderToStaticMarkup(RecoverPasswordEmail({ code, email }))

  await transporter
    .sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: 'Solicitação de redefinição de senha',
      text: `Você solicitou uma redefinição de senha. Use o código abaixo para redefinir sua senha: ${code}`,
      html
    })
    .catch(err => {
      console.log(err)

      throw error('Internal Server Error', { error: 'Falha ao enviar e-mail' })
    })
}
