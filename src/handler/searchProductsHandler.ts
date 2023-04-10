import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'

export async function searchProductsHandler(
  query: string,
  productRepository: productRepository
) {
  const result = await productRepository.searchProducts(query)

  if (query.length === 0) {
    throw new AppError('Campos inválidos', 400)
  }

  if (result.length === 0) {
    throw new AppError('Produto não encontrado', 404)
  }

  return result
}
