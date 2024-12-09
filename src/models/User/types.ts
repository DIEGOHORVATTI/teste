import { HydratedDocumentFromSchema } from 'mongoose'

import { UserSchema } from './validation'

import { SchemaModel } from '.'

export type UserExtraInfo = {
  comparePassword: (password: string) => Promise<boolean>
  hashPassword: (this: IUser['userDocument']) => Promise<string>
  resetPassword: {
    expires?: Date
    code?: string
    attempts: number
  }
}

export type IUser = {
  userDocument: HydratedDocumentFromSchema<typeof SchemaModel>
  userSchema: typeof UserSchema.static
}

export type UserCompositeModel = IUser['userSchema'] & UserExtraInfo
