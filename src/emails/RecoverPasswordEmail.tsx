import * as React from 'react'

import { Hr, Text, Tailwind } from '@react-email/components'

type Props = {
  code: string
  email: string
}

export default function RecoverPasswordEmail({ code, email }: Props) {
  const yearNow = new Date().getFullYear()

  return (
    <Tailwind>
      <table
        role="presentation"
        width="100%"
        style={{
          backgroundColor: '#f3f4f6',
          minHeight: '100vh',
          fontFamily: "'Arial', sans-serif",
          padding: '20px 0'
        }}
        cellPadding="0"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <td align="center" style={{ padding: '20px' }}>
              <table
                role="presentation"
                width="100%"
                style={{
                  maxWidth: '600px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '30px'
                }}
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <td align="center">
                      <Text
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: '#10b981',
                          marginBottom: '10px'
                        }}
                      >
                        ICA Bank
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                      <Text>Olá,</Text>
                      <Text>
                        Recebemos uma solicitação para redefinir a senha associada ao e-mail <b>{email}</b>.
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '20px 0' }}>
                      <table
                        role="presentation"
                        width="100%"
                        style={{
                          backgroundColor: '#d1fae5',
                          borderRadius: '8px',
                          textAlign: 'center',
                          padding: '15px 0'
                        }}
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <Text
                                style={{
                                  fontSize: '32px',
                                  fontWeight: 'bold',
                                  color: '#10b981',
                                  textAlign: 'center',
                                  display: 'block',
                                  width: '100%'
                                }}
                              >
                                {code}
                              </Text>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                      <Text>Não compartilhe este código com ninguém.</Text>
                      <Text style={{ marginTop: '10px' }}>
                        Se você não solicitou uma redefinição de senha, ignore este e-mail.
                      </Text>
                      <Text>— A equipe da ICA Bank</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center">
              <Hr className="border-gray-300" />
            </td>
          </tr>

          <tr>
            <td align="center">
              <Text style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
                © {yearNow} ICA BANK SOLUÇÕES FINANCEIRAS LTDA. Todos os direitos reservados.
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Tailwind>
  )
}

RecoverPasswordEmail.PreviewProps = {
  code: '123456',
  email: 'email@email.com'
}
