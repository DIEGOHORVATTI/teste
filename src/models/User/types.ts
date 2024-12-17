import { HydratedDocumentFromSchema } from 'mongoose'

import { UserSchema } from './validation'

import { SchemaModel } from '.'

export type UserExtraInfo = {
  comparePassword: (password: string) => Promise<boolean>
  hashPassword: (this: IUser['userDocument']) => Promise<string>
  toJSON: () => Partial<IUser['userSchema']>
  resetPassword: {
    expires?: Date
    code?: string
    attempts: number
  }
}

export type IUser = {
  userDocument: HydratedDocumentFromSchema<typeof SchemaModel>
  userSchema: typeof UserSchema.static & Partial<UserExtraInfo>
}

export type UserCompositeModel = IUser['userSchema'] & UserExtraInfo
