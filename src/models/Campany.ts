import { t as Type } from 'elysia'
import { Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema, connectDB } from '@/shared'

export const CompanySchema = Type.Object({
  name: Type.String(),
  cnpj: Type.String({ format: 'cnpj', pattern: '^[0-9]{14}$' }),
  about: Type.Optional(Type.String())
})

const CompanySchemaModel = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    about: { type: String }
  },
  {
    timestamps: true,
    collection: collectionsData.Company.collection
  }
)

setDefaultSettingsSchema(CompanySchemaModel)

export type ICompany = typeof CompanySchema.static

export const Company = connectDB.model<ICompany>(collectionsData.Company.name, CompanySchemaModel)
