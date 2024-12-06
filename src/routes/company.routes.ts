import { Elysia } from 'elysia'
import { CompanySchema } from '@/models/Campany'
import { jwt } from '@/middlewares/jwt'
import {
  getAllCompaniesService,
  getOneCompanyService,
  createCompanyService,
  updateCompanyService,
  deleteCompanyService
} from '@/services/company'

const router = new Elysia().group('/companies', server =>
  server
    .use(jwt)
    .get('/', async () => {
      const companies = await getAllCompaniesService()
      return { message: 'Empresas encontradas com sucesso', companies }
    })
    .get('/:id', async ({ params: { id } }) => {
      const company = await getOneCompanyService(id)
      return { message: 'Empresa encontrada com sucesso', company }
    })
    .post(
      '/',
      async ({ body }) => {
        const company = await createCompanyService(body)
        return { message: 'Empresa criada com sucesso', company }
      },
      { body: CompanySchema.body }
    )
    .put(
      '/:id',
      async ({ params: { id }, body }) => {
        const company = await updateCompanyService(id, body)
        return { message: 'Empresa atualizada com sucesso', company }
      },
      { body: CompanySchema.body }
    )
    .delete('/:id', async ({ params: { id } }) => {
      await deleteCompanyService(id)
      return { message: 'Empresa removida com sucesso' }
    })
)

export default router