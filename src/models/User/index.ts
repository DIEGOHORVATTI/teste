import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema, connectDB } from '@/shared'

import type { IUser, UserCompositeModel, UserExtraInfo } from './types'

export const SchemaModel = new Schema<UserCompositeModel, Model<UserCompositeModel>, UserExtraInfo>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpf: { type: Number, required: true, unique: true },
    birthDate: { type: String, required: true },
    isMinor: { type: Boolean, default: false },
    contract: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true }
    },
    motherName: { type: String, required: true },
    phone: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    planType: { type: String, required: true },
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
      contract: { type: String, required: true },
      document: { type: [String], required: true },
      paymentProof: { type: String, required: true }
    }
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)
setDefaultSettingsSchema(SchemaModel)

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
  const user = this.toObject()
  delete user.password

  return user
}

export const User = connectDB.model(collectionsData.User.name, SchemaModel)

export * from './validation'
export * from './types'
