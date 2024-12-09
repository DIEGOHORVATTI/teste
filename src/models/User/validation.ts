import { t as Type } from 'elysia'

const date = Type.String({ format: 'date', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' })

const namePerson = Type.String({ minLength: 3, maxLength: 60, pattern: '^[a-zA-Z\\s]*$' })

const url = Type.String({ format: 'url' })

export const UserCredentialsSchema = {
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6, maxLength: 20 })
}

export const UserSchema = Type.Object({
  ...UserCredentialsSchema,
  name: namePerson,
  surname: namePerson,
  cpf: Type.Number({ minLength: 11, maxLength: 11, pattern: '^[0-9]{11}$' }),
  birthDate: date,
  motherName: namePerson,
  fatherName: Type.Optional(namePerson),
  phone: Type.String({ minLength: 11, maxLength: 15, pattern: '^[0-9]{11,15}$' }),
  isMinor: Type.Optional(Type.Boolean()),
  isArchived: Type.Optional(Type.Boolean()),
  photo: Type.Optional(Type.String()),
  permissions: Type.Optional(Type.Array(Type.String())),
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
    cep: Type.String({ minLength: 8, maxLength: 8, pattern: '^[0-9]{8}$' }),
    city: Type.Optional(Type.String({ maxLength: 20 })),
    state: Type.Optional(Type.String({ maxLength: 20 })),
    neighborhood: Type.Optional(Type.String({ maxLength: 60 })),
    street: Type.Optional(Type.String({ maxLength: 60 })),
    number: Type.String({ minLength: 1, maxLength: 20 }),
    complement: Type.Optional(Type.String({ maxLength: 60 }))
  }),
  dependents: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.String(),
        relationship: Type.String({ enum: ['Father', 'Mother', 'Guardian'] })
      })
    )
  ),
  contract: Type.Object({
    startDate: date,
    endDate: date
  }),
  responsibleForSale: Type.String(),
  planType: Type.String({ enum: ['individual', 'familiar'] }),
  payment: Type.Object({
    value: Type.Number(),
    method: Type.String({ enum: ['credit', 'credit-recurring', 'pix', 'boleto', 'bebit'] })
  }),
  attachments: Type.Object({
    contract: url,
    document: Type.Array(Type.String({ format: 'url' })),
    paymentProof: Type.String({ format: 'url' })
  })
})
