import { Schema } from 'mongoose'

import * as z from 'zod'

import { unipConnect, setDefaultSettingsSchema } from '../shared'
import { collectionsData } from '../config'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
})

export type IUser = DocumentSchemaZod<typeof UserSchema> & {
  comparePassword(password: string): boolean
  token?: string
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

export const User = unipConnect.model<IUser>(collectionsData.User.name, SchemaModel)
