import { error } from 'elysia'
import { Scheduling } from '@/models/Scheduling'

type FilterOptions = {
  status?: string
  userId?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}

export const getAllSchedulingsService = async ({
  status,
  userId,
  startDate,
  endDate,
  limit = 10,
  offset = 0
}: FilterOptions = {}) => {
  const query: Record<string, any> = {}

  if (status) query.status = status
  if (userId) query.userId = userId
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }

  const schedulings = await Scheduling.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .catch(() => {
      throw error('Internal Server Error', { error: 'Failed to fetch schedulings' })
    })

  const total = await Scheduling.countDocuments(query)

  return { schedulings, total }
}
