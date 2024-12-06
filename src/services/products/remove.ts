import { User } from '@/models/User'
import { error } from 'elysia'

export const deleteProductService = async (id: string) => {
  const domainExists = await User.findOne({ _id: id })

  if (!domainExists) {
    throw error('Not Found', { error: 'User not found' })
  }

  return User.deleteOne({ _id: id })
}
