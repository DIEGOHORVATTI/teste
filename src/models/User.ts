import { Schema } from 'mongoose'

import { connectDB, setDefaultSettingsSchema } from '../shared'
import { collectionsData } from '../config'

import { t } from 'elysia'

export type IUser = {
  email: string
  password: string
  token?: string
  comparePassword?: (password: string) => boolean
}

export const UserSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 6, maxLength: 20, pattern: '^[a-zA-Z0-9]*$' })
  })
}

const SchemaModel = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

SchemaModel.methods.comparePassword = function (this: IUser, password: string) {
  return this.password === password
}

export const User = connectDB.model<IUser>(collectionsData.User.name, SchemaModel)
