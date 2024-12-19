import { error } from 'elysia'

import { IScheduling, Scheduling } from '@/models/Scheduling'

type Props = Omit<IScheduling, 'status' | 'protocol'>

export const createSchedulingService = async (data: Props) => {
  const scheduling = new Scheduling({ ...data, status: 'analysis' })

  await scheduling.save().catch(err => {
    console.error('Error creating scheduling:', err)
    throw error('Internal Server Error', { error: 'Failed to create scheduling' })
  })

  return { scheduling }
}
