import { t as Type } from 'elysia'

import { registrationDate } from '@/utils/validations'

const namePerson = Type.String({ minLength: 3, maxLength: 100 })

export const UserSchema = {
  role: Type.Enum(
    {
      client: 'client', // cliente
      admin: 'admin', // administrador
      manager: 'manager', // gestor
      consultant: 'consultant' // consultor
    },
    { default: 'client' }
  ),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6, maxLength: 20 }),
  name: namePerson,
  status: Type.Enum(
    {
      // active: acesso as funcionalidades do sistema
      active: 'active',
      // inactive: acesso total
      inactive: 'inactive',
      // analysis: acesso aos relatórios
      analysis: 'analysis'
    },
    {
      default: 'active'
    }
  ),
  reasons: Type.Optional(
    Type.Object({
      inactivation: Type.Optional(Type.String()),
      activation: Type.Optional(Type.String()),
      analysis: Type.Optional(Type.String())
    })
  ),
  document: Type.Object({
    type: Type.String({ enum: ['cpf', 'cnpj'], default: 'cpf' }),
    value: Type.String({ minLength: 11, maxLength: 14, default: '12345678901' }),
    cnh: Type.Optional(Type.String({ minLength: 11, maxLength: 11, default: '12345678901' })),
    rg: Type.Optional(Type.String({ minLength: 9, maxLength: 9, default: '123456789' }))
  }),
  birthDate: registrationDate,
  motherName: namePerson,
  responsible: Type.Optional(
    Type.Object({
      name: namePerson,
      cpf: Type.String({ minLength: 11, maxLength: 11 })
    })
  ),
  phone: Type.String({ minLength: 11, maxLength: 15 }),
  isMinor: Type.Optional(Type.Boolean()),
  isArchived: Type.Optional(Type.Boolean()),
  photo: Type.Optional(Type.String()),
  company: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.String(),
        cnpj: Type.String()
      })
    )
  ),
  address: Type.Object({
    cep: Type.String({ minLength: 8, maxLength: 8 }),
    city: Type.Optional(Type.String({ maxLength: 20 })),
    state: Type.Optional(Type.String({ maxLength: 2, minLength: 2, pattern: '^[A-Z]{2}$' })),
    neighborhood: Type.Optional(Type.String({ maxLength: 60 })),
    street: Type.Optional(Type.String({ maxLength: 60 })),
    number: Type.String({ minLength: 1, maxLength: 20 }),
    complement: Type.Optional(Type.String({ maxLength: 60 }))
  }),
  dependents: Type.Optional(
    Type.Object({
      role: Type.Optional(Type.String({ enum: ['titular', 'dependente'] })),
      document: Type.Optional(Type.String({ minLength: 11, maxLength: 14 })),
      quantity: Type.Optional(Type.Number()),
      dependentsList: Type.Optional(Type.Array(Type.String()))
    })
  ),
  contract: Type.Object({
    startDate: registrationDate,
    endDate: registrationDate
  }),
  responsibleForSale: Type.String({ minLength: 3, maxLength: 60 }),
  planType: Type.String({ enum: ['individual', 'familiar'] }),
  payment: Type.Object({
    value: Type.Number(),
    method: Type.String({ enum: ['credit', 'credit-recurring', 'pix', 'boleto', 'debit'] })
  }),
  attachments: Type.Object({
    contract: Type.Array(Type.Object({ url: Type.String({ format: 'url' }), name: Type.String() })),
    document: Type.Array(Type.Object({ url: Type.String({ format: 'url' }), name: Type.String() })),
    paymentProof: Type.Array(Type.Object({ url: Type.String({ format: 'url' }), name: Type.String() }))
  })
}
