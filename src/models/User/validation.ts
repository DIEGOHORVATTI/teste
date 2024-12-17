import { t as Type } from 'elysia'

const date = Type.String({ format: 'date', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' })
const namePerson = Type.String({ minLength: 3, maxLength: 100 })

export const typeRoleDependent = ['titular', 'dependente'] as const
export const planType = ['individual', 'familiar'] as const
export const paymentMethod = ['credit', 'credit-recurring', 'pix', 'boleto', 'debit'] as const
export const userStatusEnum = ['active', 'inactive', 'analysis'] as const

export const role = {
  client: 'client', // cliente

  // backoffice
  admin: 'admin', // admin
  manager: 'manager', // gerente
  salesman: 'consultant' // consultor
} as const

export const UserCredentialsSchema = {
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6, maxLength: 20 })
}

export const UserSchema = Type.Object({
  /**
   * admmin: acesso total
   * manager: acesso aos relatórios
   * consultant: acesso aos agendamentos
   * client: acesso as funcionalidades do sistema
   */
  role: Type.Enum(role),
  ...UserCredentialsSchema,
  name: namePerson,
  status: Type.String({ enum: userStatusEnum, default: 'active' }),
  document: Type.Object({
    type: Type.String({ enum: ['cpf', 'cnpj'] }),
    value: Type.String({ minLength: 11, maxLength: 14 }),
    cnh: Type.Optional(Type.String({ minLength: 11, maxLength: 11 })),
    rg: Type.Optional(Type.String({ minLength: 9, maxLength: 9 }))
  }),
  birthDate: date,
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
      role: Type.Optional(Type.String({ enum: typeRoleDependent })),
      quantity: Type.Optional(Type.Number()),
      dependentsList: Type.Optional(Type.Array(Type.String()))
    })
  ),
  contract: Type.Object({
    startDate: date,
    endDate: date
  }),
  responsibleForSale: Type.String({ minLength: 3, maxLength: 60 }),
  planType: Type.String({ enum: planType }),
  payment: Type.Object({
    value: Type.Number(),
    method: Type.String({ enum: paymentMethod })
  }),
  attachments: Type.Object({
    contract: Type.Array(Type.String({ format: 'url' })),
    document: Type.Array(Type.String({ format: 'url' })),
    paymentProof: Type.Array(Type.String({ format: 'url' }))
  })
})
