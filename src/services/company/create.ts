import { error } from 'elysia'

import { Company, ICompany } from '@/models/Campany'

export const createCompanyService = async (data: ICompany) => {
  const existingCompany = await Company.findOne({ cnpj: data.cnpj })

  if (existingCompany) {
    throw error('Conflict', { error: 'Uma empresa com este CNPJ já existe' })
  }

  const company = new Company(data)

  await company.save().catch(err => {
    console.log(err)

    throw error('Internal Server Error', { error: 'Falha ao criar empresa' })
  })

  return { company }
}
