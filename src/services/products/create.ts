import { error } from 'elysia'
import { IProduct, Product } from '@/models/Product'
import { IUser } from '@/models/User'

export const createProductService = async (data: IProduct, user: IUser) => {
  const existingProduct = await Product.findOne({ code: data.code })

  if (existingProduct) {
    throw error('Conflict', { error: 'Já existe um produto com este código' })
  }

  const product = new Product({
    ...data,
    company: {
      id: user.company?.[0]?.id,
      name: user.company?.[0]?.name
    }
  })

  await product.save().catch(err => {
    throw error('Internal Server Error', {
      error: 'Falha ao criar produto',
      details: err.message
    })
  })

  return product
}