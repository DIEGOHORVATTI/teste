import { Elysia, error, t } from 'elysia'

import { jwt } from '@/middlewares/jwt'
import { SchedulingSchema, schedulingStatusEnum } from '@/models/Scheduling'
import { createSchedulingService } from '@/services/scheduling/create'
import { getAllSchedulingsService } from '@/services/scheduling/get-all'
import { updateSchedulingStatusService } from '@/services/scheduling/update-status'

const router = new Elysia({ prefix: '/scheduling', tags: ['scheduling'] })
  .use(jwt)
  .post(
    '/',
    async ({ body, user }) => {
      const scheduling = await createSchedulingService({ ...body, _id: 'das', userId: user._id })

      return {
        message: 'Scheduling created successfully',
        scheduling
      }
    },
    {
      body: SchedulingSchema,
      detail: { description: 'Create a new scheduling request' }
    }
  )
  .get(
    '/',
    async ({ query: { status, startDate, endDate, limit, offset }, user }) => {
      if (!['admin', 'manager'].includes(user.role)) {
        throw error('Unauthorized', 'Only admin and manager can see all schedulings')
      }

      const { schedulings, total } = await getAllSchedulingsService({
        status,
        userId: user._id,
        startDate,
        endDate,
        limit,
        offset
      })

      return {
        message: 'Schedulings retrieved successfully',
        schedulings,
        total
      }
    },
    {
      query: t.Object({
        status: t.Optional(t.String({ enum: Object.values(schedulingStatusEnum) })),
        startDate: t.Optional(t.String({ format: 'date' })),
        endDate: t.Optional(t.String({ format: 'date' })),
        limit: t.Optional(t.Number({ default: 10 })),
        offset: t.Optional(t.Number({ default: 0 }))
      }),
      detail: { description: 'Get all schedulings with filters' }
    }
  )
  .put(
    '/:id/status',
    async ({ params: { id }, user, body: { status = 'analysis', ...body } }) => {
      // Only admin and manager can update status
      if (!['admin', 'manager'].includes(user.role)) {
        throw new Error('Unauthorized: Only admin and manager can update scheduling status')
      }

      const scheduling = await updateSchedulingStatusService(id, status as keyof typeof schedulingStatusEnum, {
        value: body.value,
        appointmentDate: body.appointmentDate
      })

      return {
        message: 'Scheduling status updated successfully',
        scheduling
      }
    },
    {
      body: t.Object({
        status: t.String({ enum: schedulingStatusEnum }),
        value: t.Optional(t.Number()),
        appointmentDate: t.Optional(t.String({ format: 'date-time' }))
      }),
      detail: { description: 'Update scheduling status' }
    }
  )

export default router
