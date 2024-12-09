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
    { body: CompanySchema }
  )
  .get('/', async () => {
    const companies = await getAllCompaniesService()

    return { message: 'Empresas encontradas com sucesso', companies }
  })
  .get('/:id', async ({ params: { id } }) => {
    const company = await getOneCompanyService(id)

    return { message: 'Empresa encontrada com sucesso', company }
  })
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const company = await updateCompanyService(id, body)

      return { message: 'Empresa atualizada com sucesso', company }
    },
    { body: CompanySchema }
  )
  .delete('/:id', async ({ params: { id } }) => {
    await deleteCompanyService(id)

    return { message: 'Empresa removida com sucesso' }
  })

export default router
