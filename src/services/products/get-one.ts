import { Product } from '@/models/Product'
import { error } from 'elysia'

export const getOneProductService = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw error('Not Found', { error: 'Produto não encontrado' })
  }

  return product
}