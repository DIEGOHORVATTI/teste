import { userFilter } from './get-all'

import { User } from '@/models/User'

import { convertObjectToQuery } from '@/shared'

export const getStatusAggregationService = async ({ filters = {} }: typeof userFilter.static) => {
  const queryFilters = convertObjectToQuery(filters)

  const aggregation = await User.aggregate([
    { $match: queryFilters },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        _id: 0
      }
    }
  ])

  const aggregatedStatus = aggregation.reduce(
    (acc, { status, count }) => ({
      ...acc,
      [status]: count
    }),
    { active: 0, inactive: 0, analysis: 0 }
  )

  return { aggregatedStatus }
}
