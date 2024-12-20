import { Model, Schema, type PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema, connectDB } from '@/shared'

import type { IUser, UserCompositeModel, UserExtraInfo } from './types'

type UserDTO = Omit<IUser['userSchema'], 'comparePassword' | 'hashPassword' | 'toJSON'>

export const SchemaModel = new Schema<UserCompositeModel, Model<UserCompositeModel>, UserExtraInfo>(
  {
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    reasons: {
      inactivation: { type: String },
      activation: { type: String },
      analysis: { type: String }
    },
    document: {
      type: { type: String, required: true },
      value: { type: String, required: true },
      cnh: { type: String },
      rg: { type: String }
    },
    birthDate: { type: String, required: true },
    motherName: { type: String, required: true },
    responsible: {
      name: { type: String },
      cpf: { type: String }
    },
    phone: { type: String, required: true },
    isMinor: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    photo: { type: String },
    company: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        cnpj: { type: String, required: true }
      }
    ],
    address: {
      cep: { type: String, required: true },
      city: { type: String },
      state: { type: String },
      neighborhood: { type: String },
      street: { type: String },
      number: { type: String, required: true },
      complement: { type: String }
    },
    dependents: {
      role: { type: String },
      document: { type: String },
      quantity: { type: Number },
      dependentsList: { type: [String] }
    },
    contract: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true }
    },
    responsibleForSale: { type: String, required: true },
    planType: { type: String, required: true },
    payment: {
      value: { type: Number, required: true },
      method: { type: String, required: true }
    },
    attachments: {
      contract: [
        {
          url: { type: String },
          name: { type: String }
        }
      ],
      document: [
        {
          url: { type: String },
          name: { type: String }
        }
      ],
      paymentProof: [
        {
          url: { type: String },
          name: { type: String }
        }
      ]
    },
    resetPassword: {
      expires: { type: Date },
      code: { type: String },
      attempts: { type: Number, default: 0 }
    }
  } satisfies RequiredShema<UserDTO>,
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

// Métodos para verificar se é menor de idade e comparação de senha
SchemaModel.methods.checkMinor = function (this: IUser['userDocument']) {
  const birthDate = new Date(this.birthDate)
  const age = new Date().getFullYear() - birthDate.getFullYear()

  if (age < 18) {
    this.isMinor = true
  }
}

SchemaModel.methods.comparePassword = async function (this: IUser['userDocument'], password: string) {
  return Bun.password.verify(password, this.password)
}

SchemaModel.pre('save', async function (next) {
  const hashedPassword = Bun.password.hash(this.password, {
    algorithm: 'argon2id',
    memoryCost: 65536, // 64MB
    timeCost: 2
  })

  if (this.isModified('password') || this.isNew) {
    this.password = await hashedPassword
  }

  next()
})

SchemaModel.methods.toJSON = function () {
  const user = this.toObject() as Partial<IUser['userSchema']>
  delete user.password
  delete user.resetPassword

  return user
}

SchemaModel.plugin(paginate)

export const User = connectDB.model<UserCompositeModel, PaginateModel<UserCompositeModel>>(
  collectionsData.User.name,
  SchemaModel
)

export * from './validation'
export * from './types'
