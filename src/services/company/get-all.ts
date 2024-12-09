import { error } from 'elysia'

import { Company } from '@/models/Campany'

export const getAllCompaniesService = async () => {
  const companies = await Company.find().catch(() => {
    throw error('Internal Server Error', { error: 'Erro ao buscar empresas' })
  })

  return companies
}
