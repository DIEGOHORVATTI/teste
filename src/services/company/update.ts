import { Company } from '@/models/Campany'
import { error } from 'elysia'
import { ICompany } from '@/models/Campany'

export const updateCompanyService = async (id: string, data: Partial<ICompany>) => {
  const company = await Company.findById(id)

  if (!company) {
    throw error('Not Found', { error: 'Empresa não encontrada' })
  }

  Object.assign(company, data)

  await company.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Falha ao atualizar empresa',
      details: err.message
    })
  })

  return { company }
}