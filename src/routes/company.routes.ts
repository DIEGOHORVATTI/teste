import { Elysia } from 'elysia'
import {
  getAllCompaniesService,
  getOneCompanyService,
  createCompanyService,
  updateCompanyService,
  deleteCompanyService
} from '@/services/company'

import { CompanySchema } from '@/models/Campany'

import { jwt } from '@/middlewares/jwt'

const router = new Elysia({ tags: ['companies'], prefix: '/companies' })
  .use(jwt)
  .post(
    '/',
    async ({ body }) => {
      const company = await createCompanyService(body)

      return { message: 'Empresa criada com sucesso', company }
    },
    {
      body: CompanySchema,
      detail: { description: 'Cria uma empresa' }
    }
  )
  .get(
    '/',
    async () => {
      const companies = await getAllCompaniesService()

      return {
        companies,
        message: 'Empresas encontradas com sucesso'
      }
    },
    { detail: { description: 'Retorna todas as empresas' } }
  )
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const company = await getOneCompanyService(id)

      return {
        company,
        message: 'Empresa encontrada com sucesso'
      }
    },
    { detail: { description: 'Busca uma empresa' } }
  )
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const company = await updateCompanyService(id, body)

      return { message: 'Empresa atualizada com sucesso', company }
    },
    {
      body: CompanySchema,
      detail: { description: 'Atualiza uma empresa' }
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await deleteCompanyService(id)

      return { message: 'Empresa removida com sucesso' }
    },
    {
      type: 'text/plain',
      detail: { description: 'Remove uma empresa' }
    }
  )

export default router
