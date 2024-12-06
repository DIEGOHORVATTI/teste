import { IProduct, Product } from '@/models/Product'

import { error } from 'elysia'
import { IUser } from '../../models/User'

export const updateProductService = async (id: string, body: IProduct, user: IUser) => {
  const product = await Product.findById(id)

  if (!product) {
    throw error(404, 'Product not found')
  }

  /* if (product.user.toString() !== user._id.toString()) {
    throw error(403, 'You are not allowed to update this product')
  } */

  Object.assign(product, body)

  await product.save()

  return product
}
