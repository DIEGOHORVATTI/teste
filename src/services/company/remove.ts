import { Company } from '@/models/Campany'
import { error } from 'elysia'

export const deleteCompanyService = async (id: string) => {
  const company = await Company.findById(id)

  if (!company) {
    throw error('Not Found', { error: 'Empresa não encontrada' })
  }

  await Company.deleteOne({ _id: id })

  return { message: 'Empresa removida com sucesso' }
}