import { Company } from '@/models/Campany'
import { error } from 'elysia'

export const getOneCompanyService = async (id: string) => {
  const company = await Company.findById(id)

  if (!company) {
    throw error('Not Found', { error: 'Empresa não encontrada' })
  }

  return company
}
