import AppError from '../error'
import { productRepository } from '../repositories/contracts/productRepository'

export function getProductByIdHandler(
  id: string,
  productRepository: productRepository
) {
  const productToFind = productRepository.getProductById(id)

  if (!productToFind) {
    throw new AppError('Produto não encontrado', 404)
  }

  return productToFind
}
