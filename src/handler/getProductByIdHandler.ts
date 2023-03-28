import { products } from '../database'
import AppError from '../error'

export function getProductByIdHandler(id: string) {
  const productToFind = products.find((product) => product.id === id)

  if (!productToFind) {
    throw new AppError('Produto não encontrado', 404)
  }

  return productToFind
}
