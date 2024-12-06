import * as React from 'react'
import { Tailwind, Section, Text } from '@react-email/components'

type Props = {
  code: string
  email: string
}

export default function RecoverPasswordEmail({ code, email }: Props) {
  const yearNow = new Date().getFullYear()

  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans bg-gray-100">
        <Section className="flex flex-col items-center px-6 py-6 rounded-xl shadow-lg bg-white">
          <Text className="text-2xl font-bold text-green-500">ICA Bank</Text>

          <Text className="text-gray-500 mt-2">Olá,</Text>
          <Text className="text-gray-500">
            Recebemos uma solicitação para redefinir a senha associada ao e-mail {email}.
          </Text>

          <Section className="flex justify-center items-center bg-green-100 rounded-2xl my-4 text-center">
            <Text className="text-5xl font-bold text-green-500 pt-2">{code}</Text>
          </Section>

          <Text className="text-gray-600">Não compartilhe este código com ninguém.</Text>

          <Text className="text-gray-500 mt-4">
            Se você não solicitou uma redefinição de senha, ignore este e-mail.
          </Text>
          <Text className="text-gray-500">— A equipe da ICA Bank</Text>
        </Section>

        <Text className="text-gray-400 text-xs text-center mt-4">
          © {yearNow} ICA BANK SOLUÇÕES FINANCEIRAS LTDA. Todos os direitos reservados.
        </Text>
      </Section>
    </Tailwind>
  )
}

RecoverPasswordEmail.PreviewProps = {
  resetCode: '123456',
  email: 'email@email.com'
}
