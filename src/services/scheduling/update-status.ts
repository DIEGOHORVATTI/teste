import { error } from 'elysia'
import { Scheduling, schedulingStatusEnum } from '@/models/Scheduling'

export const updateSchedulingStatusService = async (
  id: string,
  status: keyof typeof schedulingStatusEnum,
  additionalData: { value?: number; appointmentDate?: string } = {}
) => {
  const scheduling = await Scheduling.findById(id)

  if (!scheduling) {
    throw error('Not Found', { error: 'Scheduling not found' })
  }

  // Handle blocking logic
  if (status === 'blocked') {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    scheduling.blockedUntil = thirtyDaysFromNow.toISOString()
  }

  // Update scheduling with new status and additional data
  Object.assign(scheduling, {
    status,
    ...additionalData
  })

  await scheduling.save().catch(err => {
    console.error('Error updating scheduling status:', err)
    throw error('Internal Server Error', { error: 'Failed to update scheduling status' })
  })

  return { scheduling }
}
