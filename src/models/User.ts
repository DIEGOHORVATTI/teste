import { t as Type } from 'elysia'
import { Document, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { setDefaultSettingsSchema } from '@/shared/set-default-settings-schema'
import { connectDB } from '@/shared/connection-db'

export const UserCredentialsSchema = {
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6, maxLength: 20, pattern: '^[a-zA-Z0-9]*$' })
}

export const UserSchema = {
  body: Type.Object({
    ...UserCredentialsSchema,
    name: Type.String(),
    surname: Type.String(),
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
    plan: Type.Enum({ Free: 'Free', Pro: 'Pro' })
  })
}

export type IUser = typeof UserSchema.body.static &
  Document & {
    comparePassword: (password: string) => Promise<boolean>
    hashPassword: (this: IUser) => Promise<string>
    resetPassword: {
      expires: Date
      code: string
      attempts: number
    }
  }

const SchemaModel = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    permissions: {
      type: [String],
      default: ['user']
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    photo: String,
    company: {
      type: [
        {
          id: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          cnpj: {
            type: String,
            required: true
          }
        }
      ]
    },
    plan: {
      type: String,
      enum: ['Free', 'Pro'],
      default: 'Free'
    },
    resetPassword: {
      expires: {
        type: Date,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      attempts: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

SchemaModel.methods.comparePassword = function (this: IUser, password: string) {
  return Bun.password.verify(password, this.password)
}

SchemaModel.methods.hashPassword = function (this: IUser) {
  return Bun.password.hash(this.password, {
    algorithm: 'argon2id',
    memoryCost: 65536, // 64MB
    timeCost: 2
  })
}

export const User = connectDB.model<IUser>(collectionsData.User.name, SchemaModel)
