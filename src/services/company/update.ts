import { error } from 'elysia'

import { Company, ICompany } from '@/models/Campany'

export const updateCompanyService = async (id: string, data: Partial<ICompany>) => {
  const company = await Company.findById(id)

  if (!company) {
    throw error('Not Found', { error: 'Empresa não encontrada' })
  }

  Object.assign(company, data)

  await company.save().catch(err => {
    console.log(err)

    throw error('Internal Server Error', { error: 'Falha ao atualizar empresa' })
  })

  return { company }
}
