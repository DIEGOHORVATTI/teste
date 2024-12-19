import { t as Type } from 'elysia'
import { Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'
import { setDefaultSettingsSchema, connectDB } from '@/shared'

export const schedulingStatusEnum = {
  defaulter: 'defaulter', // Inadiplente - aguardando pagamento
  blocked: 'blocked', // Bloqueado - 30 dias
  pending: 'pending', // Pendente - aguardando análise
  analysis: 'analysis', // Em análise - aguardando liberação
  waitingForPayment: 'waitingForPayment' // Aguardando pagamento
} as const

export const SchedulingSchema = Type.Object({
  userId: Type.String(),
  doctorId: Type.Optional(Type.String()),
  specialty: Type.String(),
  description: Type.String(),
  preferredDates: Type.Array(Type.String({ format: 'date-time' }), { minItems: 2, maxItems: 2 }),
  address: Type.Object({
    cep: Type.String({ minLength: 8, maxLength: 8 }),
    city: Type.String(),
    state: Type.String()
  }),
  status: Type.Enum(schedulingStatusEnum),
  protocol: Type.Optional(Type.String()),
  value: Type.Optional(Type.Number()),
  blockedUntil: Type.Optional(Type.String({ format: 'date-time' })),
  appointmentDate: Type.Optional(Type.String({ format: 'date-time' }))
})

const SchedulingSchemaModel = new Schema(
  {
    userId: { ref: 'User', type: Schema.Types.ObjectId, required: true },
    doctorId: { type: String },
    specialty: { type: String, required: true },
    description: { type: String, required: true },
    preferredDates: [{ type: Date, required: true }],
    address: {
      cep: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true }
    },
    status: {
      type: String,
      enum: Object.values(schedulingStatusEnum),
      default: schedulingStatusEnum.analysis,
      required: true
    },
    protocol: { type: String },
    value: { type: Number },
    blockedUntil: { type: Date },
    appointmentDate: { type: Date }
  },
  {
    timestamps: true,
    collection: collectionsData.Scheduling?.collection || 'schedulings'
  }
)

// Generate protocol number before saving
SchedulingSchemaModel.pre('save', function (next) {
  if (!this.protocol) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')
    this.protocol = `SCH${date}${random}`
  }
  next()
})

setDefaultSettingsSchema(SchedulingSchemaModel)

export type IScheduling = Omit<typeof SchedulingSchema.static, '_id'> & {
  _id: string
}

export const Scheduling = connectDB.model<IScheduling>('Scheduling', SchedulingSchemaModel)
