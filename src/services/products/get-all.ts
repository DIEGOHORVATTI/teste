import { Product } from '@/models/Product'
import { error } from 'elysia'

export const getAllProductsService = async () => {
  const products = await Product.find()

  if (!products.length) {
    throw error('No Content', { error: 'Nenhum produto encontrado' })
  }

  return products
}