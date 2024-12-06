import { error } from 'elysia'
import { Company } from '@/models/Campany'
import { ICompany } from '@/models/Campany'

export const createCompanyService = async (data: ICompany) => {
  const existingCompany = await Company.findOne({ cnpj: data.cnpj })

  if (existingCompany) {
    throw error('Conflict', { error: 'Uma empresa com este CNPJ já existe' })
  }

  const company = new Company(data)

  await company.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Falha ao criar empresa',
      details: err.message
    })
  })

  return { company }
}