import { products } from '../database'
import AppError from '../error'

export function searchProductsHandler(query: string) {
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  if (result.length === 0) {
    throw new AppError('Produto não encontrado', 404)
  }

  return result
}
