import { t as Type } from 'elysia'

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

const userModel = Type.Object(UserSchema).static
export type IUser = {
  userDocument: HydratedDocumentFromSchema<typeof SchemaModel>
  userSchema: typeof userModel & Partial<UserExtraInfo>
}

export type UserCompositeModel = IUser['userSchema'] & UserExtraInfo
