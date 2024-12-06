import { Company } from '@/models/Campany'
import { error } from 'elysia'

export const getAllCompaniesService = async () => {
  const companies = await Company.find()

  if (!companies.length) {
    throw error('No Content', { error: 'Nenhuma empresa encontrada' })
  }

  return companies
}