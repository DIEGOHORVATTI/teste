import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema, connectDB } from '@/shared'

import { planType, role, typeRoleDependent, userStatusEnum } from './validation'

import type { IUser, UserCompositeModel, UserExtraInfo } from './types'

export const SchemaModel = new Schema<UserCompositeModel, Model<UserCompositeModel>, UserExtraInfo>(
  {
    role: { type: String, enum: role, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: userStatusEnum, default: 'active', required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: {
      type: { type: String, required: true },
      value: { type: String, required: true },
      cnh: { type: String },
      rg: { type: String }
    },
    responsible: {
      name: { type: String },
      cpf: { type: String }
    },
    birthDate: { type: String, required: true },
    isMinor: { type: Boolean, default: false },
    contract: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true }
    },
    motherName: { type: String, required: true },
    phone: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    planType: { type: String, enum: planType, required: true },
    responsibleForSale: { type: String, required: true },
    company: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        cnpj: { type: String, required: true }
      }
    ],
    resetPassword: {
      expires: { type: Date },
      code: { type: String },
      attempts: { type: Number, default: 0 }
    },
    attachments: {
      contract: { type: [String], required: true },
      document: { type: [String], required: true },
      paymentProof: { type: [String], required: true }
    },
    dependents: {
      role: { type: String, enum: typeRoleDependent },
      quantity: { type: Number },
      dependentsList: { type: [String] }
    }
  },
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

export const User = connectDB.model(collectionsData.User.name, SchemaModel)

export * from './validation'
export * from './types'
